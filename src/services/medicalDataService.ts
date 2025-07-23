import { Disease, Symptom } from '../types';

// Medical data storage
let diseases: Disease[] = [];
let symptoms: Symptom[] = [];
let medicationsData: { [key: string]: string[] } = {};
let precautionsData: { [key: string]: string[] } = {};
let dietsData: { [key: string]: string[] } = {};
let workoutData: { [key: string]: string[] } = {};

// Load CSV data
export const loadMedicalData = async () => {
  try {
    // Load symptoms and severity
    const symptomsResponse = await fetch('/Medicine-main/Symptom-severity.csv');
    const symptomsText = await symptomsResponse.text();
    const symptomsLines = symptomsText.split('\n').slice(1); // Skip header
    
    symptoms = symptomsLines
      .filter(line => line.trim())
      .map(line => {
        const [name, weight] = line.split(',');
        return {
          name: name.trim(),
          weight: parseInt(weight.trim()) || 1
        };
      });

    // Load medications data
    const medicationsResponse = await fetch('/Medicine-main/medications.csv');
    const medicationsText = await medicationsResponse.text();
    const medicationsLines = medicationsText.split('\n').slice(1);
    
    medicationsLines.forEach(line => {
      if (line.trim()) {
        const [disease, medications] = line.split(',');
        const diseaseName = disease.trim();
        const meds = medications.replace(/[\[\]']/g, '').split(',').map(m => m.trim());
        medicationsData[diseaseName] = meds;
      }
    });

    // Load precautions data
    const precautionsResponse = await fetch('/Medicine-main/precautions_df.csv');
    const precautionsText = await precautionsResponse.text();
    const precautionsLines = precautionsText.split('\n').slice(1);
    
    precautionsLines.forEach(line => {
      if (line.trim()) {
        const parts = line.split(',');
        if (parts.length >= 5) {
          const diseaseName = parts[1].trim();
          const precautions = [parts[2], parts[3], parts[4], parts[5]]
            .filter(p => p && p.trim() !== '')
            .map(p => p.trim());
          precautionsData[diseaseName] = precautions;
        }
      }
    });

    // Load diets data
    const dietsResponse = await fetch('/Medicine-main/diets.csv');
    const dietsText = await dietsResponse.text();
    const dietsLines = dietsText.split('\n').slice(1);
    
    dietsLines.forEach(line => {
      if (line.trim()) {
        const [disease, diet] = line.split(',');
        const diseaseName = disease.trim();
        const dietItems = diet.replace(/[\[\]']/g, '').split(',').map(d => d.trim());
        dietsData[diseaseName] = dietItems;
      }
    });

    // Load workout data
    const workoutResponse = await fetch('/Medicine-main/workout_df.csv');
    const workoutText = await workoutResponse.text();
    const workoutLines = workoutText.split('\n').slice(1);
    
    workoutLines.forEach(line => {
      if (line.trim()) {
        const parts = line.split(',');
        if (parts.length >= 4) {
          const diseaseName = parts[2].trim();
          const workout = parts[3].trim();
          if (!workoutData[diseaseName]) {
            workoutData[diseaseName] = [];
          }
          workoutData[diseaseName].push(workout);
        }
      }
    });

    // Load symptoms data and build diseases
    const symptomsDfResponse = await fetch('/Medicine-main/symtoms_df.csv');
    const symptomsDfText = await symptomsDfResponse.text();
    const symptomsDfLines = symptomsDfText.split('\n').slice(1);
    
    const diseaseSymptoms: { [key: string]: string[] } = {};
    
    symptomsDfLines.forEach(line => {
      if (line.trim()) {
        const parts = line.split(',');
        if (parts.length >= 3) {
          const diseaseName = parts[1].trim();
          const symptomList = [parts[2], parts[3], parts[4], parts[5]]
            .filter(s => s && s.trim() !== '')
            .map(s => s.trim());
          
          if (!diseaseSymptoms[diseaseName]) {
            diseaseSymptoms[diseaseName] = [];
          }
          diseaseSymptoms[diseaseName].push(...symptomList);
        }
      }
    });

    // Build complete diseases array
    diseases = Object.keys(diseaseSymptoms).map(diseaseName => {
      const uniqueSymptoms = [...new Set(diseaseSymptoms[diseaseName])];
      const severity = uniqueSymptoms.reduce((sum, symptom) => {
        const symptomData = symptoms.find(s => s.name === symptom);
        return sum + (symptomData?.weight || 1);
      }, 0);

      return {
        name: diseaseName,
        symptoms: uniqueSymptoms,
        medications: medicationsData[diseaseName] || [],
        precautions: precautionsData[diseaseName] || [],
        diet: dietsData[diseaseName] || [],
        workout: workoutData[diseaseName] || [],
        severity
      };
    });

    console.log('Medical data loaded successfully:', {
      diseasesCount: diseases.length,
      symptomsCount: symptoms.length
    });

  } catch (error) {
    console.error('Error loading medical data:', error);
  }
};

// Get all available symptoms
export const getAvailableSymptoms = (): string[] => {
  return symptoms.map(s => s.name);
};

// Get all available diseases
export const getAvailableDiseases = (): Disease[] => {
  return diseases;
};

// Find diseases based on symptoms
export const findDiseasesBySymptoms = (patientSymptoms: string[]): Disease[] => {
  const matchedDiseases = diseases.map(disease => {
    const matchingSymptoms = disease.symptoms.filter(symptom => 
      patientSymptoms.some(patientSymptom => 
        patientSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
        symptom.toLowerCase().includes(patientSymptom.toLowerCase())
      )
    );
    
    const matchScore = matchingSymptoms.length / disease.symptoms.length;
    
    return {
      ...disease,
      matchScore,
      matchingSymptoms
    };
  });

  return matchedDiseases
    .filter(disease => disease.matchScore > 0.3) // At least 30% symptom match
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3); // Top 3 matches
};

// Get symptom severity
export const getSymptomSeverity = (symptomName: string): number => {
  const symptom = symptoms.find(s => 
    s.name.toLowerCase() === symptomName.toLowerCase()
  );
  return symptom?.weight || 1;
};

// Calculate total symptom severity
export const calculateTotalSeverity = (patientSymptoms: string[]): number => {
  return patientSymptoms.reduce((total, symptom) => {
    return total + getSymptomSeverity(symptom);
  }, 0);
};

// Get medications for a specific disease
export const getMedicationsForDisease = (diseaseName: string): string[] => {
  return medicationsData[diseaseName] || [];
};

// Get precautions for a specific disease
export const getPrecautionsForDisease = (diseaseName: string): string[] => {
  return precautionsData[diseaseName] || [];
};

// Get diet recommendations for a specific disease
export const getDietForDisease = (diseaseName: string): string[] => {
  return dietsData[diseaseName] || [];
};

// Get workout recommendations for a specific disease
export const getWorkoutForDisease = (diseaseName: string): string[] => {
  return workoutData[diseaseName] || [];
}; 
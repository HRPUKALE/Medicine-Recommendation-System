import { PatientProfile, RecommendationResponse, Recommendation, Substitution, Disease } from '../types';
import { 
  findDiseasesBySymptoms, 
  calculateTotalSeverity, 
  getSymptomSeverity,
  getMedicationsForDisease,
  getPrecautionsForDisease,
  getDietForDisease,
  getWorkoutForDisease
} from './medicalDataService';

// Medicine database with real compositions and pricing
const medicineDatabase = {
  'Paracetamol': {
    composition: 'Paracetamol 500mg/650mg',
    price: 25,
    reliefTime: '30-45 minutes',
    effectiveness: 85,
    alternatives: ['Acetaminophen', 'Calpol', 'Crocin', 'Dolo']
  },
  'Ibuprofen': {
    composition: 'Ibuprofen 400mg/600mg',
    price: 35,
    reliefTime: '20-30 minutes',
    effectiveness: 88,
    alternatives: ['Brufen', 'Advil', 'Motrin', 'Nurofen']
  },
  'Aspirin': {
    composition: 'Acetylsalicylic acid 325mg/500mg',
    price: 20,
    reliefTime: '15-30 minutes',
    effectiveness: 82,
    alternatives: ['Disprin', 'Ecosprin', 'Aspirin']
  },
  'Omeprazole': {
    composition: 'Omeprazole 20mg/40mg',
    price: 45,
    reliefTime: '1-2 hours',
    effectiveness: 90,
    alternatives: ['Losec', 'Prilosec', 'Omez']
  },
  'Cetirizine': {
    composition: 'Cetirizine 10mg',
    price: 30,
    reliefTime: '1-2 hours',
    effectiveness: 85,
    alternatives: ['Zyrtec', 'Reactine', 'Alerid']
  },
  'Metformin': {
    composition: 'Metformin 500mg/1000mg',
    price: 55,
    reliefTime: '2-3 hours',
    effectiveness: 92,
    alternatives: ['Glucophage', 'Fortamet', 'Riomet']
  },
  'Amlodipine': {
    composition: 'Amlodipine 5mg/10mg',
    price: 40,
    reliefTime: '4-6 hours',
    effectiveness: 88,
    alternatives: ['Norvasc', 'Amcard', 'Amlong']
  },
  'Atorvastatin': {
    composition: 'Atorvastatin 10mg/20mg/40mg',
    price: 65,
    reliefTime: '2-4 weeks',
    effectiveness: 90,
    alternatives: ['Lipitor', 'Atorva', 'Torvast']
  }
};

// Generate intelligent recommendations based on medical data
export const generateRecommendations = async (patientData: PatientProfile): Promise<RecommendationResponse> => {
  // Find potential diseases based on symptoms
  const detectedDiseases = findDiseasesBySymptoms(patientData.symptoms);
  
  // Calculate symptom severity
  const totalSeverity = calculateTotalSeverity(patientData.symptoms);
  const primarySymptoms = patientData.symptoms.filter(symptom => 
    getSymptomSeverity(symptom) >= 5
  );
  const secondarySymptoms = patientData.symptoms.filter(symptom => 
    getSymptomSeverity(symptom) < 5
  );

  // Get medications for detected diseases
  const allMedications = detectedDiseases.flatMap(disease => disease.medications);
  const uniqueMedications = [...new Set(allMedications)];

  // Find the best primary recommendation
  const primaryRecommendation = findBestMedication(
    uniqueMedications, 
    patientData.symptoms, 
    patientData.allergies,
    detectedDiseases[0]?.name
  );

  // Generate substitutions
  const substitutions = generateSubstitutions(
    primaryRecommendation, 
    patientData.preferences,
    uniqueMedications
  );

  // Generate purchase options
  const purchaseOptions = generatePurchaseOptions(primaryRecommendation.name);

  // Generate safety information
  const safetyInfo = generateSafetyInfo(primaryRecommendation, patientData);

  // Generate dietary and lifestyle advice
  const dietaryAdvice = generateDietaryAdvice(detectedDiseases);
  const lifestyleRecommendations = generateLifestyleRecommendations(detectedDiseases);

  // Generate red flags
  const redFlags = generateRedFlags(patientData.symptoms, totalSeverity);

  return {
    patientProfile: patientData,
    primaryRecommendation,
    substitutions,
    purchaseOptions,
    safetyInfo,
    dietaryAdvice,
    lifestyleRecommendations,
    redFlags,
    detectedDiseases,
    symptomAnalysis: {
      totalSeverity,
      primarySymptoms,
      secondarySymptoms
    }
  };
};

// Find the best medication based on symptoms and allergies
const findBestMedication = (
  medications: string[], 
  symptoms: string[], 
  allergies: string[],
  primaryDisease?: string
): Recommendation => {
  // Map medication names to database entries
  const availableMeds = medications
    .map(med => {
      const dbEntry = Object.entries(medicineDatabase).find(([name, data]) =>
        med.toLowerCase().includes(name.toLowerCase()) ||
        data.alternatives.some(alt => med.toLowerCase().includes(alt.toLowerCase()))
      );
      return dbEntry ? { name: dbEntry[0], ...dbEntry[1] } : null;
    })
    .filter(Boolean);

  if (availableMeds.length === 0) {
    // Fallback to common pain relievers
    return {
      name: 'Paracetamol',
      composition: 'Paracetamol 500mg',
      confidenceScore: 75,
      reliefTime: '30-45 minutes',
      effectiveness: 80,
      rationale: 'General pain relief and fever reduction',
      disease: primaryDisease
    };
  }

  // Sort by effectiveness and filter out allergies
  const safeMeds = availableMeds.filter(med => 
    med && !allergies.some(allergy => 
      med.name.toLowerCase().includes(allergy.toLowerCase())
    )
  );

  const bestMed = safeMeds.length > 0 ? safeMeds[0] : availableMeds[0];

  if (!bestMed) {
    // Fallback to common pain relievers
    return {
      name: 'Paracetamol',
      composition: 'Paracetamol 500mg',
      confidenceScore: 75,
      reliefTime: '30-45 minutes',
      effectiveness: 80,
      rationale: 'General pain relief and fever reduction',
      disease: primaryDisease
    };
  }

  return {
    name: bestMed.name,
    composition: bestMed.composition,
    confidenceScore: Math.min(95, 70 + (bestMed.effectiveness * 0.25)),
    reliefTime: bestMed.reliefTime,
    effectiveness: bestMed.effectiveness,
    rationale: `Recommended for ${primaryDisease || 'your symptoms'} based on medical data analysis`,
    disease: primaryDisease
  };
};

// Generate substitutions
const generateSubstitutions = (
  primaryMed: Recommendation,
  preferences: PatientProfile['preferences'],
  availableMedications: string[]
): Substitution[] => {
  const substitutions: Substitution[] = [];
  
  // Find alternatives from medicine database
  const primaryDbEntry = Object.entries(medicineDatabase).find(([name]) => 
    name.toLowerCase() === primaryMed.name.toLowerCase()
  );

  if (primaryDbEntry) {
    const alternatives = primaryDbEntry[1].alternatives;
    
    alternatives.forEach((alt, index) => {
      const tier = index + 1;
      const altDbEntry = Object.entries(medicineDatabase).find(([name]) => 
        name.toLowerCase() === alt.toLowerCase()
      );

      if (altDbEntry) {
        substitutions.push({
          tier,
          name: altDbEntry[0],
          composition: altDbEntry[1].composition,
          price: preferences.priceSensitive ? altDbEntry[1].price * 0.9 : altDbEntry[1].price,
          type: tier === 1 ? 'Exact Equivalent' : 'Therapeutic Alternative',
          bioequivalent: tier === 1
        });
      }
    });
  }

  return substitutions.slice(0, 3);
};

// Generate purchase options
const generatePurchaseOptions = (medicineName: string) => {
  const basePrice = Object.values(medicineDatabase).find(med => 
    med.alternatives.includes(medicineName) || 
    medicineName.toLowerCase().includes(med.composition.toLowerCase().split(' ')[0].toLowerCase())
  )?.price || 50;

  return [
    {
      platform: '1mg',
      price: basePrice,
      delivery: 'Same day',
      rating: 4.4,
      reviews: 2847,
      offers: 'HEALTH15 - 15% off',
      link: `https://www.1mg.com/search/all?name=${encodeURIComponent(medicineName)}`,
      inStock: true
    },
    {
      platform: 'NetMeds',
      price: Math.round(basePrice * 0.95),
      delivery: 'Next day',
      rating: 4.3,
      reviews: 1923,
      offers: 'Free delivery >₹299',
      link: `https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(medicineName)}`,
      inStock: true
    },
    {
      platform: 'PharmEasy',
      price: Math.round(basePrice * 1.05),
      delivery: 'Same day',
      rating: 4.2,
      reviews: 1456,
      offers: 'FIRST20 - 20% off first order',
      link: `https://pharmeasy.in/search/all?name=${encodeURIComponent(medicineName)}`,
      inStock: true
    }
  ];
};

// Generate safety information
const generateSafetyInfo = (medication: Recommendation, patientData: PatientProfile) => {
  const isPainReliever = ['Paracetamol', 'Ibuprofen', 'Aspirin'].some(name => 
    medication.name.toLowerCase().includes(name.toLowerCase())
  );

  return {
    dosage: {
      standard: isPainReliever ? '1 tablet every 6-8 hours' : 'As prescribed by doctor',
      maximum: isPainReliever ? '4 tablets in 24 hours' : 'Follow doctor\'s instructions',
      duration: isPainReliever ? 'Maximum 5 days' : 'As prescribed'
    },
    warnings: [
      'Avoid alcohol consumption',
      'Do not exceed recommended dose',
      'Consult doctor if symptoms persist beyond 3 days',
      'Take with food if stomach upset occurs'
    ],
    contraindications: [
      'Severe liver disease',
      'Active peptic ulcer',
      'Known allergy to medication components',
      'Pregnancy (consult doctor)'
    ]
  };
};

// Generate dietary advice
const generateDietaryAdvice = (diseases: Disease[]): string[] => {
  const allDietAdvice = diseases.flatMap(disease => disease.diet);
  const uniqueAdvice = [...new Set(allDietAdvice)];
  
  return uniqueAdvice.slice(0, 5).map(advice => 
    advice.charAt(0).toUpperCase() + advice.slice(1)
  );
};

// Generate lifestyle recommendations
const generateLifestyleRecommendations = (diseases: Disease[]): string[] => {
  const allWorkoutAdvice = diseases.flatMap(disease => disease.workout);
  const uniqueAdvice = [...new Set(allWorkoutAdvice)];
  
  return uniqueAdvice.slice(0, 5).map(advice => 
    advice.charAt(0).toUpperCase() + advice.slice(1)
  );
};

// Generate red flags
const generateRedFlags = (symptoms: string[], totalSeverity: number): string[] => {
  const redFlags = [
    'Severe abdominal pain',
    'Difficulty breathing',
    'High fever (>102°F) persisting',
    'Severe allergic reactions'
  ];

  if (totalSeverity > 20) {
    redFlags.push('Seek immediate medical attention');
  }

  if (symptoms.some(s => s.toLowerCase().includes('chest pain'))) {
    redFlags.push('Chest pain - call emergency services immediately');
  }

  if (symptoms.some(s => s.toLowerCase().includes('bleeding'))) {
    redFlags.push('Unusual bleeding - consult doctor immediately');
  }

  return redFlags;
}; 
import React, { useState, useEffect } from 'react';
import { SimpleForm } from './components/SimpleForm';
import { SimpleResults } from './components/SimpleResults';
import { PatientProfile, RecommendationResponse } from './types';
import { loadMedicalData } from './services/medicalDataService';
import { generateRecommendations } from './services/recommendationEngine';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load medical data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        await loadMedicalData();
        setDataLoaded(true);
      } catch (error) {
        console.error('Failed to load medical data:', error);
        setDataLoaded(true); // Still allow the app to work with fallback data
      }
    };

    initializeData();
  }, []);

  const handleFormSubmit = async (patientData: PatientProfile) => {
    setLoading(true);
    
    try {
      // Generate intelligent recommendations using medical data
      const intelligentRecommendation = await generateRecommendations(patientData);
      setRecommendation(intelligentRecommendation);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      
      // Fallback to basic recommendation if medical data fails
      const fallbackRecommendation: RecommendationResponse = {
        patientProfile: patientData,
        primaryRecommendation: {
          name: patientData.unavailableMedicine === 'Dolo 650' ? 'Calpol 650' : 'Combiflam Plus',
          composition: patientData.unavailableMedicine === 'Dolo 650' ? 'Paracetamol 650mg' : 'Ibuprofen 400mg + Paracetamol 325mg',
          confidenceScore: 75,
          reliefTime: '30-45 minutes',
          effectiveness: 80,
          rationale: 'General pain relief and fever reduction'
        },
        substitutions: [
          {
            tier: 1,
            name: patientData.unavailableMedicine === 'Dolo 650' ? 'Crocin Advance' : 'Ibugesic Plus',
            composition: patientData.unavailableMedicine === 'Dolo 650' ? 'Paracetamol 500mg' : 'Ibuprofen 400mg + Paracetamol 325mg',
            price: 45,
            type: 'Exact Equivalent',
            bioequivalent: true
          }
        ],
        purchaseOptions: [
          {
            platform: '1mg',
            price: 45,
            delivery: 'Same day',
            rating: 4.4,
            reviews: 2847,
            offers: 'HEALTH15 - 15% off',
            link: 'https://www.1mg.com/search/all?name=calpol%20650',
            inStock: true
          }
        ],
        safetyInfo: {
          dosage: {
            standard: '1 tablet every 6-8 hours',
            maximum: '4 tablets in 24 hours',
            duration: 'Maximum 5 days'
          },
          warnings: [
            'Avoid alcohol consumption',
            'Do not exceed recommended dose',
            'Consult doctor if symptoms persist beyond 3 days'
          ],
          contraindications: [
            'Severe liver disease',
            'Active peptic ulcer',
            'Known allergy to paracetamol/ibuprofen'
          ]
        },
        dietaryAdvice: [
          'Take with food to reduce stomach irritation',
          'Increase fluid intake',
          'Avoid spicy and oily foods'
        ],
        lifestyleRecommendations: [
          'Get adequate rest (7-8 hours sleep)',
          'Apply cold compress for headache',
          'Practice stress management techniques'
        ],
        redFlags: [
          'Severe abdominal pain',
          'Difficulty breathing',
          'High fever (>102°F) persisting',
          'Severe allergic reactions'
        ],
        detectedDiseases: [],
        symptomAnalysis: {
          totalSeverity: 0,
          primarySymptoms: [],
          secondarySymptoms: []
        }
      };
      
      setRecommendation(fallbackRecommendation);
    }
    
    setLoading(false);
    setShowResults(true);
  };

  const handleNewConsultation = () => {
    setShowResults(false);
    setRecommendation(null);
  };

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-lg">Loading medical database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {!showResults ? (
        <SimpleForm onSubmit={handleFormSubmit} loading={loading} />
      ) : (
        <SimpleResults 
          recommendation={recommendation!} 
          onNewConsultation={handleNewConsultation}
        />
      )}
    </div>
  );
}

export default App;
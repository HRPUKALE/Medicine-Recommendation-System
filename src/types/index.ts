export interface PatientProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight?: number;
  symptoms: string[];
  symptomDuration: string;
  symptomSeverity: 'mild' | 'moderate' | 'severe';
  currentMedications: string[];
  allergies: string[];
  medicalHistory: string[];
  unavailableMedicine: string;
  preferences: {
    genericPreferred: boolean;
    priceSensitive: boolean;
    deliverySpeed: 'standard' | 'express';
  };
}

export interface Disease {
  name: string;
  symptoms: string[];
  medications: string[];
  precautions: string[];
  diet: string[];
  workout: string[];
  severity: number;
}

export interface Symptom {
  name: string;
  weight: number;
}

export interface Recommendation {
  name: string;
  composition: string;
  confidenceScore: number;
  reliefTime: string;
  effectiveness: number;
  rationale: string;
  disease?: string;
}

export interface Substitution {
  tier: number;
  name: string;
  composition: string;
  price: number;
  type: string;
  bioequivalent: boolean;
}

export interface PurchaseOption {
  platform: string;
  price: number;
  delivery: string;
  rating: number;
  reviews: number;
  offers: string;
  link: string;
  inStock: boolean;
}

export interface SafetyInfo {
  dosage: {
    standard: string;
    maximum: string;
    duration: string;
  };
  warnings: string[];
  contraindications: string[];
}

export interface RecommendationResponse {
  patientProfile: PatientProfile;
  primaryRecommendation: Recommendation;
  substitutions: Substitution[];
  purchaseOptions: PurchaseOption[];
  safetyInfo: SafetyInfo;
  dietaryAdvice: string[];
  lifestyleRecommendations: string[];
  redFlags: string[];
  detectedDiseases: Disease[];
  symptomAnalysis: {
    totalSeverity: number;
    primarySymptoms: string[];
    secondarySymptoms: string[];
  };
}
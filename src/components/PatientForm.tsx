import React, { useState } from 'react';
import { User, Calendar, Weight, Stethoscope, AlertTriangle, Pill, Settings, Loader2 } from 'lucide-react';
import { PatientProfile } from '../types';

interface PatientFormProps {
  onSubmit: (data: PatientProfile) => void;
  loading: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<PatientProfile>({
    age: 25,
    gender: 'male',
    weight: 70,
    symptoms: [],
    symptomDuration: '1-2 days',
    symptomSeverity: 'moderate',
    currentMedications: [],
    allergies: [],
    medicalHistory: [],
    unavailableMedicine: '',
    preferences: {
      genericPreferred: true,
      priceSensitive: false,
      deliverySpeed: 'standard'
    }
  });

  const commonSymptoms = [
    'Fever', 'Headache', 'Body ache', 'Cough', 'Cold', 'Sore throat',
    'Nausea', 'Vomiting', 'Diarrhea', 'Stomach pain', 'Joint pain', 'Fatigue'
  ];

  const commonAllergies = [
    'Penicillin', 'Aspirin', 'Ibuprofen', 'Sulfa drugs', 'Codeine', 'None'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleAllergyToggle = (allergy: string) => {
    if (allergy === 'None') {
      setFormData(prev => ({ ...prev, allergies: ['None'] }));
    } else {
      setFormData(prev => ({
        ...prev,
        allergies: prev.allergies.includes('None')
          ? [allergy]
          : prev.allergies.includes(allergy)
            ? prev.allergies.filter(a => a !== allergy)
            : [...prev.allergies.filter(a => a !== 'None'), allergy]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.symptoms.length === 0 || !formData.unavailableMedicine) {
      alert('Please fill in symptoms and unavailable medicine');
      return;
    }
    onSubmit(formData);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Personalized Recommendation</h2>
          <p className="text-lg text-gray-600">Fill in your details for accurate medicine suggestions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  min="20"
                  max="200"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-red-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Stethoscope className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Current Symptoms</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={formData.symptomDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptomDuration: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="few hours">Few hours</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="more than 1 week">More than 1 week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  value={formData.symptomSeverity}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptomSeverity: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medicine Information */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Pill className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Medicine Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unavailable Medicine <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dolo 650, Crocin, Combiflam"
                value={formData.unavailableMedicine}
                onChange={(e) => setFormData(prev => ({ ...prev, unavailableMedicine: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-yellow-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">Allergies & Safety</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonAllergies.map(allergy => (
                <button
                  key={allergy}
                  type="button"
                  onClick={() => handleAllergyToggle(allergy)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.allergies.includes(allergy)
                      ? 'bg-yellow-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-300'
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-green-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="generic"
                  checked={formData.preferences.genericPreferred}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, genericPreferred: e.target.checked }
                  }))}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="generic" className="text-sm font-medium text-gray-700">
                  Prefer Generic Medicines
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="price"
                  checked={formData.preferences.priceSensitive}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, priceSensitive: e.target.checked }
                  }))}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price Sensitive
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Speed</label>
                <select
                  value={formData.preferences.deliverySpeed}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, deliverySpeed: e.target.value as any }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-5 h-5" />
                  <span>Get AI Recommendation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
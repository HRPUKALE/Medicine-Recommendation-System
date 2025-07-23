import React, { useState, useEffect } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { PatientProfile } from '../types';
import { getAvailableSymptoms } from '../services/medicalDataService';

interface SimpleFormProps {
  onSubmit: (data: PatientProfile) => void;
  loading: boolean;
}

export const SimpleForm: React.FC<SimpleFormProps> = ({ onSubmit, loading }) => {
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

  const [symptomsText, setSymptomsText] = useState('');
  const [allergiesText, setAllergiesText] = useState('');
  const [availableSymptoms, setAvailableSymptoms] = useState<string[]>([]);
  const [showSymptomSuggestions, setShowSymptomSuggestions] = useState(false);
  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>([]);

  // Load available symptoms
  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const symptoms = getAvailableSymptoms();
        setAvailableSymptoms(symptoms);
      } catch (error) {
        console.error('Failed to load symptoms:', error);
      }
    };
    loadSymptoms();
  }, []);

  // Filter symptoms based on input
  useEffect(() => {
    if (symptomsText.trim()) {
      const filtered = availableSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(symptomsText.toLowerCase())
      );
      setFilteredSymptoms(filtered.slice(0, 10)); // Show top 10 matches
      setShowSymptomSuggestions(true);
    } else {
      setShowSymptomSuggestions(false);
    }
  }, [symptomsText, availableSymptoms]);

  const handleSymptomSelect = (symptom: string) => {
    const currentSymptoms = symptomsText.split(',').map(s => s.trim()).filter(s => s);
    if (!currentSymptoms.includes(symptom)) {
      const newSymptoms = [...currentSymptoms, symptom];
      setSymptomsText(newSymptoms.join(', '));
    }
    setShowSymptomSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const symptoms = symptomsText.split(',').map(s => s.trim()).filter(s => s);
    const allergies = allergiesText.split(',').map(a => a.trim()).filter(a => a);
    
    if (symptoms.length === 0 || !formData.unavailableMedicine) {
      alert('Please fill in symptoms and unavailable medicine');
      return;
    }
    
    onSubmit({
      ...formData,
      symptoms,
      allergies
    });
  };

  const removeSymptom = (symptomToRemove: string) => {
    const currentSymptoms = symptomsText.split(',').map(s => s.trim()).filter(s => s);
    const newSymptoms = currentSymptoms.filter(s => s !== symptomToRemove);
    setSymptomsText(newSymptoms.join(', '));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">
            SmartMed AI Assistant
          </h1>
          <p className="text-xl text-slate-400">
            Your AI-Powered Pharmaceutical Guide with Medical Database
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Medicine Not Available */}
          <div>
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Medicine Not Available
            </label>
            <input
              type="text"
              placeholder="e.g., Dolo 650, Paracetamol, Ibuprofen"
              value={formData.unavailableMedicine}
              onChange={(e) => setFormData(prev => ({ ...prev, unavailableMedicine: e.target.value }))}
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-lg"
              required
            />
          </div>

          {/* Symptoms */}
          <div className="relative">
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Symptoms <span className="text-slate-500 text-base">(Type to search from medical database)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Start typing symptoms (e.g., fever, headache, stomach pain)"
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-lg pr-12"
                required
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>

            {/* Symptom Suggestions */}
            {showSymptomSuggestions && filteredSymptoms.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredSymptoms.map((symptom, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSymptomSelect(symptom)}
                    className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 border-b border-slate-700 last:border-b-0 flex items-center justify-between"
                  >
                    <span className="capitalize">{symptom.replace(/_/g, ' ')}</span>
                    <span className="text-slate-500 text-sm">Click to add</span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Symptoms */}
            {symptomsText && (
              <div className="mt-4">
                <label className="block text-cyan-400 text-sm font-medium mb-2">
                  Selected Symptoms:
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomsText.split(',').map((symptom, index) => {
                    const trimmedSymptom = symptom.trim();
                    if (!trimmedSymptom) return null;
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-500 text-white"
                      >
                        {trimmedSymptom.replace(/_/g, ' ')}
                        <button
                          type="button"
                          onClick={() => removeSymptom(trimmedSymptom)}
                          className="ml-2 hover:bg-cyan-600 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Symptom Severity */}
          <div>
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Symptom Severity
            </label>
            <select
              value={formData.symptomSeverity}
              onChange={(e) => setFormData(prev => ({ ...prev, symptomSeverity: e.target.value as 'mild' | 'moderate' | 'severe' }))}
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-lg"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          {/* Symptom Duration */}
          <div>
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Symptom Duration
            </label>
            <select
              value={formData.symptomDuration}
              onChange={(e) => setFormData(prev => ({ ...prev, symptomDuration: e.target.value }))}
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-lg"
            >
              <option value="Less than 1 day">Less than 1 day</option>
              <option value="1-2 days">1-2 days</option>
              <option value="3-7 days">3-7 days</option>
              <option value="1-2 weeks">1-2 weeks</option>
              <option value="More than 2 weeks">More than 2 weeks</option>
            </select>
          </div>

          {/* Known Allergies */}
          <div>
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Known Allergies <span className="text-slate-500 text-base">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Aspirin, Sulfa, Penicillin"
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-lg"
            />
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <label className="block text-cyan-400 text-lg font-medium mb-3">
              Preferences
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.preferences.genericPreferred}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, genericPreferred: e.target.checked }
                  }))}
                  className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-700 rounded focus:ring-cyan-400"
                />
                <span className="text-white">Prefer generic medicines</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.preferences.priceSensitive}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, priceSensitive: e.target.checked }
                  }))}
                  className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-700 rounded focus:ring-cyan-400"
                />
                <span className="text-white">Price sensitive</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-3 bg-cyan-500 hover:bg-cyan-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing with Medical Database...</span>
                </>
              ) : (
                <span>Get Smart Medical Advice</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  ShoppingCart, 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  Pill,
  Clock,
  TrendingUp,
  Activity,
  Brain,
  Heart,
  Thermometer
} from 'lucide-react';
import { RecommendationResponse } from '../types';

interface SimpleResultsProps {
  recommendation: RecommendationResponse;
  onNewConsultation: () => void;
}

export const SimpleResults: React.FC<SimpleResultsProps> = ({ 
  recommendation, 
  onNewConsultation 
}) => {
  const { 
    primaryRecommendation, 
    substitutions, 
    purchaseOptions, 
    safetyInfo, 
    dietaryAdvice,
    lifestyleRecommendations,
    redFlags,
    detectedDiseases,
    symptomAnalysis
  } = recommendation;

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onNewConsultation}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>New Consultation</span>
          </button>
          
          <h1 className="text-2xl font-bold text-cyan-400">SmartMed AI Results</h1>
        </div>

        {/* Medical Analysis Summary */}
        {detectedDiseases.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Medical Analysis</h2>
                <p className="text-slate-400">AI-powered disease detection and symptom analysis</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Detected Diseases */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>Detected Conditions</span>
                </h3>
                <div className="space-y-3">
                  {detectedDiseases.slice(0, 3).map((disease, index) => (
                    <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-cyan-400">{disease.name}</h4>
                        <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                          Match: {Math.round((disease as any).matchScore * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">
                        Symptoms: {disease.symptoms.slice(0, 3).join(', ')}
                        {disease.symptoms.length > 3 && '...'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {disease.medications.slice(0, 2).map((med, medIndex) => (
                          <span key={medIndex} className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptom Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  <span>Symptom Analysis</span>
                </h3>
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Total Severity Score:</span>
                    <span className="text-xl font-bold text-red-400">{symptomAnalysis.totalSeverity}</span>
                  </div>
                  
                  {symptomAnalysis.primarySymptoms.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Primary Symptoms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {symptomAnalysis.primarySymptoms.map((symptom, index) => (
                          <span key={index} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                            {symptom.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {symptomAnalysis.secondarySymptoms.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Secondary Symptoms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {symptomAnalysis.secondarySymptoms.map((symptom, index) => (
                          <span key={index} className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
                            {symptom.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Primary Recommendation */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Primary Recommendation</h2>
              <p className="text-slate-400">AI confidence: {primaryRecommendation.confidenceScore}%</p>
              {primaryRecommendation.disease && (
                <p className="text-cyan-400 text-sm">Recommended for: {primaryRecommendation.disease}</p>
              )}
            </div>
          </div>

          {/* Medicine Suggestions in Line Format */}
          <div className="space-y-4">
            {/* Primary Medicine */}
            <div className="bg-slate-700 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400">{primaryRecommendation.name}</h3>
                    <p className="text-slate-400 text-sm">{primaryRecommendation.composition}</p>
                  </div>
                </div>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  Primary Choice
                </span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Rationale:</h4>
                  <p className="text-slate-300 text-sm">{primaryRecommendation.rationale}</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Effectiveness:</h4>
                  <p className="text-cyan-400 text-sm font-semibold">{primaryRecommendation.effectiveness}%</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Relief Time:</h4>
                  <p className="text-cyan-400 text-sm font-semibold">{primaryRecommendation.reliefTime}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {purchaseOptions.slice(0, 3).map((option, index) => (
                  <a 
                    key={index}
                    href={option.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy on {option.platform} - ₹{option.price}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Substitutions */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Pill className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Safe Substitutions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {substitutions.map((sub, index) => (
              <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                      <Pill className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                      <p className="text-slate-400 text-sm">{sub.composition}</p>
                    </div>
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                    Tier {sub.tier}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-white font-medium mb-1 text-sm">Type:</h4>
                    <p className="text-slate-300 text-xs">{sub.type}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 text-sm">Bioequivalent:</h4>
                    <p className="text-slate-300 text-xs">{sub.bioequivalent ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-400">₹{sub.price}</span>
                    {sub.bioequivalent && (
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                        Bioequivalent
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={`https://www.1mg.com/search/all?name=${encodeURIComponent(sub.name.toLowerCase())}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>1mg</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={`https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(sub.name.toLowerCase())}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>NetMeds</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={`https://pharmeasy.in/search/all?name=${encodeURIComponent(sub.name.toLowerCase())}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>PharmEasy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Options */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Purchase Options</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {purchaseOptions.map((option, index) => (
              <div key={index} className="bg-slate-700 border border-slate-600 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{option.platform}</h3>
                      <p className="text-sm text-slate-400">{option.delivery} delivery</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-400">₹{option.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-slate-400">{option.rating} ({option.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-green-400 font-medium mb-2">{option.offers}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${option.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${option.inStock ? 'text-green-400' : 'text-red-400'}`}>
                      {option.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!option.inStock}
                  onClick={() => window.open(option.link, '_blank')}
                >
                  <span>Buy Now</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Safety Information */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Safety Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Dosage Guidelines</h3>
                <div className="bg-slate-700 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-slate-300"><strong className="text-white">Standard:</strong> {safetyInfo.dosage.standard}</p>
                  <p className="text-sm text-slate-300"><strong className="text-white">Maximum:</strong> {safetyInfo.dosage.maximum}</p>
                  <p className="text-sm text-slate-300"><strong className="text-white">Duration:</strong> {safetyInfo.dosage.duration}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-3">Important Warnings</h3>
                <ul className="space-y-2">
                  {safetyInfo.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Contraindications</h3>
                <ul className="space-y-2">
                  {safetyInfo.contraindications.map((contraindication, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-slate-300">{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Dietary & Lifestyle */}
          <div className="space-y-8">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Dietary Advice</h2>
              <ul className="space-y-3">
                {dietaryAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-300">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Lifestyle Tips</h2>
              <ul className="space-y-3">
                {lifestyleRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-red-400">When to Seek Immediate Medical Care</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="flex items-center space-x-3 bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-white">{flag}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-red-900/30 rounded-lg border border-red-800">
            <p className="text-sm text-red-200 font-medium">
              🚨 <strong>Important:</strong> This AI guidance supplements but never replaces professional medical advice. 
              For persistent, severe, or unusual symptoms, consult a qualified healthcare provider immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
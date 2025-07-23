import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  ShoppingCart, 
  Shield, 
  AlertTriangle, 
  Heart,
  Clock,
  TrendingUp,
  ExternalLink,
  Download,
  Utensils,
  Activity
} from 'lucide-react';
import { RecommendationResponse } from '../types';

interface RecommendationResultsProps {
  recommendation: RecommendationResponse;
  onNewConsultation: () => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({ 
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
    redFlags 
  } = recommendation;

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierLabel = (tier: number) => {
    switch (tier) {
      case 1: return 'Exact Equivalent';
      case 2: return 'Therapeutic Alternative';
      default: return 'Alternative Option';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onNewConsultation}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>New Consultation</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Primary Recommendation */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Primary Recommendation</h2>
              <p className="text-gray-600">AI-powered analysis with {primaryRecommendation.confidenceScore}% confidence</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{primaryRecommendation.name}</h3>
              <p className="text-gray-600 mb-4">{primaryRecommendation.composition}</p>
              <p className="text-sm text-gray-700 mb-6">{primaryRecommendation.rationale}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Relief Time</span>
                  </div>
                  <p className="text-blue-700 font-semibold">{primaryRecommendation.reliefTime}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Effectiveness</span>
                  </div>
                  <p className="text-green-700 font-semibold">{primaryRecommendation.effectiveness}%</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Confidence Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Symptom Match</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Safety Profile</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-17 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Availability</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Substitutions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Safe Substitutions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {substitutions.map((sub, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{sub.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(sub.tier)}`}>
                    Tier {sub.tier}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{sub.composition}</p>
                <p className="text-gray-700 text-sm mb-4">{getTierLabel(sub.tier)}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">₹{sub.price}</span>
                    {sub.bioequivalent && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Bioequivalent
                      </span>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Options */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Purchase Options</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {purchaseOptions.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.platform}</h3>
                      <p className="text-sm text-gray-600">{option.delivery} delivery</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">₹{option.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{option.rating} ({option.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-green-600 font-medium mb-2">{option.offers}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${option.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${option.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {option.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  disabled={!option.inStock}
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
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Safety Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Dosage Guidelines</h3>
                <div className="bg-red-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm"><strong>Standard:</strong> {safetyInfo.dosage.standard}</p>
                  <p className="text-sm"><strong>Maximum:</strong> {safetyInfo.dosage.maximum}</p>
                  <p className="text-sm"><strong>Duration:</strong> {safetyInfo.dosage.duration}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Important Warnings</h3>
                <ul className="space-y-2">
                  {safetyInfo.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contraindications</h3>
                <ul className="space-y-2">
                  {safetyInfo.contraindications.map((contra, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lifestyle & Diet */}
          <div className="space-y-8">
            {/* Dietary Advice */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Dietary Advice</h2>
              </div>
              
              <ul className="space-y-3">
                {dietaryAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Lifestyle Tips</h2>
              </div>
              
              <ul className="space-y-3">
                {lifestyleRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Heart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">When to Seek Immediate Medical Care</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-900">{flag}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-red-100 rounded-lg">
            <p className="text-sm text-red-800 font-medium">
              🚨 <strong>Important:</strong> This AI guidance supplements but never replaces professional medical advice. 
              For persistent, severe, or unusual symptoms, consult a qualified healthcare provider immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
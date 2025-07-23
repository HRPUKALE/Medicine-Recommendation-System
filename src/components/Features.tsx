import React from 'react';
import { 
  Brain, 
  Shield, 
  ShoppingCart, 
  Heart, 
  Zap, 
  Users, 
  Clock, 
  Award,
  CheckCircle,
  Star
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced symptom correlation with 95% accuracy using machine learning algorithms',
      color: 'blue',
      stats: '95% Accuracy'
    },
    {
      icon: Shield,
      title: 'Safety First Protocol',
      description: 'Comprehensive drug interaction checking and allergy-aware recommendations',
      color: 'green',
      stats: '100% Safe'
    },
    {
      icon: ShoppingCart,
      title: 'Instant Purchase Links',
      description: 'Direct integration with trusted pharmacies for immediate medicine ordering',
      color: 'purple',
      stats: '5+ Pharmacies'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored recommendations based on age, gender, weight, and medical history',
      color: 'red',
      stats: 'Personalized'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive medicine recommendations in under 30 seconds',
      color: 'yellow',
      stats: '<30 Seconds'
    },
    {
      icon: Users,
      title: 'Expert Validated',
      description: 'All recommendations reviewed by certified pharmacists and medical professionals',
      color: 'indigo',
      stats: 'Expert Approved'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const stats = [
    { label: 'Successful Recommendations', value: '50,000+', icon: CheckCircle },
    { label: 'User Satisfaction', value: '98.5%', icon: Star },
    { label: 'Response Time', value: '<30s', icon: Clock },
    { label: 'Safety Score', value: '100%', icon: Shield }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Advanced Medical AI Technology</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Choose SmartMed AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our comprehensive AI-powered medicine recommendation system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getColorClasses(feature.color)}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-600 border">
                  {feature.stats}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Advanced Capabilities</h3>
            <p className="text-lg text-gray-600">Comprehensive healthcare intelligence at your fingertips</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Symptom Analysis</h4>
              <p className="text-sm text-gray-600">Correlate complex symptom combinations</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Drug Interaction Check</h4>
              <p className="text-sm text-gray-600">Cross-reference with current medications</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Age-Specific Dosing</h4>
              <p className="text-sm text-gray-600">Pediatric, adult, and geriatric considerations</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600">Latest medical guidelines and drug information</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Heart, Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SmartMed AI</h3>
                <p className="text-sm text-gray-400">Intelligent Healthcare</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Advanced AI-powered medicine recommendation system providing safe, personalized healthcare guidance.
            </p>
            <div className="flex items-center space-x-2 text-green-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Medically Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#safety" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Medical Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Medical Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Drug Database</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Interaction Checker</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Dosage Calculator</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Medical Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">support@smartmed.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">Healthcare Innovation Hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Pharmacies */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <h4 className="text-lg font-semibold mb-6 text-center">Trusted Pharmacy Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-gray-900 font-semibold">1mg</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-gray-900 font-semibold">NetMeds</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-gray-900 font-semibold">PharmEasy</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-gray-900 font-semibold">Apollo Pharmacy</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-gray-900 font-semibold">MedPlus</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SmartMed AI. All rights reserved. | Medical AI Technology
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Medical Disclaimer</a>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-red-200 text-sm text-center">
              <strong>Medical Disclaimer:</strong> SmartMed AI provides educational information only. 
              Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment. 
              This service does not replace professional medical consultation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
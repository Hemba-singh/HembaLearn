import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  UserIcon, 
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Header from './Header';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 15l7-7 7 7" 
    />
  </svg>
);

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

const TermsSection: React.FC<TermsSectionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      className="mb-6 border border-gray-200 rounded-lg overflow-hidden"
      aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`section-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isExpanded ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
      </button>
      
      <div 
        id={`section-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`p-4 ${isExpanded ? 'block' : 'hidden'}`}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </section>
  );
};

const TermsOfService: React.FC = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  return (
    <>
      <Header />
      <div className="terms-of-service container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">Terms of Service</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <TermsSection title="1. Acceptance of Terms">
            <p className="text-gray-700">
              By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement. 
              These terms constitute a legally binding contract between you and HembaLearn.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>You must be at least 13 years old to use our service</li>
              <li>You agree to provide accurate and current information</li>
              <li>You understand that these terms may change periodically</li>
            </ul>
          </TermsSection>

          <TermsSection title="2. User Responsibilities">
            <p className="text-gray-700">
              As a user of HembaLearn, you are responsible for maintaining the confidentiality of your account 
              and for all activities that occur under your account.
            </p>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h3 className="font-semibold text-yellow-700">Important Obligations:</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Protect your login credentials</li>
                <li>Immediately notify us of any unauthorized use</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </TermsSection>

          <TermsSection title="3. Intellectual Property Rights">
            <p className="text-gray-700">
              All content on HembaLearn, including but not limited to text, graphics, logos, and software, 
              is the property of HembaLearn and protected by intellectual property laws.
            </p>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3">
              <h3 className="font-semibold text-blue-700">Content Usage:</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>You may not reproduce, distribute, or create derivative works</li>
                <li>Educational content is for personal use only</li>
                <li>Commercial use requires explicit written permission</li>
              </ul>
            </div>
          </TermsSection>

          <TermsSection title="4. Limitation of Liability">
            <p className="text-gray-700">
              HembaLearn provides services "as is" and disclaims all warranties to the extent permitted by law.
            </p>
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3">
              <h3 className="font-semibold text-red-700">Disclaimer:</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>We are not liable for any direct, indirect, or consequential damages</li>
                <li>Service availability is not guaranteed</li>
                <li>User content and interactions are the sole responsibility of users</li>
              </ul>
            </div>
          </TermsSection>

          <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="accept-terms" 
                checked={acceptTerms}
                onChange={handleAcceptTerms}
                className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="text-gray-700">
                I have read, understood, and agree to the Terms of Service
              </label>
            </div>
            {acceptTerms && (
              <p className="mt-4 text-green-600 flex items-center">
                ✓ Terms Accepted
              </p>
            )}
          </div>

          <div className="mt-8 text-center text-gray-500">
            <p>
              Questions about our Terms of Service? 
              <a 
                href="/contact" 
                className="ml-2 text-primary hover:underline"
              >
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;

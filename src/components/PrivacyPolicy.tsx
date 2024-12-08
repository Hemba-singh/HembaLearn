import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Globe, Database } from 'lucide-react';
import Header from './Header';

interface AccordionSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`${title.replace(/\s+/g, '-').toLowerCase()}-content`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-primary-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div 
          id={`${title.replace(/\s+/g, '-').toLowerCase()}-content`}
          className="p-4 bg-white"
          aria-labelledby={title}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const PrivacyPolicy: React.FC = () => {
  const [consentPreferences, setConsentPreferences] = useState({
    analytics: false,
    marketing: false,
    personalizedAds: false,
  });

  const handleConsentChange = (key: keyof typeof consentPreferences) => {
    setConsentPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <Header />
      <div className="privacy-policy container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At HembaLearn, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <AccordionSection title="Information Collection" icon={Database}>
            <div className="space-y-4">
              <p className="text-gray-700">
                We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personal information provided during account creation</li>
                <li>Course enrollment and learning progress data</li>
                <li>Payment and transaction information</li>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-4">
                <p className="text-blue-800">
                  <strong>Note:</strong> We only collect information necessary to provide and improve our educational services.
                </p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Data Usage" icon={Globe}>
            <div className="space-y-4">
              <p className="text-gray-700">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personalize your learning experience</li>
                <li>Process payments and manage subscriptions</li>
                <li>Communicate important updates and notifications</li>
                <li>Improve our platform and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mt-4">
                <p className="text-green-800">
                  <strong>Transparency:</strong> We are committed to being clear about how we use your data.
                </p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Data Protection" icon={Lock}>
            <div className="space-y-4">
              <p className="text-gray-700">
                We implement robust security measures:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Compliance with international data protection standards</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4">
                <p className="text-red-800">
                  <strong>Security Warning:</strong> While we take extensive precautions, no online system is 100% secure.
                </p>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection title="Your Rights" icon={Shield}>
            <div className="space-y-4">
              <p className="text-gray-700">
                You have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to request data deletion</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to restrict or object to data processing</li>
                <li>Right to data portability</li>
              </ul>
              <p className="mt-4 text-gray-700">
                To exercise these rights, please contact our Data Protection Officer at{' '}
                <a 
                  href="mailto:privacy@hembalearn.com" 
                  className="text-primary-600 hover:underline"
                >
                  privacy@hembalearn.com
                </a>
              </p>
            </div>
          </AccordionSection>
        </div>

        <section className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Consent Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="analytics-consent" className="text-gray-700">
                Allow Anonymous Analytics
              </label>
              <input
                type="checkbox"
                id="analytics-consent"
                checked={consentPreferences.analytics}
                onChange={() => handleConsentChange('analytics')}
                className="form-checkbox h-5 w-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="marketing-consent" className="text-gray-700">
                Receive Marketing Communications
              </label>
              <input
                type="checkbox"
                id="marketing-consent"
                checked={consentPreferences.marketing}
                onChange={() => handleConsentChange('marketing')}
                className="form-checkbox h-5 w-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="ads-consent" className="text-gray-700">
                Personalized Advertising
              </label>
              <input
                type="checkbox"
                id="ads-consent"
                checked={consentPreferences.personalizedAds}
                onChange={() => handleConsentChange('personalizedAds')}
                className="form-checkbox h-5 w-5 text-primary-600"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            You can update these preferences at any time in your account settings.
          </p>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {new Date().getFullYear()} HembaLearn. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;

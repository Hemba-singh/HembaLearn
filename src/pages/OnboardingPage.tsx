import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2 
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  fields: Array<{
    name: string;
    type: 'select' | 'input' | 'multiselect';
    label: string;
    options?: string[];
    required?: boolean;
  }>;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Predefined onboarding steps
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Learning Goals',
      description: 'Tell us about your learning objectives',
      icon: Target,
      fields: [
        {
          name: 'learning_goals',
          type: 'multiselect',
          label: 'What are your primary learning goals?',
          options: [
            'Career Advancement',
            'Skill Development',
            'Personal Interest',
            'Academic Preparation',
            'Professional Certification'
          ],
          required: true
        }
      ]
    },
    {
      id: 1,
      title: 'Professional Background',
      description: 'Share your professional details',
      icon: Briefcase,
      fields: [
        {
          name: 'occupation',
          type: 'input',
          label: 'Current Occupation',
          required: true
        },
        {
          name: 'industry',
          type: 'select',
          label: 'Industry',
          options: [
            'Technology',
            'Finance',
            'Healthcare',
            'Education',
            'Marketing',
            'Other'
          ],
          required: true
        }
      ]
    },
    {
      id: 2,
      title: 'Location & Preferences',
      description: 'Help us personalize your experience',
      icon: MapPin,
      fields: [
        {
          name: 'country',
          type: 'input',
          label: 'Country',
          required: true
        },
        {
          name: 'preferred_learning_mode',
          type: 'select',
          label: 'Preferred Learning Mode',
          options: [
            'Online Self-Paced',
            'Live Online Classes',
            'Hybrid',
            'In-Person'
          ],
          required: true
        }
      ]
    }
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous errors for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const currentStepData = onboardingSteps[currentStep];
    const newErrors: Record<string, string> = {};

    currentStepData.fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].length === 0)) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        completeOnboarding();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      // Combine all form data
      const onboardingData = {
        ...formData,
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString()
      };

      // Update user profile in Supabase
      const { error } = await supabase
        .from('users')
        .update(onboardingData)
        .eq('email', user?.email);

      if (error) throw error;

      // Update local user state
      setUser({
        ...user,
        user_metadata: {
          ...user?.user_metadata,
          ...onboardingData
        }
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding completion error:', error);
      alert('Failed to complete onboarding. Please try again.');
    }
  };

  const renderStepFields = () => {
    const step = onboardingSteps[currentStep];
    return step.fields.map(field => {
      switch (field.type) {
        case 'input':
          return (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type="text"
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors[field.name] 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          );
        
        case 'select':
          return (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors[field.name] 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          );
        
        case 'multiselect':
          return (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {field.options?.map(option => (
                  <label 
                    key={option} 
                    className="inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={(formData[field.name] || []).includes(option)}
                      onChange={(e) => {
                        const currentValues = formData[field.name] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option);
                        handleInputChange(field.name, newValues);
                      }}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          );
      }
    });
  };

  // Prevent access if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const CurrentStepIcon = onboardingSteps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <CurrentStepIcon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              {onboardingSteps[currentStep].title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {onboardingSteps[currentStep].description}
            </p>
          </div>

          <div className="space-y-6">
            {renderStepFields()}
          </div>

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handlePreviousStep}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous
              </button>
            )}

            <button
              onClick={handleNextStep}
              className="flex items-center ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {currentStep < onboardingSteps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Complete Onboarding
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

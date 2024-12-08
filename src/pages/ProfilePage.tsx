import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Briefcase, 
  Award, 
  Shield, 
  Link as LinkIcon 
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

// Import custom profile management components
import { SkillsManager } from '../components/profile/SkillsManager';
import { PortfolioManager } from '../components/profile/PortfolioManager';
import { CertificationTracker } from '../components/profile/CertificationTracker';
import { ProfessionalLinksManager } from '../components/profile/ProfessionalLinksManager';
import { PrivacySettingsManager } from '../components/profile/PrivacySettingsManager';
import Header from '../components/Header';

// Profile Sections Enum
enum ProfileSection {
  BasicInfo = 'Basic Info',
  Skills = 'Skills',
  Portfolio = 'Portfolio',
  Certifications = 'Certifications',
  ProfessionalLinks = 'Professional Links',
  Privacy = 'Privacy Settings'
}

// Validation interface
interface ProfileValidation {
  [key: string]: {
    isValid: boolean;
    errorMessage?: string;
  };
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState<ProfileSection>(ProfileSection.BasicInfo);
  const [profileData, setProfileData] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<ProfileValidation>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  // Server-side validation function
  const validateProfile = async (section: ProfileSection) => {
    if (!user) return false;

    let sectionValidation: ProfileValidation = {};

    switch (section) {
      case ProfileSection.BasicInfo:
        sectionValidation = {
          name: {
            isValid: !!profileData.name && profileData.name.trim().length > 2,
            errorMessage: 'Name must be at least 3 characters long'
          },
          email: {
            isValid: !!profileData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email),
            errorMessage: 'Invalid email address'
          }
        };
        break;

      case ProfileSection.Skills:
        sectionValidation = {
          skills: {
            isValid: profileData.skills && 
                     Object.values(profileData.skills).some(
                       (skillList: any) => skillList.length > 0
                     ),
            errorMessage: 'Please add at least one skill'
          }
        };
        break;

      case ProfileSection.Certifications:
        sectionValidation = {
          certifications: {
            isValid: profileData.certifications && profileData.certifications.length > 0,
            errorMessage: 'Add at least one certification'
          }
        };
        break;

      // Add more section-specific validations
    }

    // Update validation state
    setValidationErrors(sectionValidation);

    // Check if all validations pass
    return Object.values(sectionValidation).every(validation => validation.isValid);
  };

  // Save profile section
  const saveProfileSection = async (section: ProfileSection) => {
    if (!user) return;

    // Validate the current section
    const isValid = await validateProfile(section);
    if (!isValid) {
      alert('Please fix validation errors before saving');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profileData
        }, { 
          onConflict: 'user_id' 
        });

      if (error) throw error;

      alert(`${section} updated successfully!`);
    } catch (error) {
      console.error(`Error saving ${section}:`, error);
      alert(`Failed to save ${section}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case ProfileSection.Skills:
        return <SkillsManager />;
      case ProfileSection.Portfolio:
        return <PortfolioManager />;
      case ProfileSection.Certifications:
        return <CertificationTracker />;
      case ProfileSection.ProfessionalLinks:
        return <ProfessionalLinksManager />;
      case ProfileSection.Privacy:
        return <PrivacySettingsManager />;
      default:
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Basic Profile Information
            </h2>
            {/* Basic Info Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name || ''}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    validationErrors.name?.isValid === false 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {validationErrors.name?.errorMessage && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.name.errorMessage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email || ''}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev, 
                    email: e.target.value
                  }))}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    validationErrors.email?.isValid === false 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {validationErrors.email?.errorMessage && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.email.errorMessage}
                  </p>
                )}
              </div>

              <button
                onClick={() => saveProfileSection(ProfileSection.BasicInfo)}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Basic Info'}
              </button>
            </div>
          </div>
        );
    }
  };

  // Profile section navigation
  const renderSectionNavigation = () => {
    const sections = [
      { 
        section: ProfileSection.BasicInfo, 
        icon: User 
      },
      { 
        section: ProfileSection.Skills, 
        icon: Award 
      },
      { 
        section: ProfileSection.Portfolio, 
        icon: Briefcase 
      },
      { 
        section: ProfileSection.Certifications, 
        icon: Award 
      },
      { 
        section: ProfileSection.ProfessionalLinks, 
        icon: LinkIcon 
      },
      { 
        section: ProfileSection.Privacy, 
        icon: Shield 
      }
    ];

    return (
      <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
        {sections.map(({ section, icon: Icon }) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`w-full flex items-center p-3 rounded-md transition ${
              activeSection === section 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Icon className="mr-3 h-5 w-5" />
            {section}
          </button>
        ))}
      </div>
    );
  };

  // Main render
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Profile Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1">
            {renderSectionNavigation()}
          </div>

          {/* Active Section Content */}
          <div className="md:col-span-3">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </>
  );
}

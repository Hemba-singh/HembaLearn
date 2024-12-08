import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Bell, 
  Mail 
} from 'lucide-react';

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'selective';
  contactPreferences: {
    allowDirectMessages: boolean;
    showEmailPublicly: boolean;
  };
  activityTracking: {
    shareRecentActivity: boolean;
    showLearningProgress: boolean;
  };
  dataSharing: {
    allowRecommendations: boolean;
    shareProfileWithEmployers: boolean;
  };
}

export function PrivacySettingsManager() {
  const { user } = useAuthStore();
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    contactPreferences: {
      allowDirectMessages: true,
      showEmailPublicly: false
    },
    activityTracking: {
      shareRecentActivity: true,
      showLearningProgress: true
    },
    dataSharing: {
      allowRecommendations: true,
      shareProfileWithEmployers: false
    }
  });

  // Fetch existing privacy settings
  useEffect(() => {
    const fetchPrivacySettings = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('privacy_settings')
        .eq('user_id', user.id)
        .single();

      if (data?.privacy_settings) {
        setPrivacySettings(data.privacy_settings);
      }
    };

    fetchPrivacySettings();
  }, [user]);

  // Save privacy settings to database
  const savePrivacySettings = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        privacy_settings: privacySettings
      }, { 
        onConflict: 'user_id' 
      });

    if (error) {
      console.error('Error saving privacy settings:', error);
      alert('Failed to save privacy settings');
    } else {
      alert('Privacy settings updated successfully!');
    }
  };

  // Render toggle switch
  const renderToggleSwitch = (
    label: string, 
    description: string, 
    checked: boolean, 
    onChange: (checked: boolean) => void,
    icon: React.ElementType
  ) => {
    const Icon = icon;
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-4">
        <div className="flex items-center space-x-4">
          <Icon className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
            rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
            ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <span
            className={`${
              checked ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full 
            bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Lock className="mr-3 h-6 w-6 text-blue-500" />
        Privacy & Visibility
      </h2>

      {/* Profile Visibility */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Eye className="mr-2 h-5 w-5 text-blue-500" />
          Profile Visibility
        </h3>
        <div className="space-y-2">
          {['public', 'private', 'selective'].map((visibility) => (
            <label 
              key={visibility} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="profileVisibility"
                value={visibility}
                checked={privacySettings.profileVisibility === visibility}
                onChange={() => setPrivacySettings(prev => ({
                  ...prev,
                  profileVisibility: visibility as 'public' | 'private' | 'selective'
                }))}
                className="form-radio"
              />
              <span className="capitalize">{visibility}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Mail className="mr-2 h-5 w-5 text-blue-500" />
          Contact Preferences
        </h3>
        {renderToggleSwitch(
          'Direct Messages', 
          'Allow other users to send you direct messages', 
          privacySettings.contactPreferences.allowDirectMessages,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            contactPreferences: {
              ...prev.contactPreferences,
              allowDirectMessages: checked
            }
          })),
          Bell
        )}
        {renderToggleSwitch(
          'Public Email', 
          'Show your email address on your public profile', 
          privacySettings.contactPreferences.showEmailPublicly,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            contactPreferences: {
              ...prev.contactPreferences,
              showEmailPublicly: checked
            }
          })),
          EyeOff
        )}
      </div>

      {/* Activity Tracking */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-blue-500" />
          Activity & Progress
        </h3>
        {renderToggleSwitch(
          'Recent Activity', 
          'Share your recent learning activities with connections', 
          privacySettings.activityTracking.shareRecentActivity,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            activityTracking: {
              ...prev.activityTracking,
              shareRecentActivity: checked
            }
          })),
          Bell
        )}
        {renderToggleSwitch(
          'Learning Progress', 
          'Display your course completion and skill progress', 
          privacySettings.activityTracking.showLearningProgress,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            activityTracking: {
              ...prev.activityTracking,
              showLearningProgress: checked
            }
          })),
          Eye
        )}
      </div>

      {/* Data Sharing */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-blue-500" />
          Data Sharing
        </h3>
        {renderToggleSwitch(
          'Personalized Recommendations', 
          'Allow platform to suggest courses based on your profile', 
          privacySettings.dataSharing.allowRecommendations,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            dataSharing: {
              ...prev.dataSharing,
              allowRecommendations: checked
            }
          })),
          Bell
        )}
        {renderToggleSwitch(
          'Employer Profile Sharing', 
          'Allow potential employers to view your profile', 
          privacySettings.dataSharing.shareProfileWithEmployers,
          (checked) => setPrivacySettings(prev => ({
            ...prev,
            dataSharing: {
              ...prev.dataSharing,
              shareProfileWithEmployers: checked
            }
          })),
          EyeOff
        )}
      </div>

      {/* Save Button */}
      <button 
        onClick={savePrivacySettings}
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
      >
        <Lock className="mr-2 h-5 w-5" />
        Save Privacy Settings
      </button>
    </div>
  );
}

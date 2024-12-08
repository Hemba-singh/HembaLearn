import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LinkedinIcon, 
  GithubIcon, 
  TwitterIcon, 
  GlobeIcon, 
  LinkIcon, 
  Edit2Icon 
} from 'lucide-react';

interface ProfessionalLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  personalWebsite?: string;
}

export function ProfessionalLinksManager() {
  const { user } = useAuthStore();
  const [links, setLinks] = useState<ProfessionalLinks>({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing links
  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('professional_links')
        .eq('user_id', user.id)
        .single();

      if (data?.professional_links) {
        setLinks(data.professional_links);
      }
    };

    fetchLinks();
  }, [user]);

  // Save links to database
  const saveLinks = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        professional_links: links
      }, { 
        onConflict: 'user_id' 
      });

    if (error) {
      console.error('Error saving links:', error);
      alert('Failed to save professional links');
    } else {
      alert('Professional links updated successfully!');
      setIsEditing(false);
    }
  };

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Render link input
  const renderLinkInput = (
    platform: keyof ProfessionalLinks, 
    icon: React.ElementType
  ) => {
    const Icon = icon;
    return (
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Icon className="mr-2 h-5 w-5" />
          {platform.charAt(0).toUpperCase() + platform.slice(1)} Profile URL
        </label>
        <input
          type="url"
          value={links[platform] || ''}
          onChange={(e) => setLinks(prev => ({
            ...prev, 
            [platform]: e.target.value
          }))}
          className={`w-full p-2 border rounded-md ${
            links[platform] && !isValidUrl(links[platform]) 
              ? 'border-red-500' 
              : 'border-gray-300'
          }`}
          placeholder={`https://${platform}.com/username`}
        />
        {links[platform] && !isValidUrl(links[platform]) && (
          <p className="text-red-500 text-xs mt-1">
            Please enter a valid URL
          </p>
        )}
      </div>
    );
  };

  // Render link display
  const renderLinkDisplay = (
    platform: keyof ProfessionalLinks, 
    icon: React.ElementType
  ) => {
    const Icon = icon;
    if (!links[platform]) return null;

    return (
      <a 
        href={links[platform]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center text-gray-600 hover:text-blue-600 mb-2"
      >
        <Icon className="mr-2 h-5 w-5" />
        {links[platform]}
      </a>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <LinkIcon className="mr-3 h-6 w-6 text-blue-500" />
          Professional Links
        </h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
        >
          <Edit2Icon className="h-5 w-5" />
        </button>
      </div>

      {isEditing ? (
        <div>
          {renderLinkInput('linkedin', LinkedinIcon)}
          {renderLinkInput('github', GithubIcon)}
          {renderLinkInput('twitter', TwitterIcon)}
          {renderLinkInput('personalWebsite', GlobeIcon)}

          <div className="flex space-x-2 mt-4">
            <button 
              onClick={saveLinks}
              className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Links
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {renderLinkDisplay('linkedin', LinkedinIcon)}
          {renderLinkDisplay('github', GithubIcon)}
          {renderLinkDisplay('twitter', TwitterIcon)}
          {renderLinkDisplay('personalWebsite', GlobeIcon)}

          {Object.values(links).every(link => !link) && (
            <p className="text-gray-500 text-sm">
              No professional links added yet
            </p>
          )}
        </div>
      )}
    </div>
  );
}

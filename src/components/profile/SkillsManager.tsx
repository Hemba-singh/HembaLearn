import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Plus, 
  Trash2, 
  Award, 
  Code, 
  Globe, 
  Star, 
  Check, 
  X 
} from 'lucide-react';

// Predefined skill categories and skills
const SKILL_CATEGORIES = {
  technical: [
    'Programming Languages',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Data Science',
    'Artificial Intelligence',
    'Cybersecurity'
  ],
  soft: [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Leadership',
    'Creativity',
    'Time Management',
    'Adaptability'
  ],
  languages: [
    'English', 'Spanish', 'Mandarin', 'French', 'German', 
    'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Japanese'
  ]
};

// Skill proficiency levels
const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'text-yellow-500' },
  { value: 'intermediate', label: 'Intermediate', color: 'text-blue-500' },
  { value: 'advanced', label: 'Advanced', color: 'text-green-500' },
  { value: 'expert', label: 'Expert', color: 'text-purple-500' }
];

export function SkillsManager() {
  const { user } = useAuthStore();
  const [skills, setSkills] = useState({
    technical: [] as Array<{name: string, proficiency: string}>,
    soft: [] as Array<{name: string, proficiency: string}>,
    languages: [] as Array<{name: string, proficiency: string}>
  });
  const [newSkill, setNewSkill] = useState({
    category: 'technical',
    name: '',
    proficiency: 'beginner'
  });
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  // Fetch existing skills on component mount
  useEffect(() => {
    const fetchUserSkills = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('skills')
        .eq('user_id', user.id)
        .single();

      if (data?.skills) {
        setSkills(data.skills);
      }
    };

    fetchUserSkills();
  }, [user]);

  // Save skills to database
  const saveSkills = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        skills: skills
      }, { 
        onConflict: 'user_id' 
      });

    if (error) {
      console.error('Error saving skills:', error);
      alert('Failed to save skills');
    } else {
      alert('Skills updated successfully!');
    }
  };

  // Add new skill
  const handleAddSkill = () => {
    if (!newSkill.name) return;

    const isDuplicate = skills[newSkill.category as keyof typeof skills]
      .some(skill => skill.name.toLowerCase() === newSkill.name.toLowerCase());

    if (isDuplicate) {
      alert('This skill already exists in the selected category');
      return;
    }

    setSkills(prev => ({
      ...prev,
      [newSkill.category]: [
        ...prev[newSkill.category as keyof typeof skills],
        { 
          name: newSkill.name, 
          proficiency: newSkill.proficiency 
        }
      ]
    }));

    // Reset new skill form
    setNewSkill({
      category: 'technical',
      name: '',
      proficiency: 'beginner'
    });
    setIsAddingSkill(false);
  };

  // Remove skill
  const removeSkill = (category: string, skillName: string) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof skills]
        .filter(skill => skill.name !== skillName)
    }));
  };

  // Render skill list
  const renderSkillList = (category: string) => {
    const categorySkills = skills[category as keyof typeof skills] || [];
    
    return (
      <div className="space-y-2">
        {categorySkills.map((skill, index) => {
          const proficiencyInfo = PROFICIENCY_LEVELS
            .find(level => level.value === skill.proficiency);
          
          return (
            <div 
              key={index} 
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
            >
              <div className="flex items-center space-x-2">
                {category === 'technical' && <Code className="h-5 w-5 text-blue-500" />}
                {category === 'soft' && <Star className="h-5 w-5 text-yellow-500" />}
                {category === 'languages' && <Globe className="h-5 w-5 text-green-500" />}
                
                <span className="font-medium">{skill.name}</span>
                
                {proficiencyInfo && (
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${proficiencyInfo.color} bg-opacity-20`}
                  >
                    {proficiencyInfo.label}
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => removeSkill(category, skill.name)}
                className="text-red-500 hover:bg-red-100 p-1 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // Filtered skill options for dropdown
  const availableSkills = useMemo(() => {
    const currentSkills = skills[newSkill.category as keyof typeof skills]
      .map(skill => skill.name.toLowerCase());
    
    return SKILL_CATEGORIES[newSkill.category as keyof typeof SKILL_CATEGORIES]
      .filter(skill => !currentSkills.includes(skill.toLowerCase()));
  }, [newSkill.category, skills]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Award className="mr-3 h-6 w-6 text-blue-500" />
        Skills Profile
      </h2>

      {/* Technical Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Code className="mr-2 h-5 w-5 text-blue-500" />
          Technical Skills
        </h3>
        {renderSkillList('technical')}
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-500" />
          Soft Skills
        </h3>
        {renderSkillList('soft')}
      </div>

      {/* Language Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Globe className="mr-2 h-5 w-5 text-green-500" />
          Language Skills
        </h3>
        {renderSkillList('languages')}
      </div>

      {/* Add New Skill Section */}
      {!isAddingSkill ? (
        <button 
          onClick={() => setIsAddingSkill(true)}
          className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Skill
        </button>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill(prev => ({
                ...prev, 
                category: e.target.value,
                name: '' // Reset name when category changes
              }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft</option>
              <option value="languages">Languages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <select
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({
                ...prev, 
                name: e.target.value
              }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a Skill</option>
              {availableSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level
            </label>
            <div className="flex space-x-2">
              {PROFICIENCY_LEVELS.map(level => (
                <button
                  key={level.value}
                  onClick={() => setNewSkill(prev => ({
                    ...prev, 
                    proficiency: level.value
                  }))}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    newSkill.proficiency === level.value
                      ? `${level.color} bg-opacity-20 font-semibold`
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={handleAddSkill}
              className="flex-1 flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Check className="mr-2 h-5 w-5" />
              Add Skill
            </button>
            <button 
              onClick={() => setIsAddingSkill(false)}
              className="flex-1 flex items-center justify-center p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              <X className="mr-2 h-5 w-5" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save Changes Button */}
      <button 
        onClick={saveSkills}
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center justify-center"
      >
        <Award className="mr-2 h-5 w-5" />
        Save Skills Profile
      </button>
    </div>
  );
}

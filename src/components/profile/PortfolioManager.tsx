import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Plus, 
  Briefcase, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Trash2, 
  Edit2 
} from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  projectLink?: string;
  imageUrl?: string;
}

export function PortfolioManager() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    projectLink: '',
    imageUrl: ''
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Fetch existing projects
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('portfolio')
        .eq('user_id', user.id)
        .single();

      if (data?.portfolio) {
        setProjects(data.portfolio);
      }
    };

    fetchProjects();
  }, [user]);

  // Save projects to database
  const saveProjects = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        portfolio: projects
      }, { 
        onConflict: 'user_id' 
      });

    if (error) {
      console.error('Error saving projects:', error);
      alert('Failed to save projects');
    } else {
      alert('Projects updated successfully!');
      setIsAddingProject(false);
      setEditingProjectId(null);
    }
  };

  // Handle project image upload
  const handleImageUpload = async (file: File) => {
    if (!user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/project_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Add or edit project
  const handleSubmitProject = async () => {
    if (!currentProject.title || !currentProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedProjects;
    if (editingProjectId) {
      // Editing existing project
      updatedProjects = projects.map(proj => 
        proj.id === editingProjectId 
          ? { ...currentProject, id: editingProjectId } 
          : proj
      );
    } else {
      // Adding new project
      updatedProjects = [
        ...projects, 
        { 
          ...currentProject, 
          id: `project_${Date.now()}` 
        }
      ];
    }

    setProjects(updatedProjects);
    saveProjects();

    // Reset form
    setCurrentProject({
      title: '',
      description: '',
      technologies: [],
      projectLink: '',
      imageUrl: ''
    });
    setEditingProjectId(null);
    setIsAddingProject(false);
  };

  // Remove project
  const removeProject = (projectId: string) => {
    setProjects(projects.filter(proj => proj.id !== projectId));
    saveProjects();
  };

  // Render project form
  const renderProjectForm = () => (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Title
        </label>
        <input
          type="text"
          value={currentProject.title}
          onChange={(e) => setCurrentProject(prev => ({
            ...prev, 
            title: e.target.value
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={currentProject.description}
          onChange={(e) => setCurrentProject(prev => ({
            ...prev, 
            description: e.target.value
          }))}
          className="w-full p-2 border rounded-md min-h-[100px]"
          placeholder="Describe your project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technologies Used
        </label>
        <input
          type="text"
          value={currentProject.technologies.join(', ')}
          onChange={(e) => setCurrentProject(prev => ({
            ...prev, 
            technologies: e.target.value.split(',').map(t => t.trim())
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="React, Node.js, TypeScript"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Link
        </label>
        <input
          type="url"
          value={currentProject.projectLink}
          onChange={(e) => setCurrentProject(prev => ({
            ...prev, 
            projectLink: e.target.value
          }))}
          className="w-full p-2 border rounded-md"
          placeholder="https://github.com/username/project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = await handleImageUpload(file);
              setCurrentProject(prev => ({
                ...prev, 
                imageUrl
              }));
            }
          }}
          className="w-full p-2 border rounded-md"
        />
        {currentProject.imageUrl && (
          <img 
            src={currentProject.imageUrl} 
            alt="Project" 
            className="mt-2 h-32 w-auto object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={handleSubmitProject}
          className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editingProjectId ? 'Update Project' : 'Add Project'}
        </button>
        <button 
          onClick={() => {
            setIsAddingProject(false);
            setEditingProjectId(null);
            setCurrentProject({
              title: '',
              description: '',
              technologies: [],
              projectLink: '',
              imageUrl: ''
            });
          }}
          className="flex-1 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Briefcase className="mr-3 h-6 w-6 text-blue-500" />
        Portfolio Projects
      </h2>

      {/* Existing Projects */}
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="bg-gray-50 p-4 rounded-md flex items-start space-x-4"
        >
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-24 h-24 object-cover rounded-md"
            />
          )}
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {project.description}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <LinkIcon className="h-4 w-4" />
              {project.projectLink ? (
                <a 
                  href={project.projectLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 underline"
                >
                  View Project
                </a>
              ) : (
                'No project link'
              )}
            </div>
            
            {project.technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => {
                setCurrentProject(project);
                setEditingProjectId(project.id || null);
                setIsAddingProject(true);
              }}
              className="text-blue-500 hover:bg-blue-100 p-1 rounded-full"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => removeProject(project.id!)}
              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Add Project Button/Form */}
      {!isAddingProject ? (
        <button 
          onClick={() => setIsAddingProject(true)}
          className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Project
        </button>
      ) : (
        renderProjectForm()
      )}
    </div>
  );
}

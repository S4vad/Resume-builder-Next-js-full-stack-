import React, { useState } from 'react';
import { ChevronLeft, Save, ChevronRight, Plus, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemoUrl: string;
}
interface Props {
  next: () => void;
  previous: () => void;
  id:string
}

const ProjectsForm=({next,previous,id}:Props) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'Short description about the project',
      githubLink: 'https://github.com/username',
      liveDemoUrl: 'https://yourproject.live'
    }
  ]);

  const handleInputChange = (id: string, field: keyof Omit<Project, 'id'>, value: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: 'Short description about the project',
      githubLink: 'https://github.com/username',
      liveDemoUrl: 'https://yourproject.live'
    };
    setProjects(prev => [...prev, newProject]);
  };

  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const handleBack = async() => {
    await previous()
  };

  
  const handleNext = async() => {
    await next()
  };


  const handleSaveAndExit = () => {
    console.log('Save & Exit clicked', projects);
  };


  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h2>
        
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="relative border border-gray-200 rounded-lg p-6 bg-gray-50">
              {projects.length > 1 && (
                <button
                  onClick={() => removeProject(project.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              
              <div className="space-y-4">
                {/* Project Title */}
                <div>
                  <label htmlFor={`title-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id={`title-${project.id}`}
                    value={project.title}
                    onChange={(e) => handleInputChange(project.id, 'title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    placeholder="Enter project title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor={`description-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id={`description-${project.id}`}
                    value={project.description}
                    onChange={(e) => handleInputChange(project.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none bg-white"
                    placeholder="Describe your project"
                  />
                </div>

                {/* GitHub Link and Live Demo URL Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`githubLink-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      id={`githubLink-${project.id}`}
                      value={project.githubLink}
                      onChange={(e) => handleInputChange(project.id, 'githubLink', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`liveDemoUrl-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      id={`liveDemoUrl-${project.id}`}
                      value={project.liveDemoUrl}
                      onChange={(e) => handleInputChange(project.id, 'liveDemoUrl', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="https://yourproject.live"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Project Button */}
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-6 py-3 text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-200"
          >
            <Save size={18} />
            Save & Exit
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
import React, { useState } from 'react';
import { ChevronLeft, Save, ChevronRight, Plus, X } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface Props {
  next: () => void;
  previous: () => void;
  id:string
}
const EducationForm = ({next,previous,id}:Props) => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      degree: 'BTech in Computer Science',
      institution: 'XYZ University',
      startDate: '',
      endDate: ''
    }
  ]);

  const handleInputChange = (id: string, field: keyof Omit<Education, 'id'>, value: string) => {
    setEducations(prev => 
      prev.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    };
    setEducations(prev => [...prev, newEducation]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(prev => prev.filter(edu => edu.id !== id));
    }
  };

  const handleBack = async() => {
    await previous()
  };

  
  const handleNext = async() => {
    await next()
  };


  const handleSaveAndExit = () => {
    console.log('Save & Exit clicked', educations);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>
        
        <div className="space-y-6">
          {educations.map((education) => (
            <div key={education.id} className="relative border border-gray-200 rounded-lg p-6 bg-gray-50">
              {educations.length > 1 && (
                <button
                  onClick={() => removeEducation(education.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              
              <div className="space-y-4">
                {/* Degree and Institution Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`degree-${education.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      id={`degree-${education.id}`}
                      value={education.degree}
                      onChange={(e) => handleInputChange(education.id, 'degree', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="e.g. Bachelor of Computer Science"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`institution-${education.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      id={`institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => handleInputChange(education.id, 'institution', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="University/College name"
                    />
                  </div>
                </div>

                {/* Start Date and End Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`startDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id={`startDate-${education.id}`}
                      value={education.startDate}
                      onChange={(e) => handleInputChange(education.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`endDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id={`endDate-${education.id}`}
                      value={education.endDate}
                      onChange={(e) => handleInputChange(education.id, 'endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Education Button */}
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            Add Education
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

export default EducationForm;
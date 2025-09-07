import React, { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';

interface Props {
  next: () => void;
  previous: () => void;
  id:string
}

const AdditionalInfoForm = ({next,previous,id}:Props) => {
  const [languages, setLanguages] = useState([
    { language: '', proficiency: 0 }
  ]);
  const [interests, setInterests] = useState('');

  const addLanguage = () => {
    setLanguages([...languages, { language: '', proficiency: 0 }]);
  };

  const removeLanguage = (index) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((_, i) => i !== index));
    }
  };

  const updateLanguage = (index, field, value) => {
    const updated = languages.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    setLanguages(updated);
  };

  const updateProficiency = (index, rating) => {
    updateLanguage(index, 'proficiency', rating);
  };

  const addInterest = () => {
    if (interests.trim()) {
      // Here you would typically add to interests array
      console.log('Adding interest:', interests);
      setInterests('');
    }
  };

  const ProficiencyStars = ({ rating, onRate }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="text-gray-300 hover:text-yellow-400 transition-colors"
          >
            <Star
              size={20}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : ''}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            Languages
          </h3>

          <div className="space-y-4">
            {languages.map((lang, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                    placeholder="e.g. English"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency
                  </label>
                  <div className="flex items-center justify-between">
                    <ProficiencyStars 
                      rating={lang.proficiency} 
                      onRate={(rating) => updateProficiency(index, rating)}
                    />
                    {languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={16} />
              Add Language
            </button>
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            Interests
          </h3>

          <div className="space-y-4">
            <div>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Reading, Photography"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>
            
            <button
              type="button"
              onClick={addInterest}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus size={16} />
              Add Interest
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={()=>previous()}
        >
          ← Back
        </button>
        
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Save & Exit
          </button>
          
          <button
            type="button"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Preview & Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
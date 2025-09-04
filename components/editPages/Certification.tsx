import React, { useState } from 'react';
import { ChevronLeft, Save, ChevronRight, Plus, X } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}


interface Props {
  next: () => void;
  previous: () => void;
  id:string
}
const CertificationsForm = ({next,previous,id}:Props) => {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      title: 'Full Stack Web Developer',
      issuer: 'Coursera / Google / etc',
      year: '2024'
    }
  ]);

  const handleInputChange = (id: string, field: keyof Omit<Certification, 'id'>, value: string) => {
    setCertifications(prev => 
      prev.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      title: '',
      issuer: 'Coursera / Google / etc',
      year: new Date().getFullYear().toString()
    };
    setCertifications(prev => [...prev, newCertification]);
  };

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(prev => prev.filter(cert => cert.id !== id));
    }
  };

  const handleBack = async() => {
    await previous()
  };

  
  const handleNext = async() => {
    await next()
  };

  const handleSaveAndExit = () => {
    console.log('Save & Exit clicked', certifications);
  };


  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Certifications</h2>
        
        <div className="space-y-6">
          {certifications.map((certification) => (
            <div key={certification.id} className="relative border border-gray-200 rounded-lg p-6 bg-gray-50">
              {certifications.length > 1 && (
                <button
                  onClick={() => removeCertification(certification.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              
              <div className="space-y-4">
                {/* Certificate Title and Issuer Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`title-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Title
                    </label>
                    <input
                      type="text"
                      id={`title-${certification.id}`}
                      value={certification.title}
                      onChange={(e) => handleInputChange(certification.id, 'title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="Certificate name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`issuer-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Issuer
                    </label>
                    <input
                      type="text"
                      id={`issuer-${certification.id}`}
                      value={certification.issuer}
                      onChange={(e) => handleInputChange(certification.id, 'issuer', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="Issuing organization"
                    />
                  </div>
                </div>

                {/* Year Field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`year-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      id={`year-${certification.id}`}
                      value={certification.year}
                      onChange={(e) => handleInputChange(certification.id, 'year', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="2024"
                      min="1900"
                      max={new Date().getFullYear() + 10}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addCertification}
            className="flex items-center gap-2 px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            Add Certification
          </button>
        </div>
      </div>

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

export default CertificationsForm;
import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Props {
  next: () => void;
  previous: () => void;
}
const WorkExperienceForm = ({ next, previous }: Props) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      company: "ABC Corp",
      role: "Frontend Developer",
      startDate: "",
      endDate: "",
      description: "What did you do in this role?",
    },
  ]);

  const handleInputChange = (
    id: string,
    field: keyof Omit<WorkExperience, "id">,
    value: string
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "What did you do in this role?",
    };
    setExperiences((prev) => [...prev, newExperience]);
  };

  const removeWorkExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  const handleBack = async () => {
    await previous();
  };

  const handleNext = async () => {
    await next();
  };

  const handleSaveAndExit = () => {
    console.log("Save & Exit clicked", experiences);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Work Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="relative border border-gray-200 rounded-lg p-6 bg-gray-50"
            >
              {experiences.length > 1 && (
                <button
                  onClick={() => removeWorkExperience(experience.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}

              <div className="space-y-4">
                {/* Company and Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`company-${experience.id}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) =>
                        handleInputChange(
                          experience.id,
                          "company",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`role-${experience.id}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      id={`role-${experience.id}`}
                      value={experience.role}
                      onChange={(e) =>
                        handleInputChange(experience.id, "role", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                      placeholder="Your role/position"
                    />
                  </div>
                </div>

                {/* Start Date and End Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`startDate-${experience.id}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id={`startDate-${experience.id}`}
                      value={experience.startDate}
                      onChange={(e) =>
                        handleInputChange(
                          experience.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`endDate-${experience.id}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id={`endDate-${experience.id}`}
                      value={experience.endDate}
                      onChange={(e) =>
                        handleInputChange(
                          experience.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor={`description-${experience.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id={`description-${experience.id}`}
                    value={experience.description}
                    onChange={(e) =>
                      handleInputChange(
                        experience.id,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none bg-white"
                    placeholder="Describe your responsibilities and achievements"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Work Experience Button */}
          <button
            onClick={addWorkExperience}
            className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={18} />
            Add Work Experience
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

export default WorkExperienceForm;

import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

interface Props {
  next: () => void;
  previous: () => void;
  id:string
}
const SkillsForm = ({ next, previous ,id}: Props) => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "JavaScript",
    },
  ]);

  const handleInputChange = (id: string, value: string) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, name: value } : skill))
    );
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };

  const handleBack = async () => {
    await previous();
  };

  const handleNext = async () => {
    await next();
  };

  const handleSaveAndExit = () => {
    console.log("Save & Exit clicked", skills);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h2>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="relative">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label
                    htmlFor={`skill-${skill.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Skill Name
                  </label>
                  <input
                    type="text"
                    id={`skill-${skill.id}`}
                    value={skill.name}
                    onChange={(e) =>
                      handleInputChange(skill.id, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                    placeholder="Enter skill name"
                  />
                </div>
                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="mt-6 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Skill Button */}
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            Add Skill
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

export default SkillsForm;

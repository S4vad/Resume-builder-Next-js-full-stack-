import React, { useState, useEffect } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateSkills } from "@/store/slices/resumeSlice";
import { updateSkillsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const SkillsForm = ({ next, previous, id }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { skills: reduxSkills } = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("skills");

  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState<string[]>(reduxSkills);

  useEffect(() => {
    dispatch(updateSkills(skills));
  }, [skills, dispatch]);

  const handleAddSkill = async () => {
    if (showErrors) {
      clearErrors();
    }
    const trimmedSkill = inputSkill.trim();
    if (trimmedSkill.length === 0 || skills.includes(trimmedSkill)) return;

    const updatedSkills = [...skills, trimmedSkill];

    const res = await updateSkillsDb(id, updatedSkills);
    if (res.success) {
      setSkills(updatedSkills);
      setInputSkill("");
    } else {
      console.error("Failed to update skills in DB");
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter((s) => s !== skillToRemove);

    const res = await updateSkillsDb(id, updatedSkills);
    if (res.success) {
      setSkills(updatedSkills);
    } else {
      console.error("Failed to remove skill from DB");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleBack = () => previous();
  const handleNext = () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    next();
  };
  const handleSaveAndExit = () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h2>

        <div className="mb-6">
          <label
            htmlFor="skill-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Add Skill
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              id="skill-input"
              value={inputSkill}
              onChange={(e) => setInputSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter skill name"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
            />
            <button
              onClick={handleAddSkill}
              className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Skills
          </label>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-blue-200 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>
        <ErrorDisplay errors={errors} showErrors={showErrors} />
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

import React from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addEducation,
  updateEducation,
  removeEducation,
} from "@/store/slices/resumeSlice";
import { Education } from "@/types/types";
import { addEducationsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const EducationForm = ({ next, previous, id }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { educations } = useAppSelector((state) => state.resume);

  const handleInputChange = (
    index: number,
    field: keyof Omit<Education, "id" | "resumeId">,
    value: string
  ) => {
    const updatedEducation = { ...educations[index], [field]: value };
    dispatch(updateEducation({ index, education: updatedEducation }));
  };

  const addEducationEntry = () => {
    const newEducation: Education = {
      id: "",
      resumeId: id,
      degree: "",
      institute: "",
      startDate: "",
      endDate: "",
    };
    dispatch(addEducation(newEducation));
  };

  const removeEducationEntry = (index: number) => {
    if (educations.length > 1) {
      dispatch(removeEducation(index));
    }
  };

  const handleBack = () => previous();
  const handleNext = async () => {
    await saveEducations();
    next();
  };
  const handleSaveAndExit = async () => {
    await saveEducations();
    router.push("/dashboard");
  };

  const saveEducations = async () => {
    try {
      const educationData = educations
        .filter((edu) => edu.degree?.trim() || edu.institute?.trim())
        .map((edu) => ({
          resumeId: id,
          degree: edu.degree || null,
          institute: edu.institute || null,
          startDate: edu.startDate || null,
          endDate: edu.endDate || null,
        }));

      await addEducationsDb(id, educationData);
    } catch (error) {
      console.error("Error saving educations:", error);
    }
  };

  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>

      <div className="space-y-6">
        {educations.map((edu, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-6 bg-gray-50"
          >
            {educations.length > 1 && (
              <button
                onClick={() => removeEducationEntry(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree || ""}
                  onChange={(e) =>
                    handleInputChange(index, "degree", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                  placeholder="e.g. Bachelor of Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institute || ""}
                  onChange={(e) =>
                    handleInputChange(index, "institute", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                  placeholder="University/College name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(edu.startDate)}
                  onChange={(e) =>
                    handleInputChange(index, "startDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(edu.endDate)}
                  onChange={(e) =>
                    handleInputChange(index, "endDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addEducationEntry}
          className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus size={18} /> Add Education
        </button>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
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

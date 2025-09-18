import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addEducation,
  updateEducation,
  removeEducation,
} from "@/store/slices/resumeSlice";
import { Education } from "@/store/types/types";
import { addEducationsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const EducationForm = ({ next, previous, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { educations } = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("education");

  const handleInputChange = (
    index: number,
    field: keyof Omit<Education, "id" | "resumeId">,
    value: string
  ) => {
    if (showErrors) {
      clearErrors();
    }

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
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    await saveEducations();
    setLoadingNext(false);
    next();
  };
  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    await saveEducations();
    setLoadingSave(false);
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
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Education</h2>

      <div className="space-y-4 sm:space-y-6">
        {educations.map((edu, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50"
          >
            {educations.length > 1 && (
              <button
                onClick={() => removeEducationEntry(index)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  placeholder="University/College name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addEducationEntry}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Add Education</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <ErrorDisplay errors={errors} showErrors={showErrors} />

      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6 gap-4 sm:gap-0">
        <button
          onClick={handleBack}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer text-sm sm:text-base w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          Back
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-200 cursor-pointer text-sm sm:text-base"
          >
            {loadingSave ? (
              <>
                <ClipLoader size={20} className="sm:w-[22px] sm:h-[22px]" />
                <span className="hidden sm:inline">saving..</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Save & Exit</span>
                <span className="sm:hidden">Save</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium cursor-pointer text-sm sm:text-base"
          >
            {loadingNext ? (
              <>
                <ClipLoader size={20} className="sm:w-[22px] sm:h-[22px]" color="white" />
                <span className="hidden sm:inline">saving..</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Continue</span>
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
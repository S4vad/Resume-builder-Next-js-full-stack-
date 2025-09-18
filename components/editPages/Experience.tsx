import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "@/store/slices/resumeSlice";
import { Experience } from "@/store/types/types";
import { addExperiencesDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const WorkExperienceForm = ({ next, previous, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { experience } = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("experience");

  const handleInputChange = (
    index: number,
    field: keyof Omit<Experience, "id" | "resumeId">,
    value: string
  ) => {
    if (showErrors) {
      clearErrors();
    }

    const updatedExperience = {
      ...experience[index],
      [field]: value,
    };
    dispatch(updateExperience({ index, experience: updatedExperience }));
  };

  const addWorkExperience = () => {
    const newExperience: Experience = {
      id: "",
      resumeId: id,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    dispatch(addExperience(newExperience));
  };

  const removeWorkExperience = (index: number) => {
    if (experience.length > 1) {
      dispatch(removeExperience(index));
    }
  };

  const handleBack = async () => {
    previous();
  };

  const handleNext = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    await saveExperiences();
    setLoadingNext(false);
    next();
  };

  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    await saveExperiences();
    setLoadingSave(false);
    router.push("/dashboard");
  };

  const saveExperiences = async () => {
    try {
      // Prepare data - filter out empty experiences
      const experienceData = experience
        .filter(
          (exp) =>
            exp.company?.trim() || exp.role?.trim() || exp.description?.trim()
        )
        .map((exp) => ({
          resumeId: id,
          company: exp.company || null,
          role: exp.role || null,
          location: exp.location || null,
          startDate: exp.startDate ? exp.startDate : null,
          endDate: exp.endDate ? exp.endDate : null,
          description: exp.description || null,
        }));

      await addExperiencesDb(id, experienceData);
    } catch (error) {
      console.error("Error saving experiences:", error);
    }
  };

  // Helper function to format date for input
  const formatDateForInput = (
    dateString: string | null | undefined
  ): string => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Work Experience
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id || index}
              className="relative border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50"
            >
              {experience.length > 1 && (
                <button
                  onClick={() => removeWorkExperience(index)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              )}

              <div className="space-y-3 sm:space-y-4">
                {/* Company and Role Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor={`company-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id={`company-${index}`}
                      value={exp.company || ""}
                      onChange={(e) =>
                        handleInputChange(index, "company", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`role-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      id={`role-${index}`}
                      value={exp.role || ""}
                      onChange={(e) =>
                        handleInputChange(index, "role", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                      placeholder="Your role/position"
                    />
                  </div>
                </div>

                {/* Location Field */}
                <div>
                  <label
                    htmlFor={`location-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id={`location-${index}`}
                    value={exp.location || ""}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="City, Country"
                  />
                </div>

                {/* Start Date and End Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor={`startDate-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id={`startDate-${index}`}
                      value={formatDateForInput(exp.startDate)}
                      onChange={(e) =>
                        handleInputChange(index, "startDate", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`endDate-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id={`endDate-${index}`}
                      value={formatDateForInput(exp.endDate)}
                      onChange={(e) =>
                        handleInputChange(index, "endDate", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor={`description-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id={`description-${index}`}
                    value={exp.description || ""}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none bg-white text-sm sm:text-base sm:rows-4"
                    placeholder="Describe your responsibilities and achievements"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Work Experience Button */}
          <button
            onClick={addWorkExperience}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Add Work Experience</span>
            <span className="sm:hidden">Add Experience</span>
          </button>
          <ErrorDisplay errors={errors} showErrors={showErrors} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 gap-4 sm:gap-0">
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
                <ClipLoader
                  size={20}
                  className="sm:w-[22px] sm:h-[22px]"
                  color="white"
                />
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

export default WorkExperienceForm;

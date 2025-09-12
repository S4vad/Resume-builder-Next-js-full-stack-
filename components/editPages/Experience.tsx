import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "@/store/slices/resumeSlice";
import { Experience } from "@/types/types";
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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Work Experience
        </h2>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id || index}
              className="relative border border-gray-200 rounded-lg p-6 bg-gray-50"
            >
              {experience.length > 1 && (
                <button
                  onClick={() => removeWorkExperience(index)}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    placeholder="City, Country"
                  />
                </div>

                {/* Start Date and End Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
            className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
          >
            <Plus size={18} />
            Add Work Experience
          </button>
          <ErrorDisplay errors={errors} showErrors={showErrors} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-200 cursor-pointer"
          >
            {loadingSave ? (
              <>
                <ClipLoader size={22} />
                saving..
              </>
            ) : (
              <>
                <Save size={18} />
                Save & Exit
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium cursor-pointer"
          >
            {loadingNext ? (
              <>
                <ClipLoader size={22} color="white" />
                saving..
              </>
            ) : (
              <>
                Next
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceForm;

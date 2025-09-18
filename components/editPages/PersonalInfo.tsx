"use client";
import React, { use, useEffect, useState } from "react";
import { ChevronLeft, Save, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBasicInfo } from "@/store/slices/resumeSlice";
import { useRouter } from "next/navigation";
import { updatePersonalInfo } from "@/app/action/formAction";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface PersonalInfoData {
  fullName: string;
  designation: string;
  summary: string;
}

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const PersonalInformationForm = ({ next, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);
  const router = useRouter();
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("personal");

  const [formData, setFormData] = useState<PersonalInfoData>({
    fullName: "",
    designation: "",
    summary: "",
  });

  useEffect(() => {
    setFormData({
      fullName: resume.full_name || "",
      designation: resume.designation || "",
      summary: resume.summary || "",
    });
  }, [resume.full_name, resume.designation, resume.summary]);

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (showErrors) {
      clearErrors();
    }

    dispatch(
      updateBasicInfo(
        field === "fullName"
          ? { full_name: value }
          : field === "designation"
          ? { designation: value }
          : { summary: value }
      )
    );
  };

  const handleNext = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    await updatePersonalInfo(id, {
      full_name: formData.fullName,
      designation: formData.designation,
      summary: formData.summary,
    });
    setLoadingNext(false);
    next();
  };

  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    const res = await updatePersonalInfo(id, {
      full_name: formData.fullName,
      designation: formData.designation,
      summary: formData.summary,
    });

    if (res.success) {
      setLoadingSave(false);
      router.push("/dashboard");
    } else {
      console.error("Failed to save resume:", res.error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Personal Information
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Full Name and Designation Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                value={formData.designation}
                onChange={(e) =>
                  handleInputChange("designation", e.target.value)
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="Enter your designation"
              />
            </div>
          </div>

          {/* Summary Field */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Summary
            </label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              rows={6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none text-sm sm:text-base"
              placeholder="Write a short introduction about yourself"
            />
          </div>
        </div>
      </div>
      <ErrorDisplay errors={errors} showErrors={showErrors} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 gap-4 sm:gap-0">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer text-sm sm:text-base w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft size={18} />
          Dashboard
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

export default PersonalInformationForm;

import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateContactInfo } from "@/app/action/formAction";
import { ResumeState } from "@/store/types/types";
import { updateBasicInfo } from "@/store/slices/resumeSlice";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface ContactInfoData {
  address: string;
  email: string;
  phoneNumber: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}
const ContactInformationForm = ({ next, previous, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const resume = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("contact");
  const [formData, setFormData] = useState<ContactInfoData>({
    address: resume.address || "",
    email: resume.email || "",
    phoneNumber: resume.phone || "",
    linkedin: resume.linkedin || "",
    github: resume.github || "",
    portfolio: resume.portfolio || "",
  });

  const handleInputChange = (field: keyof ContactInfoData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (showErrors) {
      clearErrors();
    }

    // Map form field to Redux field
    const payload: Partial<ResumeState> = {};
    if (field === "address") payload.address = value;
    else if (field === "email") payload.email = value;
    else if (field === "phoneNumber") payload.phone = value;
    else if (field === "linkedin") payload.linkedin = value;
    else if (field === "github") payload.github = value;
    else if (field === "portfolio") payload.portfolio = value;
    dispatch(updateBasicInfo(payload));
  };

  const handleBack = async () => {
    await previous();
  };

  const getUpdateData = () => ({
    address: formData.address,
    email: formData.email,
    phone: formData.phoneNumber,
    linkedin: formData.linkedin,
    github: formData.github,
    portfolio: formData.portfolio,
  });

  const handleNext = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    const res = await updateContactInfo(id, getUpdateData());
    if (res.success) {
      setLoadingNext(false);
      next();
    }
  };

  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    const res = await updateContactInfo(id, getUpdateData());
    if (res.success) {
      setLoadingSave(false);
      router.push("/dashboard");
    } else console.error("Failed to save resume:", res.error);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Contact Information
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
              placeholder="Enter your address"
            />
          </div>

          {/* Email and Phone Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* LinkedIn and GitHub Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GitHub
              </label>
              <input
                type="url"
                id="github"
                value={formData.github}
                onChange={(e) => handleInputChange("github", e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          {/* Portfolio/Website Field */}
          <div>
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Portfolio / Website
            </label>
            <input
              type="url"
              id="portfolio"
              value={formData.portfolio}
              onChange={(e) => handleInputChange("portfolio", e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm sm:text-base"
              placeholder="https://yourwebsite.com"
            />
          </div>
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

export default ContactInformationForm;
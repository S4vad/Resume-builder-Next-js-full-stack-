import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateContactInfo } from "@/app/action/formAction";
import { ResumeState } from "@/types/types";
import { updateBasicInfo } from "@/store/slices/resumeSlice";
import { useRouter } from "next/navigation";

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const resume = useAppSelector((state) => state.resume);
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
    const res = await updateContactInfo(id, getUpdateData());
    if (res.success) next();
  };

  const handleSaveAndExit = async () => {
    const res = await updateContactInfo(id, getUpdateData());
    if (res.success) router.push("/dashboard");
    else console.error("Failed to save resume:", res.error);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Contact Information
        </h2>

        <div className="space-y-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
              placeholder="Enter your address"
            />
          </div>

          {/* Email and Phone Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* LinkedIn and GitHub Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
              placeholder="https://yourwebsite.com"
            />
          </div>
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

export default ContactInformationForm;

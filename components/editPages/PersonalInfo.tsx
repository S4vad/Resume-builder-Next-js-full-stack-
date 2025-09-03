"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadResume } from "@/store/slices/resumeSlice";
import { ResumeState } from "@/types/types";

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

const PersonalInformationForm = ({ next, previous, id }: Props) => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);
  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(`/api/resume/${id}`);
      const data = await response.json();
      if (data.success) {
        dispatch(loadResume(data.data));
      }
    };
    fetchResume();
  }, [id, dispatch]);

  const [formData, setFormData] = useState<PersonalInfoData>({
    fullName:resume.full_name || "",
    designation:resume.designation || "",
    summary: resume.summary || ""
  });

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = async () => {
    await previous();
  };

  const handleNext = async () => {
    await next();
  };

  const handleSaveAndExit = () => {
    console.log("Save & Exit clicked", formData);
  };

  return (
    <div className="max-w-4xl  bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Personal Information
        </h2>

        <div className="space-y-6">
          {/* Full Name and Designation Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none"
              placeholder="Write a short introduction about yourself"
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

export default PersonalInformationForm;

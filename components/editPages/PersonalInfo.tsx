"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadResume, updateBasicInfo } from "@/store/slices/resumeSlice";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  
  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(`/api/resume/${id}`);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (data.success) {
        dispatch(loadResume(data.data));
      }
    };
    if (id) {
      fetchResume();
    }
  }, [id, dispatch]);

  const [formData, setFormData] = useState<PersonalInfoData>({
    fullName: resume.full_name || "",
    designation: resume.designation || "",
    summary: resume.summary || "",
  });

  // Update local state when resume data changes from Redux
  useEffect(() => {
    setFormData({
      fullName: resume.full_name || "",
      designation: resume.designation || "",
      summary: resume.summary || "",
    });
  }, [resume.full_name, resume.designation, resume.summary]);

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    // Update local state
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Immediately dispatch to Redux for live template updates
    const updatePayload: any = {};
    if (field === 'fullName') {
      updatePayload.full_name = value;
    } else if (field === 'designation') {
      updatePayload.designation = value;
    } else if (field === 'summary') {
      updatePayload.summary = value;
    }
    
    dispatch(updateBasicInfo(updatePayload));
  };

  const handleBack = async () => {
    await previous();
  };

  const handleNext = async () => {
    // Optional: Save to backend before proceeding
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          designation: formData.designation,
          summary: formData.summary,
        }),
      });
      
      if (response.ok) {
        await next();
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      // Still proceed to next step even if save fails
      await next();
    }
  };

  const handleSaveAndExit = async () => {
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          designation: formData.designation,
          summary: formData.summary,
        }),
      });
      
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-lg shadow-md">
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
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
        >
          <ChevronLeft size={18} />
          Dashboard
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
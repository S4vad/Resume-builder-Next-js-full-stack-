import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addCertification,
  updateCertification,
  removeCertification,
} from "@/store/slices/resumeSlice";
import { Certification } from "@/store/types/types";
import { addCertificationsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const CertificationsForm = ({ next, previous, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { certifications } = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("certifications");

  const handleInputChange = (
    index: number,
    field: keyof Omit<Certification, "id" | "resumeId">,
    value: string
  ) => {
    if (showErrors) {
      clearErrors();
    }

    const updatedCertification = { ...certifications[index], [field]: value };
    dispatch(
      updateCertification({ index, certification: updatedCertification })
    );
  };

  const addCertificationEntry = () => {
    const newCertification: Certification = {
      id: "",
      resumeId: id,
      title: "",
      year: "",
      link: "",
    };
    dispatch(addCertification(newCertification));
  };

  const removeCertificationEntry = (index: number) => {
    if (certifications.length > 1) {
      dispatch(removeCertification(index));
    }
  };

  const handleBack = () => previous();
  const handleNext = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    await saveCertifications();
    setLoadingNext(false);
    next();
  };
  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    await saveCertifications();
    setLoadingSave(false);
    router.push("/dashboard");
  };

  const saveCertifications = async () => {
    try {
      const certificationData = certifications
        .filter((cert) => cert.title?.trim())
        .map((cert) => ({
          resumeId: id,
          title: cert.title || null,
          year: cert.year ? `${cert.year}-01-01` : null,
          link: cert.link || null,
        }));

      await addCertificationsDb(id, certificationData);
    } catch (error) {
      console.error("Error saving certifications:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Certifications
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {certifications.map((certification, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50"
          >
            {certifications.length > 1 && (
              <button
                onClick={() => removeCertificationEntry(index)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Title
                </label>
                <input
                  type="text"
                  value={certification.title || ""}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  placeholder="Certificate name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={certification.year || ""}
                    onChange={(e) =>
                      handleInputChange(index, "year", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="2024"
                    min="1900"
                    max={new Date().getFullYear() + 10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Link
                  </label>
                  <input
                    type="url"
                    value={certification.link || ""}
                    onChange={(e) =>
                      handleInputChange(index, "link", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="https://certificate-url.com"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCertificationEntry}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Add Certification</span>
          <span className="sm:hidden">Add</span>
        </button>
        <ErrorDisplay errors={errors} showErrors={showErrors} />
      </div>

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

export default CertificationsForm;
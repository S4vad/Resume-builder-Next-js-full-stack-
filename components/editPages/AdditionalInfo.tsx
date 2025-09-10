import React, { useState, useEffect } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateLanguages, updateInterests } from "@/store/slices/resumeSlice";
import { updateLanguagesDb, updateInterestsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const AdditionalInfoForm = ({ next, previous, id }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { languages: reduxLanguages, intrests: reduxInterests } =
    useAppSelector((state) => state.resume);

  const [inputLanguage, setInputLanguage] = useState("");
  const [languages, setLanguages] = useState<string[]>(reduxLanguages);
  const [interests, setInterests] = useState<string[]>(reduxInterests);

  // Predefined interests list
  const predefinedInterests = [
    "Reading",
    "Photography",
    "Traveling",
    "Music",
    "Sports",
    "Cooking",
    "Gaming",
    "Art",
    "Dancing",
    "Writing",
    "Fitness",
    "Movies",
    "Technology",
    "Nature",
    "Volunteering",
    "Learning Languages",
    "Meditation",
    "Hiking",
    "Swimming",
    "Cycling",
    "Gardening",
    "Fashion",
    "History",
    "Science",
    "Literature"
  ];

  useEffect(() => {
    dispatch(updateLanguages(languages));
  }, [languages, dispatch]);

  useEffect(() => {
    dispatch(updateInterests(interests));
  }, [interests, dispatch]);

  const handleAddLanguage = async () => {
    const trimmedLanguage = inputLanguage.trim();
    if (trimmedLanguage.length === 0 || languages.includes(trimmedLanguage)) return;

    const updatedLanguages = [...languages, trimmedLanguage];

    const res = await updateLanguagesDb(id, updatedLanguages);
    if (res.success) {
      setLanguages(updatedLanguages);
      setInputLanguage("");
    } else {
      console.error("Failed to update languages in DB");
    }
  };

  const handleRemoveLanguage = async (languageToRemove: string) => {
    const updatedLanguages = languages.filter((lang) => lang !== languageToRemove);

    const res = await updateLanguagesDb(id, updatedLanguages);
    if (res.success) {
      setLanguages(updatedLanguages);
    } else {
      console.error("Failed to remove language from DB");
    }
  };

  const toggleInterest = async (interest: string) => {
    let updatedInterests;
    if (interests.includes(interest)) {
      updatedInterests = interests.filter((item) => item !== interest);
    } else {
      updatedInterests = [...interests, interest];
    }

    const res = await updateInterestsDb(id, updatedInterests);
    if (res.success) {
      setInterests(updatedInterests);
    } else {
      console.error("Failed to update interests in DB");
    }
  };

  const handleBack = () => previous();
  const handleNext = () => next();
  const handleSaveAndExit = () => router.push("/dashboard");

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Additional Information
        </h2>

        <div className="space-y-8">

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              Languages
            </h3>

            {/* Display existing languages */}
            <div className="flex flex-wrap gap-3 mb-6">
              {languages.map((language) => (
                <div
                  key={language}
                  className="bg-purple-200 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <span>{language}</span>
                  <button
                    onClick={() => handleRemoveLanguage(language)}
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new language */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value)}
                placeholder="Enter new language (e.g. English, Spanish)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
              />
              <button
                onClick={handleAddLanguage}
                className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={18} />
                Add Language
              </button>
            </div>
          </div>

          {/* Interests Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              Interests
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {predefinedInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                    interests.includes(interest)
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white border-transparent shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            {/* Selected interests counter */}
            {interests.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                Selected: {interests.length} interest{interests.length !== 1 ? 's' : ''}
              </div>
            )}
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
            Preview & Download
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
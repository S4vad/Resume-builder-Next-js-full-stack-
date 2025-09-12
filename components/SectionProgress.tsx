import React from "react";
import { FancyProgressBar } from "@/components/ProgressBar";
import {
  calculateResumeCompletion,
  getSectionCompletion,
} from "@/lib/completionCalculator";
import { useAppSelector } from "@/store/hooks";

const SectionProgress = ({ page }: { page: number }) => {
  const resume = useAppSelector((state) => state.resume);
  const overallCompletion = calculateResumeCompletion(resume);

  const currentSection = (page: number) => {
    switch (page) {
      case 1:
        return "personal";
      case 2:
        return "contact";
      case 3:
        return "experience";
      case 4:
        return "education";
      case 5:
        return "projects";
      case 6:
        return "certifications";
      case 7:
        return "skills";
      case 8:
        return "additional";
      default:
        return "personal";
    }
  };

  const section = currentSection(page);
  const personalSectionCompletion = getSectionCompletion(resume, section);
  return (
    <div className="flex flex-col items-center justify-between mt-2 ">
      <div className="flex justify-between w-full space-y-1 ">
        <span className="text-sm font-medium text-purple-600">
          {personalSectionCompletion}% Complete
        </span>
        <span className="text-sm  text-purple-600 ">
          {overallCompletion.sectionDetails[section]?.completed || 0}/
          {overallCompletion.sectionDetails[section]?.total || 3} fields
        </span>
      </div>
      <FancyProgressBar value={personalSectionCompletion} />
    </div>
  );
};

export default SectionProgress;

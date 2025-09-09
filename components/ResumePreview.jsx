import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";

import { useAppSelector } from "@/store/hooks";
import { ScaleLoader } from "react-spinners";

const templates = {
  templateOne: <TemplateOne />,
  templateTwo: <TemplateTwo />,
  templateThree: <TemplateThree />,
};

const ResumePreview = () => {
  const resumeData = useAppSelector((state) => state.resume);
  if (resumeData.isLoading) {
    return (
      <div className="flex items-center justify-center w-full  ">
        <ScaleLoader color="#6a39c9" size="35px" />
      </div>
    );
  }

  return (
    <div className=" ">
      {resumeData.templateName ? (
        templates[resumeData.templateName]
      ) : (
        <TemplateOne />
      )}
    </div>
  );
};

export default ResumePreview;

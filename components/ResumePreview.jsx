import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";
import { useAppSelector } from "@/store/hooks";
import { ScaleLoader } from "react-spinners";

const ResumePreview = () => {
  const resumeData = useAppSelector((state) => state.resume);

  if (resumeData.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-140px)]">
        <ScaleLoader color="#6a39c9" size="35px" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      {resumeData.templateName === "templateOne" && <TemplateOne />}
      {resumeData.templateName === "templateTwo" && <TemplateTwo />}
      {resumeData.templateName === "templateThree" && <TemplateThree />}
      {!resumeData.templateName && <TemplateOne />}
    </div>
  );
};

export default ResumePreview;

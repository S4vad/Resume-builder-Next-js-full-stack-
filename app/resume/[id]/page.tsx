import ResumeEdit from "@/components/ResumeEdit";
import ResumeHeader from "@/components/ResumeHeader";
import ResumePreview from "@/components/ResumePreview";
import React from "react";

const CreateResume = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center gap-2">
      <div >
        <ResumeHeader id={params.id} />
      </div>
      <div className="flex items-center">
        <ResumeEdit id={params.id}/>
        <ResumePreview  id={params.id}/>
      </div>
    </div>
  );
};

export default CreateResume;

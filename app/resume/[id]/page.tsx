import ResumeEdit from "@/components/ResumeEdit";
import ResumeHeader from "@/components/ResumeHeader";
import ResumePreview from "@/components/ResumePreview";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";


const CreateResume = ({ params }: { params: { id: string } }) => {
  return (
    <>

    <Link
      href="/dashboard"
      className="group text-gray-700 font-medium text-xs absolute left-8 top-30 flex items-center gap-1 transition hover:-translate-x-1"
    >
      <CircleArrowLeft className="text-gray-600 size-3 transition group-hover:text-blue-700" />
      <span className="underline transition group-hover:text-blue-700">
        Dashboard
      </span>
    </Link>
      <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center gap-2">
        <div>
          <ResumeHeader id={params.id} />
        </div>
        <div className="flex items-center">
          <ResumeEdit id={params.id} />
          <ResumePreview id={params.id} />
        </div>
      </div>
    </>
  );
};

export default CreateResume;

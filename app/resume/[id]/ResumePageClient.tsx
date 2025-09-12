"use client";
import Modal from "@/components/Modal";
import ResumeEdit from "@/components/ResumeEdit";
import ResumeHeader from "@/components/ResumeHeader";
import ResumePreview from "@/components/ResumePreview";
import { CircleArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadResume,
  setIsPreview,
  setTemplateName,
} from "@/store/slices/resumeSlice";
import { ResumeState } from "@/types/types";
import { addTemplateDb } from "@/app/action/formAction";
const templates = [
  "/templates/Resume1.png",
  "/templates/Resume2.png",
  "/templates/Resume3.png",
];
import { TemplateName } from "@prisma/client";
import Button from "@/components/Button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import toast from "react-hot-toast";
import { downloadResumePdf } from "@/lib/downloadPdf";
import { ClipLoader } from "react-spinners";

export default function ResumePageClient({ id }: { id: string }) {
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(templates[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [template, setTemplate] = useState<TemplateName>(
    useAppSelector((state) => state.resume.templateName) as TemplateName
  );
  const resume = useAppSelector((state) => state.resume);
  const { isPreview } = useAppSelector((state) => state.resume);
  const previewRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const templatesPages: TemplateName[] = [
    TemplateName.templateOne,
    TemplateName.templateTwo,
    TemplateName.templateThree,
  ];

  const handleSubmit = async () => {
    try {
      const res = await addTemplateDb(id, template);
      if (res.success) {
        dispatch(setTemplateName(template));
        setShowTemplates(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPdf = useCallback(async () => {
    if (!previewRef.current) {
      toast.error("Resume preview not found!");
      return;
    }
    await downloadResumePdf(previewRef.current, resume.title, setIsDownloading);
  }, [resume.title]);
  return (
    <>
      <Link
        href="/dashboard"
        className="group text-gray-700 font-medium text-xs absolute left-8 top-30 flex items-center gap-1 transition hover:-translate-x-1"
        onClick={() => dispatch(loadResume({} as ResumeState))}
      >
        <CircleArrowLeft className="text-gray-600 size-3 transition group-hover:text-blue-700" />
        <span className="underline transition group-hover:text-blue-700">
          Dashboard
        </span>
      </Link>

      <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center gap-2">
        <div>
          <ResumeHeader
            id={id}
            setshowTemplates={() => setShowTemplates(true)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ResumeEdit id={id} />
          <div className="shadow-xl rounded-lg  ">
            <ResumePreview />
          </div>
        </div>
      </div>

      {showTemplates && (
        <Modal
          header={"Choose a Template"}
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          className=" w-[90%] md:max-w-[60%] max-h-[95%] overflow-y-scroll h-screen relative "
        >
          <div className="flex gap-3 h-[90%]">
            <div className="">
              <div className="grid grid-cols-2 gap-2 w-full ">
                {templates.map((template, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedImage(template);
                      setTemplate(templatesPages[index]);
                    }}
                    className={
                      selectedImage === template
                        ? "border-2 border-blue-400 rounded-lg"
                        : "border-none"
                    }
                  >
                    <Image
                      src={template}
                      alt={`Template ${index + 1}`}
                      width={200}
                      height={250}
                      unoptimized
                      className="rounded-md border  shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Image
              src={selectedImage}
              alt="preview image"
              width={500}
              height={600}
              unoptimized
              className="rounded-md "
            />
          </div>
          <div className=" absolute top-5 right-15">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Use This Template
            </button>
          </div>
        </Modal>
      )}
      {isPreview && (
        <Modal
          header={resume.title}
          isOpen={isPreview}
          onClose={() => dispatch(setIsPreview(false))}
          className=" w-[90%] md:max-w-[60%] max-h-[95%] overflow-y-scroll h-screen relative "
        >
          <div className="flex flex-col gap-3 h-[90%]">
            <div className="w-full h-[5%] flex justify-end">
              <Button
                onClick={handleDownloadPdf}
                className="rounded-xl text-white text-[15px]"
              >
                {isDownloading ? (
                  <>
                    <ClipLoader size={28} color="white" className="mr-2 " />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
            <div ref={previewRef}>
              <ResumePreview />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

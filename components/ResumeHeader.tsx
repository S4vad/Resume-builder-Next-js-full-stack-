"use client";
import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsPreview, updateTitle } from "@/store/slices/resumeSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { FaRegEye } from "react-icons/fa";
import { updateResumeTitle, deleteResume } from "../app/action/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setResumes } from "@/store/slices/userSlice";
import { calculateResumeCompletion } from "@/lib/completionCalculator";
import { FancyProgressBar } from "./ProgressBar";

const ResumeHeader = ({
  id,
  setshowTemplates,
}: {
  id: string;
  setshowTemplates: () => void;
}) => {
  const [input, setInput] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const resume = useAppSelector((state) => state.resume);
  const completion = calculateResumeCompletion(resume);

  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(`/api/resume/${id}`);
      if (!response.ok) {
        return;
      }
      const res = await response.json();
      setInput(res.data.title);
      dispatch(updateTitle(res.data.title));
    };
    if (id) {
      fetchResume();
    }
  }, [id, dispatch]);

  const handleDeleteResume = async () => {
    try {
      if (currentUser) {
        const response = await deleteResume(id, currentUser.id);
        if (response.success && response.data) {
          toast.success(`${resume.title} resume deleted successfully !`);
          router.push("/dashboard");
          dispatch(setResumes(response.data));
        }
      }
    } catch (error) {
      console.log("error deleting resume", error);
      toast.error("Error deleting resume!");
    }
  };

  return (
    <>
      <div className="relative">
        <FancyProgressBar value={completion.percentage} />
        <span className="text-gray-600 absolute right-2  text-xs font-semibold -top-0.5">
          {completion.percentage}%
        </span>
      </div>

      <div className="w-full min-h-[80px] bg-gradient-to-r from-fuchsia-50 to-violet-50 rounded-xl p-3 px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <form
          suppressHydrationWarning
          className="flex items-center text-lg sm:text-xl md:text-2xl w-full sm:w-auto"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await updateResumeTitle(id, input);
            setEdit(!edit);
          }}
        >
          {edit && input.length > 0 ? (
            <input
              type="text"
              value={input}
              name="input"
              onChange={(e) => setInput(e.target.value)}
              className="border-b-2 border-violet-600 outline-none p-1 flex-1 sm:flex-none min-w-0"
            />
          ) : (
            <span className="truncate flex-1 sm:flex-none min-w-0">
              {input}
            </span>
          )}
          <button
            suppressHydrationWarning
            type="submit"
            className={`${
              edit ? "bg-violet-600 text-white" : "bg-slate-100"
            } p-1 rounded-lg ml-3 sm:ml-5 flex-shrink-0`}
          >
            {edit ? <IoMdCheckmark size={25} /> : <LiaEditSolid size={25} />}
          </button>
        </form>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto flex-wrap sm:flex-nowrap">
          <div
            className="flex items-center gap-1 sm:gap-2 p-2 bg-violet-200 rounded-xl text-violet-600 cursor-pointer hover:bg-violet-300 hover:text-violet-900 transition duration-300 text-sm sm:text-base flex-1 sm:flex-none justify-center sm:justify-start"
            onClick={() => setshowTemplates()}
          >
            <VscPreview />
            <span className="hidden sm:block">Templates</span>
          </div>
          <div
            className="flex items-center gap-1 sm:gap-2 p-2 bg-red-100 text-red-600 rounded-xl cursor-pointer hover:bg-red-300 hover:text-red-900 transition duration-300 text-sm sm:text-base flex-1 sm:flex-none justify-center sm:justify-start"
            onClick={() => handleDeleteResume()}
          >
            <RiDeleteBin6Line />
            <span className="hidden sm:block">Delete</span>
          </div>
          <div
            className="flex items-center gap-1 sm:gap-2 p-2 bg-emerald-100 rounded-xl text-emerald-600 cursor-pointer hover:bg-emerald-300 hover:text-emerald-900 transition duration-300 text-sm sm:text-base flex-1 sm:flex-none justify-center sm:justify-start"
            onClick={() => dispatch(setIsPreview(true))}
          >
            <FaRegEye />
            <span className="hidden sm:block">Preview</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeHeader;

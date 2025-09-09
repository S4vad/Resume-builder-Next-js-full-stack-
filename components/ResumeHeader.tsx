"use client";
import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTitle } from "@/store/slices/resumeSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { FaRegEye } from "react-icons/fa";
import { updateResumeTitle, deleteResume } from "../app/action/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setResumes } from "@/store/slices/userSlice";

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
    <div className="w-full h-[80px] bg-gradient-to-r from-fuchsia-50 to-violet-50 rounded-xl p-3 px-10 flex items-center justify-between">
      <form
        suppressHydrationWarning
        className="flex  items-center text-2xl"
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
            className="   border-b-2 border-violet-600 outline-none p-1"
          />
        ) : (
          <span className="">{input}</span>
        )}
        <button
          type="submit"
          className={`${
            edit ? "bg-violet-600 text-white" : "bg-slate-100"
          } p-1 rounded-lg ml-5`}
        >
          {edit ? <IoMdCheckmark size={25} /> : <LiaEditSolid size={25} />}
        </button>
      </form>

      <div className="flex items-center gap-4 ">
        <div
          className="flex items-center gap-2 p-2 bg-violet-200 rounded-xl text-violet-600 cursor-pointer hover:bg-violet-300 hover:text-violet-900 transition duration-300"
          onClick={() => setshowTemplates()}
        >
          <VscPreview />
          <span>Templates</span>
        </div>
        <div
          className="flex items-center gap-2 p-2 bg-red-100 text-red-600 rounded-xl cursor-pointer hover:bg-red-300 hover:text-red-900 transition duration-300"
          onClick={() => handleDeleteResume()}
        >
          <RiDeleteBin6Line />
          <span>Delete</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-emerald-100 rounded-xl text-emerald-600 cursor-pointer hover:bg-emerald-300 hover:text-emerald-900 transition duration-300">
          <FaRegEye />
          <span>Preview</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;

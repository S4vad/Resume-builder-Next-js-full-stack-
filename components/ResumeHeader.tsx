"use client";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch } from "@/store/hooks";
import { updateTitle } from "@/store/slices/resumeSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { FaRegEye } from "react-icons/fa";
import { updateResumeTitle } from "@/action/action";

const ResumeHeader = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(`/api/resume/${id}`);
      const res = await response.json();
      setInput(res.data.title);
      dispatch(updateTitle(res.data.title));
    };
    fetchResume();
  }, [id, dispatch]);
  const [input, setInput] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="w-full h-[80px] bg-gradient-to-r from-fuchsia-50 to-violet-50 rounded-xl p-3 px-10 flex items-center justify-between">
      <form className="flex  items-center text-2xl" onSubmit={async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await updateResumeTitle(id,input)
      }}>
        {edit ? (
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
          onClick={() => setEdit(!edit)}
          className={`${
            edit ? "bg-violet-600 text-white" : "bg-slate-100"
          } p-1 rounded-lg ml-5`}
        >
          {edit ? <IoMdCheckmark size={25} /> : <LiaEditSolid size={25} />}
        </button>
      </form>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-2 p-2 bg-violet-200 rounded-xl text-violet-600">
          <VscPreview />
          <span>Templates</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-red-100 text-red-600 rounded-xl">
          <RiDeleteBin6Line />
          <span>Delete</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-emerald-100 rounded-xl text-emerald-600">
          <FaRegEye />
          <span>Preview</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;

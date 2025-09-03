"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { createTitle } from "../action/action";
import { addResume } from "@/store/slices/userSlice";
import mapPrismaResumeToState from "@/lib/map";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { resumes, currentUser, isLoading } = useAppSelector(
    (state) => state.user
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center  w-full mt-50">
        <ClipLoader  color="#6a39c9" size="45px" />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between p-8 pt-10">
        <div className="text-gray-800 ">
          <h1 className="font-semibold text-xl">My Resumes</h1>
          {resumes.length > 0 ? (
            <p>Created {resumes.length} resumes</p>
          ) : (
            <p>Create your First Resume</p>
          )}
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="hover:scale-105  active:scale-95   transform transition-transform duration-200 ease-in-out"
        >
          Create New <RiFileUploadLine />
        </Button>
      </div>
      {!isLoading &&resumes?.length > 0 ? (
        <div>show you resume</div>
      ) : (
        <div className="flex items-center flex-col gap-3   text-violet-800   mt-20  ">
          <div className="rounded-full p-2 bg-fuchsia-50 border-1 border-violet-500">
            <RiFileUploadLine className="size-13 text-violet-700" />
          </div>

          <h1 className="font-semibold text-xl">No Resume yet</h1>
          <p className="max-w-lg text-center text-gray-600 ">
            You haven&spos;t created any resumes yet. Start building your
            professional resume to land your dream job.
          </p>
          <Button
            onClick={() => setOpen(true)}
            className="hover:scale-105  active:scale-95    transform transition-transform duration-200 ease-in-out"
          >
            Create Your first Resume <RiFileUploadLine />
          </Button>
        </div>
      )}

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        header="Create New Resume"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await createTitle(currentUser!.id, title);
            if (res.success) {
              dispatch(addResume(mapPrismaResumeToState(res.data)));
              setOpen(false);
              router.push(`/resume/${res.data!.id}`);
            }
          }}
          className="space-y-4 bg-white p-8 rounded-xl "
        >
          <p className=" text-gray-500">
            Give your resume a title to get started. You can customize
            everything later.
          </p>

          <div>
            <label className="font-medium text-gray-700">Resume Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Savad – Software Engineer"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Create Resume
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;

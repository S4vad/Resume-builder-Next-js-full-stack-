"use client";
import Button from "@/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { createTitle, deleteResume, getUserResume } from "../action/action";
import { addResume, setResumes } from "@/store/slices/userSlice";
import mapPrismaResumeToState from "@/lib/map";
import { ClipLoader } from "react-spinners";
import { ResumeSummaryCard } from "@/components/Card";
import toast from "react-hot-toast";
import { calculateResumeCompletion } from "@/lib/completionCalculator";
import { setError, setLoading } from "@/store/slices/resumeSlice";



const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const [cardLoading, setCardLoading] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { resumes, currentUser, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  const fetchUserResumes = useCallback(async () => {
    if (!currentUser?.id) {
      setInitialFetchDone(true);
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const response = await getUserResume(currentUser.id);

      if (response.success && response.data) {
        const mappedResumes = response.data.map(mapPrismaResumeToState);
        dispatch(setResumes(mappedResumes));
      } else {
        dispatch(setError(response.error || "Failed to fetch resumes"));
        toast.error(response.error || "Failed to fetch resumes");
      }
    } catch (error) {
      const errorMessage = "An error occurred while fetching resumes";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      console.error("Error fetching resumes:", error);
    } finally {
      dispatch(setLoading(false));
      setInitialFetchDone(true);
    }
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    fetchUserResumes();
  }, [fetchUserResumes]);

  const Mappedresumes = resumes.map(mapPrismaResumeToState);

  const handleDeleteResume = async (id: string) => {
    if (!currentUser) {
      console.error("No user logged in, cannot delete resume");
      return;
    }
    const response = await deleteResume(id, currentUser.id);

    if (response.success) {
      const response = await getUserResume(currentUser.id);
      const mappedResumes = response.data!.map(mapPrismaResumeToState);
      dispatch(setResumes(mappedResumes));
    }
    toast.success(response.message || "Resume deleted successfully");
  };

  const handleResumeCreated = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a resume title");
      return;
    }
    setCreating(true);
    try {
      const res = await createTitle(currentUser!.id, title);
      if (res.success) {
        toast.success("Resume created successfully!");
        setOpen(false);
        setTitle("");
        router.push(`/resume/${res.data!.id}`);

        setTimeout(() => {
          dispatch(addResume(mapPrismaResumeToState(res.data!)));
          setCreating(false);
        }, 100);
      } else {
        toast.error("Failed to create resume");
        setCreating(false);
      }
    } catch (error) {
      console.error(error);
      setCreating(false);
    }
  };

  if (!initialFetchDone || isLoading) {
    return (
      <div className="flex items-center justify-center  w-full mt-50">
        <ClipLoader color="#6a39c9" size="45px" />
      </div>
    );
  }

  if (error && resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px] text-red-600">
        <p className="mb-4">Error: {error}</p>
        <Button
          onClick={fetchUserResumes}
          className="bg-red-600 hover:bg-red-700"
        >
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between p-8 pt-10">
        <div className="text-gray-800 ">
          <h1 className="md:font-semibold text-md md:text-xl">My Resumes</h1>
          {resumes.length > 0 && currentUser ? (
            <p className="text-sm md:text-lg">Created {resumes.length} resumes</p>
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
      {resumes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
          {Mappedresumes.map((resume) => {
            const completionData = calculateResumeCompletion(resume);
            const completion = completionData.percentage;

            return (
              <div
                key={resume.id}
                onClick={() => {
                  setCardLoading(resume.id);
                  router.push(`/resume/${resume.id}`);
                }}
              >
                <ResumeSummaryCard
                  title={resume.title}
                  createdAt={resume.createdAt || ""}
                  updatedAt={resume.updatedAt || ""}
                  completion={completion}
                  sectionDetails={completionData.sectionDetails}
                  onDelete={() => handleDeleteResume(resume.id)}
                  isLoading={cardLoading === resume.id}
                  setCardLoading={setCardLoading}
                  resumeId={resume.id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center flex-col gap-3   text-violet-800   mt-20  ">
          <div className="rounded-full p-2 bg-fuchsia-50 border border-violet-500">
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
          onSubmit={handleResumeCreated}
          className=" space-y-5 md:space-y-8 bg-white p-4 sm:p-6 md:p-8  rounded-lg md:rounded-xl "
        >
          <p className=" text-gray-500 text-sm md:text-lg" >
            Give your resume a title to get started. You can customize
            everything later.
          </p>

          <div>
            <label className=" text-sm sm:text-md font-medium text-gray-700">Resume Title</label>
            <input
              type="text"
              name="title"
              value={title}
              disabled={creating}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Savad – Software Engineer"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            disabled={creating || !title.trim()}
          >
            {creating ? (
              <div className="flex items-center justify-center gap-2 text-sm sm:text-md">
                <ClipLoader color="#ffffff" size="16px" />
                Creating...
              </div>
            ) : (
              "Create Resume"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addProject,
  updateProject,
  removeProject,
} from "@/store/slices/resumeSlice";
import { Project } from "@/store/types/types";
import { addProjectsDb } from "@/app/action/formAction";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ClipLoader } from "react-spinners";

interface Props {
  next: () => void;
  previous: () => void;
  id: string;
}

const ProjectsForm = ({ next, previous, id }: Props) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projects } = useAppSelector((state) => state.resume);
  const { errors, showErrors, validateAndUpdateProgress, clearErrors } =
    useFormValidation("projects");

  const handleInputChange = (
    index: number,
    field: keyof Omit<Project, "id" | "resumeId">,
    value: string | string[]
  ) => {
    if (showErrors) {
      clearErrors();
    }

    const updatedProject = { ...projects[index], [field]: value };
    dispatch(updateProject({ index, project: updatedProject }));
  };

  const addProjectEntry = () => {
    const newProject: Project = {
      id: "",
      resumeId: id,
      title: "",
      description: "",
      github: "",
      live: "",
      startDate: "",
      endDate: "",
      technologies: [],
    };
    dispatch(addProject(newProject));
  };

  const removeProjectEntry = (index: number) => {
    if (projects.length > 1) {
      dispatch(removeProject(index));
    }
  };

  const handleTechnologiesChange = (index: number, techString: string) => {
    if (showErrors) {
      clearErrors();
    }

    const technologies = techString
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);
    handleInputChange(index, "technologies", technologies);
  };

  const handleBack = () => previous();
  const handleNext = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingNext(true);
    await saveProjects();
    setLoadingNext(false);
    next();
  };
  const handleSaveAndExit = async () => {
    if (!validateAndUpdateProgress()) {
      return;
    }
    setLoadingSave(true);
    await saveProjects();
    setLoadingSave(false);
    router.push("/dashboard");
  };

  const saveProjects = async () => {
    try {
      const projectData = projects
        .filter((proj) => proj.title?.trim() || proj.description?.trim())
        .map((proj) => ({
          resumeId: id,
          title: proj.title || null,
          description: proj.description || null,
          github: proj.github || null,
          live: proj.live || null,
          startDate: proj.startDate || null,
          endDate: proj.endDate || null,
          technologies: proj.technologies || [],
        }));

      await addProjectsDb(id, projectData);
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  };

  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Projects</h2>

      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50"
          >
            {projects.length > 1 && (
              <button
                onClick={() => removeProjectEntry(index)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title || ""}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none bg-white text-sm sm:text-base sm:rows-4"
                  placeholder="Describe your project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies?.join(", ") || ""}
                  onChange={(e) =>
                    handleTechnologiesChange(index, e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  placeholder="React, Node.js, MongoDB (separate with commas)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formatDateForInput(project.startDate)}
                    onChange={(e) =>
                      handleInputChange(index, "startDate", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formatDateForInput(project.endDate)}
                    onChange={(e) =>
                      handleInputChange(index, "endDate", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={project.github || ""}
                    onChange={(e) =>
                      handleInputChange(index, "github", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={project.live || ""}
                    onChange={(e) =>
                      handleInputChange(index, "live", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white text-sm sm:text-base"
                    placeholder="https://yourproject.live"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addProjectEntry}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </button>
        <ErrorDisplay errors={errors} showErrors={showErrors} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6 gap-4 sm:gap-0">
        <button
          onClick={handleBack}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer text-sm sm:text-base w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          Back
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-200 cursor-pointer text-sm sm:text-base"
          >
            {loadingSave ? (
              <>
                <ClipLoader size={20} className="sm:w-[22px] sm:h-[22px]" />
                <span className="hidden sm:inline">saving..</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Save & Exit</span>
                <span className="sm:hidden">Save</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium cursor-pointer text-sm sm:text-base"
          >
            {loadingNext ? (
              <>
                <ClipLoader size={20} className="sm:w-[22px] sm:h-[22px]" color="white" />
                <span className="hidden sm:inline">saving..</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Continue</span>
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
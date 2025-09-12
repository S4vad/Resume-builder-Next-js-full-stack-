import React, { useState } from "react";
import { ChevronLeft, Save, ChevronRight, Plus, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addProject,
  updateProject,
  removeProject,
} from "@/store/slices/resumeSlice";
import { Project } from "@/types/types";
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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h2>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-6 bg-gray-50"
          >
            {projects.length > 1 && (
              <button
                onClick={() => removeProjectEntry(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            )}

            <div className="space-y-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                  placeholder="React, Node.js, MongoDB (separate with commas)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors bg-white"
                    placeholder="https://yourproject.live"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addProjectEntry}
          className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
        >
          <Plus size={18} />
          Add Project
        </button>
        <ErrorDisplay errors={errors} showErrors={showErrors} />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-200 cursor-pointer"
          >
            {loadingSave ? (
              <>
                <ClipLoader size={22} />
                saving..
              </>
            ) : (
              <>
                <Save size={18} />
                Save & Exit
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium cursor-pointer"
          >
            {loadingNext ? (
              <>
                <ClipLoader size={22} color="white" />
                saving..
              </>
            ) : (
              <>
                Next
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;

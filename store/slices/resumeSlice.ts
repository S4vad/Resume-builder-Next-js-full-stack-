import {
  ResumeState,
  Experience,
  Education,
  Certification,
  Project,
} from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: ResumeState = {
  id: "",
  userId: "",
  title: "",
  full_name: "",
  designation: "",
  templateName: "templateOne",
  summary: "",
  address: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  skills: [],
  languages: [],
  intrests: [],
  experience: [],
  educations: [],
  projects: [],
  certifications: [],
  progression: 0,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: { ...initialState, isLoading: false, error: "" },
  reducers: {
    // Basic info actions
    updateBasicInfo: (
      state,
      action: PayloadAction<
        Partial<
          Pick<
            ResumeState,
            | "full_name"
            | "designation"
            | "summary"
            | "address"
            | "email"
            | "phone"
            | "linkedin"
            | "github"
            | "portfolio"
          >
        >
      >
    ) => {
      Object.assign(state, action.payload);
    },

    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },

    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },

    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },

    addLanguage: (state, action: PayloadAction<string>) => {
      if (!state.languages.includes(action.payload)) {
        state.languages.push(action.payload);
      }
    },

    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (lang) => lang !== action.payload
      );
    },

    updateLanguages: (state, action: PayloadAction<string[]>) => {
      state.languages = action.payload;
    },
    addInterest: (state, action: PayloadAction<string>) => {
      if (!state.intrests.includes(action.payload)) {
        state.intrests.push(action.payload);
      }
    },

    removeInterest: (state, action: PayloadAction<string>) => {
      state.intrests = state.intrests.filter(
        (interest) => interest !== action.payload
      );
    },

    updateInterests: (state, action: PayloadAction<string[]>) => {
      state.intrests = action.payload;
    },

    setExperiencesRedux: (state, action: PayloadAction<Experience[]>) => {
      state.experience = action.payload;
    },

    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },

    updateExperience: (
      state,
      action: PayloadAction<{ index: number; experience: Experience }>
    ) => {
      const { index, experience } = action.payload;
      if (state.experience[index]) {
        state.experience[index] = experience;
      }
    },

    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience.splice(action.payload, 1);
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload);
    },

    setEducations: (state, action: PayloadAction<Education[]>) => {
      state.educations = action.payload;
    },

    updateEducation: (
      state,
      action: PayloadAction<{ index: number; education: Education }>
    ) => {
      const { index, education } = action.payload;
      if (state.educations[index]) {
        state.educations[index] = education;
      }
    },

    // Project actions
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    updateProject: (
      state,
      action: PayloadAction<{ index: number; project: Project }>
    ) => {
      const { index, project } = action.payload;
      if (state.projects[index]) {
        state.projects[index] = project;
      }
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },

    removeEducation: (state, action: PayloadAction<number>) => {
      state.educations.splice(action.payload, 1);
    },

    addCertification: (state, action: PayloadAction<Certification>) => {
      state.certifications.push(action.payload);
    },
    setCertifications: (state, action: PayloadAction<Certification[]>) => {
      state.certifications = action.payload;
    },

    updateCertification: (
      state,
      action: PayloadAction<{ index: number; certification: Certification }>
    ) => {
      const { index, certification } = action.payload;
      if (state.certifications[index]) {
        state.certifications[index] = certification;
      }
    },

    removeCertification: (state, action: PayloadAction<number>) => {
      state.certifications.splice(action.payload, 1);
    },

    updateProgression: (state, action: PayloadAction<number>) => {
      state.progression = Math.max(0, Math.min(100, action.payload));
    },

    incrementProgress: (state, action: PayloadAction<number>) => {
      state.progression = Math.min(100, state.progression! + action.payload);
    },

    setTemplateName: (state, action: PayloadAction<string>) => {
      state.templateName = action.payload;
    },

    // Load complete resume data
    loadResume: (state, action: PayloadAction<Partial<ResumeState>>) => {
      return { ...state, ...action.payload };
    },

    // Clear specific sections
    clearExperience: (state) => {
      state.experience = [];
    },

    clearEducation: (state) => {
      state.educations = [];
    },

    clearProjects: (state) => {
      state.projects = [];
    },

    clearCertifications: (state) => {
      state.certifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | "">) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateBasicInfo,
  updateTitle,
  addSkill,
  removeSkill,
  updateSkills,
  addLanguage,
  removeLanguage,
  updateLanguages,
  addInterest,
  removeInterest,
  setCertifications,
  setProjects,
  updateInterests,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  setEducations,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  updateProgression,
  incrementProgress,
  setTemplateName,
  loadResume,
  setLoading,
  setError,
  clearExperience,
  clearEducation,
  clearProjects,
  clearCertifications,
  setExperiencesRedux,
} = resumeSlice.actions;

export default resumeSlice.reducer;

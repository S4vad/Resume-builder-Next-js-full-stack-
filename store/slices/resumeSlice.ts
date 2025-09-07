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
  templateId: "",
  summary: "",
  address: "",
  email: "",
  phone: "",
  linkdin: "",
  github: "",
  portfolio: "",
  skills: [],
  languages: [],
  intrests: [],
  experience: [],
  education: [],
  project: [],
  certification: [],
  progression: 0,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
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
            | "linkdin"
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
      state.education.push(action.payload);
    },

    updateEducation: (
      state,
      action: PayloadAction<{ index: number; education: Education }>
    ) => {
      const { index, education } = action.payload;
      if (state.education[index]) {
        state.education[index] = education;
      }
    },

    // Project actions
    addProject: (state, action: PayloadAction<Project>) => {
      state.project.push(action.payload);
    },

    updateProject: (
      state,
      action: PayloadAction<{ index: number; project: Project }>
    ) => {
      const { index, project } = action.payload;
      if (state.project[index]) {
        state.project[index] = project;
      }
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.project.splice(action.payload, 1);
    },

    removeEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1);
    },

    addCertification: (state, action: PayloadAction<Certification>) => {
      state.certification.push(action.payload);
    },

    updateCertification: (
      state,
      action: PayloadAction<{ index: number; certification: Certification }>
    ) => {
      const { index, certification } = action.payload;
      if (state.certification[index]) {
        state.certification[index] = certification;
      }
    },

    removeCertification: (state, action: PayloadAction<number>) => {
      state.certification.splice(action.payload, 1);
    },

    updateProgression: (state, action: PayloadAction<number>) => {
      state.progression = Math.max(0, Math.min(100, action.payload));
    },

    incrementProgress: (state, action: PayloadAction<number>) => {
      state.progression = Math.min(100, state.progression! + action.payload);
    },

    setTemplateId: (state, action: PayloadAction<string>) => {
      state.templateId = action.payload;
    },

    // Load complete resume data
    loadResume: (state, action: PayloadAction<Partial<ResumeState>>) => {
      return { ...state, ...action.payload };
    },

    // Reset resume
    resetResume: () => initialState,

    // Clear specific sections
    clearExperience: (state) => {
      state.experience = [];
    },

    clearEducation: (state) => {
      state.education = [];
    },

    clearProjects: (state) => {
      state.project = [];
    },

    clearCertifications: (state) => {
      state.certification = [];
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
  updateInterests,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  updateProgression,
  incrementProgress,
  setTemplateId,
  loadResume,
  resetResume,
  clearExperience,
  clearEducation,
  clearProjects,
  clearCertifications,
} = resumeSlice.actions;

export default resumeSlice.reducer;

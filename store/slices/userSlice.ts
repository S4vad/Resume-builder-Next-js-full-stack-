import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResumeState } from "@/store/types/types";

export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  resumes: ResumeState[];
  selectedResumeId: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  resumes: [],
  selectedResumeId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.resumes = []; // Clear resumes when user logs out
      state.selectedResumeId = null;
    },

    addResume: (state, action: PayloadAction<ResumeState>) => {
      state.resumes.push(action.payload);
    },

    removeResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter((r) => r.id !== action.payload);
      if (state.selectedResumeId === action.payload) {
        state.selectedResumeId = null;
      }
    },

    selectResume: (state, action: PayloadAction<string>) => {
      state.selectedResumeId = action.payload;
    },

    updateResume: (state, action: PayloadAction<ResumeState>) => {
      const index = state.resumes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },

    setResumes: (state, action: PayloadAction<ResumeState[]>) => {
      state.resumes = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  addResume,
  removeResume,
  selectResume,
  updateResume,
  setResumes,
  setLoading,
  setError,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;

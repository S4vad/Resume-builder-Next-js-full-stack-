import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Template {
  id: string
  name: string
  preview: string
}

interface TemplateState {
  templates: Template[]
  selectedTemplate: Template | null
  isLoading: boolean
  error: string | null
}

const initialState: TemplateState = {
  templates: [],
  selectedTemplate: null,
  isLoading: false,
  error: null,
}

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload
      state.error = null
    },

    addTemplate: (state, action: PayloadAction<Template>) => {
      state.templates.push(action.payload)
    },

    selectTemplate: (state, action: PayloadAction<Template>) => {
      state.selectedTemplate = action.payload
    },

    clearSelectedTemplate: (state) => {
      state.selectedTemplate = null
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },


  },
})

export const {
  setTemplates,
  addTemplate,
  selectTemplate,
  clearSelectedTemplate,
  setLoading,
  setError,
} = templateSlice.actions

export default templateSlice.reducer
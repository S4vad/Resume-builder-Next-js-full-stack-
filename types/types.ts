export interface Experience {
  id?: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id?: string
  degree: string
  institute: string
  startDate: string
  endDate: string
}

export interface Project {
  id?: string
  title: string
  description: string
  github: string
  live: string
}

export interface Certification {
  id?: string
  title: string
  year: string
  link: string
}

export interface ResumeState {
  id?: string
  userId?: string
  templateId?: string
  title: string
  full_name: string
  desigination: string
  summary: string
  address: string
  email: string
  phone: string
  linkdin: string
  github: string
  portfolio: string
  skills: string[]
  languages: string[]
  intrests: string[]
  experience: Experience[]
  education: Education[]
  project: Project[]
  certification: Certification[]
  progression: number
  isLoading: boolean
  error: string | null
}
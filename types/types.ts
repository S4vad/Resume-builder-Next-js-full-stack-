import type {
  Resume as PrismaResume,
  Experience as PrismaExperience,
  Education as PrismaEducation,
  Project as PrismaProject,
  Certification as PrismaCertification,
  Template as PrismaTemplate,
} from "@prisma/client";

// Use Prisma types directly for basic entities
export type Experience = PrismaExperience;
export type Education = PrismaEducation;
export type Project = PrismaProject;
export type Certification = PrismaCertification;
export type Template = PrismaTemplate;

// Extend Prisma Resume for frontend-specific needs
export interface ResumeState
  extends Omit<PrismaResume, "createdAt" | "updatedAt"> {
  // Add relations manually
  experience: Experience[];
  education: Education[];
  project: Project[];
  certification: Certification[];

  // Convert dates to strings for frontend
  createdAt?: string;
  updatedAt?: string;
}

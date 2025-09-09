import type {
  Resume as PrismaResume,
  Experience as PrismaExperience,
  Education as PrismaEducation,
  Project as PrismaProject,
  Certification as PrismaCertification,
  Template as PrismaTemplate,
} from "@prisma/client";

// Use Prisma types directly for basic entities
export type Experience = Omit<PrismaExperience, "createdAt" | "updatedAt">;
export type Education = Omit<PrismaEducation, "createdAt" | "updatedAt">;
export type Project = Omit<PrismaProject, "createdAt" | "updatedAt">;
export type Certification = Omit<
  PrismaCertification,
  "createdAt" | "updatedAt"
>;

export type Template = PrismaTemplate;

// Extend Prisma Resume for frontend-specific needs
export interface ResumeState
  extends Omit<PrismaResume, "createdAt" | "updatedAt"> {
  // Add relations manually
  experience: Experience[];
  educations: Education[];
  projects: Project[];
  certifications: Certification[];

  // Convert dates to strings for frontend
  createdAt?: string;
  updatedAt?: string;
}

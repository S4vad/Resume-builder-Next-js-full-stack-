import { ResumeState } from "@/store/types/types";

export default function mapPrismaResumeToState(
  resume: ResumeState
): ResumeState {
  return {
    ...resume,
    createdAt: resume.createdAt
      ? new Date(resume.createdAt).toISOString()
      : undefined,
    updatedAt: resume.updatedAt
      ? new Date(resume.updatedAt).toISOString()
      : undefined,
  };
}

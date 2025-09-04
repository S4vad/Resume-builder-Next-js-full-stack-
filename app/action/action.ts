"use server";
import { prisma } from "../../lib/prisma";
import type { Resume } from "@prisma/client"; //types created prisma auto
import mapPrismaResumeToState from "@/lib/map";

export async function getUserResume(
  userId: string
): Promise<{ success: boolean; data?: Resume[]; error?: string }> {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId },
      include: {
        template: true,
        experience: { orderBy: { startDate: "desc" } },
        education: { orderBy: { startDate: "desc" } },
        project: true,
        certification: { orderBy: { year: "desc" } },
      },
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: resumes };
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return { success: false, error: "Failed to fetch resumes" };
  }
}

export async function createTitle(userId: string, title: string) {
  try {
    const resume = await prisma.resume.create({
      data: {
        userId,
        title,
      },
    });
    const serialized = mapPrismaResumeToState(resume);

    return { success: true, data: serialized };
  } catch (error) {
    console.error("Error creating resume:", error);
    return { success: false, error: "Failed to create resume" };
  }
}

export async function deleteResume(resumeId: string, userId: string) {
  try {
    await prisma.resume.delete({
      where: { id: resumeId },
    });

    const resumes = await prisma.resume.findMany({
      where: { userId },
    });

    // map before returning
    const serialized = resumes.map(mapPrismaResumeToState);

    return {
      success: true,
      message: "Resume deleted successfully!",
      data: serialized,
    };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: "Failed to delete resume" };
  }
}

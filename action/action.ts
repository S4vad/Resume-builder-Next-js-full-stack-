"use server";
import { prisma } from "../lib/prisma";
import type { Resume } from "@prisma/client"; //types created prisma auto

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
      data: { userId, title },
    });

    return {
      success: true,
      data: resume,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create resume" };
  }
}

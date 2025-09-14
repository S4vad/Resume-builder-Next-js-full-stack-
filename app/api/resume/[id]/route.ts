import mapPrismaResumeToState from "@/lib/map";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const response = await prisma.resume.findUnique({
      where: { id },
      include: {
        experience: {
          orderBy: { createdAt: "desc" },
        },
        educations: {
          orderBy: { createdAt: "desc" },
        },
        projects: {
          orderBy: { createdAt: "desc" },
        },
        certifications: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume not found",
        },
        { status: 404 }
      );
    }

    const resume = mapPrismaResumeToState(response);
    return NextResponse.json({ success: true, data: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch resume",
      },
      { status: 500 }
    );
  }
}

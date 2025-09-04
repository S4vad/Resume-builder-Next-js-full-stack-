import mapPrismaResumeToState from "@/lib/map";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const response = await prisma.resume.findUnique({ where: { id: params.id } });
  const resume=mapPrismaResumeToState(response)
  return NextResponse.json({success:true,data:resume});
}

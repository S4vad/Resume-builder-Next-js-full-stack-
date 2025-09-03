import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const resume = await prisma.resume.findUnique({ where: { id: params.id } });
  return NextResponse.json({success:true,data:resume});
}

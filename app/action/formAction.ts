"use server";

import { prisma } from "@/lib/prisma";
import { Education, Experience } from "@/types/types";

interface UpdateResumeData {
  full_name?: string;
  designation?: string;
  summary?: string;
}

export async function updatePersonalInfo(id: string, data: UpdateResumeData) {
  try {
    const updated = await prisma.resume.update({
      where: { id },
      data: {
        full_name: data.full_name,
        designation: data.designation,
        summary: data.summary,
  
      },
    });
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, error };
  }
}

interface updateContactInfoProps {
  address: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export async function updateContactInfo(
  id: string,
  data: updateContactInfoProps
) {
  try {
    const updated = await prisma.resume.update({
      where: { id },
      data: {
        address: data.address,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        github: data.github,
        portfolio: data.portfolio,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.log("error updating contact info", error);
    return { success: false, error };
  }
}

export async function addExperiencesDb(
  resumeId: string,
  experiences: Experience[]
) {
  try {
    await prisma.experience.deleteMany({
      where: { resumeId },
    });

    const created = await prisma.experience.createMany({
      data: experiences.map((exp) => ({
        resumeId,
        company: exp.company || null,
        role: exp.role || null,
        location: exp.location || null,
        startDate: exp.startDate ? exp.startDate : null,
        endDate: exp.endDate ? exp.endDate : null,
        description: exp.description || null,
      })),
    });
    console.log(created, "from server");

    return { success: true, count: created.count };
  } catch (error) {
    console.error("Error adding experiences:", error);
    return { success: false, error };
  }
}

export async function addEducationsDb(
  resumeId: string,
  educations: Education[]
) {
  try {
    await prisma.education.deleteMany({
      where: { resumeId },
    });

    const created = await prisma.education.createMany({
      data: educations.map((edu) => ({
        resumeId,
        degree: edu.degree || null,
        institute: edu.institute || null,
        startDate: edu.startDate ? edu.startDate : null,
        endDate: edu.endDate ? edu.endDate : null,
      })),
    });

    return { success: true, count: created.count };
  } catch (error) {
    console.error("Error adding educations:", error);
    return { success: false, error };
  }
}

export async function addProjectsDb(resumeId: string, projects: Project[]) {
  try {
    await prisma.project.deleteMany({
      where: { resumeId },
    });

    const created = await prisma.project.createMany({
      data: projects.map((proj) => ({
        resumeId,
        title: proj.title || null,
        description: proj.description || null,
        github: proj.github || null,
        live: proj.live || null,
        startDate: proj.startDate || null,
        endDate: proj.endDate || null,
        technologies: proj.technologies || [],
      })),
    });

    return { success: true, count: created.count };
  } catch (error) {
    console.error("Error adding projects:", error);
    return { success: false, error };
  }
}

export async function addCertificationsDb(
  resumeId: string,
  certifications: Certification[]
) {
  try {
    await prisma.certification.deleteMany({
      where: { resumeId },
    });

    const created = await prisma.certification.createMany({
      data: certifications.map((cert) => ({
        resumeId,
        title: cert.title || null,
        year: cert.year || null,
        link: cert.link || null,
      })),
    });

    return { success: true, count: created.count };
  } catch (error) {
    console.error("Error adding certifications:", error);
    return { success: false, error };
  }
}

export async function updateSkillsDb(resumeId: string, skills: string[]) {
  try {
    const cleanSkills = skills
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: { skills: cleanSkills },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating skills:", error);
    return { success: false, error };
  }
}

export async function updateInterestsDb(resumeId: string, interests: string[]) {
  try {
    const cleanInterests = interests
      .map((interest) => interest.trim())
      .filter((interest) => interest.length > 0);

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: { intrests: cleanInterests },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating interests:", error);
    return { success: false, error };
  }
}

export async function updateLanguagesDb(resumeId: string, languages: string[]) {
  try {
    const cleanLanguages = languages
      .map((lang) => lang.trim())
      .filter((lang) => lang.length > 0);

    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: { languages: cleanLanguages },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating languages:", error);
    return { success: false, error };
  }
}

import { ResumeState } from "@/store/types/types";

export interface CompletionDetails {
  percentage: number;
  completedFields: number;
  totalFields: number;
  sectionDetails: {
    [key: string]: {
      completed: number;
      total: number;
      percentage: number;
    };
  };
}

export const calculateResumeCompletion = (
  resume: ResumeState
): CompletionDetails => {
  let completedFields = 0;
  let totalFields = 0;
  const sectionDetails: {
    [key: string]: { completed: number; total: number; percentage: number };
  } = {};

  let profileCompleted = 0;
  const profileTotal = 3;

  if (resume.full_name?.trim()) profileCompleted++;
  if (resume.designation?.trim()) profileCompleted++;
  if (resume.summary?.trim()) profileCompleted++;

  sectionDetails["personal"] = {
    completed: profileCompleted,
    total: profileTotal,
    percentage: Math.round((profileCompleted / profileTotal) * 100),
  };

  completedFields += profileCompleted;
  totalFields += profileTotal;

  let contactCompleted = 0;
  const contactTotal = 6;

  if (resume.email?.trim()) contactCompleted++;
  if (resume.phone?.trim()) contactCompleted++;
  if (resume.address?.trim()) contactCompleted++;
  if (resume.linkedin?.trim()) contactCompleted++;
  if (resume.github?.trim()) contactCompleted++;
  if (resume.portfolio?.trim()) contactCompleted++;

  sectionDetails["contact"] = {
    completed: contactCompleted,
    total: contactTotal,
    percentage: Math.round((contactCompleted / contactTotal) * 100),
  };

  completedFields += contactCompleted;
  totalFields += contactTotal;

  let experienceCompleted = 0;
  let experienceTotal;
  if (resume.experience) {
    experienceTotal = resume.experience.length * 5;
    resume.experience.forEach((exp) => {
      if (exp.company?.trim()) experienceCompleted++;
      if (exp.role?.trim()) experienceCompleted++;
      if (exp.startDate) experienceCompleted++;
      if (exp.endDate) experienceCompleted++;
      if (exp.description?.trim()) experienceCompleted++;
    });
  }

  if (experienceTotal === 0) {
    experienceTotal = 5; // At least one experience required
  }

  sectionDetails["experience"] = {
    completed: experienceCompleted,
    total: experienceTotal,
    percentage: Math.round((experienceCompleted / experienceTotal) * 100),
  };

  completedFields += experienceCompleted;
  totalFields += experienceTotal;

  let educationCompleted = 0;
  let educationTotal;
  if (resume.educations) {
    educationTotal = resume.educations.length * 4;

    resume.educations.forEach((edu) => {
      if (edu.degree?.trim()) educationCompleted++;
      if (edu.institute?.trim()) educationCompleted++;
      if (edu.startDate) educationCompleted++;
      if (edu.endDate) educationCompleted++;
    });
    if (educationTotal === 0) {
      educationTotal = 4; // At least one education required
    }
  }

  sectionDetails["education"] = {
    completed: educationCompleted,
    total: educationTotal,
    percentage: Math.round((educationCompleted / educationTotal) * 100),
  };

  completedFields += educationCompleted;
  totalFields += educationTotal;

  let skillsCompleted = 0;
  let skillsTotal = resume.skills.length;

  resume.skills.forEach((skill) => {
    if (skill?.trim()) skillsCompleted++;
  });

  if (skillsTotal === 0) {
    skillsTotal = 3; // Require at least 3 skills
  }

  sectionDetails["skills"] = {
    completed: skillsCompleted,
    total: skillsTotal,
    percentage: Math.round((skillsCompleted / skillsTotal) * 100),
  };

  completedFields += skillsCompleted;
  totalFields += skillsTotal;

  let projectsCompleted = 0;
  let projectsTotal;
  if (resume.projects) {
    projectsTotal = resume.projects.length * 4;
    resume.projects.forEach((project) => {
      if (project.title?.trim()) projectsCompleted++;
      if (project.description?.trim()) projectsCompleted++;
      if (project.github?.trim()) projectsCompleted++;
      if (project.live?.trim()) projectsCompleted++;
    });

    if (projectsTotal === 0) {
      projectsTotal = 4; // At least one project required
    }
  }

  sectionDetails["projects"] = {
    completed: projectsCompleted,
    total: projectsTotal,
    percentage: Math.round((projectsCompleted / projectsTotal) * 100),
  };

  completedFields += projectsCompleted;
  totalFields += projectsTotal;

  let certificationsCompleted = 0;
  let certificationsTotal;
  if (resume.certifications) {
    certificationsTotal = resume.certifications.length * 3;
    resume.certifications.forEach((cert) => {
      if (cert.title?.trim()) certificationsCompleted++;
      if (cert.year?.trim()) certificationsCompleted++;
      if (cert.link?.trim()) certificationsCompleted++;
    });

    if (certificationsTotal === 0) {
      certificationsTotal = 3; // At least one certification required
    }
  }

  sectionDetails["certifications"] = {
    completed: certificationsCompleted,
    total: certificationsTotal,
    percentage: Math.round(
      (certificationsCompleted / certificationsTotal) * 100
    ),
  };

  completedFields += certificationsCompleted;
  totalFields += certificationsTotal;

  // Languages
  let languagesCompleted = 0;
  let languagesTotal;
  if (resume.languages) {
    languagesTotal = resume.languages.length;

    resume.languages.forEach((lang) => {
      if (lang?.trim()) languagesCompleted++;
    });

    if (languagesTotal === 0) {
      languagesTotal = 1;
    }
  }

  // Additional (Languages + Interests combined)
  let additionalCompleted = 0;
  let additionalTotal = 2; // 1 language + 1 interest → 2 total fields

  const hasLanguage = resume.languages.some((lang) => lang?.trim() !== "");
  const hasInterest = resume.intrests.some(
    (interest) => interest?.trim() !== ""
  );

  if (hasLanguage) additionalCompleted++;
  if (hasInterest) additionalCompleted++;

  sectionDetails["additional"] = {
    completed: additionalCompleted,
    total: additionalTotal,
    percentage: Math.round((additionalCompleted / additionalTotal) * 100),
  };

  completedFields += additionalCompleted;
  totalFields += additionalTotal;

  // Overall
  const percentage =
    totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  return {
    percentage,
    completedFields,
    totalFields,
    sectionDetails,
  };
};

// Helper function to get section-specific completion
export const getSectionCompletion = (
  resume: ResumeState,
  sectionName: string
): number => {
  const completion = calculateResumeCompletion(resume);
  return completion.sectionDetails[sectionName]?.percentage || 0;
};

// Helper function to determine step completion levels
export const getStepCompletionLevels = (resume: ResumeState) => {
  const completion = calculateResumeCompletion(resume);

  return {
    personal: completion.sectionDetails["personal"]?.percentage || 0,
    contact: completion.sectionDetails["contact"]?.percentage || 0,
    experience: completion.sectionDetails["experience"]?.percentage || 0,
    education: completion.sectionDetails["education"]?.percentage || 0,
    skills: completion.sectionDetails["skills"]?.percentage || 0,
    projects: completion.sectionDetails["projects"]?.percentage || 0,
    certifications:
      completion.sectionDetails["certifications"]?.percentage || 0,
    additional: completion.sectionDetails["additional"]?.percentage || 0,
    overall: completion.percentage,
  };
};

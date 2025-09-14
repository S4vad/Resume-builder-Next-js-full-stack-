import { ResumeState } from "@/store/types/types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePersonalInfo = (resume: ResumeState): ValidationResult => {
  const errors: string[] = [];

  if (!resume.full_name?.trim()) {
    errors.push("Full Name is required");
  }

  if (!resume.designation?.trim()) {
    errors.push("Designation is required");
  }

  if (!resume.summary?.trim()) {
    errors.push("Summary is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateContactInfo = (resume: ResumeState): ValidationResult => {
  const errors: string[] = [];

  if (!resume.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(resume.email)) {
    errors.push("Valid email is required");
  }

  if (!resume.phone?.trim()) {
    errors.push("Phone number is required");
  } else if (!/^\d{10,15}$/.test(resume.phone.replace(/\D/g, ""))) {
    errors.push("Valid phone number is required (10-15 digits)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateWorkExperience = (
  resume: ResumeState
): ValidationResult => {
  const errors: string[] = [];

  if (resume.experience.length === 0) {
    errors.push("At least one work experience is required");
    return { isValid: false, errors };
  }

  resume.experience.forEach((exp, index) => {
    if (!exp.company?.trim()) {
      errors.push(`Company is required in experience ${index + 1}`);
    }

    if (!exp.role?.trim()) {
      errors.push(`Role is required in experience ${index + 1}`);
    }

    if (!exp.startDate) {
      errors.push(`Start date is required in experience ${index + 1}`);
    }

    if (!exp.endDate) {
      errors.push(`End date is required in experience ${index + 1}`);
    }

    if (!exp.description?.trim()) {
      errors.push(`Description is required in experience ${index + 1}`);
    }

    // Validate date order
    if (
      exp.startDate &&
      exp.endDate &&
      new Date(exp.startDate) >= new Date(exp.endDate)
    ) {
      errors.push(
        `End date must be after start date in experience ${index + 1}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEducation = (resume: ResumeState): ValidationResult => {
  const errors: string[] = [];

  if (resume.educations.length === 0) {
    errors.push("At least one education entry is required");
    return { isValid: false, errors };
  }

  resume.educations.forEach((edu, index) => {
    if (!edu.degree?.trim()) {
      errors.push(`Degree is required in education ${index + 1}`);
    }

    if (!edu.institute?.trim()) {
      errors.push(`Institution is required in education ${index + 1}`);
    }

    if (!edu.startDate) {
      errors.push(`Start date is required in education ${index + 1}`);
    }

    if (!edu.endDate) {
      errors.push(`End date is required in education ${index + 1}`);
    }

    // Validate date order
    if (
      edu.startDate &&
      edu.endDate &&
      new Date(edu.startDate) >= new Date(edu.endDate)
    ) {
      errors.push(
        `End date must be after start date in education ${index + 1}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateProjects = (resume: ResumeState): ValidationResult => {
  const errors: string[] = [];

  if (resume.projects.length === 0) {
    errors.push("At least one project is required");
    return { isValid: false, errors };
  }

  resume.projects.forEach((project, index) => {
    if (!project.title?.trim()) {
      errors.push(`Project title is required in project ${index + 1}`);
    }

    if (!project.description?.trim()) {
      errors.push(`Project description is required in project ${index + 1}`);
    }

    // Validate URLs if provided
    if (project.github && !isValidUrl(project.github)) {
      errors.push(`Valid GitHub URL is required in project ${index + 1}`);
    }

    if (project.live && !isValidUrl(project.live)) {
      errors.push(`Valid live demo URL is required in project ${index + 1}`);
    }

    if (
      project.startDate &&
      project.endDate &&
      new Date(project.startDate) >= new Date(project.endDate)
    ) {
      errors.push(`End date must be after start date in project ${index + 1}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateCertifications = (
  resume: ResumeState
): ValidationResult => {
  const errors: string[] = [];

  resume.certifications.forEach((cert, index) => {
    if (!cert.title?.trim()) {
      errors.push(
        `Certification title is required in certification ${index + 1}`
      );
    }

    if (
      cert.year &&
      (isNaN(Number(cert.year)) ||
        Number(cert.year) < 1900 ||
        Number(cert.year) > new Date().getFullYear() + 10)
    ) {
      errors.push(`Valid year is required in certification ${index + 1}`);
    }

    if (cert.link && !isValidUrl(cert.link)) {
      errors.push(
        `Valid certificate URL is required in certification ${index + 1}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAdditionalInfo = (
  resume: ResumeState
): ValidationResult => {
  const errors: string[] = [];

  if (resume.languages.length === 0) {
    errors.push("At least one language is required");
  }

  if (resume.intrests.length === 0) {
    errors.push("At least one interest is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSkills = (resume: ResumeState): ValidationResult => {
  const errors: string[] = [];

  if (resume.skills.length < 4) {
    errors.push("At least four skill is required");
    return { isValid: false, errors };
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Main validation function that determines which validation to use based on form type
export const validateFormStep = (
  formType: string,
  resume: ResumeState
): ValidationResult => {
  switch (formType) {
    case "personal":
      return validatePersonalInfo(resume);
    case "contact":
      return validateContactInfo(resume);
    case "experience":
      return validateWorkExperience(resume);
    case "education":
      return validateEducation(resume);
    case "projects":
      return validateProjects(resume);
    case "certifications":
      return validateCertifications(resume);
    case "skills":
      return validateSkills(resume);
    case "additional":
      return validateAdditionalInfo(resume);
    default:
      return { isValid: true, errors: [] };
  }
};

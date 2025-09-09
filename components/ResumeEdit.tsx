"use client";
import React, { useEffect, useState } from "react";
import PersonalInformationForm from "./editPages/PersonalInfo";
import ContactInformationForm from "./editPages/ContactInfo";
import WorkExperienceForm from "./editPages/Experience";
import EducationForm from "./editPages/Education";
import ProjectsForm from "./editPages/Projects";
import CertificationsForm from "./editPages/Certification";
import SkillsForm from "./editPages/Skills";
import AdditionalInfoForm from "./editPages/AdditionalInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addCertification,
  addEducation,
  addExperience,
  addProject,
  loadResume,
  setCertifications,
  setEducations,
  setExperiencesRedux,
  setLoading,
  setProjects,
  updateInterests,
  updateLanguages,
  updateSkills,
} from "@/store/slices/resumeSlice";
import { Certification, Education, Experience, Project } from "@/types/types";

const ResumeEdit = ({ id }: { id: string }) => {
  const [page, setPage] = useState<number | null>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchResume = async () => {
      try {
        const response = await fetch(`/api/resume/${id}`);
        if (!response.ok) return;

        const { success, data } = await response.json();

        if (success && data) {
          dispatch(loadResume(data));

          if (data.skills && data.skills.length > 0) {
            dispatch(updateSkills(data.skills));
          }
          if (data.intrests && data.intrests.length > 0) {
            dispatch(updateInterests(data.intrests));
          }

          if (data.languages && data.languages.length > 0) {
            dispatch(updateLanguages(data.languages));
          }
        }

        if (data.experience?.length > 0) {
          dispatch(setExperiencesRedux(data.experience as Experience[]));
        } else {
          // If no experience exists, add default one
          const defaultExperience: Experience = {
            id: "0",
            resumeId: id,
            company: "",
            role: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          };
          dispatch(addExperience(defaultExperience));
        }

        if (data.educations && data.educations.length > 0) {
          dispatch(setEducations(data.educations as Education[]));
        } else {
          const defaultEducation: Education = {
            id: "0",
            resumeId: id,
            degree: "",
            institute: "",
            startDate: "",
            endDate: "",
          };
          dispatch(addEducation(defaultEducation));
        }

        if (data.projects && data.projects.length > 0) {
          dispatch(setProjects(data.projects as Project[]));
        } else {
          const defaultProject: Project = {
            id: "0",
            resumeId: id,
            title: "",
            description: "",
            github: "",
            live: "",
            startDate: "",
            endDate: "",
            technologies: [],
          };
          dispatch(addProject(defaultProject));
        }

        // Initialize Certifications
        if (data.certifications && data.certifications.length > 0) {
          dispatch(setCertifications(data.certifications as Certification[]));
        } else {
          const defaultCertification: Certification = {
            id: "0",
            resumeId: id,
            title: "",
            year: "",
            link: "",
          };
          dispatch(addCertification(defaultCertification));
        }
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (id) fetchResume();
  }, [id, dispatch]);

  const next = () => setPage((prev) => (prev !== null ? prev + 1 : 1));
  const previous = () => setPage((prev) => (prev !== null ? prev - 1 : 1));

  const currentForm = (page: number) => {
    switch (page) {
      case 1:
        return (
          <PersonalInformationForm next={next} previous={previous} id={id} />
        );
      case 2:
        return (
          <ContactInformationForm next={next} previous={previous} id={id} />
        );
      case 3:
        return <WorkExperienceForm next={next} previous={previous} id={id} />;
      case 4:
        return <EducationForm next={next} previous={previous} id={id} />;
      case 5:
        return <ProjectsForm next={next} previous={previous} id={id} />;
      case 6:
        return <CertificationsForm next={next} previous={previous} id={id} />;
      case 7:
        return <SkillsForm next={next} previous={previous} id={id} />;
      case 8:
        return <AdditionalInfoForm next={next} previous={previous} id={id} />;
      default:
        return (
          <PersonalInformationForm next={next} previous={previous} id={id} />
        );
    }
  };

  return <div>{currentForm(page)}</div>;
};

export default ResumeEdit;

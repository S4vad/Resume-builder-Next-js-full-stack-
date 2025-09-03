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

const ResumeEdit = ({ id }: { id: string }) => {
  const [page, setPage] = useState<number | null>(null);

  useEffect(() => {
    const savedPage = localStorage.getItem("pageNumber");
    if (savedPage) {
      setPage(JSON.parse(savedPage));
    } else {
      setPage(1);
    }
  }, []);

  useEffect(() => {
    if (page !== null) {
      localStorage.setItem("pageNumber", JSON.stringify(page));
    }
  }, [page]);

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

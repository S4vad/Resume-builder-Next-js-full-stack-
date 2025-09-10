"use client";
import React from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import { formatYearMonth } from "../../lib/helper";
import { useAppSelector } from "@/store/hooks";

const sectionTitleClass =
  "text-base font-bold uppercase tracking-wide mb-1 pb-1 border-b border-gray-300";

const TemplateTwo: React.FC = () => {
  const resumeFromStore = useAppSelector((state) => state.resume);
  const resumeData = resumeFromStore || {};

  const profileInfo = {
    fullName: resumeData.full_name || "",
    designation: resumeData.designation || "",
    summary: resumeData.summary || "",
  };

  const contactInfo = {
    phone: resumeData.phone || "",
    email: resumeData.email || "",
    linkedin: resumeData.linkedin || "",
    github: resumeData.github || "",
    website: resumeData.portfolio || "",
  };

  const education = (resumeData.educations || []).map((edu) => ({
    institution: edu.institute || "",
    degree: edu.degree || "",
    startDate: edu.startDate || "",
    endDate: edu.endDate || "",
  }));

  const workExperience = (resumeData.experience || []).map((exp) => ({
    role: exp.role || "",
    company: exp.company || "",
    location: exp.location || "",
    startDate: exp.startDate || "",
    endDate: exp.endDate || "",
    description: exp.description || "",
  }));

  const projects = (resumeData.projects || []).map((proj) => ({
    title: proj.title || "",
    description: proj.description || "",
    startDate: proj.startDate || "",
    endDate: proj.endDate || "",
    github: proj.github || "",
    liveDemo: proj.live || "",
    technologies: proj.technologies ? proj.technologies.join(", ") : "",
    link: proj.live || proj.github || "",
    linkType: proj.live ? "Live Demo" : "GitHub",
  }));

  const certifications = (resumeData.certifications || []).map((cert) => ({
    title: cert.title || "",
    year: cert.year || "",
  }));

  const skills = (resumeData.skills || []).map((skill) => ({
    name: typeof skill === "string" ? skill : skill,
  }));

  const languages = (resumeData.languages || []).map((lang) => ({
    name: typeof lang === "string" ? lang : lang,
  }));

  const interests = resumeData.intrests || [];

  return (
    <div className="resume-section p-4 bg-white font-sans text-black max-w-[210mm] mx-auto">
      {/* Header Section */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          {profileInfo.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 font-medium mb-2">
          {profileInfo.designation || "Your Designation"}
        </p>
        <div className="flex flex-wrap justify-center gap-1 text-[11px] text-gray-700">
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="hover:underline text-blue-600"
            >
              {contactInfo.email}
            </a>
          )}
          {contactInfo.linkedin && (
            <a
              href={contactInfo.linkedin}
              className="hover:underline text-blue-600"
            >
              LinkedIn
            </a>
          )}
          {contactInfo.github && (
            <a
              href={contactInfo.github}
              className="hover:underline text-blue-600"
            >
              GitHub
            </a>
          )}
          {contactInfo.website && (
            <a
              href={contactInfo.website}
              className="hover:underline text-blue-600"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mb-2" />

      {/* Summary */}
      {profileInfo.summary && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Summary</h2>
          <p className="text-[11px] text-gray-800 leading-tight">
            {profileInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Experience</h2>
          <div className="space-y-2">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[12px] pb-2 text-gray-800">
                      {exp.role}
                    </h3>
                    <p className="italic text-[11px] pb-2 text-gray-600">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-[11px] text-right text-gray-600">
                    {exp.startDate && exp.endDate && (
                      <p className="italic">
                        {formatYearMonth(exp.startDate)} -{" "}
                        {formatYearMonth(exp.endDate)}
                      </p>
                    )}
                    {exp.location && (
                      <p className="text-[11px]">{exp.location}</p>
                    )}
                  </div>
                </div>

                <ul className=" mt-0.5 text-[12px] text-gray-700">
                  {exp.description?.split("\n").map((line, i) => (
                    <li key={i} className="pb-1">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Projects</h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[12px] text-gray-800">
                    {proj.title}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-blue-600 text-[11px] hover:underline"
                    >
                      {proj.linkType || "Link"}
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="bg-gray-100 pb-2 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {proj.technologies}
                  </p>
                )}
                <p className="text-[11px] pb-2 text-gray-700 ">
                  {proj.description}
                </p>
                <div className="flex gap-1 mt-0.5 pt-2 text-[11px]">
                  {proj.github && (
                    <a
                      href={proj.github}
                      className="flex items-center gap-0.5 hover:underline text-blue-600"
                    >
                      <LuGithub size={10} /> GitHub
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      className="flex items-center gap-0.5 hover:underline text-blue-600"
                    >
                      <LuExternalLink size={10} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Education</h2>
          <div className="space-y-1">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-0.25">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[12px] pb-2 text-gray-800">
                    {edu.degree}
                  </h3>
                  {edu.startDate && edu.endDate && (
                    <p className="italic text-[11px] pb-2 text-gray-600">
                      {formatYearMonth(edu.startDate)} -{" "}
                      {formatYearMonth(edu.endDate)}
                    </p>
                  )}
                </div>
                <p className="italic text-[11px] text-gray-700">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Skills</h2>
          <ul className="text-[11px] text-gray-800 flex flex-wrap gap-1">
            {skills.map((skill, idx) => (
              <li key={idx} className="w-fit">
                {skill.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Certifications</h2>
          <ul className="list-disc list-inside text-[11px] text-gray-700">
            {certifications.map((cert, idx) => (
              <li key={idx} className="leading-tight">
                {cert.title} — {formatYearMonth(cert.year)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages & Interests */}
      {(languages.length > 0 || interests.length > 0) && (
        <section className="mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {languages.length > 0 && (
              <div>
                <h2 className={sectionTitleClass}>Languages</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {languages.map((lang, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 px-1.5 py-0.5 rounded-full"
                    >
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {interests.length > 0 && interests.some(Boolean) && (
              <div>
                <h2 className={sectionTitleClass}>Interests</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {interests.filter(Boolean).map((int, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 px-1.5 py-0.5 rounded-full"
                    >
                      {int}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default TemplateTwo;

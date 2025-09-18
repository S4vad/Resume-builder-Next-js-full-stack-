import React from "react";
import { formatYearMonth } from "../../lib/helper";
import { useAppSelector } from "@/store/hooks";

const TemplateThree: React.FC = () => {
  const resumeData = useAppSelector((state) => state.resume);

  const profileInfo = {
    fullName: resumeData.full_name || "",
    designation: resumeData.designation || "",
    summary: resumeData.summary || "",
  };

  const contactInfo = {
    location: resumeData.address || "",
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
    technologies: proj.technologies || [],
  }));

  const certifications = (resumeData.certifications || []).map((cert) => ({
    title: cert.title || "",
    year: cert.year || "",
  }));

  const skills = (resumeData.skills || []).map((skill) => ({
    name: typeof skill === "string" ? skill : skill,
  }));

  const interests = resumeData.intrests || [];

  const groupedSkills: Record<string, string[]> = {
    "Automation & Test tools": [],
    "Product Management": [],
    Languages: [],
    "Other Skills": [],
  };

  skills.forEach((skill) => {
    if (["Selenium/Webdriver", "TestNG", "Jenkins"].includes(skill.name)) {
      groupedSkills["Automation & Test tools"].push(skill.name);
    } else if (
      ["Agile", "Scrum", "JIRA", "Microsoft TFS"].includes(skill.name)
    ) {
      groupedSkills["Product Management"].push(skill.name);
    } else if (
      ["Python", "Java", "Javascript", "Databases (MySQL)"].includes(skill.name)
    ) {
      groupedSkills.Languages.push(skill.name);
    } else {
      groupedSkills["Other Skills"].push(skill.name);
    }
  });

  return (
    <div className="bg-white font-sans text-black max-w-[210mm] mx-auto">
      {/* Header Section */}
      <header className="px-4 sm:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4 mb-2">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-3">
            {profileInfo.fullName || "Your Name"}
          </h1>

          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            {profileInfo.designation || "Your Designation"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-tight mb-3 sm:mb-4">
          {profileInfo.summary ||
            "Your professional summary will appear here..."}
        </p>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-12 gap-3 sm:gap-4 px-4 sm:px-8 pb-4 sm:pb-8">
        {/* LEFT SIDEBAR - 5 columns */}
        <aside className="col-span-5 space-y-3 sm:space-y-5 pr-2 sm:pr-4 border-r border-gray-300">
          {/* Contact */}
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
              CONTACT
            </h2>
            <ul className="text-[10px] sm:text-xs text-gray-700 space-y-1 sm:space-y-2 pb-2">
              {contactInfo.location && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">Location:</span>
                  <span className="break-all">{contactInfo.location}</span>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">Phone:</span>
                  <span className="break-all">{contactInfo.phone}</span>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">Email:</span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.linkedin && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">LinkedIn:</span>
                  <a
                    href={contactInfo.linkedin}
                    className="text-blue-600 hover:underline truncate pb-1 break-all"
                    title={contactInfo.linkedin}
                  >
                    linkedin.com/in/{contactInfo.linkedin.split("/").pop()}
                  </a>
                </li>
              )}
              {contactInfo.github && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">GitHub:</span>
                  <a
                    href={contactInfo.github}
                    className="text-blue-600 hover:underline pb-2 truncate break-all"
                    title={contactInfo.github}
                  >
                    github.com/{contactInfo.github.split("/").pop()}
                  </a>
                </li>
              )}
              {contactInfo.website && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[50px] sm:min-w-[65px]">Portfolio:</span>
                  <a
                    href={contactInfo.website}
                    className="text-blue-600 hover:underline pb-2 truncate break-all"
                    title={contactInfo.website}
                  >
                    {contactInfo.website.replace(/(^\w+:|^)\/\//, "")}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
                SKILLS
              </h2>
              {Object.entries(groupedSkills).map(
                ([category, skillsList]) =>
                  skillsList.length > 0 && (
                    <div key={category} className="mb-2">
                      {category !== "Other Skills" && (
                        <h3 className="text-[10px] sm:text-xs font-semibold italic mb-1">
                          {category}:
                        </h3>
                      )}
                      <ul className="text-[10px] sm:text-xs text-gray-700">
                        {skillsList.map((skill, idx) => (
                          <li key={idx} className="mb-1 break-all">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 sm:mb-3 tracking-wider">
                EDUCATION
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs">
                    <h3 className="font-bold pb-1 sm:pb-2 break-all">{edu.institution}</h3>
                    <p className="pb-1 sm:pb-2 break-all">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
                CERTIFICATIONS
              </h2>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-1">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="break-all">
                    {cert.title} - {formatYearMonth(cert.year)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
                INTERESTS
              </h2>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-1">
                {interests.map((interest, idx) => (
                  <li key={idx} className="break-all">• {interest}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* MAIN CONTENT - 7 columns */}
        <main className="col-span-7 space-y-3 sm:space-y-5 pl-2 sm:pl-4">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 sm:mb-3 tracking-wider border-b border-gray-400 pb-1">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-3 sm:space-y-5">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold pb-1 sm:pb-2 break-all">{exp.role}</h3>
                        <p className="italic break-all">
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </p>
                      </div>
                      {exp.startDate && exp.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(exp.startDate)} –{" "}
                          {formatYearMonth(exp.endDate)}
                        </div>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 mt-1 pl-1">
                      {exp.description?.split("\n").map((line, i) => (
                        <li key={i} className="break-words">{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-800 mb-2 sm:mb-3 tracking-wider border-b border-gray-400 pb-1">
                PROJECTS
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold break-all">{proj.title}</h3>
                      {proj.startDate && proj.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(proj.startDate)} –{" "}
                          {formatYearMonth(proj.endDate)}
                        </div>
                      )}
                    </div>

                    <p className="mt-1 mb-1 break-words">{proj.description}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {proj.github && (
                        <a
                          href={proj.github}
                          className="text-blue-600 hover:underline flex items-center text-[10px] sm:text-xs break-all"
                        >
                          <span>GitHub</span>
                        </a>
                      )}
                      {proj.liveDemo && (
                        <a
                          href={proj.liveDemo}
                          className="text-blue-600 hover:underline flex items-center text-[10px] sm:text-xs break-all"
                        >
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-gray-600 break-all">
                          <strong>Tech:</strong> {proj.technologies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateThree;
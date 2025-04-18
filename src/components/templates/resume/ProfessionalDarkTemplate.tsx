import React from 'react'; 
import { ResumeData } from '@/types/documents';

interface ProfessionalDarkTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ProfessionalDarkTemplate: React.FC<ProfessionalDarkTemplateProps> = ({
  data,
  editMode = false,
  editableProps = {},
}) => {
  return (
    <div className="w-full min-h-screen flex overflow-auto font-sans text-xs">

      {/* Left sidebar with dark background */}
      <div className="w-1/3 bg-slate-800 text-white p-2 flex flex-col max-h-screen overflow-y-auto flex-grow">

        {/* Profile photo */}
        <div className="mb-3 flex justify-center">
          {data.personalInfo.photo ? (
            <img 
              src={data.personalInfo.photo} 
              alt={data.personalInfo.name} 
              className="rounded-full w-16 h-16 object-cover border-4 border-white"
            />
          ) : (
            <div className="rounded-full w-16 h-16 bg-slate-600 flex items-center justify-center text-lg font-bold">
              {data.personalInfo.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* CV title */}
        <h2 data-field="name" {...(editMode ? editableProps : {})} className="text-md font-semibold text-center text-white mb-3">
          {data.personalInfo.name}
        </h2>

        <div className="mb-4">
          <div className="space-y-0.5">
            {data.personalInfo.email && (
              <p className="flex items-center gap-1 text-xs">
                <span className="inline-block w-4">✉️</span>
                <span
                  data-field="email"
                  {...(editMode ? editableProps : {})}
                  className="break-words w-24"
                >
                  {data.personalInfo.email}
                </span>
              </p>
            )}
            {data.personalInfo.phone && (
              <p className="flex items-center gap-1 text-xs">
                <span className="inline-block w-4">📱</span>
                <span
                  data-field="phone"
                  {...(editMode ? editableProps : {})}
                  className="break-words w-full"
                >
                  {data.personalInfo.phone}
                </span>
              </p>
            )}
            {data.personalInfo.location && (
              <p className="flex items-center gap-1 text-xs">
                <span className="inline-block w-4">🏠</span>
                <span
                  data-field="location"
                  {...(editMode ? editableProps : {})}
                  className="break-words w-full"
                >
                  {data.personalInfo.location}
                </span>
              </p>
            )}
            {data.personalInfo.linkedin && (
              <p className="flex items-center gap-1 text-xs">
                <span className="inline-block w-4">🔗</span>
                <span
                  data-field="linkedin"
                  {...(editMode ? editableProps : {})}
                  className="break-words w-full"
                >
                  {data.personalInfo.linkedin}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skills) && (
          <div className="mb-4">
            <h3 className="text-md font-semibold border-b border-slate-600 pb-1 mb-2 text-white">
              Skills
            </h3>
            {data.skills.filter(skill => skill.skills).map((skill, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-semibold text-white">{skill.category}</h4>
                <div className="mt-0.5">
                  {skill.skills.split(',').map((s, i) => {
                    const level = (i % 5) + 1; // Visual representation (using index for consistency)
                    return (
                      <div key={i} className="flex items-center mb-0.5">
                        <span className="flex-grow text-xs">{s.trim()}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <div 
                              key={j} 
                              className={`w-2 h-2 rounded-full mx-0.5 ${j < level ? 'bg-slate-400' : 'bg-slate-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold border-b border-slate-600 pb-1 mb-2">
              Languages
            </h3>
            {data.languages.map((lang, index) => (
              <div key={index} className="mb-1">
                <div className="flex items-center">
                  <span className="flex-grow">{lang.language}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full mx-0.5 ${i < lang.proficiency ? 'bg-slate-400' : 'bg-slate-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && data.certifications.some(cert => cert.name) && (
          <div className="mb-4">
            <h3 className="text-md font-semibold border-b border-slate-600 pb-1 mb-2 text-white">
              Certifications
            </h3>
            <ul className="list-none space-y-0.5">
              {data.certifications.filter(cert => cert.name).map((cert, index) => (
                <li key={index} className="text-xs">
                  {cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name} ({cert.date || ''})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests Section */}
        {data.interests && data.interests.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold border-b border-slate-600 pb-1 mb-2">
              Interests
            </h3>
            <ul className="list-none space-y-0.5">
              {data.interests.map((interest, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4">▪️</span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="w-2/3 bg-white p-3 max-h-screen overflow-y-auto">
        {data.summary && (
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-1">Profile</h1>
            <p 
              className="text-xs mt-1 space-y-0.5 break-words"
              data-field="summary"
              {...(editMode ? editableProps : {})}
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
              }}
            >
              {data.summary || ""}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Professional Experience</h2>
            {data.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-0.5">
                  <div>
                    <h3 className="font-semibold">{exp.position || ''}</h3>
                    <h4 className="text-sm">{exp.company || ''}</h4>
                  </div>
                  <span className="text-sm">{exp.date || ''}</span>
                </div>
                
                {exp.description && (
                  <div className="text-xs mt-1 space-y-0.5 break-words">
                    <ul className="list-disc pl-4 space-y-0.5">
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && data.projects.some(project => project.name) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Projects</h2>
            {data.projects.filter(project => project.name).map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-0.5">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.technologies && <p className="text-xs">{project.technologies}</p>}
                  </div>
                  <span className="text-sm">{project.date || ''}</span>
                </div>
                {project.description && <p className="text-xs mt-1 space-y-0.5 break-words">{project.description}</p>}
                {project.link && (
                  <div className="text-xs mt-0.5 inline-block">
                    {project.link}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && data.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            {data.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-0.5">
                  <div>
                    <h3 className="font-semibold">{edu.degree || ''}</h3>
                    <h4 className="text-sm">{edu.institution || ''}</h4>
                  </div>
                  <span className="text-sm">{edu.date || ''}</span>
                </div>
                {edu.description && <p className="text-xs mt-1 space-y-0.5 break-words">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && data.customSections.some(section => section.title && section.content) && (
          <>
            {data.customSections.filter(section => section.title && section.content).map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-xs">{section.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDarkTemplate;

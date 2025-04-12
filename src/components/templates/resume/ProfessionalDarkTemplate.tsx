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
  editableProps = {} 
}) => {
  return (
    <div className="w-full h-[1400px] flex">

      {/* Left sidebar with dark background */}
      <div className="w-auto bg-slate-800 text-white p-4 flex flex-col">
        {/* Profile photo */}
        <div className="mb-4 flex justify-center">
          {data.personalInfo.photo ? (
            <img 
              src={data.personalInfo.photo} 
              alt={data.personalInfo.name} 
              className="rounded-full w-24 h-24 object-cover border-4 border-white"
            />
          ) : (
            <div className="rounded-full w-24 h-24 bg-slate-600 flex items-center justify-center text-xl font-bold">
              {data.personalInfo.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* CV title */}
        <h2 data-field="name" {...(editMode ? editableProps : {})} className="text-sm font-bold text-center mb-4">
          {data.personalInfo.name}
        </h2>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-3">
            Informations personnelles
          </h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="inline-block w-5">👤</span>
              <span
                data-field="name"
                {...(editMode ? editableProps : {})}
              >
                {data.personalInfo.name || ''}
              </span>
            </p>
            {data.personalInfo.email && (
              <p className="flex items-center gap-2">
                <span className="inline-block w-5">✉️</span>
                <span
                  data-field="email"
                  {...(editMode ? editableProps : {})}
                >
                  {data.personalInfo.email}
                </span>
              </p>
            )}
            {data.personalInfo.phone && (
              <p className="flex items-center gap-2">
                <span className="inline-block w-5">📱</span>
                <span
                  data-field="phone"
                  {...(editMode ? editableProps : {})}
                >
                  {data.personalInfo.phone}
                </span>
              </p>
            )}
            {data.personalInfo.location && (
              <p className="flex items-center gap-2">
                <span className="inline-block w-5">🏠</span>
                <span
                  data-field="location"
                  {...(editMode ? editableProps : {})}
                >
                  {data.personalInfo.location}
                </span>
              </p>
            )}
            {data.personalInfo.linkedin && (
              <p className="flex items-center gap-2">
                <span className="inline-block w-5">🔗</span>
                <span
                  data-field="linkedin"
                  {...(editMode ? editableProps : {})}
                >
                  {data.personalInfo.linkedin}
                </span>
              </p>
            )}
          </div>
        </div>
        
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skills) && (
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-3">
              Compétences
            </h3>
            {data.skills.filter(skill => skill.skills).map((skill, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-semibold">{skill.category}</h4>
                <div className="mt-1">
                  {skill.skills.split(',').map((s, i) => {
                    const level = (i % 5) + 1; // Visual representation (using index for consistency)
                    return (
                      <div key={i} className="flex items-center mb-1">
                        <span className="flex-grow text-sm">{s.trim()}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <div 
                              key={j} 
                              className={`w-3 h-3 rounded-full mx-0.5 ${j < level ? 'bg-slate-400' : 'bg-slate-600'}`}
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
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-3">
              Langues
            </h3>
            {data.languages.map((lang, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center">
                  <span className="flex-grow">{lang.language}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full mx-0.5 ${i < lang.proficiency ? 'bg-slate-400' : 'bg-slate-600'}`}
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
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-3">
              Certifications
            </h3>
            <ul className="list-none space-y-1">
              {data.certifications.filter(cert => cert.name).map((cert, index) => (
                <li key={index} className="text-sm">
                  {cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name} ({cert.date || ''})
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Interests Section */}
        {data.interests && data.interests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-3">
              Centres d'intérêt
            </h3>
            <ul className="list-none space-y-1">
              {data.interests.map((interest, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-5">▪️</span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="w-2/3 bg-white p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Profil</h1>
          <p 
            className="text-sm leading-relaxed"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary || ""}
          </p>
        </div>
        
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Expérience professionnelle</h2>
            {data.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{exp.position || ''}</h3>
                    <h4 className="text-sm">{exp.company || ''}</h4>
                  </div>
                  <span className="text-sm">{exp.date || ''}</span>
                </div>
                
                {exp.description && (
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
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
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Projets</h2>
            {data.projects.filter(project => project.name).map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.technologies && <p className="text-sm">{project.technologies}</p>}
                  </div>
                  <span className="text-sm">{project.date || ''}</span>
                </div>
                {project.description && <p className="text-sm mt-2">{project.description}</p>}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 mt-1 inline-block">
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Education Section */}
        {data.education && data.education.length > 0 && data.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Formation</h2>
            {data.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{edu.degree || ''}</h3>
                    <h4 className="text-sm">{edu.institution || ''}</h4>
                  </div>
                  <span className="text-sm">{edu.date || ''}</span>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && data.customSections.some(section => section.title && section.content) && (
          <>
            {data.customSections.filter(section => section.title && section.content).map((section, index) => (
              <div key={index} className="mt-8">
                <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                <p className="text-sm">{section.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDarkTemplate;

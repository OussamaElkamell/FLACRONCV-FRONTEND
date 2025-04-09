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
        <div className="mb-4">
          <h3 className="text-sm font-bold border-b border-slate-600 pb-1 mb-2">
            Informations personnelles
          </h3>
          <div className="space-y-1 text-xs">
            <p className="flex items-center gap-1">
              <span className="inline-block w-4">✉️</span>
              <span data-field="email" {...(editMode ? editableProps : {})}>
                {data.personalInfo.email}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span className="inline-block w-4">📱</span>
              <span data-field="phone" {...(editMode ? editableProps : {})}>
                {data.personalInfo.phone}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span className="inline-block w-4">🏠</span>
              <span data-field="location" {...(editMode ? editableProps : {})}>
                {data.personalInfo.location}
              </span>
            </p>
            {data.personalInfo.linkedin && (
              <p className="flex items-center gap-1">
                <span className="inline-block w-4">🔗</span>
                <span data-field="linkedin" {...(editMode ? editableProps : {})}>
                  {data.personalInfo.linkedin}
                </span>
              </p>
            )}
          </div>
        </div>
        
        {/* Skills Section */}
        {data.skills.some(skill => skill.skills) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold border-b border-slate-600 pb-1 mb-2">
              Compétences
            </h3>
            {data.skills.map((skill, index) => (
              skill.skills ? (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold text-xs">{skill.category}</h4>
                  <div className="mt-1 text-xs">
                    {skill.skills.split(',').map((s, i) => {
                      const level = (i % 5) + 1;
                      return (
                        <div key={i} className="flex items-center mb-1">
                          <span className="flex-grow">{s.trim()}</span>
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
              ) : null
            ))}
          </div>
        )}
        
        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-bold border-b border-slate-600 pb-1 mb-2">
              Langues
            </h3>
            {data.languages.map((lang, index) => (
              <div key={index} className="mb-1">
                <div className="flex items-center text-xs">
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

        {/* Other Sections (Qualities, Interests, etc.) */}
        {/* They follow similar structure adjustments as above */}
      </div>

      {/* Main content */}
      <div className="w-2/3 bg-white p-4">
        <div className="mb-4">
          <h1 className="text-lg font-bold mb-2">Profil</h1>
          <p className="text-[8px] leading-relaxed" data-field="summary" {...(editMode && editableProps)}>
            {data.summary || "Pas de profil spécifié."}
          </p>
        </div>

        {/* Experience Section */}
        {data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-md font-bold mb-3">Expérience professionnelle</h2>
            {data.experience.map((exp, index) => (
              exp.company || exp.position ? (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{exp.position || 'Position'}</h3>
                      <h4 className="text-xs">{exp.company || 'Entreprise'}</h4>
                    </div>
                    <span className="text-xs">{exp.date || 'Date'}</span>
                  </div>
                  
                  {exp.description && (
                    <div className="mt-1 text-xs">
                      <ul className="list-disc pl-4 space-y-1">
                        {exp.description.split('\n').map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}
        
        {/* Education, Certifications Sections */}
        {data.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-md font-bold mb-3">Formation</h2>
            {data.education.map((edu, index) => (
              edu.institution || edu.degree ? (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{edu.degree || 'Diplôme'}</h3>
                      <h4 className="text-xs">{edu.institution || 'Institution'}</h4>
                    </div>
                    <span className="text-xs">{edu.date || 'Date'}</span>
                  </div>
                  {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}
        
        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-md font-bold mb-3">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-2 flex justify-between">
                <span>{cert.name}</span>
                <span className="text-xs">{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDarkTemplate;

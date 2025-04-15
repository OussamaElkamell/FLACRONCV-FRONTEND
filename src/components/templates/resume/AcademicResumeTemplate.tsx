
import React from 'react';
import { ResumeData } from '@/types/documents';

interface AcademicResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const AcademicResumeTemplate: React.FC<AcademicResumeTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-serif p-0 max-w-[800px] mx-auto bg-white">
      {/* Header with name and emerald styling */}
      
      <div className="bg-emerald-700 text-white p-8 text-center">
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
        <h1 
          className="text-3xl font-bold mb-1 tracking-wide text-white" 
          data-field="name"
          {...(editMode ? editableProps : {})}
        >
          {data.personalInfo.name || ''}
        </h1>
        
        <div className="flex justify-center flex-wrap gap-x-4 mt-3 text-emerald-100">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo.linkedin && (
            <span>{data.personalInfo.linkedin}</span>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {/* Summary/Research Interest Section */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              RESEARCH INTERESTS
            </h2>
            <p 
              className="leading-relaxed"
              data-field="summary"
              {...(editMode ? editableProps : {})}
            >
              {data.summary}
            </p>
          </div>
        )}
        
        {/* Education Section - Prioritized in Academic CV */}
        {data.education && data.education.length > 0 && data.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              EDUCATION
            </h2>
            {data.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{edu.degree || ''}</h3>
                  <span className="text-gray-600">{edu.date || ''}</span>
                </div>
                <h4 className="italic mb-2">{edu.institution || ''}</h4>
                
                {edu.description && (
                  <p>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Publications Section - Using Projects */}
        {data.projects && data.projects.length > 0 && data.projects.some(project => project.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              PUBLICATIONS & RESEARCH
            </h2>
            {data.projects.filter(project => project.name).map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{project.name}</h3>
                  <span className="text-gray-600">{project.date || ''}</span>
                </div>
                
                {project.technologies && (
                  <h4 className="italic mb-2">{project.technologies}</h4>
                )}
                
                {project.description && (
                  <p className="mb-1">{project.description}</p>
                )}
                
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              TEACHING & PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.position || ''}</h3>
                  <span className="text-gray-600">{exp.date || ''}</span>
                </div>
                <h4 className="italic mb-2">{exp.company || ''}</h4>
                
                {exp.description && (
                  <div>
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
        
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skills) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              SPECIALIZED SKILLS
            </h2>
            {data.skills.filter(skillCategory => skillCategory.skills).map((skillCategory, categoryIndex) => (
              <div key={categoryIndex} className="mb-3">
                <h3 className="font-bold mb-2">{skillCategory.category}</h3>
                <p>{skillCategory.skills}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && data.certifications.some(cert => cert.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              CERTIFICATIONS & AWARDS
            </h2>
            {data.certifications.filter(cert => cert.name).map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name}
                  </span>
                  <span className="text-gray-600">{cert.date || ''}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium mr-2">{lang.language}:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 mx-0.5 rounded-full ${i < lang.proficiency ? 'bg-emerald-600' : 'bg-emerald-100'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Interests Section */}
        {data.interests && data.interests.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
              RESEARCH INTERESTS
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {data.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && data.customSections.some(section => section.title && section.content) && (
          <>
            {data.customSections.filter(section => section.title && section.content).map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-700 pb-1 mb-3">
                  {section.title.toUpperCase()}
                </h2>
                <p>{section.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AcademicResumeTemplate;
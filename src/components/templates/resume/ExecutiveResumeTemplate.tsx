
import React from 'react';
import { ResumeData } from '@/types/documents';

interface ExecutiveResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ExecutiveResumeTemplate: React.FC<ExecutiveResumeTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-serif p-0 max-w-[800px] mx-auto text-sm bg-white">
      {/* Header with name and executive styling */}
      <div className="bg-gray-900 text-white p-6 mb-6">
        <div className="flex items-start justify-between">
            
          <div>
            <h1 
              className="text-3xl font-bold tracking-tight mb-1" 
              data-field="name"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.name || ''}
            </h1>
            <div className="flex flex-wrap gap-3 text-gray-300 text-sm">
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
          
          {data.personalInfo.photo ? (
            <img 
              src={data.personalInfo.photo} 
              alt={data.personalInfo.name} 
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
            />
          ) : null}
        </div>
      </div>
      
      {/* Summary Section */}
      {data.summary && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            EXECUTIVE SUMMARY
          </h2>
          <p 
            className="text-sm leading-relaxed"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.position || ''}</h3>
                <span className="text-sm text-gray-600 font-medium">{exp.date || ''}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">{exp.company || ''}</h4>
              
              {exp.description && (
                <div className="text-sm">
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

      {/* Education Section */}
      {data.education && data.education.length > 0 && data.education.some(edu => edu.institution || edu.degree) && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            EDUCATION
          </h2>
          {data.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{edu.degree || ''}</h3>
                <span className="text-sm text-gray-600 font-medium">{edu.date || ''}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">{edu.institution || ''}</h4>
              
              {edu.description && (
                <p className="text-sm">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && data.projects.some(project => project.name) && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            KEY PROJECTS
          </h2>
          {data.projects.filter(project => project.name).map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{project.name}</h3>
                <span className="text-sm text-gray-600 font-medium">{project.date || ''}</span>
              </div>
              {project.technologies && (
                <h4 className="text-sm font-semibold text-gray-800 mb-2">{project.technologies}</h4>
              )}
              
              {project.description && (
                <p className="text-sm">{project.description}</p>
              )}
              
              {project.link && (
                <div className="text-sm text-gray-700 underline mt-1 inline-block">
                  {project.link}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skills) && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.filter(skillCategory => skillCategory.skills).map((skillCategory, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-sm font-bold mb-2">{skillCategory.category}</h3>
                <ul className="list-disc pl-5">
                  {skillCategory.skills.split(',').map((skill, index) => (
                    <li key={index} className="text-sm">{skill.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            LANGUAGE PROFICIENCY
          </h2>
          <div className="flex flex-wrap gap-8">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium mr-2">{lang.language}:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-6 mx-px ${i < lang.proficiency ? 'bg-gray-900' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && data.certifications.some(cert => cert.name) && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            CERTIFICATIONS & CREDENTIALS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.certifications.filter(cert => cert.name).map((cert, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm font-medium">
                  {cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name}
                </span>
                <span className="text-sm text-gray-600">{cert.date || ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Interests Section */}
      {data.interests && data.interests.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
            INTERESTS
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.interests.map((interest, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Custom Sections */}
      {data.customSections && data.customSections.length > 0 && data.customSections.some(section => section.title && section.content) && (
        <>
          {data.customSections.filter(section => section.title && section.content).map((section, index) => (
            <div key={index} className="px-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
                {section.title.toUpperCase()}
              </h2>
              <p className="text-sm">{section.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ExecutiveResumeTemplate;
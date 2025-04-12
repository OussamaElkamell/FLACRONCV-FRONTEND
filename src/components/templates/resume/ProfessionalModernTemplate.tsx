
import React from 'react';
import { ResumeData } from '@/types/documents';

interface ProfessionalModernTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ProfessionalModernTemplate: React.FC<ProfessionalModernTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-sans p-0 max-w-[800px] mx-auto bg-white relative">
      {/* Header with name and purple bar */}
      <div className="relative pb-3">
        <div className="flex justify-between items-start px-8 pt-8">
          <h1 
            className="text-4xl font-bold text-purple-900 tracking-wide uppercase"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || ''}
          </h1>
          
          {data.personalInfo.photo ? (
            <img 
              src={data.personalInfo.photo} 
              alt={data.personalInfo.name} 
              className="w-24 h-24 object-cover rounded"
            />
          ) : (
            <div className="w-24 h-24 bg-purple-100 flex items-center justify-center rounded">
              <span className="text-2xl font-bold text-purple-700">
                {data.personalInfo.name ? data.personalInfo.name.charAt(0).toUpperCase() : ''}
              </span>
            </div>
          )}
        </div>
        <div className="h-2 bg-purple-700 mt-3 w-full" />
      </div>
      
      {/* Personal Information Section */}
      <div className="bg-purple-100 py-3 px-8 mb-6">
        <h2 className="text-sm font-bold text-purple-900 uppercase mb-1">INFORMATIONS PERSONNELLES</h2>
        <div className="flex flex-wrap text-sm gap-x-6">
          {data.personalInfo.location && (
            <div>{data.personalInfo.location}</div>
          )}
          {data.personalInfo.email && (
            <div>{data.personalInfo.email}</div>
          )}
          {data.personalInfo.phone && (
            <div>{data.personalInfo.phone}</div>
          )}
          {data.personalInfo.linkedin && (
            <div>{data.personalInfo.linkedin}</div>
          )}
        </div>
      </div>
      
      {/* Profile Section */}
      {data.summary && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">PROFILE</h2>
          <p 
            className="text-sm"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          {data.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-sm">
                  {exp.position || ''} • {exp.company || ''}
                </h3>
                <span className="text-xs text-gray-600">{exp.date || ''}</span>
              </div>
              
              {exp.description && (
                <div className="ml-4 text-sm">
                  <ul className="list-disc space-y-1">
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
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            FORMATION
          </h2>
          {data.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-sm">
                  {edu.degree || ''} • {edu.institution || ''}
                </h3>
                <span className="text-xs text-gray-600">{edu.date || ''}</span>
              </div>
              
              {edu.description && (
                <div className="ml-4 text-sm">
                  <p>{edu.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && data.projects.some(project => project.name) && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            PROJETS
          </h2>
          {data.projects.filter(project => project.name).map((project, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-sm">
                  {project.name}
                  {project.technologies && <span className="font-normal text-purple-700"> • {project.technologies}</span>}
                </h3>
                <span className="text-xs text-gray-600">{project.date || ''}</span>
              </div>
              
              {project.description && (
                <div className="ml-4 text-sm">
                  <p>{project.description}</p>
                </div>
              )}
              
              {project.link && (
                <div className="ml-4 text-sm text-purple-700">
                 {project.link} 
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skills) && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            COMPÉTENCES
          </h2>
          <div className="flex flex-col gap-4">
            {data.skills.filter(skillCategory => skillCategory.skills).map((skillCategory, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-sm font-semibold mb-2">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillCategory.skills.split(',').map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
                      <span className="text-sm">{skill.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            LANGUES
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{lang.language}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 mx-0.5 rounded-full ${i < lang.proficiency ? 'bg-purple-800' : 'bg-purple-200'}`}
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
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            CERTIFICATS
          </h2>
          <div className="space-y-2">
            {data.certifications.filter(cert => cert.name).map((cert, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name}</span>
                <span>{cert.date || ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Interests Section */}
      {data.interests && data.interests.length > 0 && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            CENTRES D'INTÉRÊT
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
                <span className="text-sm">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Custom Sections */}
      {data.customSections && data.customSections.length > 0 && data.customSections.some(section => section.title && section.content) && (
        <>
          {data.customSections.filter(section => section.title && section.content).map((section, index) => (
            <div key={index} className="px-8 mb-6">
              <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
                {section.title}
              </h2>
              <p className="text-sm">{section.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProfessionalModernTemplate;
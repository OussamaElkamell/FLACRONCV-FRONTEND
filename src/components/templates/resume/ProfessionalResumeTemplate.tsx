
import React from 'react';
import { ResumeData } from '@/types/documents';

interface ProfessionalResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ProfessionalResumeTemplate: React.FC<ProfessionalResumeTemplateProps> = ({ 
  data, 
  editMode = false,
  editableProps = {}
}) => {


  
  return (
    <div className="font-serif p-5 max-w-[800px] mx-auto text-sm">
      <div className="text-center mb-4">
          {/* Profile Photo */}
          {data.personalInfo.photo && (
          <img 
            src={data.personalInfo.photo} 
            alt="Profile Photo" 
            className="w-24 h-24 rounded-full mx-auto mb-2" 
          />
        )}
        <h1 
          className="text-xl font-bold mb-0.5" 
          data-field="name"
          {...(editMode ? editableProps : {})}
        >
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className="text-xs text-gray-600 flex flex-wrap justify-center gap-x-2">
          {data.personalInfo.location && (
            <span 
              data-field="location"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.email && (
            <span 
              data-field="email"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span 
              data-field="phone"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span>
              <a 
                href={`https://${data.personalInfo.linkedin.replace('https://', '')}`}
                className="text-[#E67912] hover:underline"
                data-field="linkedin"
                {...(editMode ? {...editableProps, href: undefined} : {})}
              >
                {data.personalInfo.linkedin.replace('https://www.linkedin.com/in/', '').replace('https://linkedin.com/in/', '')}
              </a>
            </span>
          )}
        </div>
      </div>
      
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Summary</h2>
          <p 
            className="text-xs leading-tight"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Experience</h2>
          {data.experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-xs font-semibold"
                      data-field={`experience.position`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {exp.position || 'Position'}
                    </h3>
                    <h4 
                      className="text-xs"
                      data-field={`experience.company`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {exp.company || 'Company'}
                    </h4>
                  </div>
                  <span 
                    className="text-xs text-gray-600"
                    data-field={`experience.date`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {exp.date || 'Date'}
                  </span>
                </div>
                {exp.description && (
                  <p 
                    className="text-xs mt-1 space-y-0.5 break-words"
                    data-field={`experience.description`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {exp.description}
                  </p>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}
      
      {/* Projects Section - New */}
      {data.projects && data.projects.some(project => project.name || project.description) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Projects</h2>
          {data.projects.map((project, index) => (
            project.name || project.description ? (
              <div key={index} className="text-xs mt-1 space-y-0.5 break-words">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-xs font-semibold"
                      data-field={`projects.name`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {project.name || 'Project Name'}
                    </h3>
                    {project.technologies && (
                      <h4 className="text-xs italic">
                        {project.technologies}
                      </h4>
                    )}
                  </div>
                  {project.date && (
                    <span 
                      className="text-xs text-gray-600"
                      data-field={`projects.date`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {project.date}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p 
                    className="text-xs mt-1 space-y-0.5 break-words"
                    data-field={`projects.description`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {project.description}
                  </p>
                )}
                {project.link && (
                 project.link
                )}
              </div>
            ) : null
          ))}
        </div>
      )}
      
      {data.education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Education</h2>
          {data.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="text-xs font-semibold"
                      data-field={`education.degree`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {edu.degree || 'Degree'}
                    </h3>
                    <h4 
                      className="text-xs"
                      data-field={`education.institution`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {edu.institution || 'Institution'}
                    </h4>
                  </div>
                  <span 
                    className="text-xs text-gray-600"
                    data-field={`education.date`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {edu.date || 'Date'}
                  </span>
                </div>
                {edu.description && (
                  <p 
                    className="text-xs mt-1 space-y-0.5 break-words"
                    data-field={`education.description`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {edu.description}
                  </p>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}
      
      
      {/* Certifications Section - Updated */}
      {data?.certifications?.some(cert => cert.name || cert.title)&& (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Certifications</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 flex justify-between">
              <div>
                {cert.title && (
                  <span className="text-xs text-gray-600 italic mr-2">
                    {typeof cert.title === 'string' ? cert.title : ''}
                  </span>
                )}
                <span className="text-xs font-medium">{cert.name}</span>
              </div>
              <span className="text-xs">{cert.date}</span>
            </div>
          ))}
        </div>
      )}
      
      {data.skills.some(skill => skill.skills) && (
  <div>
    <h2 className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1">Skills</h2>
    {data.skills.map((skill, index) => (
      skill.skills ? (
        <div key={index} className="mb-1">
          <h3
            className="text-xs font-semibold"
            data-field={`skills.category`}
            data-index={index.toString()}
            {...(editMode ? editableProps : {})}
          >
            {skill.category}
          </h3>
          <p
            className="text-xs"
            data-field={`skills.skills`}
            data-index={index.toString()}
            {...(editMode ? editableProps : {})}
          >
            {skill.skills}
          </p>
        </div>
      ) : null
    ))}
  </div>
)}

{/* Custom Sections */}
{data.customSections && data.customSections.length > 0 && (
  <div>
    {data.customSections.map((section, index) => (
      section.content ? (
        <div key={index} className="mb-1">
          <h2
            className="text-sm font-bold border-b border-gray-300 pb-0.5 mb-1"
            data-field={`customSections.title`}
            data-index={index.toString()}
            {...(editMode ? editableProps : {})}
          >
            {section.title}
          </h2>
          <p
            className="text-xs"
            data-field={`customSections.content`}
            data-index={index.toString()}
            {...(editMode ? editableProps : {})}
          >
            {section.content}
          </p>
        </div>
      ) : null
    ))}
  </div>
)}

    </div>
  );
};

export default ProfessionalResumeTemplate;
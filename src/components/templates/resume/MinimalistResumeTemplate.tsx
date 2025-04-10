
import React from 'react';
import { ResumeData } from '@/types/documents';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MinimalistResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const MinimalistResumeTemplate: React.FC<MinimalistResumeTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-sans p-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-200 pb-6 mb-8 gap-4">
        <div>
          <h1 
            className="text-3xl font-light tracking-wide text-gray-800 mb-2"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
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
              <a 
                href={`https://${data.personalInfo.linkedin.replace('https://', '')}`} 
                className="text-gray-600 hover:text-gray-900"
                data-field="linkedin"
                {...(editMode ? {...editableProps, href: undefined} : {})}
              >
                {data.personalInfo.linkedin.replace('https://www.linkedin.com/in/', '').replace('https://linkedin.com/in/', '')}
              </a>
            )}
          </div>
        </div>
        
        {data.personalInfo.photo && (
          <Avatar className="w-24 h-24 border border-gray-200">
            <AvatarImage src={data.personalInfo.photo} alt={data.personalInfo.name} />
            <AvatarFallback>{data.personalInfo.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        )}
      </div>
      
      {data.summary && (
        <div className="mb-10">
          <p 
            className="text-gray-700 leading-relaxed"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-10">
          <h2 className="text-lg font-normal tracking-wide text-gray-800 mb-4 uppercase">Experience</h2>
          {data.experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 
                    className="text-md font-medium"
                    data-field={`experience.position`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {exp.position || 'Position'}
                  </h3>
                  <span 
                    className="text-sm text-gray-500"
                    data-field={`experience.date`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {exp.date || 'Date'}
                  </span>
                </div>
                <h4 
                  className="text-sm text-gray-600 mb-2"
                  data-field={`experience.company`}
                  data-index={index.toString()}
                  {...(editMode ? editableProps : {})}
                >
                  {exp.company || 'Company'}
                </h4>
                {exp.description && (
                  <p 
                    className="text-sm text-gray-700 leading-relaxed"
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
      
      {data.education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-10">
          <h2 className="text-lg font-normal tracking-wide text-gray-800 mb-4 uppercase">Education</h2>
          {data.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 
                    className="text-md font-medium"
                    data-field={`education.degree`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {edu.degree || 'Degree'}
                  </h3>
                  <span 
                    className="text-sm text-gray-500"
                    data-field={`education.date`}
                    data-index={index.toString()}
                    {...(editMode ? editableProps : {})}
                  >
                    {edu.date || 'Date'}
                  </span>
                </div>
                <h4 
                  className="text-sm text-gray-600 mb-1"
                  data-field={`education.institution`}
                  data-index={index.toString()}
                  {...(editMode ? editableProps : {})}
                >
                  {edu.institution || 'Institution'}
                </h4>
                {edu.description && (
                  <p 
                    className="text-sm text-gray-700"
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
      
      {data.skills.some(skill => skill.skills) && (
        <div>
          <h2 className="text-lg font-normal tracking-wide text-gray-800 mb-4 uppercase">Skills</h2>
          {data.skills.map((skill, index) => (
            skill.skills ? (
              <div key={index} className="mb-3">
                <h3 
                  className="text-md font-medium mb-2"
                  data-field={`skills.category`}
                  data-index={index.toString()}
                  {...(editMode ? editableProps : {})}
                >
                  {skill.category}
                </h3>
                <p 
                  className="text-sm text-gray-700"
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
    </div>
  );
};

export default MinimalistResumeTemplate;
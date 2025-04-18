
import React from 'react';
import { ResumeData } from '@/types/documents';

interface ModernResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ModernResumeTemplate: React.FC<ModernResumeTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-sans p-5 max-w-[800px] mx-auto text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center bg-blue-500 text-white rounded-lg p-4 mb-5">
        <div>
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
            className="text-2xl font-bold text-white"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || 'Your Name'}
          </h1>
          {data.personalInfo.linkedin && (
            <a 
              href={`https://${data.personalInfo.linkedin.replace('https://', '')}`} 
              className="text-white hover:underline text-xs"
              data-field="linkedin"
              {...(editMode ? {...editableProps, href: undefined} : {})}
            >
              {data.personalInfo.linkedin.replace('https://www.linkedin.com/in/', '').replace('https://linkedin.com/in/', '')}
            </a>
          )}
        </div>
        <div className="text-right mt-2 md:mt-0 text-xs">
          {data.personalInfo.email && (
            <div
              data-field="email"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div
              data-field="phone"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div
              data-field="location"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.location}
            </div>
          )}
        </div>
      </div>
      
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-base text-blue-500 font-bold mb-1">Professional Summary</h2>
          <p 
            className="leading-tight text-xs"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {data.experience && data.experience.some(exp => exp.company || exp.position) && (
            <div className="mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Work Experience</h2>
              {data.experience.map((exp, index) => (
                exp.company || exp.position ? (
                  <div key={index} className="mb-3 border-l-2 border-blue-300 pl-2">
                    <h3 
                      className="text-sm font-semibold"
                      data-field={`experience.position`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {exp.position || 'Position'}
                    </h3>
                    <div className="flex justify-between">
                      <h4 
                        className="text-gray-600 text-xs"
                        data-field={`experience.company`}
                        data-index={index.toString()}
                        {...(editMode ? editableProps : {})}
                      >
                        {exp.company || 'Company'}
                      </h4>
                      <span 
                        className="text-xs text-gray-500"
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
          
          {/* Projects Section */}
          {data.projects && data.projects.some(project => project.name || project.description) && (
            <div className="mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Projects</h2>
              {data.projects.map((project, index) => (
                project.name || project.description ? (
                  <div key={index} className="mb-3 border-l-2 border-blue-300 pl-2">
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h3 
                        className="text-sm font-semibold mr-2"
                        data-field={`projects.name`}
                        data-index={index.toString()}
                        {...(editMode ? editableProps : {})}
                      >
                        {project.name || 'Project Name'}
                      </h3>
                      {project.date && (
                        <span 
                          className="text-xs text-gray-500"
                          data-field={`projects.date`}
                          data-index={index.toString()}
                          {...(editMode ? editableProps : {})}
                        >
                          {project.date}
                        </span>
                      )}
                    </div>
                    
                    {project.technologies && (
                      <p className="text-xs text-blue-600 mt-1">
                        {project.technologies}
                      </p>
                    )}
                    
                    {project.link && (
                     < div className="text-xs text-blue-500 hover:underline flex items-center mt-1" >
                      {project.link} 
                      </div>
                    )}
                    
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
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {data.education && data.education.some(edu => edu.institution || edu.degree) && (
            <div className="mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Education</h2>
              {data.education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <div key={index} className="mb-3 border-l-2 border-blue-300 pl-2">
                    <h3 
                      className="text-sm font-semibold"
                      data-field={`education.degree`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {edu.degree || 'Degree'}
                    </h3>
                    <div className="flex justify-between">
                      <h4 
                        className="text-gray-600 text-xs"
                        data-field={`education.institution`}
                        data-index={index.toString()}
                        {...(editMode ? editableProps : {})}
                      >
                        {edu.institution || 'Institution'}
                      </h4>
                      <span 
                        className="text-xs text-gray-500"
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
        </div>
        
        <div>
          {data.skills && data.skills.some(skill => skill.skills) && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Skills</h2>
              {data.skills.map((skill, index) => (
                skill.skills ? (
                  <div key={index} className="mb-3">
                    <h3 
                      className="text-sm font-semibold mb-1"
                      data-field={`skills.category`}
                      data-index={index.toString()}
                      {...(editMode ? editableProps : {})}
                    >
                      {skill.category}
                    </h3>
                    <div className="text-gray-700">
                      {skill.skills.split(',').map((s, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs mr-1 mb-1"
                        >
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline">
                    <div>
                      {cert.title && (
                        <div className="text-xs text-gray-600 mb-0.5">
                          {typeof cert.title === 'string' ? cert.title : 'Certification'}
                        </div>
                      )}
                      <div className="font-medium">{cert.name}</div>
                    </div>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h2 className="text-base text-blue-500 font-bold mb-2">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2 flex justify-between items-center">
                  <span>{lang.language}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i < lang.proficiency ? 'bg-blue-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Interests Section */}
          {data.interests && data.interests.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h2 className="text-base text-blue-500 font-bold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-1">
                {data.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Custom Sections */}
          {data.customSections && data.customSections.length > 0 && (
            <>
              {data.customSections.map((section, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg mt-4">
                  <h2 className="text-base text-blue-500 font-bold mb-2">{section.title}</h2>
                  <p className="text-sm text-gray-700">{section.content}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernResumeTemplate;

import React from 'react';
import { ResumeData } from '@/types/documents';

interface CreativeResumeTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const CreativeResumeTemplate: React.FC<CreativeResumeTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-sans p-8 max-w-[800px] mx-auto">
      <div className="bg-purple-500 text-white p-8 rounded-lg mb-8">
        <h1 
          className="text-4xl font-bold mb-2"
          data-field="name"
          {...(editMode ? editableProps : {})}
        >
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-purple-100">
          {data.personalInfo.email && (
            <a 
              href={`mailto:${data.personalInfo.email}`} 
              className="hover:text-white"
              data-field="email"
              {...(editMode ? {...editableProps, href: undefined} : {})}
            >
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo.phone && (
            <span
              data-field="phone"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span
              data-field="location"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <a 
              href={`https://${data.personalInfo.linkedin.replace('https://', '')}`} 
              className="hover:text-white"
              data-field="linkedin"
              {...(editMode ? {...editableProps, href: undefined} : {})}
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
      
      {data.summary && (
        <div className="mb-10 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
          <h2 className="text-xl font-bold text-purple-700 mb-3">About Me</h2>
          <p 
            className="text-gray-700 leading-relaxed italic"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {data.experience && data.experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Work Experience
              </h2>
              {data.experience.map((exp, index) => (
                exp.company || exp.position ? (
                  <div key={index} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
                    <h3 className="text-lg font-bold">{exp.position || 'Position'}</h3>
                    <div className="flex justify-between">
                      <h4 className="text-purple-600 font-medium">{exp.company || 'Company'}</h4>
                      <span className="text-sm text-gray-500 italic">{exp.date || 'Date'}</span>
                    </div>
                    {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
                  <h3 className="text-lg font-bold">{project.name || 'Project Name'}</h3>
                  <div className="flex justify-between">
                    {project.technologies && (
                      <h4 className="text-purple-600 font-medium">{project.technologies}</h4>
                    )}
                    {project.date && (
                      <span className="text-sm text-gray-500 italic">{project.date}</span>
                    )}
                  </div>
                  {project.description && <p className="mt-2 text-gray-700">{project.description}</p>}
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="mt-1 text-purple-600 hover:text-purple-800 inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Project</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {data.education && data.education.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Education
              </h2>
              {data.education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <div key={index} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
                    <h3 className="text-lg font-bold">{edu.degree || 'Degree'}</h3>
                    <div className="flex justify-between">
                      <h4 className="text-purple-600 font-medium">{edu.institution || 'Institution'}</h4>
                      <span className="text-sm text-gray-500 italic">{edu.date || 'Date'}</span>
                    </div>
                    {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-4 relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{cert.name}</h3>
                    <span className="text-sm text-gray-500 italic">{cert.date}</span>
                  </div>
                  {cert.title && typeof cert.title === 'string' && (
                    <p className="text-purple-600">{cert.title}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          {data.skills && data.skills.length > 0 && (
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Skills
              </h2>
              {data.skills.map((skill, index) => (
                skill.skills ? (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold mb-2">{skill.category}</h3>
                    <div>
                      {skill.skills.split(',').map((s, i) => (
                        <span key={i} className="inline-block bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Languages
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{lang.language}</h3>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(lang.proficiency * 20, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Interests Section */}
          {data.interests && data.interests.length > 0 && (
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-200 text-purple-800 rounded-full px-3 py-1 text-sm"
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
                <div key={index} className="bg-purple-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                    <span className="bg-purple-500 w-8 h-8 rounded-full mr-2"></span>
                    {section.title}
                  </h2>
                  <p className="text-gray-700">{section.content}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeResumeTemplate;
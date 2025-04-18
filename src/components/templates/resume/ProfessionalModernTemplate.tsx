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
  editableProps = {},
}) => {
  return (
    <div className="font-sans max-w-[800px] mx-auto bg-white text-gray-900">
      {/* Header */}
      <div className="pb-4 border-b-2 border-purple-700">
        <div className="flex justify-between items-start px-8 pt-8">
          <h1
            className="text-4xl font-bold text-purple-900 uppercase tracking-wider"
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
                {data.personalInfo.name?.charAt(0).toUpperCase() || ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <section className="bg-purple-100 py-4 px-8 mb-6 text-sm">
        <h2 className="text-xs font-bold text-purple-900 uppercase mb-2">Informations Personnelles</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
        </div>
      </section>

      {/* Section Template */}
      {data.summary && (
        <Section title="Profile">
          <div
            className="text-sm space-y-1"
            data-field="summary"
            {...(editMode ? editableProps : {})}
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
            {data.summary.split(/(?<=[.?!])\s+/).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </Section>
      )}

      {data.experience?.some(exp => exp.company || exp.position) && (
        <Section title="Expérience Professionnelle">
          {data.experience
            .filter(exp => exp.company || exp.position)
            .map((exp, idx) => (
              <Entry
                key={idx}
                title={`${exp.position || ''} • ${exp.company || ''}`}
                date={exp.date}
                description={exp.description}
                
              />
            ))}
        </Section>
      )}

      {data.education?.some(edu => edu.institution || edu.degree) && (
        <Section title="Formation">
          {data.education
            .filter(edu => edu.institution || edu.degree)
            .map((edu, idx) => (
              <Entry
                key={idx}
                title={`${edu.degree || ''} • ${edu.institution || ''}`}
                date={edu.date}
                description={edu.description}
              />
            ))}
        </Section>
      )}

      {data.projects?.some(proj => proj.name) && (
        <Section title="Projets">
          {data.projects
            .filter(proj => proj.name)
            .map((proj, idx) => (
              <Entry
                key={idx}
                title={
                  <>
                    {proj.name}
                    {proj.technologies && (
                      <span className="font-normal text-purple-700"> • {proj.technologies}</span>
                    )}
                  </>
                }
                date={proj.date}
                description={
                  <>
                    {proj.description && <p className="mb-1">{proj.description}</p>}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">
                        {proj.link}
                      </a>
                    )}
                  </>
                }
              />
            ))}
        </Section>
      )}

      {data.skills?.some(skill => skill.skills) && (
        <Section title="Compétences">
          <div className="flex flex-col gap-4">
            {data.skills.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold mb-2">{category.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.split(',').map((skill, i) => (
                    <SkillItem key={i} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.languages?.length > 0 && (
        <Section title="Langues">
          <div className="space-y-2">
            {data.languages.map((lang, idx) => (
              <div key={idx} className="flex items-center justify-between">
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
        </Section>
      )}

      {data.certifications?.some(cert => cert.name) && (
        <Section title="Certificats">
          <div className="space-y-2">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  {cert.title && typeof cert.title === 'string' ? `${cert.title}: ${cert.name}` : cert.name}
                </span>
                <span>{cert.date || ''}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.interests?.length > 0 && (
        <Section title="Centres d'intérêt">
          <div className="flex flex-wrap gap-4">
            {data.interests.map((interest, idx) => (
              <SkillItem key={idx} skill={interest} />
            ))}
          </div>
        </Section>
      )}

      {data.customSections?.length > 0 &&
        data.customSections
          .filter(section => section.title && section.content)
          .map((section, idx) => (
            <Section key={idx} title={section.title}>
              <div
                className="text-sm space-y-1"
                style={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {section.content.split(/(?<=[.?!])\s+/).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </Section>
          ))}
    </div>
  );
};

// Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="px-8 mb-6">
    <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
      {title}
    </h2>
    {children}
  </section>
);

// Entry Component
const Entry: React.FC<{ title: React.ReactNode; date?: string; description?: React.ReactNode }> = ({
  title,
  date,
  description,
}) => (
  <div className="mb-5">
    <div className="flex justify-between items-baseline mb-1">
      <h3 className="font-bold text-sm">{title}</h3>
      {date && <span className="text-xs text-gray-600">{date}</span>}
    </div>
    {description && (
      <div className="ml-4 text-sm space-y-1">
        {typeof description === 'string'
          ? description.split(/(?<=[.?!])\s+/).map((line, idx) => <p key={idx}>{line}</p>)
          : description}
      </div>
    )}
  </div>
);

// Skill Item Component
const SkillItem: React.FC<{ skill: string }> = ({ skill }) => (
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-purple-800 rounded-full" />
    <span className="text-sm">{skill.trim()}</span>
  </div>
);

export default ProfessionalModernTemplate;

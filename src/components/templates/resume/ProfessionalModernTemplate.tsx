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
    <div className="font-sans text-[11px] leading-snug max-w-[794px] mx-auto bg-white text-gray-900 p-4 overflow-hidden">
      {/* Header */}
      <div className="pb-2 border-b border-purple-700">
        <div className="flex justify-between items-start">
          <h1
            className="text-xl font-bold text-purple-900 uppercase tracking-wide break-words"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || ''}
          </h1>
          {data.personalInfo.photo ? (
            <img
              src={data.personalInfo.photo}
              alt={data.personalInfo.name}
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-purple-100 flex items-center justify-center rounded">
              <span className="text-lg font-bold text-purple-700">
                {data.personalInfo.name?.charAt(0).toUpperCase() || ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <section className="bg-purple-100 py-2 px-3 mt-2 mb-3">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
        </div>
      </section>

      {/* Summary */}
      {data.summary && (
        <Section title="Profile">
          <div
            className="text-xs mt-1 space-y-0.5 break-words"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          
          >
            {data.summary.split(/(?<=[.?!])\s+/).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </Section>
      )}

      {/* Experience */}
      {data.experience?.some(exp => exp.company || exp.position) && (
        <Section title="Expérience">
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

      {/* Education */}
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

      {/* Skills */}
      {data.skills?.some(skill => skill.skills) && (
        <Section title="Compétences">
          <div className="flex flex-col gap-2">
            {data.skills.map((category, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-1">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.split(',').map((skill, i) => (
                    <SkillItem key={i} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <Section title="Langues">
          <div className="space-y-1">
            {data.languages.map((lang, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span>{lang.language}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 mx-[1px] rounded-full ${
                        i < lang.proficiency ? 'bg-purple-800' : 'bg-purple-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

// Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-3">
    <h2 className="text-xs font-bold text-purple-900 bg-purple-100 px-2 py-1 uppercase mb-1">
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
  <div className="mb-2">
    <div className="flex justify-between items-baseline">
      <h3 className="font-semibold">{title}</h3>
      {date && <span className="text-[10px] text-gray-600">{date}</span>}
    </div>
    {description && (
      <div className="ml-3 space-y-1 break-words">
        {typeof description === 'string'
          ? description.split(/(?<=[.?!])\s+/).map((line, idx) => <p key={idx}>{line}</p>)
          : description}
      </div>
    )}
  </div>
);

// Skill Item Component
const SkillItem: React.FC<{ skill: string }> = ({ skill }) => (
  <div className="flex items-center gap-1">
    <span className="w-2 h-2 bg-purple-800 rounded-full" />
    <span>{skill.trim()}</span>
  </div>
);

export default ProfessionalModernTemplate;

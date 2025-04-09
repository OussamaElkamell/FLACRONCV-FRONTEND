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
            {data.personalInfo.name || 'VOTRE NOM'}
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
                {data.personalInfo.name.charAt(0)}
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
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="px-8 mb-6">
        <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">PROFIL</h2>
        <p className="text-sm">
          {data.summary || "Pas de profil spécifié."}
        </p>
      </div>
      
      {/* Experience Section */}
      {data.experience.some(exp => exp.company || exp.position) && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          {data.experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">
                    {exp.position || 'Position'} • {exp.company || 'Entreprise'}
                  </h3>
                  <span className="text-xs text-gray-600">{exp.date || 'Date'}</span>
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
            ) : null
          ))}
        </div>
      )}
      
      {/* Skills Section */}
      {data.skills.some(skill => skill.skills) && (
        <div className="px-8 mb-6">
          <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
            QUALITÉS
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
              <span className="text-sm">Responsable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
              <span className="text-sm">Souriante</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
              <span className="text-sm">Ponctuelle</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
              <span className="text-sm">Patiente</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Centres d'intérêt/Interests Section */}
      <div className="px-8 mb-6">
        <h2 className="text-sm font-bold text-purple-900 bg-purple-100 py-1 px-3 uppercase mb-3">
          CENTRES D'INTÉRÊT
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
            <span className="text-sm">Peinture</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-800 rounded-full"></span>
            <span className="text-sm">Roller</span>
          </div>
        </div>
      </div>
      
      {/* Certifications Section */}
      {data.certifications.some(cert => cert.name || cert.title)&& (
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
      
    </div>
  );
};

export default ProfessionalModernTemplate;
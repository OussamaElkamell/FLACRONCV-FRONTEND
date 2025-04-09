import React from 'react';
import { ResumeData } from '@/types/documents';

interface ProfessionalPurpleTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ProfessionalPurpleTemplate: React.FC<ProfessionalPurpleTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  return (
    <div className="font-sans p-0 max-w-[800px] mx-auto flex flex-col bg-white">
      {/* Header with profile image and name */}
      <div className="flex items-start p-6 gap-6">
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
        
        <div>
          <h1 
            className="text-3xl font-bold text-purple-800 mb-2"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name}
          </h1>
          <h2 className="text-xl text-purple-600 mb-4">Profil</h2>
          <p 
            className="text-sm leading-relaxed"
            data-field="summary"
            {...(editMode ? editableProps : {})}
          >
            {data.summary || "Pas de profil spécifié."}
          </p>
        </div>
      </div>
      
      <div className="flex">
        {/* Main content area */}
        <div className="w-3/5 p-6">
          {/* Experience Section */}
          {data.experience.some(exp => exp.company || exp.position) && (
            <div className="mb-8">
              <h2 className="text-xl text-purple-800 font-bold mb-4">Expérience professionnelle</h2>
              {data.experience.map((exp, index) => (
                exp.company || exp.position ? (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-base font-semibold">{exp.position || 'Position'}</h3>
                        <h4 className="text-sm text-purple-700">
                          {`${exp.company || 'Entreprise'}`} 
                          {exp.company && exp.company.includes('Nantes') ? '' : ', Nantes'}
                        </h4>
                      </div>
                      <span className="text-sm">{exp.date || 'Date'}</span>
                    </div>
                    
                    {exp.description && (
                      <div className="mt-2 text-sm">
                        <ul className="list-disc pl-5 space-y-1">
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
          
          {/* Stages/Internships Section */}
          <div className="mb-8">
            <h2 className="text-xl text-purple-800 font-bold mb-4">Stages</h2>
            {data.experience.some(exp => exp.company || exp.position) && (
              <div className="space-y-4">
                {/* Showing same experiences as internships for demonstration */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-semibold">
                        Gestionnaire de paie
                      </h3>
                      <h4 className="text-sm text-purple-700">Cegid, Nantes</h4>
                    </div>
                    <span className="text-sm">de juin 2014 à sept 2014</span>
                  </div>
                  <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                    <li>Assistance aux gestionnaires de paie dans la préparation et l'établissement des bulletins de salaire</li>
                    <li>Classement et numérisation des dossiers papier pour la partie administrative des archives</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Education Section */}
          {data.education.some(edu => edu.institution || edu.degree) && (
            <div>
              <h2 className="text-xl text-purple-800 font-bold mb-4">Formation</h2>
              {data.education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold">{edu.degree || 'BTS Comptabilité-gestion'}</h3>
                        <h4 className="text-sm text-purple-700">{edu.institution || 'CNAM, Paris'}</h4>
                      </div>
                      <span className="text-sm">{edu.date || 'de sept. 2013 à août 2015'}</span>
                    </div>
                    {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar for contact details and skills */}
        <div className="w-2/5 bg-purple-50 p-6">
          <div className="mb-8">
            <h2 className="text-xl text-purple-800 font-bold mb-4">Informations personnelles</h2>
            <div className="space-y-2">
              <p className="text-sm flex items-start">
                <span className="inline-block w-5 text-purple-600">👤</span>
                {data.personalInfo.name}
              </p>
              <p className="text-sm flex items-start">
                <span className="inline-block w-5 text-purple-600">✉️</span>
                {data.personalInfo.email}
              </p>
              <p className="text-sm flex items-start">
                <span className="inline-block w-5 text-purple-600">📱</span>
                {data.personalInfo.phone}
              </p>
              <p className="text-sm flex items-start">
                <span className="inline-block w-5 text-purple-600">🏠</span>
                {data.personalInfo.location}
              </p>
            </div>
          </div>
          
          {/* Competences/Skills Section */}
          {data.skills.some(skill => skill.skills) && (
            <div className="mb-8">
              <h2 className="text-xl text-purple-800 font-bold mb-4">Compétences</h2>
              {data.skills.map((skill, index) => (
                skill.skills ? (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-purple-700 mb-2">{skill.category}</h3>
                    <div className="space-y-2">
                      {skill.skills.split(',').map((s, i) => {
                        const level = Math.min(Math.floor(Math.random() * 5) + 1, 5);
                        return (
                          <div key={i} className="flex items-center">
                            <span className="flex-grow text-sm">{s.trim()}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <div 
                                  key={j} 
                                  className={`w-3 h-3 rounded-full mx-0.5 ${j < level ? 'bg-purple-400' : 'bg-purple-200'}`}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
          
          {/* Languages Section */}
          <div className="mb-8">
            <h2 className="text-xl text-purple-800 font-bold mb-4">Langues</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="flex-grow text-sm">Français</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full mx-0.5 ${i < 5 ? 'bg-purple-400' : 'bg-purple-200'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <span className="flex-grow text-sm">Anglais</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full mx-0.5 ${i < 3 ? 'bg-purple-400' : 'bg-purple-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Centres d'intérêt/Interests Section */}
          <div>
            <h2 className="text-xl text-purple-800 font-bold mb-4">Centres d'intérêt</h2>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-block bg-purple-200 rounded-full p-1 text-purple-600">🎾</span>
                Tennis
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block bg-purple-200 rounded-full p-1 text-purple-600">🧘</span>
                Yoga
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPurpleTemplate;
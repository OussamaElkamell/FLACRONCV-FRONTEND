
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface ProfessionalCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ProfessionalCoverLetterTemplate: React.FC<ProfessionalCoverLetterTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="font-serif p-4 max-w-[800px] mx-auto text-[10px] print:text-[9pt]">
      <div className="text-left mb-2">
        <div className="mb-2">
          <p 
            className="mb-0.5 text-[11px] font-semibold"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || 'Your Name'}
          </p>
          <p 
            className="mb-0.5 text-[9px]"
            data-field="location"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.location || 'Your Location'}
          </p>
          <p 
            className="mb-0.5 text-[9px]"
            data-field="phone"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.phone || 'Your Phone'}
          </p>
          <p
            className="text-[9px]"
            data-field="email"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.email || 'Your Email'}
          </p>
        </div>
        
        <p className="text-[9px]">{today}</p>
        
        <div className="mt-2">
          {data.recipientInfo.name && (
            <p 
              className="mb-0.5 text-[9px]"
              data-field="recipientName"
              {...(editMode ? editableProps : {})}
            >
              {data.recipientInfo.name}
            </p>
          )}
          {data.recipientInfo.title && (
            <p 
              className="mb-0.5 text-[9px]"
              data-field="recipientTitle"
              {...(editMode ? editableProps : {})}
            >
              {data.recipientInfo.title}
            </p>
          )}
          {data.recipientInfo.company && (
            <p
              className="text-[9px]"
              data-field="recipientCompany"
              {...(editMode ? editableProps : {})}
            >
              {data.recipientInfo.company}
            </p>
          )}
        </div>
      </div>
      
      <div className="mb-2">
        <p className="mb-1.5 text-[10px]">
          Dear {data.recipientInfo.name || 'Hiring Manager'},
        </p>
        
        <p className="mb-1.5 text-[9px] leading-tight">
          I am writing to express my interest in the {' '}
          <span
            data-field="jobTitle"
            {...(editMode ? editableProps : {})}
          >
            {data.jobInfo.title || 'position'}
          </span> 
          {' '}at {data.recipientInfo.company || 'your company'}
          {data.jobInfo.reference ? (
            <span
              data-field="jobReference"
              {...(editMode ? editableProps : {})}
            >
              {` (Reference: ${data.jobInfo.reference})`}
            </span>
          ) : ''}
          .
        </p>
        
        {data.experience && (
          <p 
            className="mb-1.5 text-[9px] leading-tight"
            data-field="experience"
            {...(editMode ? editableProps : {})}
          >
            {data.experience}
          </p>
        )}
        
        {data.skills && (
          <p 
            className="mb-1.5 text-[9px] leading-tight"
            data-field="skills"
            {...(editMode ? editableProps : {})}
          >
            {data.skills}
          </p>
        )}
        
        {data.motivation && (
          <p 
            className="mb-1.5 text-[9px] leading-tight"
            data-field="motivation"
            {...(editMode ? editableProps : {})}
          >
            {data.motivation}
          </p>
        )}
        
        {data.closing && (
          <p 
            className="mb-1.5 text-[9px] leading-tight"
            data-field="closing"
            {...(editMode ? editableProps : {})}
          >
            {data.closing}
          </p>
        )}
        
        <div className="mt-2">
          <p className="mb-2">Sincerely,</p>
          <p className="text-[11px] font-semibold">{data.personalInfo.name || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCoverLetterTemplate;

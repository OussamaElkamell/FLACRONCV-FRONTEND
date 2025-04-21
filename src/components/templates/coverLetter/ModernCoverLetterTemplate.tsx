import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface ModernCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ModernCoverLetterTemplate: React.FC<ModernCoverLetterTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="font-serif p-4 max-w-[800px] mx-auto text-[10px] print:text-[9pt]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-4 border-b-2 border-blue-400">
        <div>
          <h1 
            className="text-[11px] font-semibold text-blue-600 mb-1"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <p 
            className="text-gray-600 text-[9px]"
            data-field="location"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.location || 'Your Location'}
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p 
            className="mb-1 text-[9px]"
            data-field="phone"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.phone || 'Your Phone'}
          </p>
          <p 
            className="mb-1 text-[9px]"
            data-field="email"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.email || 'Your Email'}
          </p>
          <p className="text-[9px] text-gray-500">{today}</p>
        </div>
      </div>
      
      <div className="mb-6">
        {data.recipientInfo.name && (
          <p className="font-semibold text-[9px] mb-1">{data.recipientInfo.name}</p>
        )}
        {data.recipientInfo.title && (
          <p className="mb-1 text-[9px]">{data.recipientInfo.title}</p>
        )}
        {data.recipientInfo.company && (
          <p className="font-semibold text-[9px] mb-1">{data.recipientInfo.company}</p>
        )}
      </div>
      
      <div className="space-y-4 text-gray-700">
        <p className="font-semibold text-[9px]">
          Dear {data.recipientInfo.name || 'Hiring Manager'},
        </p>
        
        <p className="text-[9px]">
          I am writing to express my interest in the 
          <span className="text-blue-600 font-semibold">{' '}{data.jobInfo.title || 'position'}</span> 
          at {data.recipientInfo.company || 'your company'}
          {data.jobInfo.reference ? ` (Reference: ${data.jobInfo.reference})` : ''}.
        </p>
        
        {data.experience && (
          <p className="text-[9px]">{data.experience}</p>
        )}
        
        {data.skills && (
          <p className="text-[9px]">{data.skills}</p>
        )}
        
        {data.motivation && (
          <p className="text-[9px]">{data.motivation}</p>
        )}
        
        {data.closing && (
          <p className="text-[9px]">{data.closing}</p>
        )}
        
        <div className="mt-8">
          <p className="mb-4 text-[9px]">Sincerely,</p>
          <p className="text-blue-600 font-semibold text-[9px]">{data.personalInfo.name || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernCoverLetterTemplate;

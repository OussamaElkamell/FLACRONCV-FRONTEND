
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
    <div className="font-sans p-8 max-w-[800px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 pb-6 border-b-2 border-blue-400">
        <div>
          <h1 
            className="text-3xl font-bold text-blue-600 mb-1"
            data-field="name"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <p 
            className="text-gray-600"
            data-field="location"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.location || 'Your Location'}
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p 
            className="mb-1"
            data-field="phone"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.phone || 'Your Phone'}
          </p>
          <p 
            className="mb-1"
            data-field="email"
            {...(editMode ? editableProps : {})}
          >
            {data.personalInfo.email || 'Your Email'}
          </p>
          <p>{today}</p>
        </div>
      </div>
      
      <div className="mb-8">
        {data.recipientInfo.name && (
          <p className="font-semibold text-lg mb-1">{data.recipientInfo.name}</p>
        )}
        {data.recipientInfo.title && (
          <p className="mb-1">{data.recipientInfo.title}</p>
        )}
        {data.recipientInfo.company && (
          <p className="font-semibold mb-1">{data.recipientInfo.company}</p>
        )}
      </div>
      
      <div className="space-y-5 text-gray-700">
        <p className="font-semibold text-lg">
          Dear {data.recipientInfo.name || 'Hiring Manager'},
        </p>
        
        <p>
          I am writing to express my interest in the 
          <span className="text-blue-600 font-semibold"> {data.jobInfo.title || 'position'}</span> 
          at {data.recipientInfo.company || 'your company'}
          {data.jobInfo.reference ? ` (Reference: ${data.jobInfo.reference})` : ''}.
        </p>
        
        {data.experience && (
          <p>{data.experience}</p>
        )}
        
        {data.skills && (
          <p>{data.skills}</p>
        )}
        
        {data.motivation && (
          <p>{data.motivation}</p>
        )}
        
        {data.closing && (
          <p>{data.closing}</p>
        )}
        
        <div className="mt-10">
          <p className="mb-6">Sincerely,</p>
          <p className="text-blue-600 font-semibold">{data.personalInfo.name || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernCoverLetterTemplate;

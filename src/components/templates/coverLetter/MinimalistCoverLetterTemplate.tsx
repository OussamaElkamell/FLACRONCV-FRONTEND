
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface MinimalistCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const MinimalistCoverLetterTemplate: React.FC<MinimalistCoverLetterTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="font-sans p-8 max-w-[800px] mx-auto">
      <div className="border-b border-gray-200 pb-6 mb-10">
        <h1 
          className="text-2xl font-light tracking-wide text-gray-800 mb-2"
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
        </div>
      </div>
      
      <div className="mb-10">
        <p className="text-gray-500">{today}</p>
        
        <div className="mt-8 mb-10">
          {data.recipientInfo.name && (
            <p className="mb-1">{data.recipientInfo.name}</p>
          )}
          {data.recipientInfo.title && (
            <p className="mb-1 text-gray-600">{data.recipientInfo.title}</p>
          )}
          {data.recipientInfo.company && (
            <p className="font-medium">{data.recipientInfo.company}</p>
          )}
        </div>
        
        <p className="mb-8">
          Dear {data.recipientInfo.name || 'Hiring Manager'},
        </p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            I am writing to express my interest in the {data.jobInfo.title || 'position'} 
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
        </div>
        
        <div className="mt-12">
          <p className="mb-6">Sincerely,</p>
          <p>{data.personalInfo.name || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );
};

export default MinimalistCoverLetterTemplate;

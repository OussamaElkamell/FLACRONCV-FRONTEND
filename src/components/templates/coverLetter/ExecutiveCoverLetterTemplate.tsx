import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface ExecutiveCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const ExecutiveCoverLetterTemplate: React.FC<ExecutiveCoverLetterTemplateProps> = ({ data }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="font-serif p-4 max-w-[800px] mx-auto text-[10px] print:text-[9pt]">
      {/* Header with classic executive styling */}
      <div className="bg-gray-900 text-white p-4 mb-8 text-center">
        <h1 className="text-[11px] font-semibold tracking-widest uppercase text-white">{data.personalInfo.name}</h1>
        <div className="mt-2 flex justify-center flex-wrap gap-x-4 text-gray-300">
          {data.personalInfo.email && <span className="text-[9px]">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="text-[9px]">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="text-[9px]">{data.personalInfo.location}</span>}
        </div>
      </div>
      
      {/* Date and recipient info */}
      <div className="mb-6">
        <div className="text-right mb-6 text-[9px]">{formattedDate}</div>
        
        <div className="mb-6">
          <p className="font-semibold text-[9px]">{data.recipientInfo.name}</p>
          <p className="text-[9px]">{data.recipientInfo.title}</p>
          <p className="font-semibold text-[9px]">{data.recipientInfo.company}</p>
        </div>
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-[9px]">Dear {data.recipientInfo.name},</p>
      </div>
      
      {/* Introduction paragraph with job reference */}
      <div className="mb-4">
        <p className="text-justify text-[9px]">I am writing to express my interest in the {data.jobInfo.title} position {data.jobInfo.reference && `(Reference: ${data.jobInfo.reference})`} at {data.recipientInfo.company}. With my extensive background in executive leadership and proven track record, I am confident in my ability to bring exceptional value to your organization.</p>
      </div>
      
      {/* Experience paragraph */}
      <div className="mb-4">
        <p className="text-justify text-[9px]">{data.experience}</p>
      </div>
      
      {/* Skills paragraph */}
      <div className="mb-4">
        <p className="text-justify text-[9px]">{data.skills}</p>
      </div>
      
      {/* Motivation paragraph */}
      <div className="mb-4">
        <p className="text-justify text-[9px]">{data.motivation}</p>
      </div>
      
      {/* Closing */}
      <div className="mb-4">
        <p className="text-justify text-[9px]">{data.closing}</p>
      </div>
      
      {/* Signature */}
      <div className="mt-8">
        <p className="text-[9px]">Sincerely,</p>
        <p className="font-semibold mt-6 text-[9px]">{data.personalInfo.name}</p>
      </div>
    </div>
  );
};

export default ExecutiveCoverLetterTemplate;


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
    <div className="font-serif p-8 max-w-[800px] mx-auto bg-white">
      {/* Header with classic executive styling */}
      <div className="bg-gray-900 text-white p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase text-white">{data.personalInfo.name}</h1>
        <div className="mt-2 flex justify-center flex-wrap gap-x-6 text-gray-300">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
      
      {/* Date and recipient info */}
      <div className="mb-6">
        <div className="text-right mb-8">{formattedDate}</div>
        
        <div className="mb-6">
          <p className="font-bold">{data.recipientInfo.name}</p>
          <p>{data.recipientInfo.title}</p>
          <p className="font-bold">{data.recipientInfo.company}</p>
        </div>
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p>Dear {data.recipientInfo.name},</p>
      </div>
      
      {/* Introduction paragraph with job reference */}
      <div className="mb-4">
        <p className="text-justify">I am writing to express my interest in the {data.jobInfo.title} position {data.jobInfo.reference && `(Reference: ${data.jobInfo.reference})`} at {data.recipientInfo.company}. With my extensive background in executive leadership and proven track record, I am confident in my ability to bring exceptional value to your organization.</p>
      </div>
      
      {/* Experience paragraph */}
      <div className="mb-4">
        <p className="text-justify">{data.experience}</p>
      </div>
      
      {/* Skills paragraph */}
      <div className="mb-4">
        <p className="text-justify">{data.skills}</p>
      </div>
      
      {/* Motivation paragraph */}
      <div className="mb-4">
        <p className="text-justify">{data.motivation}</p>
      </div>
      
      {/* Closing */}
      <div className="mb-4">
        <p className="text-justify">{data.closing}</p>
      </div>
      
      {/* Signature */}
      <div className="mt-8">
        <p>Sincerely,</p>
        <p className="font-bold mt-6">{data.personalInfo.name}</p>
      </div>
    </div>
  );
};

export default ExecutiveCoverLetterTemplate;
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface TechnicalCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const TechnicalCoverLetterTemplate: React.FC<TechnicalCoverLetterTemplateProps> = ({ data }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="font-sans p-4 max-w-[800px] mx-auto text-[10px] print:text-[9pt]">
      {/* Header with technical styling */}
      <div className="bg-indigo-700 text-white p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-[11px] font-semibold mb-2 md:mb-0 text-white">{data.personalInfo.name}</h1>
          <div className="flex flex-wrap gap-4 text-[9px]">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <span className="mr-1">✉️</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <span className="mr-1">📱</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <span className="mr-1">📍</span>
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Secondary header with job title */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
        <h2 className="text-[10px] font-bold">Application: {data.jobInfo.title}</h2>
        {data.jobInfo.reference && <p className="text-[9px] text-gray-600">Reference: {data.jobInfo.reference}</p>}
      </div>
      
      {/* Date and recipient info */}
      <div className="mb-6">
        <div className="text-right mb-6 text-[9px]">{formattedDate}</div>
        
        <div className="mb-6">
          <p className="font-semibold text-[9px]">{data.recipientInfo.name}</p>
          <p className="text-[9px]">{data.recipientInfo.title}</p>
          <p className="text-[9px]">{data.recipientInfo.company}</p>
        </div>
      </div>
      
      {/* Greeting */}
      <div className="mb-5">
        <p className="text-[9px]">Dear {data.recipientInfo.name},</p>
      </div>
      
      {/* Introduction */}
      <div className="mb-4">
        <p className="text-[9px]">I am writing to apply for the position of {data.jobInfo.title} at {data.recipientInfo.company}. As a technical professional with specialized expertise, I believe my skills and experience make me an ideal candidate for this role.</p>
      </div>
      
      {/* Technical Experience paragraph with styling */}
      <div className="mb-4">
        <h3 className="text-[9px] font-bold text-indigo-700 uppercase mb-2">Technical Experience</h3>
        <p className="text-[9px]">{data.experience}</p>
      </div>
      
      {/* Technical Skills paragraph with styling */}
      <div className="mb-4">
        <h3 className="text-[9px] font-bold text-indigo-700 uppercase mb-2">Technical Skills</h3>
        <p className="text-[9px]">{data.skills}</p>
      </div>
      
      {/* Motivation paragraph with styling */}
      <div className="mb-4">
        <h3 className="text-[9px] font-bold text-indigo-700 uppercase mb-2">Why I'm Interested</h3>
        <p className="text-[9px]">{data.motivation}</p>
      </div>
      
      {/* Closing */}
      <div className="mb-6">
        <p className="text-[9px]">{data.closing}</p>
      </div>
      
      {/* Signature with technical styling */}
      <div className="mt-8">
        <p className="mb-1 text-[9px]">Sincerely,</p>
        <div className="font-semibold text-indigo-700 text-[9px]">{data.personalInfo.name}</div>
        <div className="mt-1 bg-indigo-100 h-1 w-32"></div>
      </div>
    </div>
  );
};

export default TechnicalCoverLetterTemplate;

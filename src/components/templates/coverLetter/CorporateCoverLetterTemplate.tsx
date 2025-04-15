
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface CorporateCoverLetterTemplateProps {
  data: CoverLetterData;
    editMode?: boolean;
    editableProps?: React.HTMLAttributes<HTMLElement>;
}

const CorporateCoverLetterTemplate: React.FC<CorporateCoverLetterTemplateProps> = ({ data }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="font-sans p-6 max-w-[800px] mx-auto bg-white">
      {/* Corporate header */}
      <div className="bg-blue-800 text-white p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{data.personalInfo.name}</h1>
          <div className="text-right">
            <div className="text-sm">Professional Application</div>
            <div className="text-xs mt-1">Corporate Cover Letter</div>
          </div>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="mb-8 flex flex-wrap justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="w-5 inline-block">✉️</span>
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-5 inline-block">📱</span>
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="w-5 inline-block">📍</span>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
        <div className="text-right">
          {formattedDate}
        </div>
      </div>
      
      {/* Position header */}
      <div className="mb-8 bg-blue-50 p-4 border-l-4 border-blue-800">
        <h2 className="text-lg font-bold">Position: {data.jobInfo.title}</h2>
        {data.jobInfo.reference && <p className="text-sm mt-1">Reference: {data.jobInfo.reference}</p>}
      </div>
      
      {/* Recipient information */}
      <div className="mb-6">
        <p className="font-bold">{data.recipientInfo.name}</p>
        <p>{data.recipientInfo.title}</p>
        <p className="font-bold">{data.recipientInfo.company}</p>
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p>Dear {data.recipientInfo.name},</p>
      </div>
      
      {/* Introduction */}
      <div className="mb-5">
        <p>I am writing to apply for the {data.jobInfo.title} position at {data.recipientInfo.company}. With my professional background and skillset specifically aligned with your requirements, I am confident in my ability to make immediate contributions to your organization.</p>
      </div>
      
      {/* Professional Experience paragraph */}
      <div className="mb-5">
        <h3 className="text-blue-800 font-bold text-sm uppercase border-b border-blue-200 pb-1 mb-2">Professional Experience</h3>
        <p>{data.experience}</p>
      </div>
      
      {/* Skills paragraph */}
      <div className="mb-5">
        <h3 className="text-blue-800 font-bold text-sm uppercase border-b border-blue-200 pb-1 mb-2">Core Competencies</h3>
        <p>{data.skills}</p>
      </div>
      
      {/* Company-specific motivation */}
      <div className="mb-5">
        <h3 className="text-blue-800 font-bold text-sm uppercase border-b border-blue-200 pb-1 mb-2">Why {data.recipientInfo.company}</h3>
        <p>{data.motivation}</p>
      </div>
      
      {/* Closing paragraph */}
      <div className="mb-5">
        <p>{data.closing}</p>
      </div>
      
      {/* Signature */}
      <div className="mt-10 mb-5">
        <p>Sincerely,</p>
        <p className="font-bold mt-6">{data.personalInfo.name}</p>
      </div>
      
      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-2 mt-10">
        <p>Application for {data.jobInfo.title} at {data.recipientInfo.company}</p>
      </div>
    </div>
  );
};

export default CorporateCoverLetterTemplate;
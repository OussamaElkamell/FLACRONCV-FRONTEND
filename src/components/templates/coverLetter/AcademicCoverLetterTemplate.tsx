
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface AcademicCoverLetterTemplateProps {
  data: CoverLetterData;
     editMode?: boolean;
        editableProps?: React.HTMLAttributes<HTMLElement>;
}

const AcademicCoverLetterTemplate: React.FC<AcademicCoverLetterTemplateProps> = ({ data }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="font-serif p-8 max-w-[800px] mx-auto bg-white">
      {/* Header with academic styling */}
      <div className="bg-emerald-700 text-white p-6 mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wide">{data.personalInfo.name}</h1>
        <p className="text-lg mt-1 italic text-emerald-100">Academic Professional</p>
        <div className="mt-3 flex justify-center flex-wrap gap-x-6 text-emerald-100">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
      
      {/* Date */}
      <div className="text-right mb-8">{formattedDate}</div>
      
      {/* Recipient info formatted for academic context */}
      <div className="mb-6">
        <p className="font-bold">{data.recipientInfo.name}, {data.recipientInfo.title}</p>
        <p>{data.recipientInfo.company}</p>
      </div>
      
      {/* Formal academic greeting */}
      <div className="mb-6">
        <p>Dear Professor {data.recipientInfo.name},</p>
      </div>
      
      {/* Introduction paragraph with position reference */}
      <div className="mb-4">
        <p className="text-justify">I am writing to express my interest in the {data.jobInfo.title} position {data.jobInfo.reference && `(Reference: ${data.jobInfo.reference})`} at {data.recipientInfo.company}. With my academic background, research experience, and teaching qualifications, I am confident in my ability to make valuable contributions to your department.</p>
      </div>
      
      {/* Academic Experience paragraph */}
      <div className="mb-4">
        <div className="font-semibold text-emerald-800 mb-2">ACADEMIC BACKGROUND</div>
        <p className="text-justify">{data.experience}</p>
      </div>
      
      {/* Academic Skills paragraph */}
      <div className="mb-4">
        <div className="font-semibold text-emerald-800 mb-2">RESEARCH AND TEACHING COMPETENCIES</div>
        <p className="text-justify">{data.skills}</p>
      </div>
      
      {/* Academic Motivation paragraph */}
      <div className="mb-4">
        <div className="font-semibold text-emerald-800 mb-2">INTEREST IN YOUR INSTITUTION</div>
        <p className="text-justify">{data.motivation}</p>
      </div>
      
      {/* Formal academic closing */}
      <div className="mb-6">
        <p className="text-justify">{data.closing}</p>
      </div>
      
      {/* Academic signature block */}
      <div className="mt-10">
        <p>Respectfully submitted,</p>
        <p className="font-bold mt-8">{data.personalInfo.name}</p>
      </div>
    </div>
  );
};

export default AcademicCoverLetterTemplate;
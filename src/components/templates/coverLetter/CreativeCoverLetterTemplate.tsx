
import React from 'react';
import { CoverLetterData } from '@/types/documents';

interface CreativeCoverLetterTemplateProps {
  data: CoverLetterData;
  editMode?: boolean;
  editableProps?: React.HTMLAttributes<HTMLElement>;
}

const CreativeCoverLetterTemplate: React.FC<CreativeCoverLetterTemplateProps> = ({ 
  data,
  editMode = false,
  editableProps = {} 
}) => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="font-sans p-8 max-w-[800px] mx-auto">
      <div className="bg-purple-500 text-white p-8 rounded-lg mb-10">
        <h1 
          className="text-3xl font-bold mb-2"
          data-field="name"
          {...(editMode ? editableProps : {})}
        >
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p 
          className="text-purple-100 mb-1"
          data-field="location"
          {...(editMode ? editableProps : {})}
        >
          {data.personalInfo.location || 'Your Location'}
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {data.personalInfo.email && (
            <a 
              href={`mailto:${data.personalInfo.email}`} 
              className="bg-purple-400 bg-opacity-30 px-3 py-1 rounded-full text-sm hover:bg-opacity-50"
              data-field="email"
              {...(editMode ? {...editableProps, href: undefined} : {})}
            >
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo.phone && (
            <span 
              className="bg-purple-400 bg-opacity-30 px-3 py-1 rounded-full text-sm"
              data-field="phone"
              {...(editMode ? editableProps : {})}
            >
              {data.personalInfo.phone}
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-8 flex justify-between items-start">
        <div>
          {data.recipientInfo.name && (
            <p className="text-lg font-bold mb-1">{data.recipientInfo.name}</p>
          )}
          {data.recipientInfo.title && (
            <p className="text-gray-600 mb-1">{data.recipientInfo.title}</p>
          )}
          {data.recipientInfo.company && (
            <p className="text-purple-600 font-medium">{data.recipientInfo.company}</p>
          )}
        </div>
        <p className="text-gray-500 italic">{today}</p>
      </div>
      
      <div className="space-y-6">
        <p className="text-xl font-semibold mb-6">
          Dear {data.recipientInfo.name || 'Hiring Manager'},
        </p>
        
        <div className="bg-purple-50 p-6 border-l-4 border-purple-400 rounded-r-lg mb-6">
          <p className="text-gray-800">
            I am writing to express my interest in the 
            <span className="text-purple-600 font-semibold"> {data.jobInfo.title || 'position'}</span> 
            at {data.recipientInfo.company || 'your company'}
            {data.jobInfo.reference ? ` (Reference: ${data.jobInfo.reference})` : ''}.
          </p>
        </div>
        
        {data.experience && (
          <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
            <p className="text-gray-700">{data.experience}</p>
          </div>
        )}
        
        {data.skills && (
          <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
            <p className="text-gray-700">{data.skills}</p>
          </div>
        )}
        
        {data.motivation && (
          <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
            <p className="text-gray-700">{data.motivation}</p>
          </div>
        )}
        
        {data.closing && (
          <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-400 before:rounded-full">
            <p className="text-gray-700">{data.closing}</p>
          </div>
        )}
        
        <div className="mt-12 border-t border-purple-200 pt-6">
          <p className="mb-4">Sincerely,</p>
          <p className="text-xl font-bold text-purple-600">{data.personalInfo.name || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );
};

export default CreativeCoverLetterTemplate;

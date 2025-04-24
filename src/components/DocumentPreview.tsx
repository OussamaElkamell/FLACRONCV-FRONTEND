
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, Minimize2, Edit2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeData, CoverLetterData } from '@/types/documents';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ModernResumeTemplate from '@/components/templates/resume/ModernResumeTemplate';
import MinimalistResumeTemplate from '@/components/templates/resume/MinimalistResumeTemplate';
import CreativeResumeTemplate from '@/components/templates/resume/CreativeResumeTemplate';
import ProfessionalResumeTemplate from '@/components/templates/resume/ProfessionalResumeTemplate';
import ProfessionalDarkTemplate from '@/components/templates/resume/ProfessionalDarkTemplate';
import ProfessionalPurpleTemplate from '@/components/templates/resume/ProfessionalPurpleTemplate';
import ProfessionalModernTemplate from '@/components/templates/resume/ProfessionalModernTemplate';

import ModernCoverLetterTemplate from '@/components/templates/coverLetter/ModernCoverLetterTemplate';
import MinimalistCoverLetterTemplate from '@/components/templates/coverLetter/MinimalistCoverLetterTemplate';
import CreativeCoverLetterTemplate from '@/components/templates/coverLetter/CreativeCoverLetterTemplate';
import ProfessionalCoverLetterTemplate from '@/components/templates/coverLetter/ProfessionalCoverLetterTemplate';
import AcademicResumeTemplate from './templates/resume/AcademicResumeTemplate';
import CorporateResumeTemplate from './templates/resume/CorporateResumeTemplate';
import ExecutiveResumeTemplate from './templates/resume/ExecutiveResumeTemplate';
import ElegantResumeTemplate from './templates/resume/ElegantResumeTemplate';
import TechnicalResumeTemplate from './templates/resume/TechnicalResumeTemplate';
import AcademicCoverLetterTemplate from './templates/coverLetter/AcademicCoverLetterTemplate';
import CorporateCoverLetterTemplate from './templates/coverLetter/CorporateCoverLetterTemplate';
import ExecutiveCoverLetterTemplate from './templates/coverLetter/ExecutiveCoverLetterTemplate';
import { getDatabase, ref, set } from 'firebase/database';
import { makeService } from '@/services/makeService';
import { getAuth } from 'firebase/auth';
import TechnicalCoverLetterTemplate from './templates/coverLetter/TechnicalCoverLetterTemplate';
interface DocumentPreviewProps {
  type: 'resume' | 'coverLetter';
  data: ResumeData | CoverLetterData;
  selectedTemplate: string;
  setData?: (data: ResumeData | CoverLetterData) => void;
  onDownloadRequest?: () => boolean;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  type, 
  data, 
  selectedTemplate, 
  setData,
  onDownloadRequest 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);
const documentRef = useRef<HTMLDivElement>(null);
const printRef = useRef<HTMLDivElement>(null);

const [contentHeight, setContentHeight] = useState<number | null>(null);
const [isOverflowing, setIsOverflowing] = useState(false);
const [pages, setPages] = useState<number[]>([0]);

const PAGE_WIDTH = 800; 
const PAGE_HEIGHT = 842;
const PRINT_SCALE = 4;

useEffect(() => {
  const checkContentHeight = () => {
    const docElement = documentRef.current;
    if (!docElement) return;

    const contentElement = docElement.firstElementChild as HTMLElement | null;
    if (!contentElement) return;

    const totalHeight = contentElement.scrollHeight;
    setContentHeight(totalHeight);

    const numberOfPages = Math.max(1, Math.ceil(totalHeight / PAGE_HEIGHT));
    setIsOverflowing(numberOfPages > 1);

    setPages(Array.from({ length: numberOfPages }, (_, i) => i));
  };

  checkContentHeight();

  const observer = new MutationObserver(checkContentHeight);
  const currentDoc = documentRef.current;

  if (currentDoc) {
    observer.observe(currentDoc, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
  }

  return () => observer.disconnect();
}, [data, selectedTemplate]);

const handleDownload = async () => {
  if (!documentRef.current) return;

  let toastId: string | number | undefined;


  try {
    const pageContainer = document.getElementById('document-page-0');
    toastId = toast.loading('Generating high quality PDF...'); 
    if (!pageContainer) {
      throw new Error('Page container not found');
    }
    await document.fonts.ready;
    const canvas = await html2canvas(pageContainer, {
      scale: 8,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
  

    const imageBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, 'image/png');
    });

    const formData = new FormData();
    formData.append('image', imageBlob, 'document.png');

   

    const response = await fetch(`${import.meta.env.VITE_API_URL}/convert-to-cmyk-pdf`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/pdf',
      },
    });

    if (!response.ok) throw new Error('Failed to generate CMYK PDF');

    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/pdf')) {
      throw new Error('Response is not a PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${type === 'resume' ? 'resume' : 'cover-letter'}-CMYK.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.dismiss(toastId);
    toast.success('Download Complete', {
      description: `Your ${type === 'resume' ? 'resume' : 'cover letter'} has been downloaded in CMYK quality.`,
    });
  } catch (error) {
    console.error('CMYK PDF generation error:', error);
    if (toastId) toast.dismiss(toastId);
    toast.error('Download Failed', {
      description: 'There was an error generating your CMYK PDF. Please try again.',
    });
  }
};

  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleContentEdit = (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditMode || !setData) return;
    
    const target = e.currentTarget;
    const fieldName = target.getAttribute('data-field');
    const sectionIndex = target.getAttribute('data-index');
    
    if (!fieldName) return;
    
    const newValue = target.innerText;
    
    if (type === 'resume') {
      const resumeData = { ...data } as ResumeData;
      
      if (fieldName === 'name') {
        resumeData.personalInfo.name = newValue;
      } else if (fieldName === 'email') {
        resumeData.personalInfo.email = newValue;
      } else if (fieldName === 'phone') {
        resumeData.personalInfo.phone = newValue;
      } else if (fieldName === 'location') {
        resumeData.personalInfo.location = newValue;
      } else if (fieldName === 'linkedin') {
        resumeData.personalInfo.linkedin = newValue;
      } else if (fieldName === 'summary') {
        resumeData.summary = newValue;
      } else if (fieldName.startsWith('education.') && sectionIndex) {
        const subField = fieldName.split('.')[1];
        const index = parseInt(sectionIndex);
        
        if (resumeData.education[index]) {
          resumeData.education[index][subField as keyof typeof resumeData.education[0]] = newValue;
        }
      } else if (fieldName.startsWith('experience.') && sectionIndex) {
        const subField = fieldName.split('.')[1];
        const index = parseInt(sectionIndex);
        
        if (resumeData.experience[index]) {
          resumeData.experience[index][subField as keyof typeof resumeData.experience[0]] = newValue;
        }
      } else if (fieldName.startsWith('skills.') && sectionIndex) {
        const subField = fieldName.split('.')[1];
        const index = parseInt(sectionIndex);
        
        if (resumeData.skills[index]) {
          resumeData.skills[index][subField as keyof typeof resumeData.skills[0]] = newValue;
        }
      } else if (fieldName.startsWith('projects.') && sectionIndex) {
        const subField = fieldName.split('.')[1];
        const index = parseInt(sectionIndex);
        
        if (resumeData.projects && resumeData.projects[index]) {
          resumeData.projects[index][subField as keyof typeof resumeData.projects[0]] = newValue;
        }
      }
      
      setData(resumeData);
    } else {
      const coverLetterData = { ...data } as CoverLetterData;
      
      if (fieldName === 'name') {
        coverLetterData.personalInfo.name = newValue;
      } else if (fieldName === 'email') {
        coverLetterData.personalInfo.email = newValue;
      } else if (fieldName === 'phone') {
        coverLetterData.personalInfo.phone = newValue;
      } else if (fieldName === 'location') {
        coverLetterData.personalInfo.location = newValue;
      } else if (fieldName === 'recipientName') {
        coverLetterData.recipientInfo.name = newValue;
      } else if (fieldName === 'recipientTitle') {
        coverLetterData.recipientInfo.title = newValue;
      } else if (fieldName === 'recipientCompany') {
        coverLetterData.recipientInfo.company = newValue;
      } else if (fieldName === 'jobTitle') {
        coverLetterData.jobInfo.title = newValue;
      } else if (fieldName === 'jobReference') {
        coverLetterData.jobInfo.reference = newValue;
      } else if (fieldName === 'experience') {
        coverLetterData.experience = newValue;
      } else if (fieldName === 'skills') {
        coverLetterData.skills = newValue;
      } else if (fieldName === 'motivation') {
        coverLetterData.motivation = newValue;
      } else if (fieldName === 'closing') {
        coverLetterData.closing = newValue;
      }
      
      setData(coverLetterData);
    }
  };

  const renderTemplate = (scale = 1.0) => {
    const editableProps = isEditMode
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: handleContentEdit,
          className:
            'outline-none focus:ring-1 focus:ring-[#E67912] hover:bg-gray-50 transition-colors',
        }
      : {};
  
    const commonProps = {
      editMode: isEditMode,
      editableProps,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${PAGE_WIDTH}px`,
        minHeight: `${PAGE_HEIGHT}px`,
      },
    };
  
    if (type === 'resume') {
      const resumeData = data as ResumeData;
  
      switch (selectedTemplate) {
        case 'modern':
          return <ModernResumeTemplate data={resumeData} {...commonProps} />;
        case 'minimalist':
          return <MinimalistResumeTemplate data={resumeData} {...commonProps} />;
        case 'creative':
          return <CreativeResumeTemplate data={resumeData} {...commonProps} />;
        case 'professionalDark':
          return <ProfessionalDarkTemplate data={resumeData} {...commonProps} />;
        case 'professionalPurple':
          return <ProfessionalPurpleTemplate data={resumeData} {...commonProps} />;
        case 'professionalModern':
          return <ProfessionalModernTemplate data={resumeData} {...commonProps} />;
        case 'executive':
          return <ExecutiveResumeTemplate data={resumeData} {...commonProps} />;
        case 'academic':
          return <AcademicResumeTemplate data={resumeData} {...commonProps} />;
        case 'corporate':
          return <CorporateResumeTemplate data={resumeData} {...commonProps} />;
        case 'elegant':
          return <ElegantResumeTemplate data={resumeData} {...commonProps} />;
        case 'technical':
          return <TechnicalResumeTemplate data={resumeData} {...commonProps} />;
        case 'professional':
        default:
          return <ProfessionalResumeTemplate data={resumeData} {...commonProps} />;
      }
    } else {
      const coverLetterData = data as CoverLetterData;
  
      switch (selectedTemplate) {
        case 'modern':
          return <ModernCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'minimalist':
          return <MinimalistCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'creative':
          return <CreativeCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'academic':
          return <AcademicCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'executive':
          return <ExecutiveCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'corporate':
          return <CorporateCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'technical':
          return <TechnicalCoverLetterTemplate data={coverLetterData} {...commonProps} />;
        case 'professional':
        default:
          return <ProfessionalCoverLetterTemplate data={coverLetterData} {...commonProps} />;
      }
    }
  };
  

  return (
    <>
      <div className="flex justify-between items-center mb-2 p-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            className={`mr-2 text-[#E67912] hover:bg-[#E67912] hover:text-white border-[#E67912] ${isEditMode ? 'bg-gray-100' : ''}`}
          >
            {isEditMode ? (
              <>
                <Eye className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">View Mode</span>
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Edit Mode</span>
              </>
            )}
          </Button>
          {isEditMode && (
            <p className="text-sm text-muted-foreground hidden sm:block">
              Click on text to edit it directly
            </p>
          )}
        </div>
        
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="mr-2 text-[#E67912] hover:bg-[#E67912] hover:text-white border-[#E67912]"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className='text-[#E67912] hover:bg-[#E67912] hover:text-white border-[#E67912]'
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline text-[#E67912] hover:bg-[#E67912] hover:text-white border-[#E67912]">Exit Fullscreen</span>
              </>
            ) : (
              <>
    <div className="flex items-center group cursor-pointer">
  <Maximize2 />
  <span className="  px-2 py-1 group-hover:text-white">
    Fullscreen
  </span>
</div>


              </>
            )}
          </Button>
        </div>
      </div>
      
      <div
  className={`border border-gray-200 rounded-md mx-auto overflow-hidden ${
    isOverflowing ? 'shadow-md' : ''
  }`}
  style={{
    width: `${PAGE_WIDTH / 1.2}px`,
    height: isOverflowing ? `${PAGE_HEIGHT / 1.2}px` : 'auto',
    overflowY: isOverflowing ? 'auto' : 'visible',
  }}
  ref={documentRef}
>
  {pages.map((pageIndex) => (
    <div
      key={pageIndex}
      id={`document-page-${pageIndex}`}
      className="bg-white"
      style={{
        width: `${PAGE_WIDTH / 1.2}px`,
        minHeight: `${PAGE_HEIGHT / 1.2}px`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        breakAfter: 'page',
        breakInside: 'avoid',
      }}
    >
      {pageIndex === 0 && renderTemplate(1 / 1.2)}
    </div>
  ))}
</div>

<Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
  <DialogContent className="max-w-4xl w-[95vw]">
    <DialogTitle>Preview</DialogTitle>
    <div
      className="border border-gray-200 rounded-md overflow-auto max-h-[80vh]"
      style={{
        width: '100%',
      }}
    >
      {renderTemplate(0.83)} {/* 1 / 1.2 ≈ 0.83 */}
    </div>
  </DialogContent>
</Dialog>

{/* Hidden container for printing */}
<div className="hidden" ref={printRef}>
  <div style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
    {renderTemplate(1.0)} {/* Full scale for PDF */}
  </div>
</div>

    </>
  );
};

export default DocumentPreview;
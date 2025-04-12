
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
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [pages, setPages] = useState<number[]>([0]);
  const printRef = useRef<HTMLDivElement>(null);

  const PAGE_WIDTH = 595; // A4 width in pixels at 72 DPI
  const PAGE_HEIGHT = 842; // A4 height in pixels at 72 DPI
  const PRINT_SCALE = 4; // Higher scale for better PDF quality

  useEffect(() => {
    if (!documentRef.current) return;
    
    const checkContentHeight = () => {
      const docElement = documentRef.current;
      if (!docElement) return;
      
      const contentElement = docElement.firstElementChild;
      if (!contentElement) return;
      
      const totalHeight = contentElement.scrollHeight;
      
      setContentHeight(totalHeight);
      
      const numberOfPages = Math.ceil(totalHeight / PAGE_HEIGHT);
      setIsOverflowing(numberOfPages > 1);
      
      if (numberOfPages > pages.length) {
        setPages(Array.from({ length: numberOfPages }, (_, i) => i));
      } else if (numberOfPages < pages.length && numberOfPages > 0) {
        setPages(Array.from({ length: numberOfPages }, (_, i) => i));
      }
    };
    
    checkContentHeight();
    
    const observer = new MutationObserver(checkContentHeight);
    observer.observe(documentRef.current, { 
      childList: true, 
      subtree: true, 
      characterData: true,
      attributes: true 
    });
    
    return () => observer.disconnect();
  }, [data, selectedTemplate]);
  
  const handleDownload = async () => {
    if (!documentRef.current) return;
    
    if (onDownloadRequest && !onDownloadRequest()) {
      return;
    }
    


    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const user = getAuth().currentUser;
      const userId = user?.uid;
      if (userId) {

        const db = getDatabase();
        const docRef = ref(
          db,
          `users/${userId}/${type === "resume" ? "resumes" : "coverLetters"}/${Date.now()}` 
        );
  
        await set(docRef, {
          ...data,
          template: selectedTemplate,
          downloadedAt: new Date().toISOString(),
        });
  
        console.log(`${type} data saved to Realtime Database`);

      

      }
      for (let i = 0; i < pages.length; i++) {
        const pageContainer = document.getElementById(`document-page-${i}`);
        
        if (!pageContainer) continue;
        
        const canvas = await html2canvas(pageContainer, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          imageTimeout: 15000,
        });
        
        if (i > 0) {
          pdf.addPage();
        }
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save(`${type === 'resume' ? 'resume' : 'cover-letter'}.pdf`);
      
      toast.success("Download Complete", {
        description: `Your ${type === 'resume' ? 'resume' : 'cover letter'} has been downloaded.`
      });
      await fetch('https://hook.us2.make.com/0p2e2f7l60nakt13hfwjch26q1jq8cj7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type,
          email: user.email,
          displayName: user.displayName,
          template: selectedTemplate,
          downloadedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Download Failed", {
        description: "There was an error generating your PDF. Please try again."
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

  const renderTemplate = () => {
    const editableProps = isEditMode ? { 
      contentEditable: true, 
      suppressContentEditableWarning: true,
      onBlur: handleContentEdit,
      className: "outline-none focus:ring-1 focus:ring-brand-500 hover:bg-gray-50 transition-colors"
    } : {};
    
    if (type === 'resume') {
      const resumeData = data as ResumeData;
      
      switch (selectedTemplate) {
        case 'modern':
          return <ModernResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'minimalist':
          return <MinimalistResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'creative':
          return <CreativeResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'professionalDark':
          return <ProfessionalDarkTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'professionalPurple':
          return <ProfessionalPurpleTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'professionalModern':
          return <ProfessionalModernTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
          case 'executive':
            return <ExecutiveResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
          case 'academic':
            return <AcademicResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
            case 'corporate':
              return <CorporateResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
              case 'elegant':
                return <ElegantResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
                case 'technical':
                  return <TechnicalResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
        case 'professional':
        default:
          return <ProfessionalResumeTemplate data={resumeData} editMode={isEditMode} editableProps={editableProps} />;
      }
    } else {
      const coverLetterData = data as CoverLetterData;
      
      switch (selectedTemplate) {
        case 'modern':
          return <ModernCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
        case 'minimalist':
          return <MinimalistCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
        case 'creative':
          return <CreativeCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
          case 'academic':
            return <AcademicCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
            case 'executive':
              return <ExecutiveCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
              case 'corporate':
                return <CorporateCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
                case 'technical':
                  return <AcademicCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
        case 'professional':
        default:
          return <ProfessionalCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            className={`mr-2 ${isEditMode ? 'bg-gray-100' : ''}`}
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
            className="mr-2"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Fullscreen</span>
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
            {pageIndex === 0 && renderTemplate()}
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
            {renderTemplate()}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Hidden container for printing */}
      <div className="hidden" ref={printRef}>
        <div style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
          {renderTemplate()}
        </div>
      </div>
    </>
  );
};

export default DocumentPreview;
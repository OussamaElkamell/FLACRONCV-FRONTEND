
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, Minimize2, Edit2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeData, CoverLetterData } from '@/types/documents';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getAuth } from 'firebase/auth';
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
import { makeService } from '@/services/makeService';

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
  
    const toastId = toast.loading("Preparing Download", {
      description: "Please wait while we generate your PDF...",
    });
  
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const highScale = 8;
  
      for (let i = 0; i < pages.length; i++) {
        const pageContainer = document.getElementById(`document-page-${i}`);
        if (!pageContainer) continue;
  
        const canvas = await html2canvas(pageContainer, {
          scale: highScale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          imageTimeout: 15000,
        });
  
        if (i > 0) pdf.addPage();
  
        const imgData = canvas.toDataURL('image/jpeg', 2.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
  
      const filename = type === 'resume' ? 'resume.pdf' : 'cover-letter.pdf';
      pdf.save(filename);
  
      toast.dismiss(toastId);
      toast.success("Download Complete", {
        description: `Your ${type === 'resume' ? 'resume' : 'cover letter'} has been downloaded.`,
      });
  
      // ✅ Send notification email if authenticated
      const user = getAuth().currentUser;
      const userId = user?.uid;
  
      if (userId) {
        await makeService.notifyDocumentDownloaded({
          userId,
          documentType: type, // 'resume' or 'coverLetter'
          templateName: selectedTemplate || undefined,
        });
      } else {
        console.warn('No authenticated user found. Skipping email notification.');
      }
  
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.dismiss(toastId);
      toast.error("Download Failed", {
        description: "There was an error generating your PDF. Please try again.",
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
        case 'professional':
        default:
          return <ProfessionalCoverLetterTemplate data={coverLetterData} editMode={isEditMode} editableProps={editableProps} />;
      }
    }
  };

  const renderPages = () => {
    return pages.map((pageIndex) => (
      <div 
        key={pageIndex}
        id={`document-page-${pageIndex}`}
        className={`doc-paper bg-white w-[595px] shadow-md mx-auto mb-4`}
        style={{ 
          height: `${PAGE_HEIGHT}px`,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div 
          className="absolute top-0 left-0 right-0 w-full"
          style={{ 
            transform: `translateY(-${pageIndex * PAGE_HEIGHT}px)`,
          }}
        >
          {renderTemplate()}
        </div>
        
        {pageIndex < pages.length - 1 && pages.length > 1 && (
          <div className="absolute bottom-1 right-2 text-xs text-gray-400 page-indicator">
            Page {pageIndex + 1} of {pages.length}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {setData && (
          <Button 
            onClick={toggleEditMode} 
            variant="outline" 
            size="icon" 
            className="bg-white hover:bg-gray-100"
            title={isEditMode ? "View Mode" : "Edit Mode"}
          >
            {isEditMode ? 
              <Eye className="h-4 w-4" /> : 
              <Edit2 className="h-4 w-4" />
            }
          </Button>
        )}
        <Button 
          onClick={toggleFullscreen} 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-gray-100"
        >
          {isFullscreen ? 
            <Minimize2 className="h-4 w-4" /> : 
            <Maximize2 className="h-4 w-4" />
          }
        </Button>
        <Button onClick={handleDownload} className="bg-brand-500 hover:bg-brand-600">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      {isEditMode && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded text-xs shadow-sm border border-amber-200">
            Edit Mode: Click on text to edit directly
          </div>
        </div>
      )}
      
      <div className="hidden" ref={documentRef}>
        {renderTemplate()}
      </div>
      
      <div className="hidden" ref={printRef}></div>
      
      <div className="doc-preview bg-gray-100 border rounded-lg overflow-auto shadow-lg">
        <div className="p-4 flex flex-col items-center">
          {renderPages()}
          
          {pages.length > 1 && (
            <div className="text-center text-sm text-gray-600 mt-2 mb-4">
              Your document has multiple pages ({pages.length})
            </div>
          )}
        </div>
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogTitle className="sr-only">Document Preview</DialogTitle>
        <DialogDescription className="sr-only">
          Preview your document in fullscreen mode
        </DialogDescription>
        <DialogContent className="max-w-screen max-h-screen w-screen h-screen p-6 rounded-none flex items-center justify-center bg-gray-100 overflow-auto">
          <Button 
            onClick={toggleFullscreen} 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 bg-white hover:bg-gray-100"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <div className="h-full overflow-auto flex flex-col items-center py-4">
            {renderPages()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentPreview;

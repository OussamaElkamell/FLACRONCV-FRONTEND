
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Target, Loader2 } from 'lucide-react';
import { CoverLetterData } from '@/types/documents';
import AtsOptimizationPanel from './AtsOptimizationPanel';
import { makeService } from '@/services/makeService';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { openaiService } from '@/services/openaiService';

interface CoverLetterToolbarProps {
  coverLetterData: CoverLetterData;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterData>>;
}

const CoverLetterToolbar: React.FC<CoverLetterToolbarProps> = ({ coverLetterData,setCoverLetterData }) => {
  const [linkedInTips, setLinkedInTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { user } = useFirebaseAuth();
  
  // Check if user has pro subscription
  const hasPro = user?.subscription?.plan === 'pro';
  // Check if user has basic or pro subscription
  const hasSubscription = user?.subscription?.plan === 'basic' || user?.subscription?.plan === 'pro';
  
  // This adapts cover letter data to the format expected by the LinkedIn optimization service
  const handleLinkedInOptimize = async () => {
    // Check if the user has a pro subscription
    if (!hasPro) {
      toast.error("LinkedIn optimization requires a Pro subscription");
      return;
    }
    
    setIsLoading(true);
    try {
      // Convert cover letter data to a format that works with the LinkedIn optimization
      const adaptedData = {
        summary: coverLetterData.motivation || '',
        experience: [{
          company: coverLetterData.recipientInfo?.company || '',
          position: coverLetterData.jobInfo?.title || '',
          description: coverLetterData.experience || ''
        }],
        skills: [{
          category: 'Skills',
          skills: coverLetterData.skills || ''
        }]
      };
      
      const result = await makeService.getLinkedInOptimizationTips(adaptedData as any);
      if (result.success && result.tips) {
        setLinkedInTips(result.tips);
        toast.success("LinkedIn optimization tips generated");
      } else {
        toast.error("Failed to generate LinkedIn optimization tips");
      }
    } catch (error) {
      console.error("LinkedIn optimization error:", error);
      toast.error("An error occurred while generating LinkedIn tips");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIEnhance = async () => {
    // Check if the user has pro subscription (updated from basic)
    if (!hasPro) {
      toast.error("AI enhancement requires a Pro subscription");
      return;
    }
    
    setIsEnhancing(true);
    try {
      // Call OpenAI for enhancement
      const result = await openaiService.enhanceCoverLetter(coverLetterData);
      if (result.success) {
        setCoverLetterData(result.data);
        toast.success("Cover letter enhanced with AI");
      } else {
        toast.error("Failed to enhance cover letter with AI");
      }
 
    } catch (error) {
      console.error("AI enhancement error:", error);
      toast.error("An error occurred while enhancing with AI");
    } finally {
      setIsEnhancing(false);
    }
  };
  
  return (
    <div className="bg-white border rounded-lg p-4 w-full space-y-4">
      <div className="space-y-4">
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center"
          onClick={handleAIEnhance}
          disabled={isEnhancing || !hasPro}
        >
          {isEnhancing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Target className="mr-2 h-4 w-4" />
          )}
          AI Enhancement
          {!hasPro && <span className="ml-2 text-xs text-amber-500">PRO</span>}
        </Button>
        
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          disabled={isLoading || !hasPro}
          onClick={handleLinkedInOptimize}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Linkedin className="mr-2 h-4 w-4" />
          )}
          LinkedIn Optimization
          {!hasPro && <span className="ml-2 text-xs text-amber-500">PRO</span>}
        </Button>
      </div>
      
      {linkedInTips && (
        <Alert className="mt-4">
          <AlertTitle>LinkedIn Optimization Tips</AlertTitle>
          <AlertDescription className="text-sm whitespace-pre-line">
            {linkedInTips}
          </AlertDescription>
        </Alert>
      )}
      
      <AtsOptimizationPanel resumeData={coverLetterData as any} />
    </div>
  );
};

export default CoverLetterToolbar;

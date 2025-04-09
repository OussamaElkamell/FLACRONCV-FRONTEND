
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, X, AlertCircle } from 'lucide-react';
import { aiService } from '@/services/firebaseClient';
import { ResumeData } from '@/types/documents';
import { useToast } from '@/hooks/use-toast';

interface AtsOptimizationPanelProps {
  resumeData: ResumeData;
}

interface AtsAnalysis {
  keywordsAnalysis: Array<{
    keyword: string;
    included: boolean;
    importance: 'high' | 'medium' | 'low';
  }>;
  missingSkills: string[];
  formatImprovements: string[];
  contentSuggestions: string[];
  overallScore: number;
  summary: string;
}

const AtsOptimizationPanel: React.FC<AtsOptimizationPanelProps> = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AtsAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { personalInfo: { photo, ...personalInfoWithoutPhoto }, ...resumeWithoutPhoto } = resumeData;
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Job description required',
        description: 'Please paste a job description to analyze against.',
        variant: 'destructive'
      });
      return;
    }
  
    console.log("analyze");
  
    setLoading(true);
    try {
      // Exclude photo from resumeData before passing it
      const { personalInfo: { photo, ...personalInfoWithoutPhoto }, ...resumeWithoutPhoto } = resumeData;
  
      // Prepare the final resumeData excluding photo and combine with jobDescription
      const modifiedResumeData = { ...resumeWithoutPhoto, personalInfo: personalInfoWithoutPhoto };
  
      // Pass both resumeData and jobDescription as separate arguments
      const result = await aiService.getAtsOptimization(modifiedResumeData, jobDescription);
  
      if (result.success) {
        setAnalysis(result.data);
        toast({
          title: 'Analysis complete',
          description: 'Your resume has been analyzed against the job description.'
        });
      } else {
        toast({
          title: 'Analysis failed',
          description: result.error || 'Could not complete ATS analysis',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during analysis',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">ATS Optimization</CardTitle>
          <CardDescription>
            Paste a job description to analyze how well your resume matches the requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !jobDescription.trim()}
            className="w-full"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </CardFooter>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">ATS Analysis Results</CardTitle>
              <div className="flex items-center">
                <span className="mr-2">ATS Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}/10
                </span>
              </div>
            </div>
            <Progress value={analysis.overallScore * 10} className="h-2 mt-2" />
            <CardDescription className="mt-4">{analysis.summary}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Keywords Analysis</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordsAnalysis.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant={keyword.included ? "default" : "outline"}
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {keyword.keyword}
                    <span className={`ml-1 w-2 h-2 rounded-full ${getImportanceColor(keyword.importance)}`}></span>
                    {keyword.included ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <X className="w-3 h-3 text-red-500" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Missing Skills</h3>
              {analysis.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="destructive" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-green-600 font-medium">No critical skills missing!</p>
              )}
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Format Improvements</h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.formatImprovements.map((improvement, index) => (
                  <li key={index} className="text-gray-700">{improvement}</li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Content Suggestions</h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.contentSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Pro Tip</AlertTitle>
              <AlertDescription>
                Customize your resume for each application based on these insights for the best results.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AtsOptimizationPanel;

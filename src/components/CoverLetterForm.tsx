import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoverLetterForm = ({ setCoverLetterData }: { setCoverLetterData: React.Dispatch<React.SetStateAction<any>> }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    recipientInfo: {
      name: '',
      title: '',
      company: '',
    },
    jobInfo: {
      title: '',
      reference: '',
    },
    experience: '',
    skills: '',
    motivation: '',
    closing: '',
  });

  // Update parent component's state whenever formData changes
  useEffect(() => {
    setCoverLetterData(formData);
  }, [formData, setCoverLetterData]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleRecipientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      recipientInfo: {
        ...formData.recipientInfo,
        [name]: value,
      },
    });
  };

  const handleJobInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      jobInfo: {
        ...formData.jobInfo,
        [name]: value,
      },
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = {
        ...formData,
        experience: formData.experience || "I bring over 5 years of experience in developing web applications and software solutions that deliver exceptional user experiences. In my current role at XYZ Company, I led the development of a customer portal that increased user engagement by 45% and reduced support tickets by 30%",
        skills: formData.skills || "My technical skills include proficiency in JavaScript, React, Node.js, and AWS cloud infrastructure. I excel at building scalable applications and implementing CI/CD pipelines to ensure efficient development workflows.",
        motivation: formData.motivation || `I am particularly excited about the opportunity to join ${formData.recipientInfo.company || "your company"} because of your focus on innovative solutions and commitment to customer success. The ${formData.jobInfo.title || "position"} aligns perfectly with my career goals and I believe I can make significant contributions to your team.`,
        closing: formData.closing || "I look forward to the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application.",
      };
      
      setCoverLetterData(generatedContent);
      
      toast({
        title: "Cover Letter Generated",
        description: "Your cover letter has been created successfully!",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to call setCoverLetterData here as it's already updated via useEffect
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Enter your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.personalInfo.name} 
                onChange={handlePersonalInfoChange}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.personalInfo.email} 
                onChange={handlePersonalInfoChange}
                placeholder="john.smith@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.personalInfo.phone} 
                onChange={handlePersonalInfoChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.personalInfo.location} 
                onChange={handlePersonalInfoChange}
                placeholder="New York, NY"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recipient Information</CardTitle>
          <CardDescription>Enter details about the hiring manager and company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name (optional)</Label>
              <Input 
                id="recipientName" 
                name="name" 
                value={formData.recipientInfo.name} 
                onChange={handleRecipientInfoChange}
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientTitle">Recipient Title (optional)</Label>
              <Input 
                id="recipientTitle" 
                name="title" 
                value={formData.recipientInfo.title} 
                onChange={handleRecipientInfoChange}
                placeholder="Hiring Manager"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.recipientInfo.company} 
                onChange={handleRecipientInfoChange}
                placeholder="ABC Corporation"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
          <CardDescription>Enter details about the position you're applying for</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                name="title" 
                value={formData.jobInfo.title} 
                onChange={handleJobInfoChange}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobReference">Job Reference (optional)</Label>
              <Input 
                id="jobReference" 
                name="reference" 
                value={formData.jobInfo.reference} 
                onChange={handleJobInfoChange}
                placeholder="Job ID or where you found the listing"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cover Letter Content</CardTitle>
          <CardDescription>
            Provide details for your cover letter or let our AI generate content for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Relevant Experience</Label>
            <Textarea 
              id="experience" 
              name="experience" 
              value={formData.experience} 
              onChange={handleTextAreaChange}
              placeholder="Briefly describe your relevant experience..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Let our AI generate this content if left blank
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills & Qualifications</Label>
            <Textarea 
              id="skills" 
              name="skills" 
              value={formData.skills} 
              onChange={handleTextAreaChange}
              placeholder="List your relevant skills and qualifications..."
              className="min-h-[100px]"
              />
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Let our AI generate this content if left blank
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motivation">Why You're Interested</Label>
            <Textarea 
              id="motivation" 
              name="motivation" 
              value={formData.motivation} 
              onChange={handleTextAreaChange}
              placeholder="Explain why you're interested in this position and company..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Let our AI generate this content if left blank
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="closing">Closing Statement</Label>
            <Textarea 
              id="closing" 
              name="closing" 
              value={formData.closing} 
              onChange={handleTextAreaChange}
              placeholder="Add a closing statement..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional: Let our AI generate this content if left blank
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          type="button"
          onClick={handleGenerate}
          className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CoverLetterForm;


import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import ResumeForm from '@/components/ResumeForm';
import DocumentPreview from '@/components/DocumentPreview';
import TemplateSelector from '@/components/TemplateSelector';
import ResumeToolbar from '@/components/ResumeToolbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ResumeData } from '@/types/documents';
import { resumeService } from '@/services/firebaseClient';
import { resumeApi, paymentApi } from '@/services/apiClient';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { makeService } from '@/services/makeService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    photo: '',
  },
  summary: '',
  education: [{ institution: '', degree: '', date: '', description: '' }],
  experience: [{ company: '', position: '', date: '', description: '' }],
  projects: [{ name: '', description: '', link: '', technologies: '', date: '' }],
  skills: [{ category: 'Technical Skills', skills: '' }],
  template: 'professional',
};

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [featureRequested, setFeatureRequested] = useState<'ai' | 'download' | null>(null);
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();
  
  // Add query to fetch subscription plan prices
  const { data: planData, isLoading: isLoadingPlans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const result = await paymentApi.getPlans();
      return result.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
  
  useEffect(() => {
    setResumeData(prevData => ({
      ...prevData,
      template: selectedTemplate
    }));
  }, [selectedTemplate]);
  
  const handleUpdateResumeData = (data: ResumeData | any) => {
    const typedData = data as ResumeData;
    setResumeData(typedData);
  };
  
  const hasSubscription = () => {
    return user?.subscription && ['basic', 'pro'].includes(user?.subscription?.plan);
  };
  
  const handleDownloadRequest = () => {
    if (!hasSubscription()) {
      setFeatureRequested('download');
      setShowSubscribeDialog(true);
      return;
    }
    
    return true;
  };
  
  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    setShowSubscribeDialog(false);
    
    toast.loading("Preparing checkout...");
    
    try {
      const result = await paymentApi.createCheckoutSession(plan);
      if (!result.success) {
        toast.error("Checkout Error", {
          description: result.message || "Could not create checkout session",
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Checkout Failed", {
        description: "Failed to start checkout process. Please try again.",
      });
    }
  };
  
  const createResumeMutation = useMutation({
    mutationFn: async (data: ResumeData) => {
      const result = await resumeApi.generate(data);
      
  
      return result;
    },
    onSuccess: (data) => {
      toast.success("Resume created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create resume", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  });
  
  const handleSaveResume = async () => {
    if (!user) {
      toast.error("Please login to save your resume");
      navigate('/login');
      return;
    }
    
    createResumeMutation.mutate(resumeData);
  };
  
  // Format price helper function
  const formatPrice = (amount?: number, currency?: string) => {
    if (!amount || !currency) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 bg-muted/30">
        <div className="container-xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link to="/">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-brand-500" />
                FLACRONCV Resume Builder
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:max-h-[calc(100vh-160px)] overflow-y-auto pr-4">
              <Tabs defaultValue="content">
                <TabsList className="mb-6 sticky top-0 bg-background z-10">
                  <TabsTrigger value="content">Resume Content</TabsTrigger>
                  <TabsTrigger value="template">Choose Template</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <ResumeForm setResumeData={setResumeData} />
                </TabsContent>
                <TabsContent value="template">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate} 
                    setSelectedTemplate={setSelectedTemplate} 
                    type="resume" 
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="hidden lg:block lg:sticky lg:top-10 h-[calc(100vh-160px)]">
              <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                <h2 className="text-lg font-medium p-4 border-b">Preview</h2>
                <div className="flex-1 overflow-auto">
                  <DocumentPreview 
                    type="resume" 
                    data={resumeData} 
                    selectedTemplate={selectedTemplate}
                    setData={handleUpdateResumeData}
                    onDownloadRequest={handleDownloadRequest}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <ResumeToolbar resumeData={resumeData} setResumeData={setResumeData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to Use Premium Features</DialogTitle>
            <DialogDescription>
              {featureRequested === 'ai' 
                ? 'AI enhancement requires a subscription plan.' 
                : 'Downloading PDF documents requires a subscription plan.'}
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingPlans ? (
            <div className="flex justify-center my-8">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="border rounded-lg p-4 flex flex-col">
                <h3 className="text-lg font-medium mb-2">Basic Plan</h3>
                <p className="text-2xl font-bold mb-2">
                  {planData?.basic ? formatPrice(planData.basic.amount, planData.basic.currency) : '$19.99'}
                </p>
                <ul className="space-y-2 mb-4 flex-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>PDF downloads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>AI enhancements</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handleSubscribe('basic')} 
                  className="w-full mt-auto"
                  disabled={user?.subscription?.plan === 'basic' || user?.subscription?.plan === 'pro'}
                >
                  {user?.subscription?.plan === 'basic' || user?.subscription?.plan === 'pro' ? 'Current Plan' : 'Choose Basic'}
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 bg-primary/5 flex flex-col relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs py-1 px-2 rounded">
                  Best Value
                </div>
                <h3 className="text-lg font-medium mb-2">Pro Plan</h3>
                <p className="text-2xl font-bold mb-2">
                  {planData?.pro ? formatPrice(planData.pro.amount, planData.pro.currency) : '$49.99'}
                </p>
                <ul className="space-y-2 mb-4 flex-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>PDF downloads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All premium templates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>AI resume enhancements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>LinkedIn optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  onClick={() => handleSubscribe('pro')} 
                  className="w-full mt-auto"
                  disabled={user?.subscription?.plan === 'pro'}
                >
                  {user?.subscription?.plan === 'pro' ? 'Current Plan' : 'Choose Pro'}
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscribeDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumePage;
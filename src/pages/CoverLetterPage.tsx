
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import CoverLetterForm from '@/components/CoverLetterForm';
import DocumentPreview from '@/components/DocumentPreview';
import TemplateSelector from '@/components/TemplateSelector';
import CoverLetterToolbar from '@/components/CoverLetterToolbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CoverLetterData } from '@/types/documents';
import { coverLetterApi, paymentApi } from '@/services/apiClient';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const initialCoverLetterData: CoverLetterData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: ''
  },
  recipientInfo: {
    name: '',
    title: '',
    company: ''
  },
  jobInfo: {
    title: '',
    reference: ''
  },
  experience: '',
  skills: '',
  motivation: '',
  closing: '',
  template: 'professional'
};

const CoverLetterPage = () => {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [featureRequested, setFeatureRequested] = useState<'ai' | 'download' | null>(null);
  const { user } = useFirebaseAuth();
  const { data: planData, isLoading: isLoadingPlans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const result = await paymentApi.getPlans();
      return result.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
  // Update template in coverLetterData when it changes
  useEffect(() => {
    setCoverLetterData(prevData => ({
      ...prevData,
      template: selectedTemplate
    }));
  }, [selectedTemplate]);
  
  // Create a type-safe wrapper for setCoverLetterData
  const handleUpdateCoverLetterData = (data: CoverLetterData | any) => {
    const typedData = data as CoverLetterData;
    setCoverLetterData(typedData);
  };
  
  // Check if user has subscription
  const hasSubscription = () => {
    return user?.subscription?.plan && ['basic', 'pro'].includes(user.subscription.plan);
  };
  
  // Handle download PDF request
  const handleDownloadRequest = () => {
    if (!hasSubscription()) {
      setFeatureRequested('download');
      setShowSubscribeDialog(true);
      return;
    }
    
    // The actual download happens in DocumentPreview component
    return true;
  };
  
  // Handle subscription checkout
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
      // Redirect happens in the API client
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Checkout Failed", {
        description: "Failed to start checkout process. Please try again.",
      });
    }
  };
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
                FLACRONCV Cover Letter Builder
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:max-h-[calc(100vh-160px)] overflow-y-auto pr-4">
              <Tabs defaultValue="content">
                <TabsList className="mb-6 sticky top-0 bg-background z-10">
                  <TabsTrigger value="content">Cover Letter Content</TabsTrigger>
                  <TabsTrigger value="template">Choose Template</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <CoverLetterForm setCoverLetterData={setCoverLetterData} />
                </TabsContent>
                <TabsContent value="template">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate} 
                    setSelectedTemplate={setSelectedTemplate} 
                    type="coverLetter" 
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="hidden lg:block lg:sticky lg:top-10 h-[calc(100vh-160px)]">
              <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                <h2 className="text-lg font-medium p-4 border-b">Preview</h2>
                <div className="flex-1 overflow-auto">
                  <DocumentPreview 
                    type="coverLetter" 
                    data={coverLetterData} 
                    selectedTemplate={selectedTemplate}
                    setData={handleUpdateCoverLetterData}
                    onDownloadRequest={handleDownloadRequest}
                  />
                </div>
              </div>
              
              {/* Add CoverLetterToolbar below the preview */}
              <div className="mt-4">
                <CoverLetterToolbar coverLetterData={coverLetterData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Subscription Dialog */}
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
                  disabled={user?.subscription.plan === 'basic' || user?.subscription.plan === 'pro'}
                >
                  {user?.subscription.plan === 'basic' || user?.subscription.plan === 'pro' ? 'Current Plan' : 'Choose Basic'}
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
                  disabled={user?.subscription.plan === 'pro'}
                >
                  {user?.subscription.plan === 'pro' ? 'Current Plan' : 'Choose Pro'}
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

export default CoverLetterPage;

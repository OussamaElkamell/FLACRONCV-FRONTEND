
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { CreditCard, AlertTriangle, UserCog, UserX } from 'lucide-react';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { paymentApi } from '@/services/apiClient';
import { toast } from 'sonner';

const UserSettingsPage = () => {
  const { user, refreshUserData } = useFirebaseAuth();
  const [showUnsubscribeDialog, setShowUnsubscribeDialog] = useState(false);
  const [unsubscribeLoading, setUnsubscribeLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleUnsubscribe = async () => {
    if (!user) return;
    
    setUnsubscribeLoading(true);
    
    try {
      // Call the API to unsubscribe
      const result = await paymentApi.unsubscribe();
      
      if (result.success) {
        // Refresh user data to update subscription status
        await refreshUserData();
        
        toast.success("Unsubscribed Successfully", {
          description: "Your subscription has been cancelled."
        });
        
        setShowUnsubscribeDialog(false);
      } else {
        toast.error("Unsubscribe Failed", {
          description: result.message || "Could not cancel subscription"
        });
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      toast.error("Error", {
        description: "An error occurred. Please try again."
      });
    } finally {
      setUnsubscribeLoading(false);
    }
  };

  // Helper function to get plan name display
  const getPlanDisplay = () => {
    if (!user?.subscription) return "No active subscription";
    const plan = user.subscription.plan;
    return plan ? `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan` : "No active subscription";
  };
  
  // Helper function to get plan description
  const getPlanDescription = () => {
    if (!user?.subscription) return "";
    const plan = user.subscription.plan;
    console.log("plan",plan);
    
    if (plan === 'basic') {
      return 'Access to basic templates and PDF downloads';
    } else if (plan === 'pro') {
      return 'Access to all premium features including AI enhancements and advanced templates';
    } else {
      return 'Free plan with limited features';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserCog className="h-6 w-6 text-[#E67912]" />
              Account Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and subscription preferences
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Subscription Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#E67912]" />
                  Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription plan and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-1">Current Plan</h3>
                    <p className="text-lg">
                      {getPlanDisplay()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getPlanDescription()}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                {user?.subscription && user.subscription.plan !== 'free' ? (
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={() => setShowUnsubscribeDialog(true)}
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Cancel Subscription
                  </Button>
                ) : (
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={() => navigate('/plans')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Unsubscribe Dialog */}
      <Dialog open={showUnsubscribeDialog} onOpenChange={setShowUnsubscribeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Cancel Subscription
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will lose access to premium features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-4">
            <p className="text-sm text-amber-800">
              By cancelling, you'll immediately lose access to:
            </p>
            <ul className="list-disc list-inside text-sm text-amber-800 mt-2">
              {user?.subscription?.plan === 'pro' && <li>AI enhancements for resumes and cover letters</li>}
              <li>Premium templates</li>
              <li>Advanced formatting options</li>
              {user?.subscription?.plan === 'pro' && <li>LinkedIn optimization</li>}
            </ul>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowUnsubscribeDialog(false)}
              disabled={unsubscribeLoading}
            >
              Keep Subscription
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleUnsubscribe}
              disabled={unsubscribeLoading}
            >
              {unsubscribeLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Cancel Subscription'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserSettingsPage;
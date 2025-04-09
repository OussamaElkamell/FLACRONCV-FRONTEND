
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { paymentApi } from '@/services/apiClient';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { toast } from 'sonner';
import { makeService } from '@/services/makeService';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { user, refreshUserData } = useFirebaseAuth();
  const [notificationSent, setNotificationSent] = useState(false);
  useEffect(() => {
    // Store verification state in session storage to prevent duplicate processing after browser refresh/navigation
    const hasVerified = sessionStorage.getItem(`payment_verified_${sessionId}`);
    
    // If already verified, set the state and skip verification
    if (hasVerified) {
      console.log('Payment was already verified in this session, using cached data');
      setVerified(true);
      setPlan(sessionStorage.getItem(`payment_plan_${sessionId}`));
      setLoading(false);
      return; // Skip further processing if already verified
    }
  
    // Define the verify payment function
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Missing session information");
        setLoading(false);
        return;
      }
  
      try {
        console.log('Verifying payment with session ID:', sessionId);
        const result = await paymentApi.verifyPaymentSuccess(sessionId);
  
        if (result.success && result.data?.paid) {
          setPlan(result.data.plan);
          setVerified(true); // This should only run once when the payment is verified
  
          // Store verification state in session storage
          sessionStorage.setItem(`payment_verified_${sessionId}`, 'true');
          sessionStorage.setItem(`payment_plan_${sessionId}`, result.data.plan);
  
          // Refresh the user data to get updated subscription
          console.log('Payment verified, refreshing user data...');
          await refreshUserData();
  
          toast.success("Payment Successful", {
            description: `You've successfully subscribed to the ${result.data.plan} plan.`
          });
  
 
  
      
        } else {
          toast.error("Payment verification failed", {
            description: "We couldn't verify your payment. Please contact support."
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error("Verification Error", {
          description: "An error occurred while verifying your payment."
        });
      } finally {
        setLoading(false);
      }
    };
  
    // Run the payment verification if not already verified in the session
    if (!hasVerified) {
      verifyPayment();
    }
  }, [sessionId, refreshUserData, user, notificationSent]);
  
  useEffect(() => {
    if (verified && user?.id && !notificationSent) {
      // Send notification to Make.com about payment confirmation
      makeService.notifyPaymentConfirmed({
        userId: user.id,
        sessionId: sessionId,
        plan: plan
      });
  
      // Update notificationSent to prevent future notifications
      setNotificationSent(true);
    }
  }, [verified, user, notificationSent, sessionId, plan]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h2 className="text-xl font-medium text-center">Verifying your payment...</h2>
            <p className="text-muted-foreground text-center mt-2">
              Please wait while we confirm your subscription.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Payment Successful!</h1>
            {plan && (
              <p className="text-lg text-center mb-6">
                You are now subscribed to the <span className="font-medium">{plan.charAt(0).toUpperCase() + plan.slice(1)}</span> plan.
              </p>
            )}
            <p className="text-muted-foreground text-center mb-8">
              Thank you for your purchase. You now have full access to all premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2" 
                asChild
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button className="flex-1">
                <Link to="/resume">Continue to Resume Builder</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

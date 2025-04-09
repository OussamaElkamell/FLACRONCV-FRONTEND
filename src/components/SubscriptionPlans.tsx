
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { paymentApi } from '@/services/apiClient';
import { toast } from 'sonner';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';

interface PlanInfo {
  id: string;
  name: string;
  amount: number;
  currency: string;
}

interface PlansData {
  basic: PlanInfo;
  pro: PlanInfo;
}

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<PlansData | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const { user } = useFirebaseAuth();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await paymentApi.getPlans();
        if (result.success && result.data) {
          setPlans(result.data as PlansData);
        } else {
          toast.error("Could not load subscription plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load subscription information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    if (!user) {
      toast.error("Please log in to subscribe");
      return;
    }
    
    setSubscribing(plan);
    try {
      const result = await paymentApi.createCheckoutSession(plan);
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        toast.error("Could not create checkout session");
      }
    } catch (error) {
      console.error(`Error subscribing to ${plan} plan:`, error);
      toast.error(`Failed to start ${plan} subscription process`);
    } finally {
      setSubscribing(null);
    }
  };
  
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100);
  };
  
  // Function to check if the user has a particular plan
  const hasSubscription = (planName: string): boolean => {
    if (!user?.subscription) return false;
    
    // Check for active subscription with matching plan
    return user.subscription.status === 'active' && 
           user.subscription.plan.toLowerCase() === planName.toLowerCase();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (!plans) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Unable to load subscription plans</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Basic Plan */}
      <Card className="flex flex-col border-2 relative">
        <CardHeader>
          <CardTitle className="text-xl">Basic Plan</CardTitle>
          <CardDescription>For simple resume and cover letter needs</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">{formatPrice(plans.basic.amount, plans.basic.currency)}</span>
            <span className="text-muted-foreground ml-1">one-time payment</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>Access to all basic templates</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>PDF and Word downloads</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>Unlimited document storage</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => handleSubscribe('basic')}
            disabled={hasSubscription('basic') || hasSubscription('pro') || subscribing !== null}
          >
            {subscribing === 'basic' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : hasSubscription('basic') || hasSubscription('pro') ? (
              'Current Plan'
            ) : (
              'Subscribe Now'
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Pro Plan */}
      <Card className="flex flex-col border-2 border-primary relative">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
          RECOMMENDED
        </div>
        <CardHeader>
          <CardTitle className="text-xl">Pro Plan</CardTitle>
          <CardDescription>For professionals and job seekers</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">{formatPrice(plans.pro.amount, plans.pro.currency)}</span>
            <span className="text-muted-foreground ml-1">one-time payment</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>All Basic plan features</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>Access to premium templates</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>AI resume enhancement</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>AI cover letter enhancement</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>LinkedIn profile optimization</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant={hasSubscription('pro') ? "outline" : "default"} 
            onClick={() => handleSubscribe('pro')}
            disabled={hasSubscription('pro') || subscribing !== null}
          >
            {subscribing === 'pro' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : hasSubscription('pro') ? (
              'Current Plan'
            ) : (
              'Subscribe Now'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
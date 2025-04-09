
import React from 'react';
import Navbar from '@/components/Navbar';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

const PlansPage = () => {
  const { user } = useFirebaseAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground">
              Select the plan that best fits your needs and career goals
            </p>
          </div>
          
          {!user && (
            <Alert className="mb-6 max-w-2xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Not logged in</AlertTitle>
              <AlertDescription>
                Please log in or create an account to purchase a subscription
              </AlertDescription>
            </Alert>
          )}
          
          <SubscriptionPlans />
          
          <div className="mt-12 text-center text-sm text-muted-foreground max-w-xl mx-auto">
            <p>
              All plans are one-time payments that provide permanent access to features.
              Need help choosing? Contact our support team for guidance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlansPage;

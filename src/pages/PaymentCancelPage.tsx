
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <XCircle className="h-12 w-12 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Payment Cancelled</h1>
          <p className="text-muted-foreground text-center mb-8">
            Your payment was cancelled. No charges were made to your account.
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
            <Button 
              variant="default" 
              className="flex items-center justify-center gap-2"
              asChild
            >
              <Link to="/resume">
                <HelpCircle className="h-4 w-4" />
                Continue without subscribing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;

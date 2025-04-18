
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4  hover:bg-[#fb9d44] hover:text-white">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="prose max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to FLACRONCV. By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on FLACRONCV's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose or for any public display;</li>
            <li>Attempt to reverse engineer any software contained on FLACRONCV's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on FLACRONCV's website are provided "as is". FLACRONCV makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall FLACRONCV or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FLACRONCV's website, even if FLACRONCV or a FLACRONCV authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>5. Subscriptions and Payments</h2>
          <p>
            Some features of FLACRONCV require a subscription. You agree to pay all fees charged to your account based on the pricing and billing terms presented to you at the time of subscription. You also authorize FLACRONCV to charge your chosen payment method for such fees.
          </p>

          <h2>6. Privacy Policy</h2>
          <p>
            Your use of FLACRONCV is also governed by our Privacy Policy, which can be found <Link to="/privacy" className="text-[#E67912] hover:underline">here</Link>.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            FLACRONCV reserves the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
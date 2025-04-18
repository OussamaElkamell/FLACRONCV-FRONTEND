
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 hover:bg-[#fb9d44] hover:text-white">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4 " />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At FLACRONCV, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our resume and cover letter creation services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <h3>2.1 Personal Data</h3>
          <p>
            When you register an account or use our services, we may collect personally identifiable information, such as your:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Resume and cover letter content</li>
            <li>Payment information</li>
            <li>Profile photo (if uploaded)</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <p>
            We may also collect information on how the service is accessed and used. This data may include:
          </p>
          <ul>
            <li>Your computer's Internet Protocol address</li>
            <li>Browser type</li>
            <li>Browser version</li>
            <li>Pages of our service that you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Other diagnostic data</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect about you to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your subscription and payments</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Develop new products and services</li>
            <li>Monitor usage of our services</li>
            <li>Detect, investigate and prevent fraudulent transactions and other illegal activities</li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following cases:
          </p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights and property</li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>

          <h2>6. Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, such as:
          </p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate personal data</li>
            <li>The right to erasure of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-[#E67912] hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
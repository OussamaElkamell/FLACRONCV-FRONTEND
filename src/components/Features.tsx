
import React from 'react';
import { CheckCircle, Sparkles, FileText, Zap, Search, FileCheck } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Content',
    description: 'Use AI to generate professional content for your resume and cover letters based on your experience.',
    icon: Sparkles,
  },
  {
    name: 'ATS Optimized',
    description: 'Our templates are designed to pass through Applicant Tracking Systems with ease.',
    icon: CheckCircle,
  },
  {
    name: 'Professional Templates',
    description: 'Choose from multiple professionally designed templates for any industry or position.',
    icon: FileText,
  },
  {
    name: 'Instant Generation',
    description: 'Create a professional resume in minutes, not hours, with our streamlined process.',
    icon: Zap,
  },
  {
    name: 'Keyword Optimization',
    description: 'Get suggestions for industry-specific keywords to include in your resume.',
    icon: Search,
  },
  {
    name: 'Export to PDF',
    description: 'Download your completed resume or cover letter as a professional PDF document.',
    icon: FileCheck,
  },
];

const Features = () => {
  return (
    <div className="py-24 sm:py-32 bg-secondary/50">
      <div className="container-xl">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-600">Get Hired Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to create standout job applications
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered platform helps you create professionally crafted resumes and cover letters that stand out to both hiring managers and application systems.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;

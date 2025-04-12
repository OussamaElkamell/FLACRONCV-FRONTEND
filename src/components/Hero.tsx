
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FileUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#E67912] to-[#E67912] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      <div className="container-xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#E67912] to-[#E67912]">
            Create Winning Resumes With AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered resume builder helps you create professional resumes and cover letters optimized for applicant tracking systems.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center ">
  <Button asChild size="lg" className="bg-[#E67912] hover:bg-[#E67912]">
    <Link to="/resume">
      Create Resume
    </Link>
  </Button>
  <Button asChild variant="outline" size="lg" className="sm:mt-0 mt-4 text-[#E67912] hover:bg-[#E67912] hover:text-white border-[#E67912] ml-2">
    <Link to="/cover-letter">
      Write Cover Letter
    </Link>
  </Button>
</div>

        </div>
        
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-white/5 p-2 ring-1 ring-inset ring-white/10 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-background shadow-2xl ring-1 ring-border">
              <div className="doc-paper transform transition-transform hover:scale-[1.01]">
                <div className="flex flex-col gap-4">
                  <h2 className="heading-serif text-2xl font-bold text-gray-800 border-b pb-2">John Smith</h2>
                  <div className="text-sm text-gray-600">
                    <div>123 Main St, New York, NY 10001</div>
                    <div>john.smith@example.com | (555) 123-4567</div>
                  </div>
                  <div className="mt-2">
                    <h3 className="heading-serif text-lg font-semibold text-gray-800">Professional Summary</h3>
                    <p className="mt-1 text-gray-700">Dedicated software engineer with 5+ years of experience in full-stack development...</p>
                  </div>
                  <div className="sparkle-effect absolute top-5 right-5">
                    <Sparkles className="h-6 w-6 text-[#E67912]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

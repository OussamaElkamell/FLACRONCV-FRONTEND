import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-16 sm:py-24 bg-white">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to create your professional resume?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get started now and have a professional resume ready in minutes.
                Our AI-powered platform will help you create a standout document.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
                  <Link to="/resume">
                    Create Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="mt-4 sm:mt-0">
                  <Link to="/cover-letter">
                    Write Cover Letter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="border-t bg-muted/40">
          <div className="container-xl py-12">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} FLACRONCV. All rights reserved.
                </p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;

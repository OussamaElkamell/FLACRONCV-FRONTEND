
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';

const templates = {
  resume: [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and traditional design suitable for most industries',
      color: 'bg-brand-500',
      requiresPro: false,
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary layout with a fresh, updated look',
      color: 'bg-blue-500',
      requiresPro: false,
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Simple, elegant design with plenty of whitespace',
      color: 'bg-gray-800',
      requiresPro: false,
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Distinctive design for creative fields',
      color: 'bg-purple-500',
      requiresPro: true,
    },
    {
      id: 'professionalDark',
      name: 'Professional Dark',
      description: 'Dark sidebar with professional layout',
      color: 'bg-slate-800',
      requiresPro: true,
    },
    {
      id: 'professionalPurple',
      name: 'Professional Purple',
      description: 'Elegant purple-themed professional resume',
      color: 'bg-purple-700',
      requiresPro: true,
    },
    {
      id: 'professionalModern',
      name: 'Professional Modern',
      description: 'Modern professional design with bold header',
      color: 'bg-purple-900',
      requiresPro: true,
    },
  ],
  coverLetter: [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal and traditional letterhead style',
      color: 'bg-brand-500',
      requiresPro: false,
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary layout with subtle design elements',
      color: 'bg-blue-500',
      requiresPro: false,
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean and simple with elegant typography',
      color: 'bg-gray-800',
      requiresPro: true,
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for standing out in creative industries',
      color: 'bg-purple-500',
      requiresPro: true,
    },
  ]
};

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  type: 'resume' | 'coverLetter';
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  setSelectedTemplate,
  type
}) => {
  const availableTemplates = templates[type];
  const { user } = useFirebaseAuth();
  
  // Check if user has pro subscription
  const hasPro = user?.subscription.plan === 'pro';
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string, requiresPro: boolean) => {
    if (requiresPro && !hasPro) {
      // If it's a pro template and user doesn't have pro subscription,
      // don't allow selection
      return;
    }
    setSelectedTemplate(templateId);
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableTemplates.map((template) => (
          <div 
            key={template.id}
            className={cn(
              "relative cursor-pointer rounded-lg border-2 p-4 transition-all",
              selectedTemplate === template.id 
                ? "border-brand-500 bg-brand-50" 
                : "border-border hover:border-brand-200",
              template.requiresPro && !hasPro 
                ? "opacity-70 hover:opacity-100" 
                : ""
            )}
            onClick={() => handleTemplateSelect(template.id, template.requiresPro)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-brand-500" />
              </div>
            )}
            
            {template.requiresPro && !hasPro && (
              <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
            
            <div className={cn("h-16 w-full rounded-md mb-3", template.color)} />
            <div className="text-sm font-medium">
              {template.name}
              {template.requiresPro && !hasPro && (
                <span className="ml-1 text-xs text-amber-500">PRO</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          className="text-sm text-muted-foreground"
          onClick={() => {}}
        >
          Browse More Templates
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;

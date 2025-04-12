import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Sparkles, Loader2, Upload, X, Link2, FileText } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ResumeData } from '@/types/documents';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const initialEducation = { institution: '', degree: '', date: '', description: '' };
const initialExperience = { company: '', position: '', date: '', description: '' };
const initialSkills = { category: 'Technical Skills', skills: '' };
const initialProject = { name: '', description: '', link: '', technologies: '', date: '' };
const initialCertification = { title: '', name: '', date: '' };

interface CustomSection {
  title: string;
  content: string;
}

const initialCustomSection: CustomSection = { 
  title: '', 
  content: '' 
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[\d\s\-+()]{1,15}$/;

const ResumeForm = ({ 
  setResumeData, 
  resumeData 
}: { 
  setResumeData: React.Dispatch<React.SetStateAction<any>>,
  resumeData: ResumeData 
}) => {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{ email?: boolean; phone?: boolean }>({});

  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      photo: '',
    },
    summary: '',
    education: [{ ...initialEducation }],
    experience: [{ ...initialExperience }],
    skills: [{ ...initialSkills }],
    projects: [{ ...initialProject }],
    certifications: [{ ...initialCertification }],
    languages: [],
    interests: [],
    customSections: [], // Initialize as empty array
    template: 'professional',
  });
console.log("resumeData",resumeData);

useEffect(() => {
  if (resumeData && !isInitialized) {
    const dataWithCustomSections = {
      ...resumeData,
      customSections: resumeData.customSections || [],
    };
    setFormData(dataWithCustomSections);
    setIsInitialized(true);
  }
}, [resumeData, isInitialized]);

useEffect(() => {
  if (formData) {
    setResumeData(formData);
  }
}, [formData]);
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            photo: reader.result as string,
          },
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        photo: '',
      },
    });
  };

        const validateEmail = (email: string): boolean => {
          return emailRegex.test(email);
        };

        const validatePhone = (phone: string): boolean => {
          return phoneRegex.test(phone);
        };
        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
        
          if (name === 'email') {
            const isValid = validateEmail(value);
            setErrors((prev) => ({ ...prev, email: !isValid }));
            if (value !== '' && !isValid) {
              toast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                variant: "destructive",
              });
            }
          }
        
          if (name === 'phone') {
            const isValid = validatePhone(value);
            setErrors((prev) => ({ ...prev, phone: !isValid }));
            if (value !== '' && !isValid) {
              toast({
                title: "Invalid Phone Number",
                description: "Please enter a valid phone number (max 15 digits)",
                variant: "destructive",
              });
            }
          }
        };
        
        const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;

          setFormData({
            ...formData,
            personalInfo: {
              ...formData.personalInfo,
              [name]: value,
            },
          });
        };

        const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setFormData({
            ...formData,
            summary: e.target.value,
          });
        };

        const handleArrayChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
          index: number,
          type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications'
        ) => {
          const { name, value } = e.target;
          const updatedArray = [...formData[type]];
          updatedArray[index] = { ...updatedArray[index], [name]: value };
          
          setFormData({
            ...formData,
            [type]: updatedArray,
          });
        };

        const addItem = (type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications' | 'customSections') => {
          let newItem;
          if (type === 'education') newItem = { ...initialEducation };
          else if (type === 'experience') newItem = { ...initialExperience };
          else if (type === 'projects') newItem = { ...initialProject };
          else if (type === 'certifications') newItem = { ...initialCertification };
          else if (type === 'customSections') newItem = { ...initialCustomSection };
          else newItem = { ...initialSkills };

          setFormData({
            ...formData,
            [type]: [...(formData[type] || []), newItem],
          });
        };

        const removeItem = (index: number, type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications' | 'customSections') => {
          const updatedArray = [...(formData[type] || [])];
          updatedArray.splice(index, 1);
          
          setFormData({
            ...formData,
            [type]: updatedArray,
          });
        };

        const handleCustomSectionChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
          index: number, 
          field: keyof CustomSection
        ) => {
          const value = e.target.value;
          const updatedSections = [...(formData.customSections || [])];
          updatedSections[index] = { 
            ...updatedSections[index], 
            [field]: value 
          };
          
          setFormData({
            ...formData,
            customSections: updatedSections,
          });
        };

        const handleEducationDateChange = (date: Date | undefined, index: number) => {
          if (!date) return;
          
          const formattedDate = format(date, 'MMMM yyyy');
          const updatedEducation = [...formData.education];
          updatedEducation[index] = { ...updatedEducation[index], date: formattedDate };
          
          setFormData({
            ...formData,
            education: updatedEducation,
          });
        };

        const handleProjectDateChange = (date: Date | undefined, index: number) => {
          if (!date) return;
          
          const formattedDate = format(date, 'MMMM yyyy');
          const updatedProjects = [...formData.projects];
          updatedProjects[index] = { ...updatedProjects[index], date: formattedDate };
          
          setFormData({
            ...formData,
            projects: updatedProjects,
          });
        };

        const handleExperienceStartDateChange = (date: Date | undefined, index: number) => {
          if (!date) return;
          
          const updatedExperience = [...formData.experience];
          const currentDateParts = updatedExperience[index].date.split(' - ');
          const endDate = currentDateParts.length > 1 ? currentDateParts[1] : 'Present';
          
          updatedExperience[index] = { 
            ...updatedExperience[index], 
            date: `${format(date, 'MMMM yyyy')} - ${endDate}` 
          };
          
          setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleExperienceEndDateChange = (date: Date | undefined, index: number) => {
    if (!date) return;
    
    const updatedExperience = [...formData.experience];
    const currentDateParts = updatedExperience[index].date.split(' - ');
    const startDate = currentDateParts.length > 0 ? currentDateParts[0] : format(new Date(), 'MMMM yyyy');
    
    updatedExperience[index] = { 
      ...updatedExperience[index], 
      date: `${startDate} - ${format(date, 'MMMM yyyy')}` 
    };
    
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleSetPresentDate = (index: number) => {
    const updatedExperience = [...formData.experience];
    const currentDateParts = updatedExperience[index].date.split(' - ');
    const startDate = currentDateParts.length > 0 ? currentDateParts[0] : format(new Date(), 'MMMM yyyy');
    
    updatedExperience[index] = { 
      ...updatedExperience[index], 
      date: `${startDate} - Present` 
    };
    
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResumeData({
        ...formData,
        summary: formData.summary || 'Results-driven professional with a proven track record of success in developing innovative solutions and driving business growth. Adept at leveraging technical expertise and strategic thinking to deliver exceptional outcomes.',
      });
      
      toast({
        title: "Resume Generated",
        description: "Your resume has been created successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your basic contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center mb-4 sm:items-start">
            <Label htmlFor="photo-upload" className="mb-2">Profile Photo (Optional)</Label>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              {formData.personalInfo.photo ? (
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-gray-200">
                    <AvatarImage src={formData.personalInfo.photo} alt="Profile photo" />
                    <AvatarFallback>
                      {formData.personalInfo.name ? formData.personalInfo.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removePhoto}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full text-gray-500">
                  <Upload className="h-8 w-8" />
                </div>
              )}
              
              <div>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-brand-500"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  {formData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a professional photo for your resume
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.personalInfo.name} 
                onChange={handlePersonalInfoChange}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.personalInfo.email}
                onBlur={handleBlur} 
                onChange={handlePersonalInfoChange}
                placeholder="john.smith@example.com"
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.personalInfo.phone} 
                onBlur={handleBlur}
                onChange={handlePersonalInfoChange}
                placeholder="(555) 123-4567"
                maxLength={15}
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                pattern="[\d\s\-+()]{1,15}"
                title="Please enter a valid phone number (max 15 digits)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.personalInfo.location} 
                onChange={handlePersonalInfoChange}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input 
                id="linkedin" 
                name="linkedin" 
                value={formData.personalInfo.linkedin} 
                onChange={handlePersonalInfoChange}
                placeholder="linkedin.com/in/johnsmith"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>Provide a brief overview of your professional background</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            id="summary" 
            name="summary" 
            value={formData.summary} 
            onChange={handleSummaryChange}
            placeholder="Experienced professional with a background in..."
            className="min-h-[100px]"
          />
       
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('education')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'education')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={formData.education.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                  <Input 
                    id={`edu-institution-${index}`} 
                    name="institution" 
                    value={edu.institution} 
                    onChange={(e) => handleArrayChange(e, index, 'education')}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                  <Input 
                    id={`edu-degree-${index}`} 
                    name="degree" 
                    value={edu.degree} 
                    onChange={(e) => handleArrayChange(e, index, 'education')}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-date-${index}`}>Graduation Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`edu-date-${index}`}
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !edu.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {edu.date ? edu.date : <span>Pick graduation date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={(date) => handleEducationDateChange(date, index)}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`edu-description-${index}`}>Description (Optional)</Label>
                  <Textarea 
                    id={`edu-description-${index}`} 
                    name="description" 
                    value={edu.description} 
                    onChange={(e) => handleArrayChange(e, index, 'education')}
                    placeholder="Notable achievements, GPA, relevant coursework..."
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your professional experience</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('experience')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'experience')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={formData.experience.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`exp-company-${index}`}>Company</Label>
                  <Input 
                    id={`exp-company-${index}`} 
                    name="company" 
                    value={exp.company} 
                    onChange={(e) => handleArrayChange(e, index, 'experience')}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-position-${index}`}>Position</Label>
                  <Input 
                    id={`exp-position-${index}`} 
                    name="position" 
                    value={exp.position} 
                    onChange={(e) => handleArrayChange(e, index, 'experience')}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Date Range</Label>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Start Date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            onSelect={(date) => handleExperienceStartDateChange(date, index)}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>End Date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            onSelect={(date) => handleExperienceEndDateChange(date, index)}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetPresentDate(index)}
                      className="whitespace-nowrap"
                    >
                      Set as Present
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input 
                      id={`exp-date-${index}`} 
                      name="date" 
                      value={exp.date} 
                      onChange={(e) => handleArrayChange(e, index, 'experience')}
                      placeholder="Jan 2020 - Present"
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can also directly edit the date format above
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`exp-description-${index}`}>Description</Label>
                  <Textarea 
                    id={`exp-description-${index}`} 
                    name="description" 
                    value={exp.description} 
                    onChange={(e) => handleArrayChange(e, index, 'experience')}
                    placeholder="Describe your responsibilities, achievements, and impact..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add your personal or professional projects</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('projects')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'projects')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={formData.projects.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                  <Input 
                    id={`project-name-${index}`} 
                    name="name" 
                    value={project.name} 
                    onChange={(e) => handleArrayChange(e, index, 'projects')}
                    placeholder="Portfolio Website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-date-${index}`}>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`project-date-${index}`}
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !project.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {project.date ? project.date : <span>Pick project date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={(date) => handleProjectDateChange(date, index)}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`project-link-${index}`}>Project Link (Optional)</Label>
                  <div className="flex gap-2">
                    <Input 
                      id={`project-link-${index}`} 
                      name="link" 
                      value={project.link} 
                      onChange={(e) => handleArrayChange(e, index, 'projects')}
                      placeholder="https://example.com/project"
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`project-technologies-${index}`}>Technologies Used</Label>
                  <Input 
                    id={`project-technologies-${index}`} 
                    name="technologies" 
                    value={project.technologies} 
                    onChange={(e) => handleArrayChange(e, index, 'projects')}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`project-description-${index}`}>Description</Label>
                  <Textarea 
                    id={`project-description-${index}`} 
                    name="description" 
                    value={project.description} 
                    onChange={(e) => handleArrayChange(e, index, 'projects')}
                    placeholder="Describe the project, your role, and key accomplishments..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Add your professional certifications</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('certifications')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData?.certifications?.map((cert, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'certifications')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={formData.certifications.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`cert-title-${index}`}>Title</Label>
                  <Input 
                    id={`cert-title-${index}`} 
                    name="title" 
                    value={cert.title as string} 
                    onChange={(e) => handleArrayChange(e, index, 'certifications')}
                    placeholder="Title or Type of Certification"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cert-name-${index}`}>Name</Label>
                  <Input 
                    id={`cert-name-${index}`} 
                    name="name" 
                    value={cert.name} 
                    onChange={(e) => handleArrayChange(e, index, 'certifications')}
                    placeholder="AWS Certified Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cert-date-${index}`}>Date</Label>
                  <Input 
                    id={`cert-date-${index}`} 
                    name="date" 
                    value={cert.date} 
                    onChange={(e) => handleArrayChange(e, index, 'certifications')}
                    placeholder="June 2022"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>List your professional skills</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('skills')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.skills.map((skill, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'skills')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={formData.skills.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`skill-category-${index}`}>Category</Label>
                  <Input 
                    id={`skill-category-${index}`} 
                    name="category" 
                    value={skill.category} 
                    onChange={(e) => handleArrayChange(e, index, 'skills')}
                    placeholder="Technical Skills"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`skill-list-${index}`}>Skills</Label>
                  <Textarea 
                    id={`skill-list-${index}`} 
                    name="skills" 
                    value={skill.skills} 
                    onChange={(e) => handleArrayChange(e, index, 'skills')}
                    placeholder="JavaScript, React, Node.js, Python, AWS..."
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Custom Sections</CardTitle>
              <CardDescription>Add your own custom sections to the resume</CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addItem('customSections')}
              className="text-brand-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {(formData.customSections || []).map((section, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeItem(index, 'customSections')} 
                className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`custom-title-${index}`}>Section Title</Label>
                  <Input 
                    id={`custom-title-${index}`} 
                    value={section.title} 
                    onChange={(e) => handleCustomSectionChange(e, index, 'title')}
                    placeholder="Languages, Interests, Achievements..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`custom-content-${index}`}>Content</Label>
                  <Textarea 
                    id={`custom-content-${index}`} 
                    value={section.content} 
                    onChange={(e) => handleCustomSectionChange(e, index, 'content')}
                    placeholder="Add the content for this section here..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          ))}
          {(!formData.customSections || formData.customSections.length === 0) && (
            <div className="text-center text-muted-foreground py-6">
              <FileText className="mx-auto h-8 w-8 opacity-40 mb-2" />
              <p>Add custom sections like Languages, Interests, Volunteer Work, etc.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </form>
  );
};

export default ResumeForm;
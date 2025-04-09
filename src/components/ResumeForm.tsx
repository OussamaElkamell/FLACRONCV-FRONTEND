import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Sparkles, Loader2, Upload, X, Link } from 'lucide-react';
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

const initialEducation = { institution: '', degree: '', date: '', description: '' };
const initialExperience = { company: '', position: '', date: '', description: '' };
const initialSkills = { category: 'Technical Skills', skills: '' };
const initialProject = { name: '', description: '', link: '', technologies: '', date: '' };
const initialCertification = { title: '', name: '', date: '' };

const ResumeForm = ({ setResumeData }: { setResumeData: React.Dispatch<React.SetStateAction<any>> }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
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
    qualities: [],
  });

  useEffect(() => {
    setResumeData(formData);
  }, [formData, setResumeData]);

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

  const addItem = (type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications') => {
    let newItem;
    if (type === 'education') newItem = { ...initialEducation };
    else if (type === 'experience') newItem = { ...initialExperience };
    else if (type === 'projects') newItem = { ...initialProject };
    else if (type === 'certifications') newItem = { ...initialCertification };
    else newItem = { ...initialSkills };

    setFormData({
      ...formData,
      [type]: [...formData[type], newItem],
    });
  };

  const removeItem = (index: number, type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications') => {
    const updatedArray = [...formData[type]];
    updatedArray.splice(index, 1);
    
    setFormData({
      ...formData,
      [type]: updatedArray,
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
                onChange={handlePersonalInfoChange}
                placeholder="john.smith@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.personalInfo.phone} 
                onChange={handlePersonalInfoChange}
                placeholder="(555) 123-4567"
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
                  <Input 
                    id={`edu-date-${index}`} 
                    name="date" 
                    value={edu.date} 
                    onChange={(e) => handleArrayChange(e, index, 'education')}
                    placeholder="May 2020"
                  />
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
                <div className="space-y-2">
                  <Label htmlFor={`exp-date-${index}`}>Date Range</Label>
                  <Input 
                    id={`exp-date-${index}`} 
                    name="date" 
                    value={exp.date} 
                    onChange={(e) => handleArrayChange(e, index, 'experience')}
                    placeholder="Jan 2020 - Present"
                  />
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
                  <Input 
                    id={`project-date-${index}`} 
                    name="date" 
                    value={project.date} 
                    onChange={(e) => handleArrayChange(e, index, 'projects')}
                    placeholder="2023"
                  />
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
          {formData.certifications.map((cert, index) => (
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

      
    </form>
  );
};

export default ResumeForm;
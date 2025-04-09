
// Mock backend service for resume and cover letter generation
// In a real application, this would make actual API calls to a backend server

// Define types for our API
export interface GenerationResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface ResumeGenerationRequest {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    date: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    date: string;
    description: string;
  }>;
  skills: Array<{
    category: string;
    skills: string;
  }>;
}

export interface CoverLetterGenerationRequest {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  recipientInfo: {
    name: string;
    title: string;
    company: string;
  };
  jobInfo: {
    title: string;
    reference: string;
  };
  experience: string;
  skills: string;
  motivation: string;
  closing: string;
}

// Mock API delay to simulate network requests
const mockApiDelay = () => new Promise(resolve => setTimeout(resolve, 1500));

class ApiService {
  // Generate a resume using AI
  async generateResume(data: ResumeGenerationRequest): Promise<GenerationResponse> {
    try {
      console.log('Generating resume with data:', data);
      
      // Simulate API call
      await mockApiDelay();
      
      // Mock enhancement of the user's data (in a real app, this would come from OpenAI or similar)
      const enhancedData = {
        ...data,
        summary: data.summary || "Dedicated and versatile professional with a proven track record of delivering high-quality solutions. Adept at leveraging technical expertise and collaborative skills to drive project success and achieve business objectives.",
        skills: data.skills.length > 0 ? data.skills : [
          { category: "Technical Skills", skills: "JavaScript, React, Node.js, HTML/CSS, Git, REST APIs" },
          { category: "Soft Skills", skills: "Communication, Problem-solving, Team collaboration, Time management" }
        ]
      };
      
      return {
        success: true,
        data: enhancedData
      };
    } catch (error) {
      console.error('Error generating resume:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
  
  // Generate a cover letter using AI
  async generateCoverLetter(data: CoverLetterGenerationRequest): Promise<GenerationResponse> {
    try {
      console.log('Generating cover letter with data:', data);
      
      // Simulate API call
      await mockApiDelay();
      
      // Mock enhancement of the user's data (in a real app, this would come from OpenAI or similar)
      const enhancedData = {
        ...data,
        experience: data.experience || `I bring over 5 years of experience in developing web applications and software solutions that deliver exceptional user experiences. In my current role at XYZ Company, I led the development of a customer portal that increased user engagement by 45% and reduced support tickets by 30%.`,
        skills: data.skills || `My technical skills include proficiency in JavaScript, React, Node.js, and AWS cloud infrastructure. I excel at building scalable applications and implementing CI/CD pipelines to ensure efficient development workflows.`,
        motivation: data.motivation || `I am particularly excited about the opportunity to join ${data.recipientInfo.company || "your company"} because of your focus on innovative solutions and commitment to customer success. The ${data.jobInfo.title || "position"} aligns perfectly with my career goals and I believe I can make significant contributions to your team.`,
        closing: data.closing || "I look forward to the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application."
      };
      
      return {
        success: true,
        data: enhancedData
      };
    } catch (error) {
      console.error('Error generating cover letter:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
  
  // Save a resume to the database
  async saveResume(userId: string, resumeData: any): Promise<GenerationResponse> {
    try {
      console.log('Saving resume for user:', userId);
      
      // Simulate API call
      await mockApiDelay();
      
      // In a real application, this would save to a database
      const savedResume = {
        resumeId: `resume_${Date.now()}`,
        userId,
        resumeData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      // Simulate storing to localStorage for demo purposes
      const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      savedResumes.push(savedResume);
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
      
      return {
        success: true,
        data: savedResume
      };
    } catch (error) {
      console.error('Error saving resume:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
  
  // Save a cover letter to the database
  async saveCoverLetter(userId: string, coverLetterData: any): Promise<GenerationResponse> {
    try {
      console.log('Saving cover letter for user:', userId);
      
      // Simulate API call
      await mockApiDelay();
      
      // In a real application, this would save to a database
      const savedCoverLetter = {
        coverLetterId: `cover_letter_${Date.now()}`,
        userId,
        coverLetterData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      // Simulate storing to localStorage for demo purposes
      const savedCoverLetters = JSON.parse(localStorage.getItem('savedCoverLetters') || '[]');
      savedCoverLetters.push(savedCoverLetter);
      localStorage.setItem('savedCoverLetters', JSON.stringify(savedCoverLetters));
      
      return {
        success: true,
        data: savedCoverLetter
      };
    } catch (error) {
      console.error('Error saving cover letter:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
}

// Export a singleton instance of the API service
export const apiService = new ApiService();

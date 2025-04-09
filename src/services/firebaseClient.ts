
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { ResumeData, CoverLetterData } from '@/types/documents';
import axios from 'axios';
import { 
  resumeService as realtimeResumeService, 
  coverLetterService as realtimeCoverLetterService, 
  userService 
} from './firebaseRealtimeDb';

// Auth services
export const authService = {
  // Register new user
  register: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        data: {
          user: {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          },
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to register'
      };
    }
  },

  // Login user
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        data: {
          user: {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          },
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to login'
      };
    }
  },

  // Google Sign In
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        data: {
          user: {
            id: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
          },
        }
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sign in with Google'
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await firebaseSignOut(auth);
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to logout'
      };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve({
            success: true,
            data: {
              user: {
                id: user.uid,
                email: user.email,
              }
            }
          });
        } else {
          resolve({
            success: false,
            data: null
          });
        }
      });
    });
  }
};

// OpenAI service for AI enhancements and ATS optimization
export const aiService = {
  enhanceResume: async (resumeData: ResumeData) => {
    try {
      const systemPrompt = "You are a professional resume writer with expertise in creating compelling and effective resumes.";
      const prompt = `Enhance the following resume summary to make it more professional and impactful: ${resumeData.summary || ""}. Context about the person: ${JSON.stringify(resumeData)}`;
      
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        },
        {
          headers: { 
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json" 
          }
        }
      );
      
      const enhancedSummary = response.data.choices[0].message.content.trim();
      
      return {
        success: true,
        data: {
          ...resumeData,
          summary: enhancedSummary
        }
      };
    } catch (error) {
      console.error('Resume enhancement error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to enhance resume'
      };
    }
  },
  
  enhanceCoverLetter: async (coverLetterData: CoverLetterData) => {
    const systemPrompt = "You are a professional cover letter writer with expertise in creating compelling job application letters.";
    const prompt = `Create a professional cover letter based on these details: ${JSON.stringify(coverLetterData)}. Format the response in four sections: 1) Experience, 2) Skills, 3) Motivation, and 4) Closing.`;
    
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        },
        {
          headers: { 
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json" 
          }
        }
      );
      
      const generatedContent = response.data.choices[0].message.content.trim();
      
      // Parse the AI response to extract different sections
      const contentParts = generatedContent.split('\n\n');
      
      // Create an enhanced cover letter
      const enhancedData = { ...coverLetterData };
      
      if (contentParts.length >= 3) {
        enhancedData.experience = enhancedData.experience || contentParts[0].trim();
        enhancedData.skills = enhancedData.skills || contentParts[1].trim();
        enhancedData.motivation = enhancedData.motivation || contentParts[2].trim();
        enhancedData.closing = enhancedData.closing || (contentParts[3] ? contentParts[3].trim() : 'Thank you for considering my application.');
      }
      
      return {
        success: true,
        data: enhancedData
      };
    } catch (error) {
      console.error('Cover letter enhancement error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to enhance cover letter'
      };
    }
  },

  // ATS optimization function
  getAtsOptimization: async (resumeData: ResumeData, jobDescription: string) => {
    try {
      const systemPrompt = "You are an expert ATS (Applicant Tracking System) analyzer. Provide specific, actionable feedback to help this resume pass ATS filters and match the job description.";
      const prompt = `
Analyze this resume against the following job description and provide ATS optimization suggestions:

JOB DESCRIPTION:
${jobDescription}

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

Please provide the following:
1. Keywords Analysis: Identify key terms from the job description that should be included in the resume.
2. Missing Skills: List important skills mentioned in the job description that are missing from the resume.
3. Format Improvements: Suggest any formatting changes that would improve ATS readability.
4. Content Suggestions: Recommend specific content additions or modifications to better match the job requirements.
5. Overall Score: Rate the resume's current ATS compatibility from 1-10.

Format your response as JSON with the following structure:
{
  "keywordsAnalysis": [
    {"keyword": "string", "included": boolean, "importance": "high/medium/low"}
  ],
  "missingSkills": ["skill1", "skill2"],
  "formatImprovements": ["suggestion1", "suggestion2"],
  "contentSuggestions": ["suggestion1", "suggestion2"],
  "overallScore": number,
  "summary": "string"
}
`;
      
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        },
        {
          headers: { 
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json" 
          }
        }
      );
      
      let content = response.data.choices[0].message.content.trim();
    if (content.startsWith("```json")) {
      content = content.replace(/```json\n?/, "").replace(/```$/, "").trim();
    }

    const atsAnalysis = JSON.parse(content);
      
      return {
        success: true,
        data: atsAnalysis
      };
    } catch (error) {
      console.error('ATS optimization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate ATS optimization'
      };
    }
  }
};

// Resume services - now using RealTime DB only
export const resumeService = {
  // Generate resume with AI enhancement
  generate: async (resumeData: ResumeData) => {
    try {
      const userId = auth.currentUser?.uid;
      
      if (!userId) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
      
      // Enhance resume with AI if summary is empty
      let enhancedData = resumeData;
      if (!resumeData.summary || resumeData.summary.trim() === '') {
        const enhanceResult = await aiService.enhanceResume(resumeData);
        if (enhanceResult.success) {
          enhancedData = enhanceResult.data;
        }
      }
      
      // Use the Realtime DB service to save the resume
      return await realtimeResumeService.create(enhancedData);
    } catch (error) {
      console.error('Resume generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate resume'
      };
    }
  },

  // Get resume by ID
  getById: async (resumeId: string) => {
    return await realtimeResumeService.getById(resumeId);
  },

  // Get all resumes for current user
  getAll: async () => {
    return await realtimeResumeService.getAll();
  }
};

// Cover Letter services - now using RealTime DB only
export const coverLetterService = {
  // Generate cover letter with AI enhancement
  generate: async (coverLetterData: CoverLetterData) => {
    try {
      const userId = auth.currentUser?.uid;
      
      if (!userId) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
      
      // Enhance cover letter with AI if content sections are empty
      let enhancedData = coverLetterData;
      if (!coverLetterData.experience || !coverLetterData.skills || !coverLetterData.motivation) {
        const enhanceResult = await aiService.enhanceCoverLetter(coverLetterData);
        if (enhanceResult.success) {
          enhancedData = enhanceResult.data;
        }
      }
      
      // Use the Realtime DB service to save the cover letter
      return await realtimeCoverLetterService.create(enhancedData);
    } catch (error) {
      console.error('Cover letter generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate cover letter'
      };
    }
  },

  // Get cover letter by ID
  getById: async (coverLetterId: string) => {
    return await realtimeCoverLetterService.getById(coverLetterId);
  },

  // Get all cover letters for current user
  getAll: async () => {
    return await realtimeCoverLetterService.getAll();
  }
};

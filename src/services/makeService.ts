import apiClient from './apiClient';
import emailjs from '@emailjs/browser';
import { getDatabase, ref, get } from 'firebase/database'; // or your Firebase SDK imports

interface OptimizationResponse {
  success: boolean;
  tips?: string;
  error?: string;
}

interface AtsScoreResponse {
  success: boolean;
  data?: {
    score: number;
    missedKeywords: string[];
    recommendations: string;
  };
  error?: string;
}

interface PaymentNotificationData {
  userId: string;
  sessionId: string;
  plan: string;
}

interface DocumentGenerationData {
  userId: string;
  documentType: 'resume' | 'coverLetter';
  documentId?: string;
  templateName?: string;
}

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
  name: string;
  title: string;
}


// 🔧 Helper to get user's email from Firebase Realtime Database
const getUserEmailFromFirebase = async (userId: string): Promise<string | null> => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/email`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn(`No email found for user ID: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user email from Firebase:', error);
    return null;
  }
};

export const makeService = {
  EMAIL_JS_SERVICE_ID: 'service_h2cn09t',
  EMAIL_JS_PUBLIC_KEY: 'SvxGIwGTjoDVyPBRY',

  EMAIL_TEMPLATES: {
    PAYMENT_CONFIRMATION: 'template_mth5gr8',
    RESUME_GENERATED: 'template_9ae0fa8',
    COVER_LETTER_GENERATED: 'template_coverletter',
    DOCUMENT_DOWNLOADED: 'template_9ae0fa8',
  },

  sendEmail: async (
    templateParams: {
      email: string;         // {{email}}
      name: string;          // {{name}}
      title: string;         // {{title}} e.g., 'Payment Confirmation'
      user_email: string;    // Duplicate of {{email}} (just in case)
      subject: string;       // {{subject}}
      message: string;       // {{message}}
      html_message: string;  // {{html_message}}
      documentType?: string; // For 'resume' or 'coverLetter' in case of document download
      templateName?: string; // Template name for document download (optional)
      userId?: string;       // User ID (for payment confirmation)
      plan?: string;         // Plan name (for payment confirmation)
      sessionId?: string;    // Session ID (for payment confirmation)
    },
    templateId: string
  ) => {
    try {
      const response = await emailjs.send(
        makeService.EMAIL_JS_SERVICE_ID,
        templateId,
        templateParams,
        { publicKey: makeService.EMAIL_JS_PUBLIC_KEY }
      );
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  },
  
  
  
  getLinkedInOptimizationTips: async (data: any): Promise<OptimizationResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Basic detection: resume has personalInfo + education + experience
    const isResume =
      data?.personalInfo &&
      Array.isArray(data.education) &&
      Array.isArray(data.experience);
  
    const isCoverLetterLike =
      data?.summary &&
      Array.isArray(data.experience) &&
      Array.isArray(data.skills) &&
      !data.education;
  
    if (isResume) {
      const summaryLength = data.summary?.length || 0;
      const hasProjects = Array.isArray(data.projects) && data.projects.length > 0;
      const allSkills = data.skills.map((s: any) => s.skills).join(", ");
      const achievementsInExp = data.experience.some((exp: any) =>
        /achieved|improved|increased|reduced|led/i.test(exp.description)
      );
      const headlineSuggestion = (() => {
        const titleFromExperience = data.experience?.[0]?.position;
        const projectRole = data.projects?.[0]?.name;
        const fallback = "Professional Title";
      
        const title = titleFromExperience || projectRole || fallback;
      
        return `1. **Headline**: Use something like "${title}" to clearly show your role or value.`;
      })();
      
      return {
        success: true,
        tips: `
  ${headlineSuggestion}.
  2. **Summary**: ${summaryLength < 100 ? "Consider expanding it with goals and numbers." : "Nice summary! Keep it results-focused."}
  3. **Skills**: Include in-demand skills. Current: ${allSkills || "No skills listed."}
  4. **Experience**: ${achievementsInExp ? "You're highlighting accomplishments well!" : "Use more action verbs and measurable wins."}
  5. **Projects**: ${hasProjects ? "List them in LinkedIn’s Featured section." : "Add projects to show applied skills."}
  `,
      };
    }
  
    if (isCoverLetterLike) {
      const summaryLength = data.summary?.length || 0;
      const allSkills = data.skills.map((s: any) => s.skills).join(", ");
  
      return {
        success: true,
        tips: `
  1. **Opening Line**: Show enthusiasm for the position/company.
  2. **Summary**: ${summaryLength < 50 ? "Consider detailing your motivations further." : "Great motivational tone."}
  3. **Experience**: Tailor it directly to the job you're applying for.
  4. **Skills**: Current listed: ${allSkills || "None"}. Add those from the job post!
  5. **Closing**: End confidently and thank the reader.`,
      };
    }
  
    return {
      success: true,
      tips: `
  1. **Unknown format**: Cannot identify resume or cover letter structure.
  2. **Expected fields**: Try including personalInfo, education, or summary, experience, skills.
  3. **Resume**: Should include personalInfo, education, experience.
  4. **Cover Letter**: Should include summary, experience, skills (adapted).
  5. **Fix and retry**: Let us know if you'd like help formatting it.`,
    };
  },
  
  

  getAtsScore: async (jobDescription: string, documentContent: string): Promise<AtsScoreResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const keywords = ['organized', 'leadership', 'teamwork', 'communication', 'excel', 'project management'];
    let matchCount = 0;

    keywords.forEach((keyword) => {
      if (documentContent.toLowerCase().includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });

    const score = Math.min(100, Math.round((matchCount / keywords.length) * 100));

    return {
      success: true,
      data: {
        score,
        missedKeywords: score < 100 ? ['innovative', 'strategic', 'analytical'] : [],
        recommendations: score < 100
          ? 'Try to include more industry-specific keywords from the job description.'
          : 'Your document is well-optimized for ATS systems!',
      },
    };
  },

  notifyPaymentConfirmed: async (data: PaymentNotificationData): Promise<any> => {
    const userEmail = await getUserEmailFromFirebase(data.userId);
    if (!userEmail) return { success: false, error: 'User email not found' };
  
    const templateParams = {
      email: userEmail,
      name: 'FlaronCV Support',
      title: 'Payment Confirmation',
      user_email: userEmail,
      subject: 'Payment Confirmation',
      message: `Payment confirmed for user ${data.userId}. Plan: ${data.plan}`,
      html_message: `
        <h1 style="color: #4F46E5;">Payment Confirmation</h1>
        <p>We've received your payment successfully!</p>
        <div>
          <p><strong>User ID:</strong> ${data.userId}</p>
          <p><strong>Plan:</strong> ${data.plan}</p>
          <p><strong>Session ID:</strong> ${data.sessionId}</p>
        </div>
        <p>Thank you for choosing FlaronCV!</p>
      `,
      userId: data.userId,
      plan: data.plan,
      sessionId: data.sessionId,
    };
  
    return makeService.sendEmail(templateParams, makeService.EMAIL_TEMPLATES.PAYMENT_CONFIRMATION);
  },  
  
  

  notifyDocumentDownloaded: async (data: DocumentGenerationData): Promise<any> => {
    const userEmail = await getUserEmailFromFirebase(data.userId);
    if (!userEmail) return { success: false, error: 'User email not found' };
  
    const templateParams = {
      email: userEmail,
      name: 'FlaronCV Support',
      title: `${data.documentType === 'resume' ? 'Resume' : 'Cover Letter'} Download`,
      user_email: userEmail,
      subject: `Your ${data.documentType === 'resume' ? 'Resume' : 'Cover Letter'} Download`,
      message: `Your ${data.documentType} has been successfully downloaded.`,
      html_message: `
        <h1 style="color: #4F46E5;">Document Downloaded</h1>
        <p>Your ${data.documentType} has been successfully downloaded.</p>
        <div>
          <p><strong>Document Type:</strong> ${data.documentType}</p>
          ${data.templateName ? `<p><strong>Template:</strong> ${data.templateName}</p>` : ''}
        </div>
        <p>Thank you for using FlaronCV!</p>
      `,
      documentType: data.documentType,
      templateName: data.templateName || '',
    };
  
    return makeService.sendEmail(templateParams, makeService.EMAIL_TEMPLATES.DOCUMENT_DOWNLOADED);
  },
  

  getJobRecommendations: async (resumeData: any): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      success: true,
      data: [
        {
          id: 'job1',
          title: 'Senior Software Engineer',
          company: 'Tech Solutions Inc.',
          location: 'Remote',
          description: 'Experienced developer needed with React and Node.js.',
          matchScore: 92,
          url: 'https://example.com/jobs/senior-software-engineer',
        },
        {
          id: 'job2',
          title: 'Frontend Developer',
          company: 'Digital Innovations',
          location: 'New York, NY',
          description: 'Modern web applications with latest tech.',
          matchScore: 87,
          url: 'https://example.com/jobs/frontend-developer',
        },
      ],
    };
  }
};

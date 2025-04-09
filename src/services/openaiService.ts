
import apiClient from './apiClient';
import { ResumeData, CoverLetterData } from '@/types/documents';

export const openaiService = {
  enhanceResume: async (resumeData: ResumeData) => {
    try {
      // Exclude the photo field from personalInfo
      const { personalInfo: { photo, ...personalInfoWithoutPhoto }, ...resumeWithoutPhoto } = resumeData;
  
      // Send the modified data without the photo
      const response = await apiClient.post('/resume/enhance', { resumeData: { ...resumeWithoutPhoto, personalInfo: personalInfoWithoutPhoto } });
      return response.data;
    } catch (error) {
      console.error('Error enhancing resume with OpenAI:', error);
      throw error;
    }
  },
  

  enhanceCoverLetter: async (coverLetterData: CoverLetterData) => {
    try {
      const response = await apiClient.post('/cover-letter/enhance', { coverLetterData });
      return response.data;
    } catch (error) {
      console.error('Error enhancing cover letter with OpenAI:', error);
      throw error;
    }
  }
};

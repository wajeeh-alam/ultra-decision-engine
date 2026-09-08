import type { StudentContextProvider } from './student-context';

export class UltraStudentContextProvider implements StudentContextProvider {
  async getStudentProfile(_userId: string): Promise<never> {
    // TODO: Replace with Ultra's internal profile service.
    throw new Error('Ultra provider not configured');
  }

  async getRelevantOpportunities(_profile: never): Promise<never> {
    // TODO: Rank results from Ultra's proprietary opportunity corpus.
    throw new Error('Ultra provider not configured');
  }

  async getExistingActivities(_userId: string): Promise<never> {
    // TODO: Replace with Ultra's internal activity service.
    throw new Error('Ultra provider not configured');
  }
}

import { demoOpportunities } from '@/data/demo-opportunities';
import { beginnerProfile, demoProfile } from '@/data/demo-profile';
import type { StudentContextProvider } from './student-context';
import type { StudentProfile } from '@/schemas/student';

export class DemoStudentContextProvider implements StudentContextProvider {
  async getStudentProfile(userId: string) {
    if (userId === beginnerProfile.id) return structuredClone(beginnerProfile);
    if (userId === demoProfile.id || userId === 'demo') return structuredClone(demoProfile);
    throw new Error(`Student profile not found: ${userId}`);
  }

  async getRelevantOpportunities(_profile: StudentProfile) {
    return structuredClone(demoOpportunities);
  }

  async getExistingActivities(userId: string) {
    return (await this.getStudentProfile(userId)).activities;
  }
}

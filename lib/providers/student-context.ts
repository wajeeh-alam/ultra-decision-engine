import type { Opportunity } from '@/schemas/opportunity';
import type { StudentActivity, StudentProfile } from '@/schemas/student';

export interface StudentContextProvider {
  getStudentProfile(userId: string): Promise<StudentProfile>;
  getRelevantOpportunities(profile: StudentProfile): Promise<Opportunity[]>;
  getExistingActivities(userId: string): Promise<StudentActivity[]>;
}

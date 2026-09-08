import type { Opportunity } from '@/schemas/opportunity';
import type { ActivityProposal } from '@/schemas/activity-proposal';
import { evaluationSchema, type ActivityEvaluation } from '@/schemas/evaluation';
import type { StudentProfile } from '@/schemas/student';
import { evaluateWithLlm } from '@/lib/llm/client';
import { calculateOverallScore } from './scoring';
import { evaluateWithMock } from './mock-evaluate';

export async function evaluateActivity(profile: StudentProfile, proposal: ActivityProposal, opportunities: Opportunity[]): Promise<ActivityEvaluation> {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_AI !== 'false' || !process.env.OPENAI_API_KEY;
  const result = useMock
    ? evaluateWithMock(profile, proposal, opportunities)
    : await evaluateWithLlm(profile, proposal, opportunities);
  return evaluationSchema.parse({
    ...result,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    proposal,
    overallScore: calculateOverallScore(result.scores),
  });
}

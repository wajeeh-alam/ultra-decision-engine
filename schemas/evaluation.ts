import { z } from 'zod';
import { activityProposalSchema } from './activity-proposal';

const score = z.number().min(0).max(100);

export const evaluationSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  proposal: activityProposalSchema,
  overallScore: score,
  verdict: z.string(),
  summary: z.string(),
  recommendation: z.enum(['do', 'modify', 'skip']),
  scores: z.object({
    goalAlignment: score,
    skillGrowth: score,
    marginalProfileValue: score,
    differentiation: score,
    evidencePotential: score,
    timeEfficiency: score,
  }),
  profileOverlap: z.object({
    score,
    explanation: z.string(),
    overlappingEvidence: z.array(z.string()),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  missingDimensionsAddressed: z.array(z.string()),
  opportunityCost: z.object({
    severity: z.enum(['low', 'medium', 'high']),
    explanation: z.string(),
  }),
  reasoning: z.array(z.string()),
  betterVersions: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    estimatedScore: score,
    whyBetter: z.string(),
    newDimensionsAdded: z.array(z.string()),
  })),
  alternativeOpportunities: z.array(z.object({
    opportunityId: z.string(),
    title: z.string(),
    estimatedScore: score,
    whyBetter: z.string(),
  })),
  nextSteps: z.array(z.string()),
});

export const llmEvaluationSchema = evaluationSchema.omit({
  id: true,
  createdAt: true,
  proposal: true,
  overallScore: true,
});

export type ActivityEvaluation = z.infer<typeof evaluationSchema>;
export type LlmEvaluation = z.infer<typeof llmEvaluationSchema>;

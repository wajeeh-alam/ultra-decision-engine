import type { LlmEvaluation } from '@/schemas/evaluation';

/** Strategic leverage weights. Marginal profile value is intentionally dominant. */
export const SCORE_WEIGHTS = {
  goalAlignment: 0.15,
  skillGrowth: 0.2,
  marginalProfileValue: 0.25,
  differentiation: 0.15,
  evidencePotential: 0.15,
  timeEfficiency: 0.1,
} as const;

export function calculateOverallScore(scores: LlmEvaluation['scores']) {
  const weighted = Object.entries(SCORE_WEIGHTS).reduce(
    (total, [key, weight]) => total + scores[key as keyof typeof scores] * weight,
    0,
  );
  return Math.round(Math.min(100, Math.max(0, weighted)));
}

import type { ActivityEvaluation } from '@/schemas/evaluation';

export const rankEvaluations = (items: ActivityEvaluation[]) =>
  [...items].sort((a, b) => b.overallScore - a.overallScore).slice(0, 5);

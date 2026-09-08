import { evaluationSchema, type ActivityEvaluation } from '@/schemas/evaluation';

const DECISIONS_KEY = 'ultra-decision-history';

export function getDecisions(): ActivityEvaluation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(DECISIONS_KEY) ?? '[]');
    return evaluationSchema.array().parse(raw);
  } catch {
    return [];
  }
}

export function getDecision(id: string) {
  return getDecisions().find((item) => item.id === id);
}

export function saveDecision(decision: ActivityEvaluation) {
  const next = [decision, ...getDecisions().filter((item) => item.id !== decision.id)].slice(0, 20);
  window.localStorage.setItem(DECISIONS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('ultra-decisions-change'));
}

export function clearDecisions() {
  window.localStorage.removeItem(DECISIONS_KEY);
  window.dispatchEvent(new Event('ultra-decisions-change'));
}

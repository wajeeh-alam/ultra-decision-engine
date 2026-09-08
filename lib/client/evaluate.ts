import { evaluationSchema } from '@/schemas/evaluation';
import { getStoredProfile } from '@/lib/storage/profile';

export async function requestEvaluation(title: string, hours = 10, weeks = 12) {
  const profile = getStoredProfile();
  const response = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId: profile.id, profile, proposal: { title, description: title, estimatedHoursPerWeek: hours, durationWeeks: weeks } }),
  });
  const payload: unknown = await response.json();
  if (!response.ok) throw new Error(typeof payload === 'object' && payload && 'error' in payload && typeof payload.error === 'string' ? payload.error : 'Analysis failed');
  return evaluationSchema.parse(payload);
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { activityProposalSchema } from '@/schemas/activity-proposal';
import { studentProfileSchema } from '@/schemas/student';
import { DemoStudentContextProvider } from '@/lib/providers/demo-student-context';
import { evaluateActivity } from '@/lib/decision-engine/evaluate';

const requestSchema = z.object({
  studentId: z.string().min(1),
  proposal: activityProposalSchema,
  profile: studentProfileSchema.optional(),
});

export async function POST(request: Request) {
  try {
    const input = requestSchema.parse(await request.json());
    const provider = new DemoStudentContextProvider();
    const profile = input.profile ?? await provider.getStudentProfile(input.studentId);
    const opportunities = await provider.getRelevantOpportunities(profile);
    return NextResponse.json(await evaluateActivity(profile, input.proposal, opportunities));
  } catch (error) {
    const message = error instanceof z.ZodError
      ? error.issues[0]?.message ?? 'Invalid request'
      : error instanceof Error ? error.message : 'Unable to evaluate this idea';
    const status = message.includes('not found') ? 404 : error instanceof z.ZodError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

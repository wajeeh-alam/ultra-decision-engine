import OpenAI from 'openai';
import type { Opportunity } from '@/schemas/opportunity';
import type { ActivityProposal } from '@/schemas/activity-proposal';
import { llmEvaluationSchema, type LlmEvaluation } from '@/schemas/evaluation';
import type { StudentProfile } from '@/schemas/student';
import { buildEvaluationPrompt, SYSTEM_PROMPT } from './prompts';

export async function evaluateWithLlm(profile: StudentProfile, proposal: ActivityProposal, opportunities: Opportunity[]): Promise<LlmEvaluation> {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 25_000 });
  let correction = '';
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `${buildEvaluationPrompt(profile, proposal, opportunities)}${correction}` },
      ],
    });
    try {
      return llmEvaluationSchema.parse(JSON.parse(response.choices[0]?.message?.content ?? '{}'));
    } catch {
      correction = '\n\nYour previous response failed schema validation. Return complete JSON with every required field and 0–100 numeric scores.';
    }
  }
  throw new Error('The model returned an invalid evaluation twice');
}

import { z } from 'zod';

export const activityProposalSchema = z.object({
  title: z.string().trim().min(3, 'Describe what you are thinking about doing.'),
  description: z.string().default(''),
  category: z.string().optional(),
  estimatedHoursPerWeek: z.number().min(1).max(80).optional(),
  durationWeeks: z.number().min(1).max(260).optional(),
});

export type ActivityProposal = z.infer<typeof activityProposalSchema>;

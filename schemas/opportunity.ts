import { z } from 'zod';

export const opportunitySchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string().optional(),
  category: z.string(),
  description: z.string(),
  skills: z.array(z.string()).optional(),
  estimatedHoursPerWeek: z.number().min(0).optional(),
  duration: z.string().optional(),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

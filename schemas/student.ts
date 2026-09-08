import { z } from 'zod';

export const studentActivitySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string(),
  outcomes: z.array(z.string()).optional(),
  hoursPerWeek: z.number().min(0).optional(),
  durationMonths: z.number().min(0).optional(),
});

export const studentProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  technologies: z.array(z.string()).optional(),
  users: z.number().int().min(0).optional(),
  outcomes: z.array(z.string()).optional(),
});

export const studentProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  grade: z.string().optional(),
  goals: z.array(z.string()),
  careerInterests: z.array(z.string()),
  skills: z.array(z.object({
    name: z.string().min(1),
    level: z.string().optional(),
    evidence: z.array(z.string()).optional(),
  })),
  activities: z.array(studentActivitySchema),
  achievements: z.array(z.string()),
  projects: z.array(studentProjectSchema),
  constraints: z.object({
    hoursAvailablePerWeek: z.number().min(0).optional(),
    location: z.string().optional(),
    remotePreferred: z.boolean().optional(),
  }).optional(),
  missingDimensions: z.array(z.string()).optional(),
});

export type StudentActivity = z.infer<typeof studentActivitySchema>;
export type StudentProject = z.infer<typeof studentProjectSchema>;
export type StudentProfile = z.infer<typeof studentProfileSchema>;

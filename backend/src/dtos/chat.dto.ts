import { z } from 'zod';

export const chatRequestSchema = z.object({
  prompt: z
    .string({ message: 'Prompt must be a string' })
    .min(1, 'Prompt cannot be empty')
    .max(4000, 'Prompt cannot exceed 4000 characters'),
  sessionId: z.string().optional(),
  projectId: z.string().optional(),
});

export type ChatRequestDto = z.infer<typeof chatRequestSchema>;


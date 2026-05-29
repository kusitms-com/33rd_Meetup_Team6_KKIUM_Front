import { z } from 'zod';

export const userProfileResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  illustrateId: z.number().int().min(0).max(4),
});

export const updateProfileColorRequestSchema = z.object({
  illustrateId: z.number().int().min(0).max(4),
});

export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type UpdateProfileColorRequest = z.infer<typeof updateProfileColorRequestSchema>;

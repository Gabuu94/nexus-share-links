import { z } from 'zod';

export const linkUpdateSchema = z.object({
  whatsapp: z.string().trim().max(2048).regex(/^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/, 'Enter a WhatsApp group invite link.'),
  telegram: z.string().trim().max(2048).regex(/^https:\/\/t\.me\/[+A-Za-z0-9_-]+$/, 'Enter a Telegram invite or channel link.'),
});

export const linksQueryKey = ['community-links'];
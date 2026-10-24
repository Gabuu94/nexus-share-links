import { describe, it, expect } from 'vitest';
import { linkUpdateSchema } from './community-links';

const links = { whatsapp: 'https://chat.whatsapp.com/CCSoPjr7JgVHtg6rp75ZkZ', telegram: 'https://t.me/+e10G7CD4bawxYjQ0' };
describe('community invite updates', () => {
  it('accepts the current WhatsApp link', () => {
    expect(linkUpdateSchema.parse(links).whatsapp).toBe('https://chat.whatsapp.com/CCSoPjr7JgVHtg6rp75ZkZ');
  });
  it('rejects a non-WhatsApp destination for the WhatsApp button', () => {
    expect(linkUpdateSchema.safeParse({ ...links, whatsapp: 'https://example.com/group' }).success).toBe(false);
  });
  it('rejects executable links for Telegram', () => {
    expect(linkUpdateSchema.safeParse({ ...links, telegram: 'javascript:alert(1)' }).success).toBe(false);
  });
});
import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { linkUpdateSchema } from './community-links';

export const getCommunityLinks = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Community links are unavailable.');
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('community_links').select('id,url');
  if (error) throw new Error('Unable to load community links.');
  const whatsapp = data?.find(row => row.id === 'whatsapp')?.url;
  const telegram = data?.find(row => row.id === 'telegram')?.url;
  return linkUpdateSchema.parse({ whatsapp, telegram });
});

export const getAdminAccess = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (error) throw new Error('Unable to check admin access.');
    return { isAdmin: data === true };
  });

export const saveCommunityLinks = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => linkUpdateSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (roleError || !allowed) throw new Error('Only the approved admin can change links.');
    const { error } = await context.supabase.rpc('update_community_links', { _whatsapp: data.whatsapp, _telegram: data.telegram });
    if (error) throw new Error('Links were not saved. Please try again.');
    return data;
  });
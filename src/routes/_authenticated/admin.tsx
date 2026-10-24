import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { LogOut, Save, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { getAdminAccess, getCommunityLinks, saveCommunityLinks } from '@/lib/community-links.functions';
import { linksQueryKey, linkUpdateSchema } from '@/lib/community-links';

const accessOptions = queryOptions({ queryKey: ['admin-access'], queryFn: () => getAdminAccess() });
const linkOptions = queryOptions({ queryKey: linksQueryKey, queryFn: () => getCommunityLinks(), staleTime: 0 });

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({ meta: [
    { title: 'Manage community links — Samir Trading Hub' },
    { name: 'description', content: 'Private community link management for Samir Trading Hub.' },
    { property: 'og:title', content: 'Manage links — Samir Trading Hub' },
    { property: 'og:description', content: 'Private admin workspace for community links.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex,nofollow' },
  ] }),
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(accessOptions), context.queryClient.ensureQueryData(linkOptions)]);
  },
  component: Admin,
});

function Admin() {
  const { data: access } = useSuspenseQuery(accessOptions);
  const { data: links } = useSuspenseQuery(linkOptions);
  const [whatsapp, setWhatsapp] = useState(links.whatsapp);
  const [telegram, setTelegram] = useState(links.telegram);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const save = useServerFn(saveCommunityLinks);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: '/auth', replace: true });
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage(''); setFailed(false);
    const parsed = linkUpdateSchema.safeParse({ whatsapp, telegram });
    if (!parsed.success) { setFailed(true); setMessage(parsed.error.issues[0]?.message ?? 'Check your links.'); return; }
    setBusy(true);
    try {
      const saved = await save({ data: parsed.data });
      queryClient.setQueryData(linksQueryKey, saved);
      setWhatsapp(saved.whatsapp); setTelegram(saved.telegram);
      setMessage('Saved — your new links are live.');
    } catch { setFailed(true); setMessage('Could not save your links. Please try again.'); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-5 py-12">
    <div className="mb-8 flex items-center justify-between gap-3">
      <Link to="/" className="font-semibold text-primary">Samir Trading Hub</Link>
      <Button variant="ghost" onClick={signOut}><LogOut />Sign out</Button>
    </div>
    <h1 className="text-2xl font-bold">Community links</h1>
    {!access.isAdmin ? <p role="alert" className="mt-6 text-destructive">This account does not have admin access.</p> :
      <form onSubmit={submit} className="mt-8 space-y-6">
        <div className="space-y-2"><label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp group link</label><Input id="whatsapp" type="url" required maxLength={2048} value={whatsapp} onChange={e => { setWhatsapp(e.target.value); setMessage(''); }} /></div>
        <div className="space-y-2"><label htmlFor="telegram" className="text-sm font-medium">Telegram link</label><Input id="telegram" type="url" required maxLength={2048} value={telegram} onChange={e => { setTelegram(e.target.value); setMessage(''); }} /></div>
        <Button type="submit" className="h-11 w-full" disabled={busy}><Save />{busy ? 'Saving…' : 'Save changes'}</Button>
        {message && <p role="status" className={failed ? 'text-sm text-destructive' : 'text-sm text-gain'}>{message}</p>}
      </form>}
    <Button asChild variant="link" className="mt-6 self-start px-0"><Link to="/"><ExternalLink />View community page</Link></Button>
  </main>;
}
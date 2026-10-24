import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [
    { title: 'Admin sign in — Samir Trading Hub' }, { name: 'description', content: 'Sign in to manage Samir Trading Hub community links.' },
    { property: 'og:title', content: 'Admin sign in — Samir Trading Hub' }, { property: 'og:description', content: 'Secure access to community link management.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' },
  ] }),
  component: Auth,
});

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: '/admin', replace: true });
    });
  }, [navigate]);
  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage('');
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) { setMessage('Enter a valid email address.'); return; }
    if (password.length < 8) { setMessage('Use a password with at least 8 characters.'); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: parsed.data, password });
      if (error) throw error;
      await navigate({ to: '/admin', replace: true });
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to sign in. Please try again.'); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-5 py-12">
    <Link to="/" className="mb-8 font-semibold text-primary">Samir Trading Hub</Link>
    <h1 className="text-2xl font-bold">Admin sign in</h1>
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">Email</label><Input id="email" type="email" autoComplete="email" maxLength={255} required value={email} onChange={e => setEmail(e.target.value)} /></div>
      <div className="space-y-2"><label htmlFor="password" className="text-sm font-medium">Password</label><Input id="password" type="password" minLength={8} maxLength={128} required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
      <Button type="submit" className="h-11 w-full" disabled={busy}><LogIn />{busy ? 'Please wait…' : 'Sign in'}</Button>
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </form>
  </main>;
}
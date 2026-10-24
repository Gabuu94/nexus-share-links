import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { LogIn, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [
    { title: 'Admin sign in — Samir Trading Hub' }, { name: 'description', content: 'Sign in to manage Samir Trading Hub community links.' },
    { property: 'og:title', content: 'Admin sign in — Samir Trading Hub' }, { property: 'og:description', content: 'Secure access to community link management.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' },
  ] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
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
  async function googleSignIn() {
    setBusy(true); setMessage('');
    try {
      const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) { setMessage('Google sign-in could not finish. Please try again.'); return; }
      if (!result.redirected) await navigate({ to: '/admin', replace: true });
    } catch { setMessage('Google sign-in could not finish. Please try again.'); }
    finally { setBusy(false); }
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage('');
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) { setMessage('Enter a valid email address.'); return; }
    if (mode !== 'forgot' && password.length < 8) { setMessage('Use a password with at least 8 characters.'); return; }
    setBusy(true);
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage('If this account exists, a password reset link has been sent.');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email: parsed.data, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
        if (error) throw error;
        setMessage('Check your email to confirm your account, then sign in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: parsed.data, password });
        if (error) throw error;
        await navigate({ to: '/admin', replace: true });
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to sign in. Please try again.'); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-5 py-12">
    <Link to="/" className="mb-8 font-semibold text-primary">Samir Trading Hub</Link>
    <h1 className="text-2xl font-bold">{mode === 'login' ? 'Admin sign in' : mode === 'signup' ? 'Create admin account' : 'Reset password'}</h1>
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">Email</label><Input id="email" type="email" autoComplete="email" maxLength={255} required value={email} onChange={e => setEmail(e.target.value)} /></div>
      {mode !== 'forgot' && <div className="space-y-2"><label htmlFor="password" className="text-sm font-medium">Password</label><Input id="password" type="password" minLength={8} maxLength={128} required autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} /></div>}
      <Button type="submit" className="h-11 w-full" disabled={busy}>{mode === 'forgot' ? <Mail /> : <LogIn />}{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}</Button>
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </form>
    {mode !== 'forgot' && <Button variant="outline" className="mt-4 h-11 w-full" disabled={busy} onClick={googleSignIn}>Continue with Google</Button>}
    <div className="mt-5 flex flex-wrap justify-between gap-2">
      <Button variant="link" className="px-0" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Create admin account' : 'Back to sign in'}</Button>
      {mode === 'login' && <Button variant="link" className="px-0" onClick={() => { setMode('forgot'); setMessage(''); }}>Forgot password?</Button>}
    </div>
  </main>;
}
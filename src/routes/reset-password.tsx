import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [
    { title: 'Reset admin password — Samir Trading Hub' }, { name: 'description', content: 'Choose a new admin password for Samir Trading Hub.' },
    { property: 'og:title', content: 'Reset password — Samir Trading Hub' }, { property: 'og:description', content: 'Secure admin password recovery.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' },
  ] }), component: ResetPassword,
});

function ResetPassword() {
  const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const recoveryHash = new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery';
    // Preserve recovery intent before the auth client consumes the hash.
    if (recoveryHash) sessionStorage.setItem('samir-password-recovery', 'true');
    if (sessionStorage.getItem('samir-password-recovery') === 'true') {
      void supabase.auth.getUser().then(({ data }) => setRecovery(Boolean(data.user)));
    }
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!recovery) return;
    if (password.length < 8 || password !== confirm) { setMessage('Use at least 8 characters and make both passwords match.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    sessionStorage.removeItem('samir-password-recovery');
    setMessage('Password updated. You can now sign in.'); setRecovery(false);
  }
  return <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-5 py-12">
    <h1 className="text-2xl font-bold">New admin password</h1>
    {recovery ? <form className="mt-8 space-y-5" onSubmit={submit}>
      <div className="space-y-2"><label htmlFor="new-password">New password</label><Input id="new-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={password} onChange={e => setPassword(e.target.value)} /></div>
      <div className="space-y-2"><label htmlFor="confirm-password">Confirm password</label><Input id="confirm-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={confirm} onChange={e => setConfirm(e.target.value)} /></div>
      <Button className="w-full" disabled={busy}>{busy ? 'Saving…' : 'Update password'}</Button>
    </form> : <p className="mt-5 text-sm text-muted-foreground">{message || 'Open the password reset link from your email to continue.'}</p>}
    {recovery && message && <p role="status" className="mt-4 text-sm text-muted-foreground">{message}</p>}
    <Button asChild variant="link" className="mt-6"><Link to="/auth">Back to sign in</Link></Button>
  </main>;
}
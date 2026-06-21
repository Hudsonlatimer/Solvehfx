'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';

type AuthMode = 'email-password' | 'phone' | 'magic-link';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('email-password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const supabase = createClient();

  const handleEmailPassword = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      if (mode === 'phone') {
        const { error } = await supabase.auth.signInWithOtp({ phone });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
      }
      setOtpSent(true);
      setMessage(mode === 'phone'
        ? `Code sent to ${phone}`
        : `Magic link sent to ${email} — check your inbox`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      if (mode === 'phone') {
        const { error } = await supabase.auth.verifyOtp({
          phone,
          token: otp,
          type: 'sms',
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'email',
        });
        if (error) throw error;
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setOtpSent(false);
    setError('');
    setMessage('');
    setOtp('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Sign in to SolveHFX</h1>
        <p className="text-sm text-text-secondary mt-2">
          Track your reports and verify issues in your neighbourhood.
        </p>
      </div>

      <div className="bg-bg-elev rounded-xl border border-rule shadow-sm p-6 space-y-5">
        {/* Mode toggle */}
        <div className="flex rounded-lg bg-black/[0.05] p-1">
          <button
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              mode === 'email-password' ? 'bg-bg-elev shadow-sm text-primary' : 'text-text-secondary'
            }`}
            onClick={() => switchMode('email-password')}
          >
            Email
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              mode === 'phone' ? 'bg-bg-elev shadow-sm text-primary' : 'text-text-secondary'
            }`}
            onClick={() => switchMode('phone')}
          >
            Phone
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              mode === 'magic-link' ? 'bg-bg-elev shadow-sm text-primary' : 'text-text-secondary'
            }`}
            onClick={() => switchMode('magic-link')}
          >
            Magic Link
          </button>
        </div>

        {/* Email + Password */}
        {mode === 'email-password' && (
          <>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleEmailPassword}
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </>
        )}

        {/* Phone OTP */}
        {mode === 'phone' && !otpSent && (
          <>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (902) 555-0123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleSendOtp}
              disabled={!phone}
            >
              Send Code
            </Button>
          </>
        )}

        {/* Magic Link */}
        {mode === 'magic-link' && !otpSent && (
          <>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleSendOtp}
              disabled={!email}
            >
              Send Magic Link
            </Button>
          </>
        )}

        {/* OTP verify (phone or magic link) */}
        {(mode === 'phone' || mode === 'magic-link') && otpSent && (
          <>
            <p className="text-sm text-text-secondary text-center">{message}</p>
            <Input
              label="Verification Code"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="one-time-code"
            />
            <Button
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleVerifyOtp}
              disabled={!otp}
            >
              Verify & Sign In
            </Button>
            <button
              className="w-full text-center text-xs text-text-secondary hover:text-primary"
              onClick={() => { setOtpSent(false); setOtp(''); setMessage(''); }}
            >
              Didn&apos;t receive it? Try again
            </button>
          </>
        )}

        {error && <p className="text-sm text-danger text-center">{error}</p>}

        <div className="border-t border-rule pt-4">
          <button
            onClick={() => router.push('/report')}
            className="w-full text-center text-sm text-text-secondary hover:text-primary"
          >
            Continue anonymously &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

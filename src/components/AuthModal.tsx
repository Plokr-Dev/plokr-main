import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { PLOKR_APP } from '../lib/constants';

export default function AuthModal() {
  const [mode, setMode] = useState<'signup' | 'login' | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ mode: 'signup' | 'login' }>).detail;
      setMode(detail.mode);
      setRedirecting(false);
    };
    window.addEventListener('plokr:open-auth', handler);
    return () => window.removeEventListener('plokr:open-auth', handler);
  }, []);

  // Trap focus inside modal and close on Escape
  useEffect(() => {
    if (!mode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !redirecting) setMode(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mode, redirecting]);

  const go = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.open(PLOKR_APP, '_blank', 'noopener,noreferrer');
      setRedirecting(false);
      setMode(null);
    }, 1200);
  };

  if (!mode) return null;

  return (
    <div
      className="ovl"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'signup' ? 'Start your free trial' : 'Welcome back'}
      onClick={() => !redirecting && setMode(null)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!redirecting && (
          <button className="close" onClick={() => setMode(null)} aria-label="Close">×</button>
        )}

        {redirecting ? (
          <div className="redir">
            <div className="spinner" role="status" aria-label="Redirecting…" />
            <div className="rt">Redirecting you securely…</div>
            <div className="rs">
              Taking you to <b>{new URL(PLOKR_APP).host}</b> to{' '}
              {mode === 'signup' ? 'create your workspace' : 'sign in'}.
            </div>
          </div>
        ) : (
          <>
            <div className="mtop">
              <span className="mlogo">
                <span className="plokr-logo">plokr<i className="nub" aria-hidden="true" /></span>
              </span>
              <h3>{mode === 'signup' ? 'Start your free trial' : 'Welcome back'}</h3>
              <p className="msub">
                {mode === 'signup'
                  ? 'Connect your tools and see progress in minutes. No credit card required.'
                  : 'Sign in to your Plokr workspace to continue.'}
              </p>
            </div>

            <div className="body">
              {[
                ['#2563EB', 'Continue with Atlassian'],
                ['#1F2328', 'Continue with GitHub'],
                ['#EA4335', 'Continue with Google'],
              ].map(([bg, label]) => (
                <button key={label} className="prov" onClick={go} type="button">
                  <span className="sq" style={{ background: bg }} aria-hidden="true" />
                  {label}
                  <span className="ar" aria-hidden="true">→</span>
                </button>
              ))}

              <div className="divider" aria-hidden="true">or with email</div>

              <input
                className="field"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                onKeyDown={(e) => { if (e.key === 'Enter') go(); }}
                aria-label="Work email"
              />
              <button className="cont" onClick={go} type="button">
                {mode === 'signup' ? 'Create workspace' : 'Continue'}
              </button>
            </div>

            <div className="foot">
              <div className="lockline">
                <Lock strokeWidth={2} aria-hidden="true" />
                Read-only access · you authorize every connection
              </div>
              <div className="switch">
                {mode === 'signup' ? (
                  <span>Already have an account?{' '}
                    <a onClick={() => setMode('login')} role="button" tabIndex={0}>Log in</a>
                  </span>
                ) : (
                  <span>New to Plokr?{' '}
                    <a onClick={() => setMode('signup')} role="button" tabIndex={0}>Start free trial</a>
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

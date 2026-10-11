import { useState, type FormEvent } from 'react';

const FORMSPREE_ORIGIN = 'https://formspree.io';

// Only accept a Formspree form URL: it is the one origin allowed by the CSP
// (connect-src / form-action in public/_headers), and it keeps a misconfigured
// build from posting demo requests to an arbitrary host.
function resolveEndpoint(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.origin === FORMSPREE_ORIGIN && url.pathname.startsWith('/f/') ? url.toString() : null;
  } catch {
    return null;
  }
}

const ENDPOINT = resolveEndpoint(import.meta.env.PUBLIC_FORMSPREE_ENDPOINT as string | undefined);
const UNCONFIGURED_MESSAGE = 'Online requests are unavailable right now. Please email sales@plokr.com.';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!ENDPOINT) {
      // Never fake success: an unconfigured build would silently drop leads.
      setError(UNCONFIGURED_MESSAGE);
      return;
    }

    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="thanks">
        <div className="ok-icon" aria-hidden="true">✓</div>
        <h3>Thanks — we’ll be in touch.</h3>
        <p>A member of our team will reach out within one business day to set up your demo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 style={{ fontFamily: 'Archivo', fontSize: 20, marginBottom: 6 }}>Request a demo</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 22 }}>
        Tell us a little about your team and we’ll tailor the walkthrough.
      </p>

      <div className="frow2">
        <div className="fgroup">
          <label className="flabel" htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" className="field" placeholder="Alex" required />
        </div>
        <div className="fgroup">
          <label className="flabel" htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" className="field" placeholder="Rivera" required />
        </div>
      </div>

      <div className="fgroup">
        <label className="flabel" htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" className="field" placeholder="alex@company.com" required />
      </div>

      <div className="frow2">
        <div className="fgroup">
          <label className="flabel" htmlFor="company">Company</label>
          <input id="company" name="company" className="field" placeholder="Acme Inc." required />
        </div>
        <div className="fgroup">
          <label className="flabel" htmlFor="teamSize">Team size</label>
          <select id="teamSize" name="teamSize" className="field">
            <option>1–10 engineers</option>
            <option>11–50 engineers</option>
            <option>51–200 engineers</option>
            <option>200+ engineers</option>
          </select>
        </div>
      </div>

      <div className="fgroup">
        <label className="flabel" htmlFor="message">What would you like to see?</label>
        <textarea
          id="message"
          name="message"
          className="field"
          placeholder="We use Jira + GitHub and want to get ahead of dependency risk…"
        />
      </div>

      {error && (
        <p style={{ color: 'var(--bad)', fontSize: 13, marginBottom: 12 }} role="alert">{error}</p>
      )}

      <button
        className="btn btn-primary"
        style={{ width: '100%', height: 50 }}
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Sending…' : 'Request demo'}
      </button>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 14, fontFamily: 'JetBrains Mono' }}>
        No spam · we only use this to contact you about Plokr
      </p>
    </form>
  );
}

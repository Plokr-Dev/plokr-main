import { useState } from 'react';
import { PLOKR_APP, PRICING_PLANS, CTA_CORE } from '../lib/constants';

type Billing = 'monthly' | 'annual';

const INCLUDED_FEATURES = [
  'Every feature included',
  'Repository dependency scanning',
  'Dependency and security scans',
  'Alerts, webhooks and audit logs',
  'Role-based access',
];

interface Props {
  showLink?: boolean;
}

const formatUsd = (cents: number): string => `$${(cents / 100).toLocaleString('en-US')}`;

export default function PricingTiers({ showLink = false }: Props) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const isAnnual = billing === 'annual';

  const openAuth = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('plokr:open-auth', { detail: { mode: 'signup' } }));
  };

  return (
    <>
      <div className="sec-head" style={{ marginBottom: 32 }}>
        <h2>Two plans. Every feature.</h2>
        <p>Pick by team size. Every plan starts with a 7-day free trial.</p>
        <div className="billtoggle" style={{ marginTop: 22 }}>
          <button
            className={billing === 'monthly' ? 'on' : ''}
            onClick={() => setBilling('monthly')}
            aria-pressed={!isAnnual}
            type="button"
          >
            Monthly
          </button>
          <button
            className={isAnnual ? 'on' : ''}
            onClick={() => setBilling('annual')}
            aria-pressed={isAnnual}
            type="button"
          >
            Annual <span className="save">2 months free</span>
          </button>
        </div>
      </div>

      <div className="tiers">
        {PRICING_PLANS.map((plan) => {
          const isTeam = plan.id === 'team';
          const cents = isAnnual ? plan.annualCents : plan.monthlyCents;
          const unit = isAnnual ? '/year' : '/month';
          return (
            <div key={plan.id} className={`tier${isTeam ? ' pop' : ''}`}>
              {isTeam && <span className="ribbon">Best for teams</span>}
              <span className="tname">{plan.name}</span>
              <div className="price">
                {formatUsd(cents)}
                <small>{isTeam ? ` per seat${unit}` : unit}</small>
              </div>
              <div className="billnote">
                {isAnnual ? 'billed annually · 2 months free' : 'billed monthly'}
              </div>
              <p className="tdesc">{plan.description}</p>
              <p className="seats">
                {plan.seats} · {plan.creditsPerSeat.toLocaleString('en-US')} credits
                {isTeam ? ' per seat' : ''}/month
              </p>
              <ul>
                {INCLUDED_FEATURES.map((f) => (
                  <li key={f}><span className="tk">✓</span>{f}</li>
                ))}
              </ul>
              <a
                className={`btn ${isTeam ? 'btn-primary' : 'btn-line'}`}
                href={PLOKR_APP}
                onClick={openAuth}
              >
                {CTA_CORE}
              </a>
            </div>
          );
        })}
      </div>

      <p className="tier-note">
        A card is required to start the trial. Nothing is charged until day 8, and you can cancel
        any time before then. Administrators who only manage the workspace do not need a seat.{' '}
        Teams above 500 seats? <a href="/contact">Talk to us</a>.
      </p>

      {showLink && (
        <div className="tier-note">
          <a href="/pricing">
            Compare all features &amp; read FAQs →
          </a>
        </div>
      )}
    </>
  );
}

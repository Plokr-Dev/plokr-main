import { useState } from 'react';
import { PLOKR_APP } from '../lib/constants';

type Billing = 'monthly' | 'annual';
type Product = 'core' | 'integrate';

interface Tier {
  name: 'Basic' | 'Professional' | 'Enterprise';
  basePriceCents: number;
  perMonthLabel?: string;
  desc: string;
  feats: string[];
  usageRateLabel: string;
  cta: string;
  style: string;
  mode: 'signup' | 'sales';
  pop: boolean;
}

const tiersByProduct: Record<Product, Tier[]> = {
  core: [
    {
      name: 'Basic',
      basePriceCents: 2900,
      perMonthLabel: '/mo',
      desc: 'For small teams exploring automation',
      feats: [
        'Up to 5 workflows',
        'Up to 500 runs/month',
        'Basic logs & debugging',
        'Email notifications',
        'Community support',
      ],
      usageRateLabel: '$0.10 per run after included quota',
      cta: 'Start free',
      style: 'btn-line',
      mode: 'signup',
      pop: false,
    },
    {
      name: 'Professional',
      basePriceCents: 9900,
      perMonthLabel: '/mo',
      desc: 'For growing teams at scale',
      feats: [
        'Unlimited workflows',
        'Up to 5,000 runs/month',
        'Advanced logs & debugging',
        'Email & webhook notifications',
        'Priority support',
        'Custom integrations',
      ],
      usageRateLabel: '$0.05 per run after included quota',
      cta: 'Start free trial',
      style: 'btn-primary',
      mode: 'signup',
      pop: true,
    },
    {
      name: 'Enterprise',
      basePriceCents: 0,
      desc: 'For enterprises with custom needs',
      feats: [
        'Unlimited workflows & runs',
        'Dedicated infrastructure',
        'Advanced security & compliance',
        'Custom SLA & support',
        'Dedicated account manager',
        'Custom pricing & features',
      ],
      usageRateLabel: 'Custom usage rates',
      cta: 'Contact sales',
      style: 'btn-line',
      mode: 'sales',
      pop: false,
    },
  ],
  integrate: [
    {
      name: 'Basic',
      basePriceCents: 4900,
      perMonthLabel: '/mo',
      desc: 'For teams starting their integration journey',
      feats: [
        'Up to 10 data sources',
        'Up to 1,000 scans/month',
        'Real-time sync',
        'Basic data validation',
        'Email notifications',
        'Community support',
      ],
      usageRateLabel: '$0.15 per scan after included quota',
      cta: 'Start free',
      style: 'btn-line',
      mode: 'signup',
      pop: false,
    },
    {
      name: 'Professional',
      basePriceCents: 14900,
      perMonthLabel: '/mo',
      desc: 'For teams managing complex integrations',
      feats: [
        'Unlimited data sources',
        'Up to 10,000 scans/month',
        'Real-time & scheduled sync',
        'Advanced data validation & transformation',
        'Email & webhook notifications',
        'Priority support',
        'Custom mappings',
      ],
      usageRateLabel: '$0.08 per scan after included quota',
      cta: 'Start free trial',
      style: 'btn-primary',
      mode: 'signup',
      pop: true,
    },
    {
      name: 'Enterprise',
      basePriceCents: 0,
      desc: 'For enterprises needing custom integration solutions',
      feats: [
        'Unlimited data sources & scans',
        'Dedicated integration infrastructure',
        'Advanced security & compliance',
        'Custom SLA & support',
        'Dedicated integration specialist',
        'Custom connectors & workflows',
      ],
      usageRateLabel: 'Custom usage rates',
      cta: 'Contact sales',
      style: 'btn-line',
      mode: 'sales',
      pop: false,
    },
  ],
};

interface Props {
  showLink?: boolean;
  product?: Product;
}

export default function PricingTiers({ showLink = false, product = 'core' }: Props) {
  const [billing, setBilling] = useState<Billing>('monthly');

  const openAuth = (m: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('plokr:open-auth', { detail: { mode: m } }));
  };

  const formatPrice = (cents: number): string => {
    if (cents === 0) return 'Custom';
    return `$${(cents / 100).toFixed(0)}`;
  };

  const tiers = tiersByProduct[product];
  const productName = product === 'core' ? 'Plokr Core' : 'Plokr Integrate';

  return (
    <>
      <div className="sec-head" style={{ marginBottom: 32 }}>
        <h2>{productName} pricing built to scale with you.</h2>
        <p>Start free, upgrade when your needs grow. Pricing varies with usage.</p>
        <div className="billtoggle" style={{ marginTop: 22 }}>
          <button
            className={billing === 'monthly' ? 'on' : ''}
            onClick={() => setBilling('monthly')}
            type="button"
          >
            Monthly
          </button>
          <button
            className={billing === 'annual' ? 'on' : ''}
            onClick={() => setBilling('annual')}
            type="button"
          >
            Annual <span className="save">SAVE 20%</span>
          </button>
        </div>
      </div>

      <div className="tiers">
        {tiers.map((t) => {
          const price = formatPrice(t.basePriceCents);
          const priced = t.basePriceCents > 0;
          const annualPrice = priced && billing === 'annual'
            ? formatPrice(Math.round(t.basePriceCents * 10)) // Mock 20% discount
            : price;
          const displayPrice = billing === 'annual' && priced ? annualPrice : price;
          return (
            <div key={t.name} className={`tier${t.pop ? ' pop' : ''}`}>
              {t.pop && <span className="ribbon">Most popular</span>}
              <span className="tname">{t.name}</span>
              <div className="price">{displayPrice}<small>{t.perMonthLabel || ''}</small></div>
              <div className="billnote">
                {priced
                  ? billing === 'annual'
                    ? 'billed annually · save 20%'
                    : 'billed monthly'
                  : ' '}
              </div>
              <p className="tdesc">{t.desc}</p>
              <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
                {t.usageRateLabel}
              </p>
              <ul>
                {t.feats.map((f) => (
                  <li key={f}><span className="tk">✓</span>{f}</li>
                ))}
              </ul>
              <a
                className={`btn ${t.style}`}
                href={t.mode === 'sales' ? '/contact' : PLOKR_APP}
                onClick={t.mode === 'sales' ? undefined : openAuth('signup')}
              >
                {t.cta}
              </a>
            </div>
          );
        })}
      </div>

      {showLink && (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <a href="/pricing" style={{ color: 'var(--blue-d)', fontWeight: 600, fontSize: 15 }}>
            Compare all features &amp; read FAQs →
          </a>
        </div>
      )}
    </>
  );
}

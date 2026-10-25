// T4-05: CTA target for every "Log in" / "Start 7-day free trial" button.
// Astro inlines PUBLIC_* vars at build time — set PUBLIC_PLOKR_APP when
// building (compose passes it as a build arg; dev stack uses
// http://localhost:4200/auth/login). Falls back to the prod app login.
export const PLOKR_APP =
  import.meta.env.PUBLIC_PLOKR_APP ?? 'https://app.plokr.com/auth/login';
export const SITE_URL = 'https://plokr.com';
export const SITE_NAME = 'Plokr';
export const SITE_TAGLINE = 'Mission control for engineering';
export const SITE_DESCRIPTION =
  'Plokr gives engineering leaders real-time visibility into Jira progress and dependency health across every repo — so blockers and vulnerabilities surface before they cost a release.';

// Product Definitions
export const PRODUCT_NAMES = {
  CORE: 'Plokr Core',
  INTEGRATE: 'Plokr Integrate'
} as const;

export const PLOKR_CORE = {
  name: PRODUCT_NAMES.CORE,
  description: 'Cloud SaaS platform for real-time visibility into Jira progress and dependency health',
  domain: 'https://plokr.com'
} as const;

export const PLOKR_INTEGRATE = {
  name: PRODUCT_NAMES.INTEGRATE,
  description: 'Self-serve, on-premises solution for distributed security scanning',
  domain: 'https://integrate.plokr.com'
} as const;

// Pricing plans (cents). Annual is 10x monthly ("2 months free").
export interface PricingPlan {
  id: 'individual' | 'team';
  name: string;
  monthlyCents: number;
  annualCents: number;
  creditsPerSeat: number;
  seats: string;
  description: string;
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'individual',
    name: 'Individual',
    monthlyCents: 2900,
    annualCents: 29000,
    creditsPerSeat: 1500,
    seats: '1 seat',
    description: 'For one person who wants every feature.'
  },
  {
    id: 'team',
    name: 'Team',
    monthlyCents: 7900,
    annualCents: 79000,
    creditsPerSeat: 4000,
    seats: 'Minimum 3 seats',
    description: 'For teams. Priced per seat, every feature included.'
  }
] as const;

export const TRIAL = { days: 7, cardRequired: true } as const;

// Call-to-Action Text
export const CTA_CORE = 'Start 7-day free trial';
export const CTA_INTEGRATE = 'Get Started';

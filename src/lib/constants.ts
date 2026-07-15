// T4-05: CTA target for every "Log in" / "Start free trial" button.
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

// Pricing Tiers
export interface PricingTier {
  name: string;
  base_price_cents: number;
  usage_rate_cents: number;
  description: string;
}

export const PRICING_TIERS: Record<'basic' | 'professional' | 'enterprise', PricingTier> = {
  basic: {
    name: 'Basic',
    base_price_cents: 2900,
    usage_rate_cents: 100,
    description: 'For small teams getting started with Plokr'
  },
  professional: {
    name: 'Professional',
    base_price_cents: 9900,
    usage_rate_cents: 50,
    description: 'For growing teams with advanced visibility needs'
  },
  enterprise: {
    name: 'Enterprise',
    base_price_cents: 0,
    usage_rate_cents: 0,
    description: 'Custom pricing for large organizations'
  }
} as const;

// Call-to-Action Text
export const CTA_CORE = 'Start Free Trial';
export const CTA_INTEGRATE = 'Get Started';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  ['Is there really a free plan?', 'Yes. Starter is free forever for individuals — one Jira project, up to three repos, and daily dependency scans. No credit card required to start.'],
  ['How does the 14-day trial work?', 'Team features unlock instantly when you start a trial. After 14 days you can pick a plan or stay on Starter — we never auto-charge a card you didn\'t enter.'],
  ['Can pricing and limits change later?', 'Plans, prices, and limits are managed centrally and update instantly across the product — so we can adjust packaging without you reinstalling anything.'],
  ['What counts as a repo?', 'Any connected source repository on GitHub, Bitbucket, or GitLab that Plokr scans for dependencies. Boards in Jira and Trello are counted separately and are unlimited on Team and above.'],
  ['Do you store our source code?', 'No. Plokr reads manifests, lockfiles, and board metadata in read-only mode — it never clones or stores your source code. See the Security page for details.'],
  ['How is annual billing discounted?', 'Annual plans are billed once per year at a 20% discount versus paying monthly. You can switch between monthly and annual at any time.'],
  ['Can I cancel anytime?', 'Yes. Downgrade or cancel from billing settings whenever you like — you keep access through the end of the current period.'],
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq" role="list">
      {faqs.map(([q, a], i) => (
        <div key={i} className={`qa${open === i ? ' open' : ''}`} role="listitem">
          <button
            className="q"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            type="button"
          >
            {q}
            <Plus className="pm" strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="a" role="region" hidden={open !== i ? true : undefined}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

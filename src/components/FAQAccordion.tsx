import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  ['Is there a free plan?', 'No. Every plan starts with a 7-day free trial. A card is required to start it, nothing is charged until day 8, and you can cancel any time before then.'],
  ['How does the 7-day trial work?', 'Add a card to start. We place two refundable RM1 verification holds to check it. You get every feature for 7 days, and the card is charged on day 8 unless you cancel first.'],
  ['Can pricing and limits change later?', 'Plans, prices, and limits are managed centrally and update instantly across the product — so we can adjust packaging without you reinstalling anything.'],
  ['What counts as a repo?', 'Any connected source repository on GitHub, Bitbucket, or GitLab that Plokr scans for dependencies. Boards in Jira and Trello are counted separately and are included on every plan.'],
  ['Do you store our source code?', 'No. Plokr reads manifests, lockfiles, and board metadata in read-only mode — it never clones or stores your source code. See the Security page for details.'],
  ['How is annual billing discounted?', 'Annual plans cost ten times the monthly price, so you get two months free. You can switch between monthly and annual at any time.'],
  ['Do administrators need a seat?', 'No. Administrators who only manage the workspace do not need a seat.'],
  ['What about Enterprise?', 'Enterprise is not a separate tier. If your team is above 500 seats, talk to us and we will set it up.'],
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

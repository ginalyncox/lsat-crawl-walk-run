/* Monetization config — edit these when you connect Stripe / booking / affiliates.
   Keep secrets out of this file. Use a Stripe Payment Link (Dashboard → Payment Links). */
window.LSAT_MONETIZE = {
  proPriceLabel: '$39',
  proPriceNote: 'one-time · full LSAT cycle',
  /* Paste your Stripe Payment Link here, e.g. https://buy.stripe.com/test_... */
  proPaymentLink: '',
  /* After payment, set Payment Link success URL to this page with ?pro=1 */
  unlockQueryParam: 'pro',
  unlockQueryValue: '1',
  /* Optional manual unlock codes you email after purchase (comma-separated list also OK as array) */
  unlockCodes: ['CRAWL-PRO'],
  tutoringUrl: '',
  tutoringLabel: 'Book a Crawl → Walk session',
  b2bEmail: '',
  b2bSubject: 'Tutor / program license — LSAT Crawl Walk Run',
  methodGuideUrl: '#methodGuide',
  affiliates: [
    {
      name: 'The Loophole in LSAT Logical Reasoning',
      url: 'https://www.amazon.com/s?k=The+Loophole+in+LSAT+Logical+Reasoning',
      note: 'Process-first LR book many students pair with this system.'
    },
    {
      name: 'Official LSAT PrepTests (LSAC)',
      url: 'https://www.lsac.org/lsat/prep',
      note: 'Buy real PrepTests from LSAC. This app never ships copyrighted stems.'
    }
  ]
};

# Monetize LSAT Crawl • Walk • Run

The site stays free on GitHub Pages. Paid options are configured in `monetize-config.js` (no secrets in the repo).

## 1. Pro companion (one-time Stripe Payment Link)

1. In [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links), create a **one-time** product (suggested **$39**).
2. Set the Payment Link **success URL** to your live site with `?pro=1`, for example:  
   `https://ginalyncox.github.io/lsat-crawl-walk-run/?pro=1#pricing`
3. Paste the Payment Link into `monetize-config.js` → `proPaymentLink`.
4. Optionally email buyers a code from `unlockCodes` (default `CRAWL-PRO`) so they can restore Pro on another device.

Pro unlocks on-device:

- Study kit cover print
- Coach-share snapshot (clipboard / JSON)
- Miss-pattern source table + CSV export

Core Autopsy / Decision Mat / practice tools remain free.

## 2. Tutoring / cohort

Set `tutoringUrl` to a Calendly (or similar) booking link. The Pricing card becomes the CTA; sessions use the free app as the worksheet.

## 3. Tutor / program (B2B) license

Set `b2bEmail`. The B2B card opens a mailto with a license subject line. Negotiate pricing offline; ship printable kits from the existing print aids.

## 4. Affiliate / companion links

Edit `affiliates` in `monetize-config.js`. The Pricing section includes an FTC-style disclosure. Prefer process-aligned books and **official LSAC PrepTests** — never host copyrighted stems.

## 5. Niche positioning

Hero + method card (`#methodGuide`) brand the **ADHD-PI / aphantasia · Crawl → Walk → Run** system. Use that language on Gumroad/landing pages; keep this repo as the free demo hub.

## Security note

Client-side `?pro=1` / unlock codes are an honest-customer gate suitable for an MVP static site. For stronger enforcement later, add a tiny webhook receiver (Render) that emails signed unlock codes after `checkout.session.completed`.

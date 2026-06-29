# Canolfan Iman Centre Website

A static, mobile-responsive website for Canolfan Iman Centre (Llandudno Junction Mosque). Plain HTML/CSS/JS — no build step, no framework, deployable to any static host.

**Current status:** live at [canolfanimancentre.co.uk](https://canolfanimancentre.co.uk), hosted on Vercel, deployed from the GitHub repo [hakimis/canolfan-iman-website](https://github.com/hakimis/canolfan-iman-website). Pushing to the `main` branch auto-redeploys.

## File structure

```
index.html          Home
prayer-times.html    Prayer Times
about.html            About Us
services.html         Services (worship, community support)
ramadan.html          Ramadan
youth.html            Youth Activities (unlinked/noindex — not yet ready to publish)
donate.html           Donate / Support
contact.html          Contact & Location
css/style.css         All styling
js/main.js            Nav toggle + footer year
js/prayer-times.js    Live prayer-time calculation widget
images/               Placeholder images (see below)
sitemap.xml           Search-engine sitemap
robots.txt            Crawler rules
```

## 1. Adding your own photos

Every photo on the site is currently a decorative geometric placeholder (no "missing photo" text — it's designed to look intentional, not broken), so the site looks complete while you gather real photos.

We could not pull real photos automatically: there's no confirmed official Instagram/Facebook account for the centre (only a generic Instagram location-tag page, which isn't something we can or should scrape — those photos aren't verified as the mosque's own, and may include identifiable people who haven't consented to appear on the official site), and there's no usable photo on any mosque directory site either.

To add real photos:
1. Take/choose your photo (or save a good one from the centre's own camera roll/WhatsApp/Instagram if you post one) as a `.jpg` (or `.png`/`.webp`).
2. Put it in the `images/` folder, e.g. `images/mosque-exterior.jpg`.
3. Open the relevant HTML page, find the `<img src="images/mosque-exterior.svg" ...>` tag, and change `src` to your new filename (and update the `alt` text to describe the real photo).
4. You can then delete the old `.svg` placeholder file.

Placeholder files you'll want to replace: `mosque-exterior.svg`, `mosque-interior.svg`, `mosque-courtyard.svg`, `madrasa.svg`, `womens-circle.svg`, `youth-activities.svg`, `youth-sports.svg`, `youth-trip.svg`, `ramadan-iftar.svg`, `community-support.svg`, `jumuah.svg`, `donate-qr.svg` (replace this last one with a real QR code, see section 4).

Also add a real `images/og-image.jpg` (1200×630px) — a nice exterior or community photo — used when the site is shared on social media and WhatsApp. Until it exists, the `og:image` tag in each page's `<head>` simply won't show a preview image.

## 2. Connecting your real prayer timetable

**Right now, `prayer-times.html` and the homepage widget show calculated prayer times** pulled live from the free AlAdhan API, based on the mosque's coordinates. This is intentional — it means the site never displays an invented or outdated time. It is **not** your official Iqamah (congregation) timetable.

To connect your real timetable:

1. Sign up for a free mosque timetable provider — e.g. [MyMasjid](https://my-masjid.com), [Masjidbox](https://masjidbox.com), or [Mawaqit](https://mawaqit.net).
2. Enter your real Iqamah times into their dashboard.
3. Copy the `<iframe>` embed code they give you.
4. Open `prayer-times.html`, find the HTML comment that starts with `REPLACE-ME: MyMasjid / Masjidbox / Mawaqit embed`, and paste your iframe code there (an example is included in the comment).
5. Optional: do the same on `ramadan.html` once Ramadan timetables are published, and update `index.html`'s homepage widget note if you want it to point straight to the new embed.

If you'd rather not use a third-party provider, you can also just delete the calculated widget and replace it with a simple table of your own times — ask your developer (or Claude) to do this for you.

**Calculation method note:** the calculated fallback uses the Muslim World League method (`method=3`) via AlAdhan. If your mosque follows a different convention, open `js/prayer-times.js` and change the `CALC_METHOD` constant near the top — see the comment for the full list of method codes.

**Staying accurate over time:** the widget always fetches *today's* date freshly from the visitor's browser clock and re-fetches every 30 minutes, so it self-corrects at midnight (showing the new day's times) without anyone needing to touch the code, and the "next prayer" highlight stays current for anyone who leaves the page open.

## 3. Connecting your contact and donation forms

Two forms on the site are wired up to [Formspree](https://formspree.io), a free service that emails form submissions straight to your Gmail inbox with no backend code required:
- The general enquiry form on `contact.html`
- The "Request Our Bank Details" form on `donate.html` (`#bank-request`) — since we deliberately don't publish bank account details on the public site, this form lets anyone who wants to donate by bank transfer ask for the details by email instead

To activate them:
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and verify it with `canolfanimancentre@gmail.com`.
3. Copy the form endpoint Formspree gives you (looks like `https://formspree.io/f/abcd1234`).
4. Open `contact.html` and `donate.html`, find each `<form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>`, and replace `YOUR_FORM_ID` with your real endpoint. You can use the **same** Formspree form for both (all submissions land in the same inbox either way), or create a second Formspree form if you'd rather keep donation enquiries separate.

Until you do this, visitors can still reach you instantly via the "Email us directly" / "Prefer email?" `mailto:` links on both pages — those work immediately, no setup required.

## 4. Donation link & QR code

On `donate.html`:
1. Replace the `Donate Now` button's `href="#"` with your real donation link (JustGiving, LaunchGood, PayPal.me, GoFundMe, or your bank's payment page).
2. Generate a QR code that points to that same link (e.g. via [qr-code-generator.com](https://www.qr-code-generator.com) — free, no account needed), download it as an image, and replace `images/donate-qr.svg` with it (e.g. `images/donate-qr.png`, then update the `<img src>` on the page).

Bank transfer details are intentionally **not** published anywhere on the public site — anyone wanting to pay by bank transfer requests the details via the form on the Donate page (see section 3), which is a safer practice than listing account numbers publicly.

## 5. Filling in remaining details

General-purpose copy is used wherever exact operational details (class days/times, bank details, safeguarding contact, founding year, etc.) weren't available — by design, so nothing on the live site looks unfinished or invites a wrong/outdated fact. Search each page for "Site owner:" (inside HTML comments, not visible to visitors) for technical setup notes. When you have the real specifics, just edit the relevant paragraph directly — no bracketed placeholders to hunt for.

## 6. Domain

The site already uses the real `canolfanimancentre.co.uk` domain throughout (`<link rel="canonical">`, Open Graph tags, JSON-LD, `sitemap.xml`, `robots.txt`). If you ever move to a different domain, find-and-replace `canolfanimancentre.co.uk` across all files.

The footer's only social icon currently links to a real, working Google Maps search for the centre's address — no Instagram/Facebook icons are shown since there's no confirmed official account yet. If you create one, just add a matching `<a>` link (copy the Maps icon's markup in the footer of any page) and add it to the JSON-LD `sameAs` list in `index.html`.

## 7. Deploying to a static host

Any static host will work. Two easy free options:

**Netlify (drag-and-drop, easiest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole project folder onto the page.
3. Netlify gives you a live URL immediately (e.g. `random-name.netlify.app`) — you can rename the subdomain or attach your own domain in Site settings → Domain management.

**Cloudflare Pages / GitHub Pages (if you're comfortable with Git):**
1. Push this folder to a GitHub repository.
2. On Cloudflare Pages or GitHub Pages, connect the repo with build command "none" and output directory `/` (root).
3. Deploy — you'll get a live URL, then attach your custom domain.

## 8. Pointing your GoDaddy domain at your host

1. In your hosting provider (Netlify/Cloudflare Pages/etc.), add your custom domain (e.g. `canolfanimancentre.co.uk`) under domain settings — it will show you DNS records to add.
2. Log in to [GoDaddy](https://godaddy.com) → **My Products** → your domain → **DNS** → **Manage DNS**.
3. Add the records your host gave you — typically:
   - An `A` record for `@` pointing to the host's IP address, **or**
   - A `CNAME` record for `@`/`www` pointing to the hostname your provider gives you (e.g. `your-site.netlify.app`).
4. Remove/replace any existing conflicting `A`/`CNAME` records GoDaddy created by default (e.g. its parked-page placeholders).
5. Wait for DNS to propagate (a few minutes to a few hours), then your domain will serve the site over HTTPS automatically (most modern hosts issue a free SSL certificate for you).

## 9. Google Business Profile

To help local search ("mosque Llandudno Junction", "masjid North Wales"):
1. Claim/create a [Google Business Profile](https://business.google.com) using the exact same Name, Address, and Phone as on this website (consistency matters for ranking).
2. Add your website URL once live, opening hours, and photos.
3. Once you have your Google Business Profile URL, you can add it alongside the Maps link in the JSON-LD `sameAs` list in `index.html`.

## Accessibility & performance notes

- Semantic HTML, one `<h1>` per page, a "skip to content" link, and visible focus states are already built in.
- Fonts are loaded from Google Fonts with `preconnect` for speed; if you'd rather not depend on Google Fonts, you can remove the `<link>` tags in each page's `<head>` and the CSS will fall back to system fonts automatically.
- No build tools or dependencies — just open `index.html` in a browser, or serve the folder with any static file server.

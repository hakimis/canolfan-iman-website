# Canolfan Iman Centre Website

A static, mobile-responsive website for Canolfan Iman Centre (Llandudno Junction Mosque). Plain HTML/CSS/JS — no build step, no framework, deployable to any static host.

## File structure

```
index.html          Home
prayer-times.html    Prayer Times
about.html            About Us
services.html         Services (worship, madrasa, community, youth)
ramadan.html          Ramadan
youth.html            Youth Activities
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

Every photo on the site is currently a labelled SVG placeholder (a dashed box telling you exactly what should go there and what filename to use), so nothing looks broken before you add real images.

To replace one:
1. Take/choose your photo and save it as a `.jpg` (or `.png`/`.webp`).
2. Put it in the `images/` folder using a similar name, e.g. `images/mosque-exterior.jpg`.
3. Open the relevant HTML page, find the `<img src="images/mosque-exterior.svg" ...>` tag, and change `src` to your new filename (and update the `alt` text to describe the real photo).
4. You can then delete the old `.svg` placeholder file.

Placeholder files you'll want to replace: `mosque-exterior.svg`, `mosque-interior.svg`, `mosque-courtyard.svg`, `madrasa.svg`, `womens-circle.svg`, `youth-activities.svg`, `youth-sports.svg`, `youth-trip.svg`, `ramadan-iftar.svg`, `community-support.svg`, `jumuah.svg`, `donate-qr.svg`.

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

## 3. Connecting your contact form

The form on `contact.html` is wired up to [Formspree](https://formspree.io), a free service that emails form submissions to you with no backend code required.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and verify it with `canolfanimancentre@gmail.com`.
3. Copy the form endpoint Formspree gives you (looks like `https://formspree.io/f/abcd1234`).
4. Open `contact.html`, find `<form class="form-grid mt-1" action="https://formspree.io/f/YOUR_FORM_ID" ...>` and replace `YOUR_FORM_ID` with your real endpoint.

Until you do this, visitors can still reach you instantly via the "Email us directly" `mailto:` link further down the same page — that one works immediately, no setup required.

## 4. Donation link & QR code

On `donate.html`:
1. Replace the `Donate Now` button's `href="#"` with your real donation link (JustGiving, LaunchGood, PayPal.me, GoFundMe, or your bank's payment page).
2. Generate a QR code that points to that same link (e.g. via [qr-code-generator.com](https://www.qr-code-generator.com) — free, no account needed), download it as an image, and replace `images/donate-qr.svg` with it (e.g. `images/donate-qr.png`, then update the `<img src>` on the page).
3. Fill in or remove the bank-transfer card if you do/don't want to publish bank details online.

## 5. Filling in the placeholder text

A few sections contain bracketed notes like `[Site owner: add ...]` — these mark spots where only you have the real information (founding history, class times, safeguarding contact, etc.). Search each page for "Site owner:" and fill these in before publishing.

## 6. Before you go live: update placeholder URLs

Every page currently uses `https://YOUR-DOMAIN-HERE/` in `<link rel="canonical">`, Open Graph tags, and the JSON-LD structured data, plus `sitemap.xml` and `robots.txt`. Once you know your real domain (see deployment below), do a find-and-replace across all files: `YOUR-DOMAIN-HERE` → your actual domain (e.g. `canolfanimancentre.co.uk`).

Also replace the social placeholders `https://www.instagram.com/REPLACE_ME`, `https://www.facebook.com/REPLACE_ME`, and `https://www.google.com/maps/place/REPLACE_ME` (footer of every page, plus the JSON-LD `sameAs` list on `index.html`) with your real profile links. Linking your real Google Business Profile here especially helps local SEO.

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
3. Link your Google Maps profile URL into the footer `sameAs` placeholders described in step 6.

## Accessibility & performance notes

- Semantic HTML, one `<h1>` per page, a "skip to content" link, and visible focus states are already built in.
- Fonts are loaded from Google Fonts with `preconnect` for speed; if you'd rather not depend on Google Fonts, you can remove the `<link>` tags in each page's `<head>` and the CSS will fall back to system fonts automatically.
- No build tools or dependencies — just open `index.html` in a browser, or serve the folder with any static file server.

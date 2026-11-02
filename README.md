# MAC Automotive Performance

A sample website for MAC Automotive Performance, a car repair and accessories shop on Gordon Ave, Olongapo City. It was built to show the shop's owner what a new site could look like.

The content is real. The phone numbers, hours, services, accessories, photos and reviews come from the shop's sign, macperformance.ph and its Google Maps listing.

## Pages

- `/` home, with a section for each page
- `/about`
- `/services`
- `/accessories`
- `/contacts`
- `/login` and `/signup`, which save and send nothing, because accounts need a database. Log in goes straight in with no password
- `/appointments`, the customer area: bookings, past visits and an accessories shop with a cart that can be added to a visit. Bookings and the cart stay in that browser

Prices, products, stock and the demo customer are invented for the demo and live in `src/lib/demo-data.ts`. Every page that shows them says so.

## Run it

```bash
npm install
npm run dev
```

Node 20 or newer is required. Next.js uses port 3000 by default. To pick another port, run `npx next dev -p 3120`.

## Test on a phone

Connect the phone to the same Wi-Fi as the computer, then run:

```bash
npm run build
npx next start -H 0.0.0.0 -p 3121
```

Open `http://<computer's IP address>:3121` on the phone. On Windows, allow Node through the firewall on private networks when asked.

## Before going live

- Get the owner's approval for the photos, reviews and wording.
- Replace `src/lib/shop-data.ts` and `src/lib/google-snapshot.ts` with a database and CMS.
- Add `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` for a live rating. See `.env.example`.
- Set the final domain in `src/lib/site.ts`.
- Build real accounts behind `/login` and `/signup`, with a privacy notice for the details they collect, and protect `/appointments`, which is open to anyone until then.
- Save bookings in the database so they reach the shop, and set the real booking rules.

The copied rating and reviews in `src/lib/google-snapshot.ts` do not update themselves. Refresh them, or add the API key.

## Stack

Next.js 16, React 19, TypeScript and Tailwind CSS 4.

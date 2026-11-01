# MAC Automotive Performance

A sample website for MAC Automotive Performance, a car repair and accessories shop on Gordon Ave, Olongapo City. It was built to show the shop's owner what a new site could look like.

The content is real. The phone numbers, hours, services, accessories, photos and reviews come from the shop's sign, macperformance.ph and its Google Maps listing.

## Pages

- `/` home, with a section for each page
- `/about`
- `/services`
- `/accessories`
- `/contacts`

## Run it

```bash
npm install
npm run dev
```

Node 20 or newer is required. Next.js uses port 3000 by default. To pick another port, run `npx next dev -p 3120`.

## Before going live

- Get the owner's approval for the photos, reviews and wording.
- Replace `src/lib/shop-data.ts` and `src/lib/google-snapshot.ts` with a database and CMS.
- Add `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` for a live rating. See `.env.example`.
- Set the final domain in `src/lib/site.ts`.

The copied rating and reviews in `src/lib/google-snapshot.ts` do not update themselves. Refresh them, or add the API key.

## Stack

Next.js 16, React 19, TypeScript and Tailwind CSS 4.

# VisionCare Eye Clinic

Patient website for an ophthalmology clinic. Next.js App Router, React 19, TypeScript, and Tailwind CSS. Clinic facts, doctors, and services come from typed local data. Articles come from WordPress when it is configured. There is no custom database in this project.

Replace the demonstration brand, sample doctors, and empty contact fields before publication.

## Requirements

- Node.js 20.9 or newer
- npm

## Setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript without emitting files |

Set `NEXT_PUBLIC_SITE_URL` before a production build so canonical URLs and the sitemap use the public origin. Without it, Next.js falls back to `http://localhost:3000` for social images.

## Environment variables

Copy `.env.example`. Do not commit `.env.local`.

| Variable | Where it is read | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Metadata, sitemap, robots | Public site origin, such as `https://www.example.com` |
| `NEXT_PUBLIC_API_BASE_URL` | Server data providers | Future ASP.NET Core API origin. Leave empty until that API exists. |
| `DATA_PROVIDER` | Server data providers | `local` (default) or `aspnet` |
| `FORM_ENDPOINT` | Server only, `POST /api/contact` | Contact form delivery URL, such as Formspree. Never prefix with `NEXT_PUBLIC_`. |
| `SCHEDULING_EMBED_URL` | Server only, appointment page | Optional `https` scheduling embed |
| `WORDPRESS_GRAPHQL_URL` | Server only | WPGraphQL endpoint. Used when set. |
| `WORDPRESS_REST_API_URL` | Server only | REST fallback, usually `https://example.com/wp-json/wp/v2` |
| `WORDPRESS_SITE_URL` | Server only | Public WordPress origin for links and images |

Formspree, WhatsApp, and WordPress are not active until their environment values are set. The contact map stays hidden until real clinic coordinates are added in `siteConfig.map`. The site stays usable when they are empty.

## Clinic details

Edit `src/config/site-config.ts`.

- `contact.phone` — digits used for click-to-call, for example `9779800000000`
- `contact.phoneDisplay` — the number shown to patients
- `contact.whatsapp` — international number without `+` or spaces, for example `9779800000000`
- `contact.email`, `address`, `city`, `country`
- `hours` and `hoursConfirmed` — set `hoursConfirmed` to `true` only after the clinic confirms the schedule. Until then the site labels the hours as a sample.
- `logo` — set `{ src, alt }` when a logo file is added under `public/`. `null` keeps the built-in mark.
- `features.showSampleTestimonials` — set to `false` before publication, or replace `src/data/testimonials.ts` with reviews the clinic has permission to publish.

Empty phone, email, WhatsApp, address, and social fields render as “to be added”. They are not filled with invented details.

## Map

The contact page uses a reusable OpenStreetMap map (`src/components/map/ClinicMap.tsx`) loaded with Leaflet on the client only. Tiles load as the visitor pans or zooms. They are not preloaded or bulk-downloaded. The map shows the OpenStreetMap contributors credit.

In `siteConfig.map.locations`, each branch has its own name, address, phone, email, directions link, and coordinates:

- `latitude` and `longitude` — that door’s real coordinates. Leave both `null` until they are confirmed. The address still appears, without a pin. Do not use a city centre, a ward centre, or an approximate point.
- `directionsUrl` — optional `https` link for Get Directions. If empty and coordinates exist, the button opens Google Maps directions to those coordinates.
- `mapTileProvider` — label for the tile source. The default is `openstreetmap`.
- `mapTileUrl` — `https` tile template containing `{z}`, `{x}`, and `{y}`. The default is `https://tile.openstreetmap.org/{z}/{x}/{y}.png`.
- `mapTileAttribution` — visible credit for the tile provider. Change this when you change `mapTileUrl`.

When two or more locations have coordinates, the map frames all of them. `contact.directionsUrl` still overrides the single directions button outside the map.

## WhatsApp appointment enquiries

1. Set `contact.whatsapp` in `src/config/site-config.ts`.
2. The appointment form validates the enquiry, then opens `https://wa.me/<number>?text=...` with a URL-encoded message.
3. The page states that the clinic must confirm availability. It does not describe the enquiry as a booked appointment.
4. Until the number is set, the form explains that WhatsApp is not configured and does not pretend to send anything.
5. Patient details are not stored in `localStorage`.

The same helpers in `src/lib/contact-links.ts` build WhatsApp, phone, and email links for the header, footer, and contact page.

## Social profiles

Set full `https://` URLs in `siteConfig.social` (`facebook`, `instagram`, `youtube`, `linkedin`, `tiktok`). The WhatsApp icon uses `contact.whatsapp`, not a separate page URL. Empty values are omitted. Icons are not hardcoded in the footer or contact page.

## Theme

Colors are CSS variables in `src/styles/themes.css`. Components use semantic utilities such as `bg-action`, `text-foreground`, and `bg-footer`.

1. Change `themeConfig.active` in `src/config/theme-config.ts`. `warm` is the default. `clinical-blue` is included.
2. To add a theme, add a `[data-theme="name"]` block in `themes.css` and a matching entry in `theme-config.ts`.
3. Do not put hex colors in page components.

`#E66A35` is the decorative primary. Button and link text uses the darker `--action` token (`#C44718` on the warm theme) so text on white meets WCAG 2.2 AA contrast.

## Doctors

Edit `src/data/doctors.ts`. The UI reads doctors through `src/services/doctors/doctor-service.ts`, not from the data file directly.

- Set `isSample` to `false` only for a real clinician.
- Put verified qualifications in `qualifications`. Sample profiles use placeholder text.
- Leave `registration`, `experienceYears`, and `schedule` as `null` until the clinic verifies them. Physician structured data is emitted only when `isSample` is `false`.
- Set `isActive` to `false` to hide a profile.
- Add a portrait under `public/images` and point `image` and `imageAlt` at it.
- `slug` is the profile URL: `/doctors/<slug>`.

## Services

Edit `src/data/services.ts`. Set `isActive` to `false` for any treatment the clinic does not provide. That removes it from navigation, the directory, and the sitemap. Each page is educational and tells patients it is not a personal diagnosis.

Required demonstration routes:

- `/services/comprehensive-eye-examination`
- `/services/cataract-treatment`
- `/services/glaucoma-care`
- `/services/retina-care`
- `/services/pediatric-eye-care`
- `/services/lasik-vision-correction`
- `/services/cornea-care`
- `/services/dry-eye-care`

`/services/contact-lens-optical` is also included. New icons need a name in `ServiceIconName` and a matching icon in `src/components/shared/ServiceIcon.tsx`.

## Facilities

Edit `src/data/facilities.ts`. `confirmed: false` keeps the “Pending confirmation” label. Set it to `true` only for equipment the clinic actually has, and replace the illustrative photographs.

## FAQs and patient guide

- FAQs: `src/data/faqs.ts`
- Patient guide sections: `src/data/patient-guide.ts`
- Policy copy: `src/data/policies.ts` — have the clinic review the privacy, terms, and disclaimer text before publication.

## WordPress

WordPress is used only for the blog. Editors publish in WordPress. This app does not need a code change for a new article.

1. Install WordPress and either WPGraphQL or leave the REST API enabled.
2. Prefer GraphQL: set `WORDPRESS_GRAPHQL_URL` to the WPGraphQL endpoint, often `https://cms.example.com/graphql`.
3. Otherwise set `WORDPRESS_REST_API_URL` to `https://cms.example.com/wp-json/wp/v2`.
4. Set `WORDPRESS_SITE_URL` to the public WordPress origin.
5. Publish posts with a featured image, excerpt, category, and author. A string in REST post meta `medical_reviewer` is shown as the medical reviewer. Yoast title and description are used when present.
6. Restart the Next.js server after changing environment variables.

If the CMS is missing or the request fails, `/blog` shows a fallback and a retry link. Other pages keep working. Article HTML is sanitized before render. Credentials are not sent to the browser.

Article pages are `/blog/<slug>`.

## Deployment

The app is a standard Next.js project and does not assume a host in code.

1. Set the environment variables on the host, including `NEXT_PUBLIC_SITE_URL`.
2. `npm run build` (uses webpack so Tailwind’s PostCSS step does not depend on Turbopack’s local worker process)
3. `npm start`, or connect the repository to a Next.js host such as Vercel.

`cacheComponents` is enabled. Blog fetches are cached for about an hour. Clinic pages are static until the next build.

## Future ASP.NET Core API

UI components call service functions, not static arrays or HTTP URLs.

| Concern | Entry point | Local source today | Future route |
| --- | --- | --- | --- |
| Doctors | `src/services/doctors/doctor-service.ts` | `src/data/doctors.ts` | `GET /api/doctors`, `GET /api/doctors/{slug}` |
| Services | `src/services/clinic-services/service-service.ts` | `src/data/services.ts` | `GET /api/services`, `GET /api/services/{slug}` |
| Appointments | `src/services/appointments/appointment-actions.ts` | WhatsApp link | `POST /api/appointments` |

To switch:

1. Implement those routes so they return the `Doctor` and `ClinicService` shapes in `src/types`.
2. `POST /api/appointments` accepts an `AppointmentRequest` and returns `{ "id": "..." }`. The website still tells the patient the visit is not confirmed.
3. Set `NEXT_PUBLIC_API_BASE_URL` to the API origin and `DATA_PROVIDER=aspnet`.
4. Both values are required. If either is missing, the site stays on local data and WhatsApp.

Blog content stays on WordPress. Do not add a database only to proxy articles.

## Pages

`/`, `/about`, `/doctors`, `/doctors/[slug]`, `/services`, `/services/[slug]`, `/facilities`, `/patient-guide`, `/blog`, `/blog/[slug]`, `/faqs`, `/contact`, `/appointment`, `/privacy-policy`, `/terms-and-conditions`, `/medical-disclaimer`, `/accessibility`, plus a branded 404, `sitemap.xml`, and `robots.txt`.

## Project layout

```text
src/
  app/                 routes, sitemap, robots, contact API
  components/          layout, pages, and shared UI
  config/              site, theme, navigation
  data/                local doctors, services, FAQs, facilities
  services/            provider interfaces and API client
  lib/wordpress/       WordPress client, queries, sanitizing
  lib/seo/             metadata and JSON-LD
  styles/              globals.css and themes.css
  types/               Doctor, ClinicService, and content types
public/images/         illustrative photographs, not this clinic
```

Photographs in `public/images` are stock images. Captions say they are not this clinic. Replace them before launch.

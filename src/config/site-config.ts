export interface MapLocation {
  id: string;
  label: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  directionsUrl: string;
}

export interface DayHours {
  day: string;
  opens: string | null;
  closes: string | null;
  closed: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  logo: {
    src: string;
    alt: string;
  } | null;
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    country: string;
    directionsUrl: string;
  };
  map: {
    mapTileProvider: string;
    mapTileUrl: string;
    mapTileAttribution: string;
    locations: MapLocation[];
  };
  hours: DayHours[];
  hoursConfirmed: boolean;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    tiktok: string;
    whatsapp: string;
  };
  features: {
    showSampleTestimonials: boolean;
  };
}

/**
 * Replace empty strings with the clinic's verified details.
 * Do not put secrets in this file. Form and WordPress credentials stay in environment variables.
 */
export const siteConfig: SiteConfig = {
  name: "TriNetra Netralaya",
  shortName: "TriNetra",
  tagline: "Better Vision. Brighter Everyday.",
  description:
    "TriNetra Netralaya provides comprehensive eye examinations, patient education, and guidance for common eye conditions for people of all ages.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  locale: "en",
  logo: null,
  contact: {
    phone: "+9779768862742",
    phoneDisplay: "9768862742",
    whatsapp: "9779868984602",
    email: "netralayatrinetra14@gmail.com",
    address: "G Line, Birendra Chowk, Shivnagar, Tulsipur Ward 5",
    city: "Tulsipur, Dang",
    country: "Nepal",
    directionsUrl: "",
  },
  /**
   * Leave a location's latitude and longitude null until that door is confirmed.
   * A missing pin is shown as an address instead of a guessed point.
   * Change mapTileUrl and mapTileAttribution together if the tile provider changes.
   */
  map: {
    mapTileProvider: "openstreetmap",
    mapTileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    mapTileAttribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    locations: [
      {
        id: "tulsipur",
        label: "Tulsipur",
        name: "TriNetra Netralaya Aakhaa Upachaar Kendra",
        address: "G Line, Birendra Chowk, Shivnagar, Tulsipur Ward 5, Tulsipur, Dang 22412, Nepal",
        latitude: 28.1323814,
        longitude: 82.2985306,
        phone: "9768862742",
        email: "netralayatrinetra14@gmail.com",
        directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=28.1323814,82.2985306",
      },
      {
        id: "ghorahi",
        label: "Ghorahi",
        name: "TriNetra Netralaya Aakhaa Upachaar Kendra",
        address: "Ghorahi 15, Sadaka Bhibhag Road, Dang, Nepal",
        latitude: null,
        longitude: null,
        phone: "",
        email: "netralayatrinetra14@gmail.com",
        directionsUrl:
          "https://www.google.com/maps/search/?api=1&query=Ghorahi%2015%2C%20Sadaka%20Bhibhag%20Road%2C%20Dang%2C%20Nepal",
      },
    ],
  },
  hoursConfirmed: false,
  hours: [
    { day: "Sunday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Monday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Tuesday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Wednesday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Thursday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Friday", opens: "09:00", closes: "17:00", closed: false },
    { day: "Saturday", opens: null, closes: null, closed: true },
  ],
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    tiktok: "",
    whatsapp: "",
  },
  features: {
    showSampleTestimonials: false,
  },
};

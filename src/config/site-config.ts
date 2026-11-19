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
    latitude: number | null;
    longitude: number | null;
    address: string;
    clinicName: string;
    googleMapsDirectionsUrl: string;
    mapTileProvider: string;
    mapTileUrl: string;
    mapTileAttribution: string;
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
  name: "VisionCare Eye Clinic",
  shortName: "VisionCare",
  tagline: "Better Vision. Brighter Everyday.",
  description:
    "VisionCare Eye Clinic provides comprehensive eye examinations, patient education, and guidance for common eye conditions for people of all ages.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  locale: "en",
  logo: null,
  contact: {
    phone: "",
    phoneDisplay: "",
    whatsapp: "",
    email: "",
    address: "G Line, Birendra Chowk, Shivnagar, Tulsipur Ward 5",
    city: "Tulsipur, Dang",
    country: "Nepal",
    directionsUrl: "",
  },
  /**
   * Leave latitude and longitude null until the clinic confirms its real coordinates.
   * An empty map is shown instead of an approximate or invented pin.
   * map.address and map.clinicName override the contact address and site name on the marker when set.
   * Change mapTileUrl and mapTileAttribution together if the tile provider changes.
   */
  map: {
    latitude: 28.1323814,
    longitude: 82.2985306,
    address: "G Line, Birendra Chowk, Shivnagar, Tulsipur Ward 5, Tulsipur, Dang 22412, Nepal",
    clinicName: "",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=28.1323814,82.2985306",
    mapTileProvider: "openstreetmap",
    mapTileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    mapTileAttribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
    showSampleTestimonials: true,
  },
};

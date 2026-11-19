/**
 * Theme selection. Runtime colors live in src/styles/themes.css.
 * Change `active` to switch the site. Page components read semantic tokens only.
 */
export const themeConfig = {
  active: "warm",
  themes: {
    warm: {
      label: "Modern Warm",
      description: "Terracotta, cream, and deep navy. The default clinic theme.",
      colors: {
        primary: "#E66A35",
        primaryHover: "#C95426",
        secondary: "#F4A261",
        background: "#FFF9F3",
        backgroundSecondary: "#F9EFE5",
        surface: "#FFFFFF",
        foreground: "#18324B",
        muted: "#66717B",
        border: "#EADFD5",
        action: "#C44718",
        success: "#21865B",
        footer: "#182F45",
      },
    },
    "clinical-blue": {
      label: "Clinical Blue",
      description: "A calmer blue alternative that uses the same semantic tokens.",
      colors: {
        primary: "#2B7CB5",
        primaryHover: "#1D6394",
        secondary: "#7EB6D9",
        background: "#F4F8FB",
        backgroundSecondary: "#E7F0F7",
        surface: "#FFFFFF",
        foreground: "#16324A",
        muted: "#5C6B78",
        border: "#D5E2EC",
        action: "#185C8A",
        success: "#1F7A4D",
        footer: "#10283A",
      },
    },
  },
} as const;

export type ThemeName = keyof typeof themeConfig.themes;

export function getActiveTheme() {
  return themeConfig.themes[themeConfig.active as ThemeName];
}

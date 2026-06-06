export const STORAGE_THEME = "theme-id";
export const STORAGE_MODE = "theme-mode";
export const LEGACY_MODE = "theme";

export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const THEME_META = [
  {
    id: "signal-flow",
    label: "Signal Flow",
    tagline: "Electric cyan on slate · the signal chain",
    swatch: { primary: "#00B7FF", secondary: "#ff6f69", background: "#151a1e" },
    supportsModes: true,
    defaultMode: "dark",
  },
  {
    id: "reel-to-reel",
    label: "Reel-to-Reel",
    tagline: "Amber on near-black · Swiss grid",
    swatch: { primary: "#ffc24b", secondary: "#eceae3", background: "#0c0d10" },
    supportsModes: false,
    defaultMode: "dark",
  },
] as const;

export type ThemeId = (typeof THEME_META)[number]["id"];
export type ThemeMode = "light" | "dark";

export const DEFAULT_THEME_ID: ThemeId = THEME_META[0].id;
export const THEME_IDS = THEME_META.map((theme) => theme.id);

export const LEGACY_THEME_IDS: Record<string, ThemeId> = {
  default: "signal-flow",
  editorial: "reel-to-reel",
};

const themeMetaById = new Map(THEME_META.map((theme) => [theme.id, theme]));

export function getThemeMeta(id?: string | null) {
  return themeMetaById.get(normalizeThemeId(id)) as (typeof THEME_META)[number];
}

export function normalizeThemeId(id?: string | null): ThemeId {
  const mapped = (id && LEGACY_THEME_IDS[id]) || id;
  return themeMetaById.has(mapped as ThemeId) ? (mapped as ThemeId) : DEFAULT_THEME_ID;
}

export function normalizeThemeMode(
  themeId?: string | null,
  mode?: string | null,
  fallbackMode: ThemeMode = "dark"
): ThemeMode {
  const theme = getThemeMeta(themeId);

  if (theme.supportsModes === false) {
    return theme.defaultMode;
  }

  if (mode === "light" || mode === "dark") {
    return mode;
  }

  return fallbackMode === "light" ? "light" : "dark";
}

export function resolveThemePreference(
  themeId?: string | null,
  mode?: string | null,
  fallbackMode: ThemeMode = "dark"
) {
  const id = normalizeThemeId(themeId);
  return {
    themeId: id,
    mode: normalizeThemeMode(id, mode, fallbackMode),
  };
}

import { defineAsyncComponent } from "vue";
import type { AsyncComponentLoader, Component } from "vue";
import defaultTheme from "./default/manifest";

/**
 * A theme bundles a set of design tokens (see each theme's `tokens.scss`) with a
 * map of Vue components keyed by a stable name. Switching theme swaps both the
 * tokens (via the `data-theme` / `data-mode` attributes on <html>) and the
 * rendered component for each name. Any component a theme does not provide falls
 * back to the default theme, so a new theme only needs to ship what differs.
 */
export interface ThemeManifest {
  /** Stable id used in the `data-theme` attribute and persisted to localStorage. */
  id: string;
  /** Human-readable name shown in the theme switcher. */
  label: string;
  /** Whether this theme offers a light/dark toggle. */
  supportsModes: boolean;
  /** Mode applied when this theme does not support toggling. */
  defaultMode: "light" | "dark";
  /** Name → lazy component loader. Names are referenced by <Themed name="…" />. */
  components: Record<string, AsyncComponentLoader>;
}

// Register themes here. Order defines the cycle order of the theme switcher.
// To add a theme: create themes/<id>/, import its manifest, and add it below.
export const themes: ThemeManifest[] = [defaultTheme];

export const DEFAULT_THEME_ID = "default";

const byId = new Map(themes.map((t) => [t.id, t]));

/** Returns the manifest for `id`, falling back to the default theme. */
export function getTheme(id?: string | null): ThemeManifest {
  return (id && byId.get(id)) || (byId.get(DEFAULT_THEME_ID) as ThemeManifest);
}

export function getThemeIds(): string[] {
  return themes.map((t) => t.id);
}

/** The next theme id in cycle order, wrapping around to the first. */
export function nextThemeId(id: string): string {
  const ids = getThemeIds();
  const i = ids.indexOf(id);
  return ids[(i + 1) % ids.length];
}

// Async components are cached per theme+name so repeated resolves return a stable
// reference (avoids re-loading / losing state when the active theme is unchanged).
const componentCache = new Map<string, Component | null>();

/**
 * Resolves the component registered under `name` for the active theme, falling
 * back to the default theme. Returns null when neither provides it.
 */
export function resolveThemedComponent(themeId: string, name: string): Component | null {
  const key = `${themeId}:${name}`;
  const cached = componentCache.get(key);
  if (cached !== undefined) return cached;

  const loader = getTheme(themeId).components[name] || getTheme(DEFAULT_THEME_ID).components[name];
  const resolved = loader ? defineAsyncComponent(loader) : null;
  componentCache.set(key, resolved);
  return resolved;
}

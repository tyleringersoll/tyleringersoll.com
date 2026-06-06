import type { Component } from "vue";
import signalFlowTheme from "./signal-flow/manifest";
import reelToReelTheme from "./reel-to-reel/manifest";
import { DEFAULT_THEME_ID, THEME_IDS } from "./meta";

export { DEFAULT_THEME_ID } from "./meta";

/**
 * A theme bundles a set of design tokens (see each theme's `tokens.scss`) with a
 * map of Vue components keyed by a stable name. Switching theme swaps both the
 * tokens (via the `data-theme` / `data-mode` attributes on <html>) and the
 * rendered component for each name. Any component a theme does not provide falls
 * back to the default theme, so a new theme only needs to ship what differs.
 *
 * Components are imported eagerly (not lazily). The site swaps entire component
 * trees at runtime; resolving synchronously means a theme change is an instant,
 * reliable component swap with no async loading gap that would otherwise flash the
 * view blank. With only a couple of small themes the bundle cost is negligible.
 */
/** Three representative colors (raw hex) for a theme's mini swatch in the UI. */
export interface ThemeSwatch {
  primary: string;
  secondary: string;
  background: string;
}

export interface ThemeManifest {
  /** Stable id used in the `data-theme` attribute and persisted to localStorage. */
  id: string;
  /** Human-readable name shown in the theme switcher / drawer / palette. */
  label: string;
  /** One-line descriptor shown under the label in the customize drawer. */
  tagline: string;
  /** Representative colors for the drawer/palette swatch preview. */
  swatch: ThemeSwatch;
  /** Whether this theme offers a light/dark toggle. */
  supportsModes: boolean;
  /** Mode applied when this theme does not support toggling. */
  defaultMode: "light" | "dark";
  /** Name → component. Names are referenced by <Themed name="…" />. */
  components: Record<string, Component>;
}

// Register themes here. Order defines the cycle order of the theme switcher.
// To add a theme: create themes/<id>/, import its manifest, and add it below.
export const themes: ThemeManifest[] = [signalFlowTheme, reelToReelTheme];

const byId = new Map(themes.map((t) => [t.id, t]));

/** Returns the manifest for `id`, falling back to the default theme. */
export function getTheme(id?: string | null): ThemeManifest {
  return (id && byId.get(id)) || (byId.get(DEFAULT_THEME_ID) as ThemeManifest);
}

export function getThemeIds(): string[] {
  return [...THEME_IDS];
}

/** The next theme id in cycle order, wrapping around to the first. */
export function nextThemeId(id: string): string {
  const ids = getThemeIds();
  const i = ids.indexOf(id);
  return ids[(i + 1) % ids.length];
}

/**
 * Resolves the component registered under `name` for the active theme, falling
 * back to the default theme. Returns null when neither provides it.
 */
export function resolveThemedComponent(themeId: string, name: string): Component | null {
  return (
    getTheme(themeId).components[name] ||
    getTheme(DEFAULT_THEME_ID).components[name] ||
    null
  );
}

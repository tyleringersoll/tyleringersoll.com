import { expect, userEvent, within, waitFor } from "storybook/test";
import Appearance from "./Appearance.vue";
export default {
  title: "Patterns/Appearance",
  component: Appearance,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { height: "680px" },
      description: {
        component:
          "The drawer exposes themes, supported color modes, and live tokens. The searchable command palette is an alternate entry point. The shared UI store keeps the two overlays mutually exclusive. Both trap focus and close with Escape. Preview-only buttons below make these behaviors easy to discover.",
      },
    },
  },
};
export const Playground = {};
export const Drawer = {
  args: { palette: false },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(
      c.getByRole("button", { name: "Open appearance drawer" }),
    );
    await waitFor(() =>
      expect(
        c.getByRole("dialog", { name: "Customize appearance" }),
      ).toBeVisible(),
    );
  },
};
export const LightDrawer = {
  ...Drawer,
  globals: { appearance: "signal-flow:light" },
};
export const EditorialDrawer = {
  ...Drawer,
  globals: { appearance: "reel-to-reel:dark" },
};
export const CommandPalette = {
  args: { drawer: false },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(
      c.getByRole("button", { name: "Search available themes" }),
    );
    await expect(
      c.getByRole("combobox", { name: "Search themes" }),
    ).toHaveFocus();
  },
};
export const SearchNoResults = {
  args: { drawer: false },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(
      c.getByRole("button", { name: "Search available themes" }),
    );
    await userEvent.type(
      c.getByRole("combobox", { name: "Search themes" }),
      "not-a-theme",
    );
    await expect(c.getByText("No themes match “not-a-theme”.")).toBeVisible();
  },
};
export const SearchAndSelect = {
  globals: { appearance: "signal-flow:dark" },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(
      c.getByRole("button", { name: "Search available themes" }),
    );
    await userEvent.type(
      c.getByRole("combobox", { name: "Search themes" }),
      "reel",
    );
    await expect(c.getAllByRole("option")).toHaveLength(1);
    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(c.getByRole("heading", { name: "Reel-to-Reel" })).toBeVisible(),
    );
    await expect(c.queryByRole("dialog")).not.toBeInTheDocument();
  },
};
export const EscapeRestoresFocus = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const opener = c.getByRole("button", { name: "Search available themes" });
    await userEvent.click(opener);
    await expect(c.getByRole("combobox")).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(opener).toHaveFocus());
  },
};

import { expect, userEvent, within, waitFor } from "storybook/test";
import MobileNav from "../../components/MobileNav.vue";
import data from "../../data/content";
export default {
  title: "Patterns/Mobile navigation",
  component: MobileNav,
  tags: ["autodocs"],
  args: { content: data.content.navigation },
  globals: { viewport: { value: "iphone12", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The real mobile navigation overlay. Docs examples use a 390px iframe; Canvas opens with a phone viewport. The production breakpoint is 768px; the control deliberately disappears on wider screens. The menu supports Escape, traps Tab within the dialog, and restores focus to its trigger on dismissal.",
      },
      story: { height: "700px" },
    },
  },
  render: (args) => ({
    components: { MobileNav },
    setup: () => ({ args }),
    template:
      '<div style="min-height:650px;padding:24px"><MobileNav v-bind="args"/><h1 style="margin-top:80px">Navigation on a small screen</h1><p>Open the menu, then try Tab and Escape.</p></div>',
  }),
};
export const Closed = {};
export const Open = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", {
        name: "Open mobile navigation",
      }),
    );
    await waitFor(() =>
      expect(
        within(canvasElement).getByRole("dialog", { name: "Navigation menu" }),
      ).toBeVisible(),
    );
  },
};
export const KeyboardDismissal = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const trigger = c.getByRole("button", { name: "Open mobile navigation" });
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(c.getByRole("dialog", { name: "Navigation menu" })).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(c.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};

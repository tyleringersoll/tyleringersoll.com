import { expect, userEvent, within } from "storybook/test";
import ThemeToggle from "../../components/ThemeToggle.vue";
export default {
  title: "Components/Theme toggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A light/dark toggle backed by the theme store. Its accessible name describes the next action. The production header hides this control when the theme has only one mode; Reel-to-Reel does not support light mode.",
      },
    },
  },
};
export const Dark = { globals: { appearance: "signal-flow:dark" } };
export const Light = { globals: { appearance: "signal-flow:light" } };
export const ToggleTwice = {
  globals: { appearance: "signal-flow:dark" },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(
      c.getByRole("button", { name: "Switch to light mode" }),
    );
    await expect(
      c.getByRole("button", { name: "Switch to dark mode" }),
    ).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(
      c.getByRole("button", { name: "Switch to dark mode" }),
    );
    await expect(
      c.getByRole("button", { name: "Switch to light mode" }),
    ).toHaveAttribute("aria-pressed", "false");
  },
};

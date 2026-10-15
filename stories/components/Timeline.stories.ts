import { ref, watch } from "vue";
import { expect, userEvent, within, waitFor } from "storybook/test";
import Timeline from "../../components/Timeline.vue";
import TimelineItem from "../../components/TimelineItem.vue";
export default {
  title: "Components/Timeline",
  component: TimelineItem,
  subcomponents: { Timeline },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Timeline supplies the shared grid. TimelineItem displays a date, heading, and slot. Expansion is controlled by the parent: the item emits toggle and never mutates its expanded prop. Collapsed content is both aria-hidden and inert, so links inside it leave the tab order.",
      },
    },
  },
  args: {
    dates: "2025 – Present",
    title: "Engineering Manager",
    titleTag: "h2",
    expandable: true,
    expanded: false,
  },
  argTypes: {
    titleTag: {
      control: "select",
      options: ["h2", "h3", "h4"],
      description: "Choose for the surrounding heading hierarchy.",
    },
    titleId: { description: "Optional stable anchor for deep links." },
    expandable: {
      description:
        "Adds button semantics, Enter/Space handling, and a disclosure icon.",
    },
    expanded: {
      description: "Parent-owned open state; toggle requests a change.",
    },
    onToggle: { action: "toggle" },
  },
  render: (args) => ({
    components: { Timeline, TimelineItem },
    setup() {
      const expanded = ref(args.expanded);
      watch(
        () => args.expanded,
        (v) => (expanded.value = v),
      );
      return {
        args,
        expanded,
        toggle: () => {
          expanded.value = !expanded.value;
          args.onToggle?.();
        },
      };
    },
    template:
      '<div class="specimen"><Timeline><TimelineItem v-bind="args" :expanded="expanded" @toggle="toggle"><p>I lead a frontend engineer and two backend engineers. I help keep priorities clear and projects balanced.</p><a href="/resume">Read the full resume</a></TimelineItem></Timeline></div>',
  }),
};
export const Collapsed = {};
export const Expanded = { args: { expanded: true } };
export const AlwaysVisible = { args: { expandable: false } };
export const LongTitle = {
  args: {
    title: "A longer role title that needs room to wrap on a narrow screen",
    expanded: true,
  },
};
export const KeyboardInteraction = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(() =>
      expect(
        canvas.getByRole("link", { name: "Read the full resume" }),
      ).toBeVisible(),
    );
    await userEvent.keyboard(" ");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story:
          "The play function verifies Enter opens the disclosure, its link becomes accessible, and Space closes it again. Open the Interactions panel to inspect each assertion.",
      },
    },
  },
};

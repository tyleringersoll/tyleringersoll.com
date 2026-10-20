import ThemeSwatch from "../../components/ThemeSwatch.vue";
import { THEME_META } from "../../themes/meta";

export default {
  title: "Components/Theme swatch",
  component: ThemeSwatch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A decorative preview of a theme’s primary, secondary, and background colors. The swatch is hidden from assistive technology; place a visible theme name beside it. Values below come from the theme registry.",
      },
    },
  },
  argTypes: {
    swatch: {
      description: "Three CSS colors: primary, secondary, background.",
      control: "object",
    },
  },
  render: (args) => ({
    components: { ThemeSwatch },
    setup: () => ({ args }),
    template:
      '<div style="display:flex;gap:16px;align-items:center"><ThemeSwatch v-bind="args"/><span>Theme preview</span></div>',
  }),
};
export const SignalFlow = { args: { swatch: THEME_META[0].swatch } };
export const ReelToReel = { args: { swatch: THEME_META[1].swatch } };

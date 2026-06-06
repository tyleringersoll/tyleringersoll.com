import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ThemeSwatch from "~/components/ThemeSwatch.vue";

describe("ThemeSwatch", () => {
  it("renders the theme's background, primary, and secondary colors", () => {
    const wrapper = mount(ThemeSwatch, {
      props: {
        swatch: {
          background: "#111111",
          primary: "#22ccff",
          secondary: "#ff8866",
        },
      },
    });

    const colors = wrapper.findAll(".theme-swatch span").map((span) => {
      return span.attributes("style") || "";
    });

    expect(colors[0]).toMatch(/background:\s*(#111111|rgb\(17,\s*17,\s*17\))/);
    expect(colors[1]).toMatch(/background:\s*(#22ccff|rgb\(34,\s*204,\s*255\))/);
    expect(colors[2]).toMatch(/background:\s*(#ff8866|rgb\(255,\s*136,\s*102\))/);
  });
});

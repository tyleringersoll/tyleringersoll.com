import Article from "../../components/Article.vue";
export default {
  title: "Components/Article",
  component: Article,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Content renderer used by resume and architecture sections. It accepts authored HTML from data/content.js, a heading level, paragraphs, and an optional call to action. This is a trusted-content boundary: never pass unsanitized user input. Use the slot for richer markup rather than putting an entire layout in a string.",
      },
    },
  },
  argTypes: {
    article: {
      control: "object",
      description:
        "Content object: heading, headingLevel (2–5), subheading, content (HTML strings), contentStyle, and cta {label, url, external?}.",
    },
    index: {
      control: "number",
      description:
        "Use 0 when this is the first article and its heading should receive first-heading styling.",
    },
  },
  decorators: [
    () => ({
      template: '<div style="max-width:720px;margin:24px auto"><story/></div>',
    }),
  ],
};
export const Paragraphs = {
  args: {
    article: {
      heading: "Keeping the work manageable",
      headingLevel: 2,
      content: [
        "I lead three engineers: one frontend and two backend.",
        "A big part of the job is keeping priorities clear and balancing projects so the team has room to do the work.",
      ],
    },
  },
};
export const Subheading = {
  args: {
    article: {
      heading: "Engineering Manager",
      headingLevel: 2,
      subheading: "Best Egg",
      content: [
        "Frontend delivery, team priorities, and a sustainable project balance.",
      ],
    },
  },
};
export const InlineSkills = {
  args: {
    article: {
      heading: "Tools I work with",
      headingLevel: 2,
      contentStyle: "inline",
      content: ["Vue", "Nuxt", "TypeScript", "Sass", "Vitest"],
    },
  },
};
export const InternalLink = {
  args: {
    article: {
      heading: "The implementation",
      headingLevel: 2,
      content: ["Read the architecture notes for the full context."],
      cta: { label: "Site architecture", url: "/architecture" },
    },
  },
};
export const ExternalLink = {
  args: {
    article: {
      heading: "Source code",
      headingLevel: 2,
      content: ["The source is available on GitHub."],
      cta: {
        label: "View the repository",
        url: "https://github.com/tyleringersoll/ingersoll.dev",
      },
    },
  },
};
export const LongContent = {
  args: {
    article: {
      heading:
        "A longer heading should wrap without losing its place in the document",
      headingLevel: 2,
      content: [
        "A component needs to work with the content it will actually receive. This example adds enough text to check measure, line height, and spacing on narrow screens.",
        "<strong>Check the details:</strong> keyboard focus, link wrapping, and the gap between paragraphs.",
        "<ul><li>One clear responsibility.</li><li>Useful defaults and explicit exceptions.</li><li>Room for the content to grow.</li></ul>",
      ],
    },
  },
};
export const Empty = {
  args: { article: {} },
  parameters: {
    docs: {
      description: {
        story:
          "No heading, content, or CTA renders when the content object is empty. The article wrapper remains; the caller decides whether to omit an empty section.",
      },
    },
  },
};

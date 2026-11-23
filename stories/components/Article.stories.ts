import Article from "../../components/Article.vue";
import data from "../../data/content";

const currentEmployer = data.content.resume.find((entry) => entry.roles?.length);
const currentRole = currentEmployer.roles[0];

export default {
  title: "Components/Article",
  component: Article,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Content renderer used for supporting resume sections and catch-all content pages. The architecture page has its own section layout. Article accepts authored HTML, a heading level, paragraphs, and an optional call to action. Personal details in these examples come from data/content.js. Use the slot for richer markup, and sanitize any untrusted HTML before passing it in.",
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
      heading: data.content.home.hero.heading,
      headingLevel: 2,
      content: data.content.home.hero.paragraphs,
    },
  },
};
export const Subheading = {
  args: {
    article: {
      heading: currentRole.subheading.split(" · ")[0],
      headingLevel: 2,
      subheading: currentEmployer.heading,
      content: [currentRole.content[0]],
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
        url: "https://github.com/tyleringersoll/tyleringersoll.com",
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

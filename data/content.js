export default {
  content: {
    meta: {
      name: "Tyler Ingersoll"
    },
    navigation: [
      { name: "Home", url: "/" },
      { name: "Resume", url: "/resume" },
      { name: "Site Architecture", url: "/architecture" }
    ],
    home: {
      hero: {
        heading: "Hi, I’m Tyler",
        paragraphs: [
          "I’m an engineering manager at Best Egg. My team works on customer verification, servicing, and authentication, and I still contribute a fair amount of the frontend code.",
          "I’ve also played drums for more than 30 years, from touring and studio work to recording sessions at home."
        ],
        cta: "View my resume",
        ctaUrl: "/resume"
      },
      engineering: {
        heading: "Engineering",
        body: "At Best Egg, I’ve led frontend integrations with MX and Method Financial and helped build quick pay and autopay features for our customer servicing site. Before that, I worked on a shared component library at Vanguard that teams used across Vue, Angular, and Adobe Experience Manager. I’ve also built the web interfaces and documentation delivery systems for Agilent’s lab instruments.",
        approach: "I work mostly in Angular, Vue, and TypeScript. My favorite work is taking an old frontend codebase and cleaning it up and modernizing it.",
        cta: "View my full resume",
        ctaUrl: "/resume",
        competenciesLabel: "What I work on",
        competencies: [
          { icon: "pull-request", label: "AI-Assisted Development", url: "/architecture#ai-workflow" },
          { icon: "layers", label: "Frontend Architecture", url: "/resume#best-egg" },
          { icon: "users", label: "Engineering Leadership", url: "/resume#best-egg" },
          { icon: "grid", label: "Design Systems", url: "/resume#vanguard" },
          { icon: "plug", label: "Fintech Integration", url: "/resume#best-egg" },
          { icon: "refresh", label: "Frontend Modernization", url: "/resume#best-egg" }
        ],
        projectsLabel: "Current Projects",
        projects: {
          text: "I build things for my own use, too: a daily timer and task tracker, a word puzzle, and a food-rating app. You can try them on my projects site.",
          url: "https://ingersoll.dev",
          external: true,
          ctaText: "Visit ingersoll.dev"
        }
      },
      drums: {
        heading: "Music",
        body: "I’ve toured nationally with independent bands and recorded in studios around the country. Now I mostly record remote sessions from my home studio, where I’ve also been writing, producing, and mixing my own music. You can see my recent playing and credits on my drum site.",
        cta: "Visit my drum site",
        ctaUrl: "https://tyleringersolldrums.com",
        ctaExternal: true
      },
      beyond: {
        heading: "Beyond work",
        cards: [
          {
            icon: "bicycle",
            label: "Cycling",
            sub: "Road, Gravel, MTB",
            detail: "Cycling is my favorite sport now. I ride outside whenever I can and jump on the trainer when weather or sunlight is against me.",
            url: "https://www.strava.com/athletes/3303002",
            external: true
          },
          {
            icon: "family-play",
            label: "Family",
            sub: "Sports, rides & games",
            detail: "Most of my free time goes to my family. A lot of it is youth sports, and the rest is bike rides or gaming together.",
            url: null
          },
          {
            icon: "vinyl",
            label: "Hi-Fi",
            sub: "Vinyl & Audio",
            detail: "I’m an audiophile and record collector. I’m usually tweaking my setup or hunting for a good pressing.",
            url: 'https://www.discogs.com/user/TylerIngersoll/collection',
            external: true
          },
          {
            icon: "grill",
            label: "Cooking",
            sub: "Griddle & Smoker",
            detail: "I love cooking outside on the griddle and smoker, usually for a big group of family and friends.",
            url: null
          }
        ]
      },
      connect: {
        heading: "Get in touch",
        subtext: "Email is the easiest way to reach me, whether it’s about engineering or music.",
        cta: "Email me"
      }
    },
    architecture: [
      {
        id: "intro",
        heading: "Site Architecture",
        headingLevel: 2,
        content: [
          "This is a small personal site built with Vue and Nuxt. Most of my professional work lives in private enterprise systems, so this project gives me a public place to show how I organize a frontend, handle theming, and test interactions.",
          "I use Nuxt to generate static HTML for the home, resume, and architecture pages. Netlify serves the generated files. Vue handles the interactive parts, including the resume timeline and theme controls.",
          "The theme system is more involved than a portfolio strictly needs. I keep it here as a working example of shared design tokens and interchangeable layouts."
        ]
      },
      {
        id: "ai-workflow",
        heading: "Where AI Fits In",
        headingLevel: 2,
        content: [
          "I built this site by hand in Vue. The design system, theme tokens, content store, and most of the components were in place before I brought in AI tools. Since then, Codex and Claude Code have written most of the changes from my prompts, and I review every diff before it merges.",
          "That foundation is what keeps the AI-written code consistent. The agents follow what they find: new work uses the existing tokens, the shared content file, and both themes’ layouts instead of inventing its own. The <a href=\"/storybook/\" target=\"_blank\" rel=\"noopener noreferrer\">component workshop</a> was built this way.",
          "To me, reviewing AI code means trusting the patterns and verifying the behavior. The unit suite, Lighthouse CI, and accessibility checks on every Storybook story have to pass, and I still check the result in a browser. Two catches from building the workshop, neither visible in the diff:",
          "• Codex set up browser tests for every story, but the test runner could not load its configuration, so no story had actually been tested. It looked finished, but it had never actually run.",
          "• The new workshop link opened a Page Not Found page in local development, because the workshop is only added to the site during the production build."
        ]
      },
      {
        id: "performance",
        heading: "Performance & Lighthouse",
        headingLevel: 2,
        content: [
          "The pages are pre-rendered so their content is available before client-side JavaScript runs. The studio image uses responsive variants from @nuxt/image, fonts are self-hosted, and icons are inline SVGs.",
          "Lighthouse CI audits the three pages with the desktop preset, using three runs per page. The configured minimum scores are 90 Performance, 95 Accessibility, 90 Best Practices, and 95 SEO. These are CI thresholds, not measured scores for every visitor or device.",
          "The <a href=\"https://github.com/tyleringersoll/ingersoll.dev/blob/main/.lighthouserc.json\" target=\"_blank\" rel=\"noopener noreferrer\">Lighthouse configuration</a> defines those checks. Reports are uploaded as artifacts on the <a href=\"https://github.com/tyleringersoll/ingersoll.dev/actions/workflows/lighthouse.yml\" target=\"_blank\" rel=\"noopener noreferrer\">Lighthouse workflow runs</a>.",
          "Google Analytics loads through requestIdleCallback, with a timeout fallback, so it waits until the page is idle."
        ]
      },
      {
        id: "content-architecture",
        heading: "Content & Components",
        headingLevel: 2,
        content: [
          "The main copy lives in data/content.js. A Pinia store makes it available to both themes, so a resume edit does not have to be repeated in each layout. Theme-specific labels live with their components.",
          "For a site this size, a JavaScript content file is enough. If editing needs grow, the store gives me a place to introduce a CMS without changing every view."
        ]
      },
      {
        id: "theming",
        heading: "Two Themes, Shared Content",
        headingLevel: 2,
        content: [
          "The Customize panel and keyboard command palette both use the same theme store. CSS custom properties provide shared colors, spacing, and typography, while a component registry lets each theme supply its own layouts.",
          "I keep theme and mode separate: data-theme selects the design and data-mode selects light or dark where the theme supports it. Components fall back to the default theme when an override is absent.",
          "The tradeoff is extra code: both themes are imported eagerly so switching layouts is synchronous. For a larger collection of themes, I would revisit that loading strategy."
        ]
      },
      {
        id: "anti-fouc",
        heading: "Remembering a Theme",
        headingLevel: 2,
        content: [
          "The selected theme is saved in localStorage and a cookie. An inline script applies the saved color attributes before paint. If the saved layout differs from the pre-rendered layout, it briefly hides the app while the client plugin applies that layout after hydration.",
          "This avoids swapping component trees during hydration. The theme plugin also handles cleanup of the temporary cloak."
        ]
      },
      {
        id: "deep-linking",
        heading: "Links into the Resume",
        headingLevel: 2,
        content: [
          "Links such as /resume#best-egg expand the matching employer’s roles and scroll to that section. The scroll helper waits for the DOM update and accounts for the sticky header.",
          "The latest employer’s roles are open on an ordinary visit, so recent work is visible without a click. Older roles can be expanded individually."
        ]
      },
      {
        id: "cicd-delivery",
        heading: "Checks & Deployment",
        headingLevel: 2,
        content: [
          "GitHub Actions runs the unit suite and Lighthouse checks on pull requests and pushes to main. The test workflow uploads coverage to Codecov; Lighthouse uploads its reports as workflow artifacts.",
          "Netlify runs the static generation command when main changes. The workflow definitions live in .github/workflows, and netlify.toml defines the production build and redirects."
        ]
      },
      {
        id: "url-handling",
        heading: "URLs & Metadata",
        headingLevel: 2,
        content: [
          "Netlify rewrites /resume and /architecture to their generated HTML files. Old /music URLs redirect to my drum site.",
          "Each page has a title and description, and app.vue supplies a canonical URL based on the current route. The site also includes a sitemap and Person structured data."
        ]
      },
      {
        id: "testing",
        heading: "Testing",
        headingLevel: 2,
        content: [
          "Vitest runs in the Nuxt test environment with happy-dom. The suite covers components, stores, theme initialization, navigation, and hash-driven resume expansion.",
          "I use interaction tests for behaviors such as opening a menu, switching a theme, and expanding a role. The coverage report includes the theme components as well as the shared application code.",
          "Run npm run test for the suite or npm run test:coverage for a fresh coverage report."
        ]
      },
      {
        id: "accessibility",
        heading: "Accessibility",
        headingLevel: 2,
        content: [
          "The site includes a skip-to-content link, landmarks, visible keyboard focus styles, and reduced-motion styles. Collapsed resume panels use inert so their contents leave the tab order and accessibility tree.",
          "The navigation and appearance controls work from the keyboard, and Lighthouse runs an automated accessibility check in CI."
        ]
      }
    ],
    resume: [
      {
        heading: "Resume",
        headingLevel: 2,
        content: [
          "I’ve been building professionally for the web since 2000. I started with sites for my band and other Philadelphia bands, then moved into intranet sites and product demos, and later technical documentation. Today I manage an engineering team at Best Egg and still work hands-on in the frontend space."
        ],
        cta: {
          label: "View how this site was built",
          url: "/architecture"
        }
      },
      {
        heading: "Experience",
        headingLevel: 2
      },
      {
        heading: "Best Egg",
        headingLevel: 3,
        years: "2022 - Present",
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "Manage three engineers (one frontend, two backend) working on customer verification, servicing, and authentication, and have also managed co-op students and interns.",
              "• Balance project priorities and workload across the team.",
              "• Work with product, design, and operations to plan delivery and coordinate frontend and backend implementation.",
              "• Support engineer development and participate in cross-functional interview panels.",
              "• Set technical direction for core customer-facing applications while continuing to contribute directly to frontend implementation.",
              "<strong>Tech:</strong> Angular, TypeScript, Datadog, Figma, Miro, Jira, Confluence, FullStory, GitHub, AI Development Tools (Claude/Cursor)"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer II · 2024 - 2025",
            content: [
              "Focused on frontend execution and technical alignment while collaborating with product and UX on roadmap decisions.",
              "• Led the frontend side of third-party fintech integrations including MX and Method Financial, from architecture through implementation and rollout.",
              "• Integrated multiple A/B test UIs via feature flags to support product experimentation and release management.",
              "• Mentored engineers beyond the immediate team and helped guide frontend direction across adjacent work.",
              "<strong>Tech:</strong> Angular, TypeScript, Node.js, Python, Django, Cursor AI, GitHub Copilot"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer I · 2022 - 2024",
            content: [
              "Focused on updating Angular codebases and establishing consistent frontend patterns.",
              "• Led architectural updates to introduce lazy-loaded modules, optimize main bundle sizes, and transition UI components from Bootstrap to Angular Material.",
              "• Helped architect and launch a quick pay feature that customers can use without signing in, along with autopay scheduling to simplify the payment experience for customers.",
              "• Golden Egg Award winner for \"BE a Builder of Great Teams\" (Q3 2023).",
              "<strong>Tech:</strong> Angular, TypeScript, Tailwind CSS, Angular Material, Docker, Nginx, Jasmine"
            ]
          }
        ]
      },
      {
        heading: "Vanguard",
        headingLevel: 3,
        years: "2019 - 2022",
        roles: [
          {
            subheading: "Senior Frontend Developer · 2019 - 2022",
            content: [
              "Worked on a four-person team building a design system and shared frontend foundation for Vanguard Financial Advisor Services applications.",
              "• Built a web component library with custom element wrappers so the system could be used across Vue, Angular, and Adobe Experience Manager without separate framework-specific implementations.",
              "• Partnered with leadership and development teams during a division-wide rebrand to drive adoption of the design system and improve UI consistency across products.",
              "• Designed and built a Vue/NestJS reference application with CI, environment setup, and third-party integrations already wired up, giving teams a working starting point.",
              "• Set up AWS-based CI/CD pipelines that deployed the Storybook documentation automatically.",
              "<strong>Tech:</strong> Vue.js, NestJS, Web Components, Storybook, Angular, Custom Elements, AWS, CI/CD"
            ]
          }
        ]
      },
      {
        heading: "Technical Writers, Inc.",
        headingLevel: 3,
        years: "2017 - 2019",
        roles: [
          {
            subheading: "Web Application Developer · 2017 - 2019",
            content: [
              "Embedded with Agilent Technologies’ R&D software engineering team as the primary frontend developer, building web-based instrument control interfaces shipped with Agilent hardware products.",
              "• Led frontend development for Agilent’s Gas Chromatography web UI, including real-time WebSocket monitoring and two-way control using Sencha/Ext JS.",
              "• Designed custom SVG icons and CSS styling aligned with Agilent’s product standards.",
              "• Built an automated Adobe RoboHelp output system across multiple product lines, supporting more than eight languages through template generation and command-line automation.",
              "<strong>Tech:</strong> JavaScript, Sencha/Ext JS, HTML5, CSS/SCSS, SVG, WebSockets, Adobe RoboHelp, Command-line scripting"
            ]
          }
        ]
      },
      {
        heading: "Trellist Marketing and Technology",
        headingLevel: 3,
        years: "2014 - 2017",
        roles: [
          {
            subheading: "Digital Development Services · 2014 - 2017",
            content: [
              "Worked across agency projects spanning web, email, SharePoint, and internal enterprise systems for brands including Bank of America, David’s Bridal, Chemours, Blue Cross Blue Shield Global, and DuPont.",
              "• Built responsive websites and landing pages for enterprise clients including Bank of America, David’s Bridal, NASA Federal Credit Union, and Chemours.",
              "• Developed adaptive HTML email campaigns for Bank of America rewards and retention programs, with a focus on deliverability and cross-client consistency.",
              "• Served as Systems Owner for DuPont’s SharePoint security auditing system, including weekly reporting and a server migration alongside IBM consultants.",
              "• Developed SharePoint intranet solutions for Chemours and Everything But Water.",
              "• Managed off-hours deployments for sensitive internal communications tied to Chemours leadership.",
              "<strong>Tech:</strong> HTML5, CSS/SCSS, JavaScript, jQuery, SharePoint, Responsive Design, Email Development"
            ]
          }
        ]
      },
      {
        heading: "Technical Writers, Inc.",
        headingLevel: 3,
        years: "2003 - 2005, 2007 - 2014",
        roles: [
          {
            subheading: "Frontend Developer / Senior Technical Writer · 2007 - 2014",
            content: [
              "As a long-term embedded consultant with Agilent Technologies’ R&D software engineering team, I worked across both frontend applications and technical documentation for global scientific instrument product lines.",
              "• Designed standalone web-based document delivery applications distributed by USB, DVD, and InstallShield-based installers.",
              "• Built custom HTML templates and automated build systems across multiple documentation sets for Gas Chromatography, Mass Spectrometry, and Sampler product lines.",
              "• Authored technical documentation in Adobe FrameMaker for print media and then converted it to web-ready HTML outputs.",
              "• Created UI icons, diagrams, and other visual assets for R&D teams.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe RoboHelp, Adobe FrameMaker, Adobe Illustrator, Adobe Photoshop"
            ]
          },
          {
            subheading: "Technical Writer / Web Developer · 2003 - 2005",
            content: [
              "Embedded on-site at AstraZeneca, supporting the global pharmaceutical regulatory submission team through documentation packaging and internal web development.",
              "• Designed and built the global regulatory intranet site to centralize team content.",
              "• Packaged regulatory and compliance documentation for official FDA submissions.",
              "• Managed project timelines and documentation workflows across the team.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe FrameMaker, Adobe Photoshop, Adobe Illustrator, Microsoft Project"
            ]
          }
        ]
      },
      {
        heading: "Wilmington Trust Company",
        headingLevel: 3,
        years: "2000 - 2003",
        roles: [
          {
            subheading: "Tech Support, Level 1 · 2001 - 2003",
            content: [
              "Transitioned from an internship into a full-time support role, balancing first-level help desk responsibilities with serving as the primary developer for the division’s intranet applications.",
              "• Redesigned and developed the IT Service & Support Division intranet website.",
              "• Designed and developed the Online Portfolio Trust Management Group intranet site.",
              "• Designed and developed a custom call logging front-end application with Microsoft Access, Visual Basic, and SQL Server, used in production across multiple service and support departments.",
              "• Provided first-level internal tech support for software, network accounts, and hardware.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Flash, Microsoft Access, Visual Basic, SQL Server"
            ]
          },
          {
            subheading: "Intern, Online Portfolio Group · 2000 - 2001",
            content: [
              "While finishing my undergraduate degree at the University of Delaware, I supported the Online Portfolio Group on a production Microsoft Access call logging application and web development projects.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Microsoft Access"
            ]
          }
        ]
      },
      {
        heading: "Education",
        headingLevel: 2,
        content: [
          "<strong>University of Delaware</strong><br>Bachelor of Science, Business Administration<br>Concentrations: Accounting and Finance<br><strong>College of Business & Economics</strong>"
        ]
      },
      {
        heading: "Technical Skills",
        headingLevel: 2,
        skills: {
          languages: ["JavaScript", "TypeScript", "HTML5", "CSS/SCSS", "Python", "SQL"],
          frameworks: ["Angular", "Vue.js", "Nuxt 3", "NestJS", "Django", "Tailwind CSS", "Angular Material"],
          infrastructure: ["Node.js", "Nginx", "Docker", "AWS", "GitHub Actions", "Netlify", "Datadog", "Figma", "Cursor AI", "GitHub Copilot", "Claude Code"],
          concepts: ["Web Components", "Design Systems", "SSR", "Accessibility (WCAG)", "CI/CD", "State Management"]
        }
      }
    ],
    footer: {
      socialIcons: [
        {
          svg: "<svg class=\"github\" fill=\"#000000\" xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 64 64\" width=\"64px\" height=\"64px\"><path d=\"M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z\"/></svg>",
          alt: "GitHub",
          title: "Check out my GitHub",
          url: "https://github.com/tyleringersoll"
        },
        {
          svg: "<svg class=\"linkedin\" role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/></svg>",
          alt: "LinkedIn",
          title: "Connect with me on LinkedIn",
          url: "https://www.linkedin.com/in/tyleringersoll"
        },
        {
          svg: "<svg class=\"email\" enable-background=\"new 0 0 512 512\" version=\"1.1\" viewBox=\"0 0 512 512\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m511.7 105.88l-179.99 149.88 180.29 119.99v-266.48c0-1.152-0.119-2.276-0.305-3.378z\"/><path d=\"m315.48 269.26l-22.689 18.893c-10.659 8.876-23.725 13.314-36.79 13.314s-26.132-4.438-36.79-13.314l-22.689-18.893-196.52 130.79v2.694c0 11.161 9.081 20.242 20.242 20.242h471.52c11.161 0 20.242-9.081 20.242-20.242v-2.694l-196.52-130.79z\"/><path d=\"m491.83 89.012h-0.074-471.52-0.074c-2.858 0.011-4.095 3.652-1.899 5.481l185.28 154.28c0.022 0.018 0.044 0.037 0.066 0.055l28.547 23.771c13.812 11.502 33.863 11.502 47.675 0l213.89-178.11c2.196-1.83 0.958-5.471-1.899-5.481z\"/><path d=\"M0.305,105.876C0.119,106.978,0,108.1,0,109.254v266.484l180.291-119.988L0.305,105.876z\"/></svg>",
          alt: "Email",
          title: "Email me at hello@tyleringersoll.com",
          url: "mailto:hello@tyleringersoll.com"
        },
        {
          svg: "<svg class=\"strava\" role=\"img\" viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M41.03 47.852l-5.572-10.976h-8.172L41.03 64l13.736-27.124h-8.18\"/><path d=\"M27.898 21.944l7.564 14.928h11.124L27.898 0 9.234 36.876H20.35\"/></svg>",
          alt: "Strava",
          title: "Follow me on Strava",
          url: "https://www.strava.com/athletes/3303002"
        }
      ],
      legal: [
        "Copyright ©{YEAR} <a href='https://ingersoll.dev'>Tyler Ingersoll</a>. All rights reserved.",
        "Built with Vue & Nuxt 3 (<a href='/architecture'>View Site Architecture</a>). Hosted on <a href='https://www.netlify.com/' target='_blank'>Netlify</a>."
      ]
    }
  }
};

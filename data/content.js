export default {
  content: {
    meta: {
      name: "Tyler Ingersoll",
      tag: "<span>Frontend engineer</span> <span>/</span> <span>Drummer</span>"
    },
    navigation: [
      { name: "Home", url: "/" },
      { name: "Resume", url: "/resume" },
      { name: "Music", url: "/music" }
    ],
    home: {
      hero: {
        heading: "Hi, I’m Tyler",
        eyebrow: "Frontend Engineering",
        paragraphs: [
          "I design and build enterprise-scale frontend applications with a focus on web performance, clean architecture, and maintainability.",
          "Alongside my engineering work, I have spent more than three decades as a drummer, with experience across national touring, label-supported studio tracking, sync placements, event work, and modern session work."
        ]
      },
      engineering: {
        heading: "Engineering",
        headingLevel: 4,
        body: "I build frontend applications with Vue, Angular, and TypeScript. My approach is to adopt frameworks when they provide a clear architectural advantage, and lean on platform-native browser capabilities when a lighter solution is better. My work has included public-facing marketing sites, payment flows, fintech integrations, design systems, and specialized interfaces for scientific hardware. One of my favorite parts of the job is reducing technical debt and moving legacy frontend systems toward maintainable, modern architectures.",
        cta: "View my full resume",
        ctaUrl: "/resume",
        competenciesLabel: "Competencies",
        competencies: [
          { icon: "layers", label: "Frontend Architecture", url: "/resume#best-egg" },
          { icon: "users", label: "Engineering Leadership", url: "/resume#best-egg" },
          { icon: "grid", label: "Design Systems", url: "/resume#vanguard" },
          { icon: "zap", label: "Performance Optimization", url: "/architecture#performance" },
          { icon: "plug", label: "Fintech Integration", url: "/resume#best-egg" },
          { icon: "refresh", label: "Frontend Modernization", url: "/resume#best-egg" }
        ],
        projectsLabel: "Current Projects",
        projects: {
          text: "For performance-focused personal builds, browser-native experiments, and live project demos, visit my projects site.",
          url: "https://ingersoll.dev",
          external: true,
          ctaText: "Visit ingersoll.dev"
        }
      },
      drums: {
        heading: "Music",
        headingLevel: 4,
        body: "I have played drums for more than three decades, from regional independent bands to national touring, label-supported studio work, sync placements, event work, and remote session recording. My current drum work, videos, studio setup, and selected credits live on my dedicated drum site.",
        cta: "View my musical history",
        ctaUrl: "/music",
        studioLabel: "Current Projects",
        studio: {
          text: "For drum videos, remote session details, setup specs, and selected credits, visit my dedicated drum tracking site.",
          url: "https://tyleringersolldrums.com",
          external: true,
          ctaText: "Visit tyleringersolldrums.com"
        }
      },
      beyond: {
        heading: "Beyond work",
        headingLevel: 3,
        cards: [
          {
            icon: "bicycle",
            label: "Cycling",
            sub: "Road, Gravel, MTB",
            detail: "Cycling is my favorite sport now. I ride mountain, road, and gravel bikes or jump on the trainer as much as possible.",
            url: "https://www.strava.com/athletes/3303002",
            external: true
          },
          {
            icon: "family-play",
            label: "Family",
            sub: "Family",
            detail: "Most of my free time is spent with my family, balancing youth sports, outdoor bike rides, and gaming together.",
            url: null
          },
          {
            icon: "vinyl",
            label: "Hi-Fi",
            sub: "Vinyl & Audio",
            detail: "I’m an audiophile and record collector, always tweaking my gear setup, hunting for vinyl pressings, and making time to really listen to music.",
            url: 'https://www.discogs.com/user/TylerIngersoll/collection',
            external: true
          },
          {
            icon: "grill",
            label: "Cooking",
            sub: "Griddle & Smoker",
            detail: "I love cooking, especially outside on the griddle and smoker. That usually means making a big meal, putting on music, and enjoying time with family and friends.",
            url: null
          }
        ]
      },
      connect: {
        heading: "Get in touch",
        subtext: "For engineering work, music projects, or anything in between.",
        cta: "Get in touch"
      }
    },
    architecture: [
      {
        id: "intro",
        heading: "Architecture",
        headingLevel: 2,
        content: [
          "This site is a personal website built with Vue and Nuxt. Since most of my professional work lives in private enterprise systems, I use this project to show how I structure a frontend application, manage content, and handle performance and accessibility.",
          "• <strong>Nuxt 3 & Static Pre-rendering:</strong> Every page is pre-rendered to static HTML at build time, which keeps the site fast, simple to host, and easy for search engines to crawl.",
          "• <strong>Vue 3 Composition API:</strong> I use the Composition API and script setup to keep component logic easier to follow.",
          "• <strong>Pinia State Management:</strong> Dedicated stores manage static content distribution and global application theme states without prop drilling.",
          "• <strong>SCSS & CSS Custom Properties:</strong> The design system uses scoped SCSS modules and CSS custom properties to support theming and responsive layout.",
          "• <strong>SCSS Auto-injection via Vite:</strong> Variables and mixins are injected into each component’s style block through Vite config, which keeps shared styling tools available without repetitive imports.",
          "• <strong>Page Transitions:</strong> A simple global fade transition is configured in <code>nuxt.config.ts</code>, with a dedicated partial handling the route transition classes."
        ]
      },
      {
        id: "performance",
        heading: "Performance & Lighthouse",
        headingLevel: 2,
        content: [
          "This site is pre-rendered, keeps JavaScript light, and avoids extra dependencies where native browser behavior is sufficient. Lighthouse CI runs against every push and pull request, gating deploys behind 100 Performance, 95+ Accessibility, 90+ Best Practices, and 95+ SEO across every prerendered route."
        ],
        scores: [
          { label: "Performance", value: 100 },
          { label: "Accessibility", value: 100 },
          { label: "Best Practices", value: 100 },
          { label: "SEO", value: 100 }
        ],
        optimizations: [
          "• <strong>Pre-rendered HTML:</strong> Nuxt generates fully-formed HTML at build time, so browsers render content immediately without waiting for client-side JavaScript.",
          "• <strong>Optimized Image Pipeline:</strong> <code>@nuxt/image</code> generates responsive WebP variants at build time. Each <code>NuxtImg</code> ships a <code>srcset</code> so the browser pulls the smallest variant for the actual display size, and the hero image uses <code>fetchpriority=\"high\"</code> to win the LCP race.",
          "• <strong>Self-Hosted Fonts:</strong> <code>@nuxt/fonts</code> downloads Roboto Condensed at build time, inlines the <code>@font-face</code> declarations into the HTML, and generates size-adjusted fallback fonts so any pre-swap render does not shift the layout. No render-blocking request to Google Fonts.",
          "• <strong>Deferred Analytics:</strong> Google Analytics loads through a client plugin scheduled via <code>requestIdleCallback</code>, so the gtag script never blocks the initial paint.",
          "• <strong>Inline SVG Icons:</strong> Every icon on the site (engineering competencies, beyond-work cards, social links, theme toggle, and architecture gauges) is inlined directly into the component. Zero icon-font or icon-library requests.",
          "• <strong>Minimal JavaScript:</strong> No heavy UI libraries or animation frameworks. The bundle stays light by leaning on native browser APIs and Vite's default tree-shaking."
        ]
      },
      {
        id: "content-architecture",
        heading: "Content-Driven Architecture",
        headingLevel: 2,
        content: [
          "All page content lives in a single <code>data/content.js</code> file as a plain JavaScript export. A Pinia store wraps it so components can access the content they need without passing data through multiple layers.",
          "It is a simple content-driven setup that keeps structure and presentation separate. If I ever wanted to swap this for a CMS or an external API, that change would mostly happen in the store layer rather than across the component tree.",
          "The pre-render config in <code>nuxt.config.ts</code> only includes routes that exist in the data layer, which keeps the build output predictable."
        ]
      },
      {
        id: "anti-fouc",
        heading: "Anti-FOUC Theme Initialization",
        headingLevel: 2,
        content: [
          "Theme persistence is handled by a Pinia store that reads <code>localStorage</code> and applies a <code>.light-mode</code> class to the root element. The issue is that Pinia initializes after first paint, so returning users could briefly see the wrong theme on load.",
          "To avoid that flash, I inject a small inline script into the document head through <code>app.head.script</code> in <code>nuxt.config.ts</code>. It runs before the page renders, checks <code>localStorage</code>, and applies the saved theme immediately."
        ]
      },

      {
        id: "deep-linking",
        heading: "Hash-Based Deep Linking",
        headingLevel: 2,
        content: [
          "The resume timeline supports URL hash navigation, so a link like <code>/resume#best-egg</code> opens the relevant employer section and scrolls directly to it.",
          "The implementation watches <code>route.hash</code>, matches it against a slugified employer heading, and adds the relevant entries to an <code>expandedRoles</code> Set. A custom <code>useScrollToHash</code> composable waits for the DOM to finish updating before calculating scroll position, and it accounts for the sticky header so section headings are not hidden."
        ]
      },
      {
        id: "cicd-delivery",
        heading: "CI/CD & Edge Delivery",
        headingLevel: 2,
        content: [
          "Every push and pull request runs through GitHub Actions before anything reaches production. Two workflows guard the main branch:",
          "• <strong>Unit Tests:</strong> Vitest runs the full suite on every commit, then uploads coverage to Codecov so the README badge reflects current state.",
          "• <strong>Lighthouse CI:</strong> The workflow builds the site, serves it on the runner, and audits each route. A build fails if any page drops below 100 Performance, 95 Accessibility, 90 Best Practices, or 95 SEO. Regressions never reach <code>main</code>.",
          "Production deploys are handled by Netlify. A push to <code>main</code> triggers a fresh static generate that gets served from Netlify’s global CDN."
        ]
      },
      {
        id: "url-handling",
        heading: "URL Handling & SEO",
        headingLevel: 2,
        content: [
          "URLs that lead to the same page should resolve in one hop, not two. Two pieces work together to make that true.",
          "• <strong>Trailing-Slash Rewrites:</strong> Netlify’s default behavior 301-redirects <code>/music</code> to <code>/music/</code> when it finds a subdirectory. The <code>netlify.toml</code> rewrites use status 200 instead, so the no-trailing-slash form serves the file directly. A direct hit or a Lighthouse audit gets the content immediately, with no redirect round-trip.",
          "• <strong>Canonical Tags:</strong> A small <code>useHead</code> setup in <code>app.vue</code> injects a <code>rel=\"canonical\"</code> link on every prerendered route, computed from the current path. Search engines that follow either URL form consolidate ranking signals onto the canonical version."
        ]
      },
      {
        id: "testing",
        heading: "Testing & Coverage",
        headingLevel: 2,
        content: [
          "The site is covered by a Vitest unit suite running in the Nuxt test environment with happy-dom. Components, pages, stores, the layout, the router scroll behavior, the theme plugin, and the scroll-to-hash composable all have their own specs.",
          "• <strong>Vitest + @nuxt/test-utils:</strong> Tests boot a real Nuxt context via <code>mountSuspended</code>, so auto-imports, composables, and Pinia all resolve the same way they do at runtime.",
          "• <strong>Coverage Targets:</strong> The v8 coverage reporter tracks every source file under <code>components/</code>, <code>pages/</code>, <code>stores/</code>, <code>composables/</code>, <code>plugins/</code>, <code>layouts/</code>, and <code>app/</code>. The suite hits 99% lines, 99% statements, 99% functions, and 91% branches. Remaining gaps are defensive optional chains and the SSR guard.",
          "• <strong>Focus on Behavior:</strong> Tests assert rendered output, route-driven state (hash-based timeline expansion), and user interactions (theme toggle, mobile menu open/close, focus trap) rather than implementation details.",
          "• <strong>Fast Local Loop:</strong> The full suite runs in about a second and a half via <code>npm run test</code>, with <code>npm run test:watch</code> for iteration and <code>npm run test:coverage</code> to refresh the report."
        ]
      },
      {
        id: "accessibility",
        heading: "Accessibility (A11Y)",
        headingLevel: 2,
        content: [
          "Accessibility was part of the build from the start.",
          "• <strong>Skip Navigation:</strong> A skip-to-content link lets keyboard and screen reader users bypass the header and jump straight to the page content.",
          "• <strong>Semantic HTML:</strong> Proper heading hierarchy, landmark elements, and native interactive controls throughout.",
          "• <strong>Keyboard Navigation:</strong> Every interactive element, including the expanding resume timeline and mobile navigation, is fully operable via keyboard with visible focus indicators. The mobile menu traps focus while open and closes on Escape.",
          "• <strong>Inert on Collapsed Panels:</strong> The timeline uses the <code>inert</code> attribute on collapsed content panels rather than just <code>aria-hidden</code>. <code>inert</code> removes keyboard focus, pointer events, and accessibility tree presence in one attribute, which is what this pattern actually needs.",
          "• <strong>Reduced Motion:</strong> A global <code>prefers-reduced-motion</code> media query disables animations and transitions for users who request it.",
          "• <strong>ARIA and State Attributes:</strong> Custom components like the timeline toggle, theme switch, and mobile menu use appropriate roles, labels, and state attributes for assistive technologies.",
          "• <strong>Dual-Theme Contrast:</strong> Both the dark and light themes use color pairings chosen to maintain readable contrast ratios."
        ]
      },

    ],
    resume: [
      {
        heading: "Resume",
        headingLevel: 2,
        content: [
          "I lead frontend engineering and architecture for customer-facing enterprise applications. My background spans fintech platforms, design systems, and instrumentation software. The work I enjoy most is taking complicated legacy frontends and turning them into systems that are easier to understand, maintain, and extend."
        ],
        cta: {
          label: "View how this site was built",
          url: "/architecture"
        }
      },
      {
        heading: "Best Egg",
        headingLevel: 3,
        years: "2022 - Present",
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "Engineering leader for a customer-facing team, balancing technical direction, frontend execution, team management, and delivery planning.",
              "• Partner with product, design, and operations teams to define priorities, shape delivery plans, and split work across frontend and backend implementation.",
              "• Manage a team supporting customer verification, servicing, and authentication work, including delivery planning, cross-functional interview panels, and engineer development.",
              "• Set technical direction for core customer-facing applications while continuing to contribute directly to frontend implementation.",
              "<strong>Tech:</strong> Angular, TypeScript, DataDog, Figma, Miro, Jira, Confluence, FullStory, GitHub, AI Development Tools (Claude/Cursor)"
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
              "• Helped architect and launch a no-auth quick pay feature and auto pay scheduling to simplify the payment experience for customers.",
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
              "• Designed and built a Vue/NestJS reference application with CI, content structure, environment setup, and third-party integrations already in place, so teams could start from a working application instead of assembling the stack from scratch.",
              "• Set up AWS-based CI/CD pipelines for automated Storybook documentation deployments so teams had a shared place to reference the latest components and usage patterns.",
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
        years: "2007 - 2014",
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
              "Transitioned from an internship into a full-time support role, balancing first-level help desk responsibilities with serving as the primary developer for the division's intranet applications.",
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
        heading: "Additional Experience",
        headingLevel: 2,
        content: [
          "In addition to my engineering career, music has been a major parallel career, including touring, studio tracking, sync placements, event work, and remote session recording. The deeper drum portfolio, current videos, selected credits, studio details, and booking information live at <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a>."
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
          infrastructure: ["Node.js", "Nginx", "Docker", "AWS", "GitHub Actions", "Netlify", "DataDog", "Figma", "Cursor AI", "GitHub Copilot", "Claude Code"],
          concepts: ["Web Components", "Design Systems", "SSR", "Accessibility (WCAG)", "CI/CD", "State Management"]
        }
      }
    ],
    drums: [
      {
        headingLevel: 2,
        type: "hero",
        heading: "Musical Background",
        content: [
          "My background includes more than three decades of professional performance, primarily as a session and touring drummer, alongside tracking bass for independent studio releases.",
          "This page provides a timeline of that work. My active tracking portfolio, video clips, and full home studio production layout live on my drum site."
        ],
        src: "/images/studio_kit.webp",
        cta: {
          label: "Visit my dedicated drum site",
          url: "https://tyleringersolldrums.com",
          external: true
        }
      },
      {
        heading: "Selected Highlights",
        headingLevel: 2,
        content: [
          "Earlier in my career, I signed with Wind-up Records, toured nationally, and tracked drums in studios in New York, Philadelphia, and Los Angeles with producers and engineers including Don Gilmore, Gregg Wattenberg, Phil Nicolo, and Nick DiDia. That work included placements connected to the Fantastic Four soundtrack, Madden NFL 07, Super Bowl XLII broadcast usage, network television, radio airplay, and stadium playback.",
          "Today, my active drum work is focused on tracking, collaborations, and select live performance projects."
        ],
        cta: {
          label: "View current videos, credits, and session details",
          url: "https://tyleringersolldrums.com",
          external: true
        }
      },
      {
        heading: "Timeline",
        headingLevel: 2,
        content: []
      },
      {
        heading: "Sessions and Remote Drum Work",
        headingLevel: 3,
        years: "2025 - Present",
        roles: [
          {
            subheading: "Session Drummer · Kennett Square, PA",
            content: [
              "Focusing on session tracking and engineering hybrid acoustic-digital drum recordings from my home studio.",
              "• Engineered a hybrid tracking system combining multi-microphone acoustic capture for cymbals with synchronized MIDI triggers for drum shells.",
              "• Managed full signal paths, acoustic treatment, and hardware preamp configurations to deliver clean, mix-ready tracking assets.",
              "• Optimized digital delivery workflows to provide collaborators with organized, phase-aligned audio stems and MIDI data.",
              "Visit <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a> for current videos, session credits, and studio specifications."
            ]
          }
        ]
      },
      {
        heading: "Omnisoul Reunion",
        headingLevel: 3,
        years: "2024",
        roles: [
          {
            subheading: "Drummer · World Cafe Live, Philadelphia",
            content: [
              "Rejoined Omnisoul for a 20-year anniversary performance built around the band's album Happy Outside, with proceeds from the event donated to charity.",
              "• Performed a full retrospective set with the original band and guest musicians.",
              "• Played a separate set of songs that singer Derek Fuhrmann wrote for other artists, including Phillip Phillips, the Goo Goo Dolls, Kygo, and O.A.R.",
              "• Supported the archival re-release of Happy Outside, including remastered audio, bonus tracks, and updated artwork."
            ]
          }
        ]
      },
      {
        heading: "Veteran Avenue (Nothing Left to Burn)",
        headingLevel: 3,
        years: "2020",
        roles: [
          {
            subheading: "Drummer · Studio session",
            content: [
              "Tracked live drums at The Deep End Studio in Baltimore for Brad Cox's Veteran Avenue project on the single \"Nothing Left to Burn.\" Produced and engineered by Tony Correlli."
            ]
          }
        ]
      },
      {
        heading: "The Trellist Agency Band",
        headingLevel: 3,
        years: "2015 - 2017",
        roles: [
          {
            subheading: "Bassist",
            content: [
              "Played bass in the in-house band at Trellist, a marketing agency in Wilmington, DE. The band played shows at multiple tech industry events in Wilmington and Philadelphia."
            ]
          }
        ]
      },
      {
        heading: "Skitzo Calypso (Ghosts)",
        headingLevel: 3,
        years: "2013",
        roles: [
          {
            subheading: "Bassist · Studio session",
            content: [
              "Tracked bass on \"A Night in Hell & A Sunday Morning\" for Skitzo Calypso's LP Ghosts. Produced and engineered by Tony Correlli at The Deep End Studio. I had previously played bass and drums on the band's late-90s releases."
            ]
          }
        ]
      },
      {
        heading: "SpeakerCity Band",
        headingLevel: 3,
        years: "2010 - 2016",
        roles: [
          {
            subheading: "Drummer, DJ, and Co-Founder",
            content: [
              "Co-founded and performed in a working event band that moved from the regional club circuit into corporate events, universities, weddings, private events, and a residency in Key West.",
              "• Played drums and handled DJ responsibilities across club, private, and corporate work.",
              "• Built and ran click-driven arrangements and live sequences that were used as part of the show."
            ]
          }
        ]
      },
      {
        heading: "Curtiss Helldiver",
        headingLevel: 3,
        years: "2006",
        roles: [
          {
            subheading: "Drummer · Philadelphia",
            content: [
              "Played drums in a Philadelphia punk-rock band that ran alongside The Crash Motive, leaning into heavy live improvisation.",
              "• Won a battle of the bands at North Star Bar in Philadelphia.",
              "• Opened for Taylor Hawkins and the Coattail Riders."
            ]
          }
        ]
      },
      {
        heading: "The Crash Motive",
        headingLevel: 3,
        years: "2005 - 2008",
        roles: [
          {
            subheading: "Drummer, Studio Musician & Founding Member",
            content: [
              "Signed with Wind-up Records, toured nationally, and recorded major-label releases after years of regional development and label showcases.",
              "• Signed a multi-album contract with Wind-up Records following competitive interest from major industry labels.",
              "• Tracked major-label releases at studios in New York, Philadelphia, and Los Angeles, working under the direction of producers and engineers including Don Gilmore and Gregg Wattenberg.",
              "• Opened for national touring acts and filmed a music video in Los Angeles.",
              "• Contributed to media licensing and broadcast placements, including the Fantastic Four soundtrack, Madden NFL 07, Super Bowl XLII broadcast usage, network television, national radio airplay, and stadium playback."
            ]
          }
        ]
      },
      {
        heading: "Omnisoul",
        headingLevel: 3,
        years: "2002 - 2005",
        roles: [
          {
            subheading: "Drummer & Founding Member",
            content: [
              "Helped build a regional independent band from the college circuit into label showcases, radio momentum, and studio work.",
              "• Logged over a year of heavy radio rotation on WSTW 93.7 FM, including a station record for the most-requested song.",
              "• Tracked foundational studio demos with producer Phil Nicolo to generate competitive major-label interest.",
              "• Performed regional shows, college dates, and label showcases, including opening for Sugar Ray and playing multiple showcases across New York City."
            ]
          }
        ]
      },
      {
        heading: "The Healthy Doses",
        headingLevel: 3,
        years: "1999 - 2000",
        roles: [
          {
            subheading: "Drummer",
            content: [
              "Played drums in an experimental jam band that built a local following around the University of Delaware and later moved onto larger outdoor stages and festival bills.",
              "• Played regularly at venues including Deer Park Tavern and The East End Cafe.",
              "• Shared festival bills with acts including The Disco Biscuits and Lake Trout, and performed at Phish’s Camp Oswego festival.",
              "• Developed a stronger sense of listening, improvising, and shaping dynamics in real time."
            ]
          }
        ]
      },
      {
        heading: "Early Bands and Studio Work",
        headingLevel: 3,
        years: "1996 - 1998",
        roles: [
          {
            subheading: "Drummer, Bassist, and Early Recording Collaborator",
            content: [
              "Started tracking drums and bass for independent regional alt-rock projects while playing live club dates.",
              "• Tracked both drum and bass parts across early independent EPs and full-length releases."
            ]
          }
        ]
      },
      {
        heading: "Current Drum Work",
        headingLevel: 2,
        content: [
          "For current videos, remote session details, studio setup, credits, and booking information, visit my dedicated drum site."
        ],
        cta: {
          label: "Visit tyleringersolldrums.com",
          url: "https://tyleringersolldrums.com",
          external: true
        }
      }
    ],
    icons: {
      close: "<svg xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"xmlns=\"http://www.w3.org/2000/svg\"xmlns:cc=\"http://creativecommons.org/ns#\"xmlns:dc=\"http://purl.org/dc/elements/1.1/\"xmlns:svg=\"http://www.w3.org/2000/svg\"xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"xmlns:ns1=\"http://sozi.baierouge.fr\"xmlns:xlink=\"http://www.w3.org/1999/xlink\"id=\"svg2\"viewBox=\"0 0 744.09 1052.4\"version=\"1.1\"><g id=\"layer1\"><path id=\"svg-bg\" class=\"svg-bg\" d=\"m814.29 606.65a314.29 314.29 0 1 1 -628.57 0 314.29 314.29 0 1 1 628.57 0z\" stroke=\"#000\" stroke-width=\"5\" transform=\"matrix(1.1048 0 0 1.1048 -179.21 -162.53)\"/><g id=\"g3763\" transform=\"matrix(.91837 0 0 .91837 47.587 10.944)\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-width=\"133.87\" fill=\"none\" > <path id=\"path2991\" class=\"svg-x\" d=\"m176.51 362.87 356.13 356.13\" /> <path id=\"path2993\" class=\"svg-x\" d=\"m532.64 362.87-356.13 356.13\" /></g></g></svg>"
    },
    footer: {
      socialHeading: "Connect with me",
      socialTagline: "For my engineering background, visit the resume. For current drum work or remote session details, visit <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a>.",
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
          title: "Email me at tyler@ingersoll.dev",
          url: "mailto:tyler@ingersoll.dev"
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

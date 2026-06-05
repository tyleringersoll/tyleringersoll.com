// Page content (resume, music, architecture, footer) — verbatim from data/content.js
window.TP = {
  pagemeta: {
    resume: [
      { l: "Discipline", v: "Frontend Engineering" },
      { l: "Focus", v: "Architecture / Leadership" },
      { l: "Based", v: "Kennett Square, PA" },
    ],
    music: [
      { l: "Role", v: "Session / Touring Drummer" },
      { l: "Experience", v: "30+ Years" },
      { l: "Studio", v: "Kennett Square, PA" },
    ],
    architecture: [
      { l: "Stack", v: "Nuxt 3 / Vue 3 / Pinia" },
      { l: "Hosting", v: "Netlify Edge CDN" },
      { l: "Lighthouse", v: "100 / 100 / 100 / 100" },
    ],
  },

  resumeIntro: {
    body: "I lead frontend engineering and architecture for customer-facing enterprise applications. My background spans fintech platforms, design systems, and instrumentation software. The work I enjoy most is taking complicated legacy frontends and turning them into systems that are easier to understand, maintain, and extend.",
    cta: { label: "View how this site was built", url: "Architecture.html" },
    facts: [
      { v: "25+", l: "Years building for the web" },
      { v: "7", l: "Employers & engagements" },
    ],
  },

  employers: [
    {
      heading: "Best Egg", years: "2022 - Present",
      roles: [
        { subheading: "Director II, Software Engineering · 2026 - Present", content: [
          "Engineering leader for a customer-facing team, balancing technical direction, frontend execution, team management, and delivery planning.",
          "• Partner with product, design, and operations teams to define priorities, shape delivery plans, and split work across frontend and backend implementation.",
          "• Manage a team supporting customer verification, servicing, and authentication work, including delivery planning, cross-functional interview panels, and engineer development.",
          "• Set technical direction for core customer-facing applications while continuing to contribute directly to frontend implementation.",
          "<strong>Tech:</strong> Angular, TypeScript, DataDog, Figma, Miro, Jira, Confluence, FullStory, GitHub, AI Development Tools (Claude/Cursor)" ] },
        { subheading: "Senior Lead Software Engineer II · 2024 - 2025", content: [
          "Focused on frontend execution and technical alignment while collaborating with product and UX on roadmap decisions.",
          "• Led the frontend side of third-party fintech integrations including MX and Method Financial, from architecture through implementation and rollout.",
          "• Integrated multiple A/B test UIs via feature flags to support product experimentation and release management.",
          "• Mentored engineers beyond the immediate team and helped guide frontend direction across adjacent work.",
          "<strong>Tech:</strong> Angular, TypeScript, Node.js, Python, Django, Cursor AI, GitHub Copilot" ] },
        { subheading: "Senior Lead Software Engineer I · 2022 - 2024", content: [
          "Focused on updating Angular codebases and establishing consistent frontend patterns.",
          "• Led architectural updates to introduce lazy-loaded modules, optimize main bundle sizes, and transition UI components from Bootstrap to Angular Material.",
          "• Helped architect and launch a no-auth quick pay feature and auto pay scheduling to simplify the payment experience for customers.",
          "• Golden Egg Award winner for \"BE a Builder of Great Teams\" (Q3 2023).",
          "<strong>Tech:</strong> Angular, TypeScript, Tailwind CSS, Angular Material, Docker, Nginx, Jasmine" ] },
      ],
    },
    {
      heading: "Vanguard", years: "2019 - 2022",
      roles: [
        { subheading: "Senior Frontend Developer · 2019 - 2022", content: [
          "Worked on a four-person team building a design system and shared frontend foundation for Vanguard Financial Advisor Services applications.",
          "• Built a web component library with custom element wrappers so the system could be used across Vue, Angular, and Adobe Experience Manager without separate framework-specific implementations.",
          "• Partnered with leadership and development teams during a division-wide rebrand to drive adoption of the design system and improve UI consistency across products.",
          "• Designed and built a Vue/NestJS reference application with CI, content structure, environment setup, and third-party integrations already in place, so teams could start from a working application instead of assembling the stack from scratch.",
          "• Set up AWS-based CI/CD pipelines for automated Storybook documentation deployments so teams had a shared place to reference the latest components and usage patterns.",
          "<strong>Tech:</strong> Vue.js, NestJS, Web Components, Storybook, Angular, Custom Elements, AWS, CI/CD" ] },
      ],
    },
    {
      heading: "Technical Writers, Inc.", years: "2017 - 2019",
      roles: [
        { subheading: "Web Application Developer · 2017 - 2019", content: [
          "Embedded with Agilent Technologies\u2019 R&D software engineering team as the primary frontend developer, building web-based instrument control interfaces shipped with Agilent hardware products.",
          "• Led frontend development for Agilent\u2019s Gas Chromatography web UI, including real-time WebSocket monitoring and two-way control using Sencha/Ext JS.",
          "• Designed custom SVG icons and CSS styling aligned with Agilent\u2019s product standards.",
          "• Built an automated Adobe RoboHelp output system across multiple product lines, supporting more than eight languages through template generation and command-line automation.",
          "<strong>Tech:</strong> JavaScript, Sencha/Ext JS, HTML5, CSS/SCSS, SVG, WebSockets, Adobe RoboHelp, Command-line scripting" ] },
      ],
    },
    {
      heading: "Trellist Marketing and Technology", years: "2014 - 2017",
      roles: [
        { subheading: "Digital Development Services · 2014 - 2017", content: [
          "Worked across agency projects spanning web, email, SharePoint, and internal enterprise systems for brands including Bank of America, David\u2019s Bridal, Chemours, Blue Cross Blue Shield Global, and DuPont.",
          "• Built responsive websites and landing pages for enterprise clients including Bank of America, David\u2019s Bridal, NASA Federal Credit Union, and Chemours.",
          "• Developed adaptive HTML email campaigns for Bank of America rewards and retention programs, with a focus on deliverability and cross-client consistency.",
          "• Served as Systems Owner for DuPont\u2019s SharePoint security auditing system, including weekly reporting and a server migration alongside IBM consultants.",
          "• Developed SharePoint intranet solutions for Chemours and Everything But Water.",
          "<strong>Tech:</strong> HTML5, CSS/SCSS, JavaScript, jQuery, SharePoint, Responsive Design, Email Development" ] },
      ],
    },
    {
      heading: "Technical Writers, Inc.", years: "2007 - 2014",
      roles: [
        { subheading: "Frontend Developer / Senior Technical Writer · 2007 - 2014", content: [
          "As a long-term embedded consultant with Agilent Technologies\u2019 R&D software engineering team, I worked across both frontend applications and technical documentation for global scientific instrument product lines.",
          "• Designed standalone web-based document delivery applications distributed by USB, DVD, and InstallShield-based installers.",
          "• Built custom HTML templates and automated build systems across multiple documentation sets for Gas Chromatography, Mass Spectrometry, and Sampler product lines.",
          "• Authored technical documentation in Adobe FrameMaker for print media and then converted it to web-ready HTML outputs.",
          "• Created UI icons, diagrams, and other visual assets for R&D teams.",
          "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe RoboHelp, Adobe FrameMaker, Adobe Illustrator, Adobe Photoshop" ] },
        { subheading: "Technical Writer / Web Developer · 2003 - 2005", content: [
          "Embedded on-site at AstraZeneca, supporting the global pharmaceutical regulatory submission team through documentation packaging and internal web development.",
          "• Designed and built the global regulatory intranet site to centralize team content.",
          "• Packaged regulatory and compliance documentation for official FDA submissions.",
          "• Managed project timelines and documentation workflows across the team.",
          "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe FrameMaker, Adobe Photoshop, Adobe Illustrator, Microsoft Project" ] },
      ],
    },
    {
      heading: "Wilmington Trust Company", years: "2000 - 2003",
      roles: [
        { subheading: "Tech Support, Level 1 · 2001 - 2003", content: [
          "Transitioned from an internship into a full-time support role, balancing first-level help desk responsibilities with serving as the primary developer for the division's intranet applications.",
          "• Redesigned and developed the IT Service & Support Division intranet website.",
          "• Designed and developed the Online Portfolio Trust Management Group intranet site.",
          "• Designed and developed a custom call logging front-end application with Microsoft Access, Visual Basic, and SQL Server, used in production across multiple service and support departments.",
          "• Provided first-level internal tech support for software, network accounts, and hardware.",
          "<strong>Tech:</strong> HTML, CSS, JavaScript, Flash, Microsoft Access, Visual Basic, SQL Server" ] },
        { subheading: "Intern, Online Portfolio Group · 2000 - 2001", content: [
          "While finishing my undergraduate degree at the University of Delaware, I supported the Online Portfolio Group on a production Microsoft Access call logging application and web development projects.",
          "<strong>Tech:</strong> HTML, CSS, JavaScript, Microsoft Access" ] },
      ],
    },
  ],

  additional: {
    heading: "Additional Experience",
    body: "In addition to my engineering career, music has been a major parallel career, including touring, studio tracking, sync placements, event work, and remote session recording. The deeper drum portfolio, current videos, selected credits, studio details, and booking information live at <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a>.",
  },
  education: {
    heading: "Education",
    body: "<strong>University of Delaware</strong><br>Bachelor of Science, Business Administration<br>Concentrations: Accounting and Finance<br><strong>College of Business & Economics</strong>",
  },
  skills: {
    languages: ["JavaScript", "TypeScript", "HTML5", "CSS/SCSS", "Python", "SQL"],
    frameworks: ["Angular", "Vue.js", "Nuxt 3", "NestJS", "Django", "Tailwind CSS", "Angular Material"],
    infrastructure: ["Node.js", "Nginx", "Docker", "AWS", "GitHub Actions", "Netlify", "DataDog", "Figma", "Cursor AI", "GitHub Copilot", "Claude Code"],
    concepts: ["Web Components", "Design Systems", "SSR", "Accessibility (WCAG)", "CI/CD", "State Management"],
  },

  music: {
    hero: {
      heading: "Musical Background",
      content: [
        "My background includes more than three decades of professional performance, primarily as a session and touring drummer, alongside tracking bass for independent studio releases.",
        "This page provides a timeline of that work. My active tracking portfolio, video clips, and full home studio production layout live on my drum site.",
      ],
      src: "assets/studio_kit.webp",
      cta: { label: "Visit my dedicated drum site", url: "https://tyleringersolldrums.com" },
      facts: [
        { v: "NYC · PHL · LA", l: "Tracked in" },
        { v: "Wind-up", l: "Label-signed" },
      ],
    },
    highlights: {
      heading: "Selected Highlights",
      content: [
        "Earlier in my career, I signed with Wind-up Records, toured nationally, and tracked drums in studios in New York, Philadelphia, and Los Angeles with producers and engineers including Don Gilmore, Gregg Wattenberg, Phil Nicolo, and Nick DiDia. That work included placements connected to the Fantastic Four soundtrack, Madden NFL 07, Super Bowl XLII broadcast usage, network television, radio airplay, and stadium playback.",
        "Today, my active drum work is focused on tracking, collaborations, and select live performance projects.",
      ],
      cta: { label: "View current videos, credits, and session details", url: "https://tyleringersolldrums.com" },
    },
    timeline: [
      { heading: "Sessions and Remote Drum Work", years: "2025 - Present", role: "Session Drummer · Kennett Square, PA", content: [
        "Focusing on session tracking and engineering hybrid acoustic-digital drum recordings from my home studio.",
        "• Engineered a hybrid tracking system combining multi-microphone acoustic capture for cymbals with synchronized MIDI triggers for drum shells.",
        "• Managed full signal paths, acoustic treatment, and hardware preamp configurations to deliver clean, mix-ready tracking assets.",
        "• Optimized digital delivery workflows to provide collaborators with organized, phase-aligned audio stems and MIDI data." ] },
      { heading: "Omnisoul Reunion", years: "2024", role: "Drummer · World Cafe Live, Philadelphia", content: [
        "Rejoined Omnisoul for a 20-year anniversary performance built around the band's album Happy Outside, with proceeds from the event donated to charity.",
        "• Performed a full retrospective set with the original band and guest musicians.",
        "• Played a separate set of songs that singer Derek Fuhrmann wrote for other artists, including Phillip Phillips, the Goo Goo Dolls, Kygo, and O.A.R.",
        "• Supported the archival re-release of Happy Outside, including remastered audio, bonus tracks, and updated artwork." ] },
      { heading: "Veteran Avenue", years: "2020", role: "Drummer · Studio session", content: [
        "Tracked live drums at The Deep End Studio in Baltimore for Brad Cox's Veteran Avenue project on the single \"Nothing Left to Burn.\" Produced and engineered by Tony Correlli." ] },
      { heading: "The Trellist Agency Band", years: "2015 - 2017", role: "Bassist", content: [
        "Played bass in the in-house band at Trellist, a marketing agency in Wilmington, DE. The band played shows at multiple tech industry events in Wilmington and Philadelphia." ] },
      { heading: "Skitzo Calypso", years: "2013", role: "Bassist · Studio session", content: [
        "Tracked bass on \"A Night in Hell & A Sunday Morning\" for Skitzo Calypso's LP Ghosts. Produced and engineered by Tony Correlli at The Deep End Studio. I had previously played bass and drums on the band's late-90s releases." ] },
      { heading: "SpeakerCity Band", years: "2010 - 2016", role: "Drummer, DJ, and Co-Founder", content: [
        "Co-founded and performed in a working event band that moved from the regional club circuit into corporate events, universities, weddings, private events, and a residency in Key West.",
        "• Played drums and handled DJ responsibilities across club, private, and corporate work.",
        "• Built and ran click-driven arrangements and live sequences that were used as part of the show." ] },
      { heading: "Curtiss Helldiver", years: "2006", role: "Drummer · Philadelphia", content: [
        "Played drums in a Philadelphia punk-rock band that ran alongside The Crash Motive, leaning into heavy live improvisation.",
        "• Won a battle of the bands at North Star Bar in Philadelphia.",
        "• Opened for Taylor Hawkins and the Coattail Riders." ] },
      { heading: "The Crash Motive", years: "2005 - 2008", role: "Drummer, Studio Musician & Founding Member", content: [
        "Signed with Wind-up Records, toured nationally, and recorded major-label releases after years of regional development and label showcases.",
        "• Signed a multi-album contract with Wind-up Records following competitive interest from major industry labels.",
        "• Tracked major-label releases at studios in New York, Philadelphia, and Los Angeles, working under the direction of producers and engineers including Don Gilmore and Gregg Wattenberg.",
        "• Opened for national touring acts and filmed a music video in Los Angeles.",
        "• Contributed to media licensing and broadcast placements, including the Fantastic Four soundtrack, Madden NFL 07, Super Bowl XLII broadcast usage, network television, national radio airplay, and stadium playback." ] },
      { heading: "Omnisoul", years: "2002 - 2005", role: "Drummer & Founding Member", content: [
        "Helped build a regional independent band from the college circuit into label showcases, radio momentum, and studio work.",
        "• Logged over a year of heavy radio rotation on WSTW 93.7 FM, including a station record for the most-requested song.",
        "• Tracked foundational studio demos with producer Phil Nicolo to generate competitive major-label interest.",
        "• Performed regional shows, college dates, and label showcases, including opening for Sugar Ray and playing multiple showcases across New York City." ] },
      { heading: "The Healthy Doses", years: "1999 - 2000", role: "Drummer", content: [
        "Played drums in an experimental jam band that built a local following around the University of Delaware and later moved onto larger outdoor stages and festival bills.",
        "• Played regularly at venues including Deer Park Tavern and The East End Cafe.",
        "• Shared festival bills with acts including The Disco Biscuits and Lake Trout, and performed at Phish\u2019s Camp Oswego festival.",
        "• Developed a stronger sense of listening, improvising, and shaping dynamics in real time." ] },
      { heading: "Early Bands and Studio Work", years: "1996 - 1998", role: "Drummer, Bassist, and Early Recording Collaborator", content: [
        "Started tracking drums and bass for independent regional alt-rock projects while playing live club dates.",
        "• Tracked both drum and bass parts across early independent EPs and full-length releases." ] },
    ],
    current: {
      heading: "Current Drum Work",
      body: "For current videos, remote session details, studio setup, credits, and booking information, visit my dedicated drum site.",
      cta: { label: "Visit tyleringersolldrums.com", url: "https://tyleringersolldrums.com" },
    },
  },

  architecture: [
    { id: "intro", heading: "Architecture", content: [
      "This site is a personal website built with Vue and Nuxt. Since most of my professional work lives in private enterprise systems, I use this project to show how I structure a frontend application, manage content, and handle performance and accessibility.",
      "• <strong>Nuxt 3 & Static Pre-rendering:</strong> Every page is pre-rendered to static HTML at build time, which keeps the site fast, simple to host, and easy for search engines to crawl.",
      "• <strong>Vue 3 Composition API:</strong> I use the Composition API and script setup to keep component logic easier to follow.",
      "• <strong>Pinia State Management:</strong> Dedicated stores manage static content distribution and global application theme states without prop drilling.",
      "• <strong>SCSS & CSS Custom Properties:</strong> The design system uses scoped SCSS modules and CSS custom properties to support theming and responsive layout.",
      "• <strong>SCSS Auto-injection via Vite:</strong> Variables and mixins are injected into each component\u2019s style block through Vite config, which keeps shared styling tools available without repetitive imports.",
      "• <strong>Page Transitions:</strong> A simple global fade transition is configured in <code>nuxt.config.ts</code>, with a dedicated partial handling the route transition classes." ] },
    { id: "performance", heading: "Performance & Lighthouse", content: [
      "This site is pre-rendered, keeps JavaScript light, and avoids extra dependencies where native browser behavior is sufficient. Lighthouse CI runs against every push and pull request, gating deploys behind 100 Performance, 95+ Accessibility, 90+ Best Practices, and 95+ SEO across every prerendered route." ],
      scores: [ { label: "Performance", value: 100 }, { label: "Accessibility", value: 100 }, { label: "Best Practices", value: 100 }, { label: "SEO", value: 100 } ],
      optimizations: [
        "• <strong>Pre-rendered HTML:</strong> Nuxt generates fully-formed HTML at build time, so browsers render content immediately without waiting for client-side JavaScript.",
        "• <strong>Optimized Image Pipeline:</strong> <code>@nuxt/image</code> generates responsive WebP variants at build time. Each <code>NuxtImg</code> ships a <code>srcset</code> so the browser pulls the smallest variant for the actual display size, and the hero image uses <code>fetchpriority=\"high\"</code> to win the LCP race.",
        "• <strong>Self-Hosted Fonts:</strong> <code>@nuxt/fonts</code> downloads Roboto Condensed at build time, inlines the <code>@font-face</code> declarations into the HTML, and generates size-adjusted fallback fonts so any pre-swap render does not shift the layout.",
        "• <strong>Deferred Analytics:</strong> Google Analytics loads through a client plugin scheduled via <code>requestIdleCallback</code>, so the gtag script never blocks the initial paint.",
        "• <strong>Inline SVG Icons:</strong> Every icon on the site is inlined directly into the component. Zero icon-font or icon-library requests.",
        "• <strong>Minimal JavaScript:</strong> No heavy UI libraries or animation frameworks. The bundle stays light by leaning on native browser APIs and Vite's default tree-shaking." ] },
    { id: "content-architecture", heading: "Content-Driven Architecture", content: [
      "All page content lives in a single <code>data/content.js</code> file as a plain JavaScript export. A Pinia store wraps it so components can access the content they need without passing data through multiple layers.",
      "It is a simple content-driven setup that keeps structure and presentation separate. If I ever wanted to swap this for a CMS or an external API, that change would mostly happen in the store layer rather than across the component tree.",
      "The pre-render config in <code>nuxt.config.ts</code> only includes routes that exist in the data layer, which keeps the build output predictable." ] },
    { id: "anti-fouc", heading: "Anti-FOUC Theme Initialization", content: [
      "Theme persistence is handled by a Pinia store that reads <code>localStorage</code> and applies a <code>.light-mode</code> class to the root element. The issue is that Pinia initializes after first paint, so returning users could briefly see the wrong theme on load.",
      "To avoid that flash, I inject a small inline script into the document head through <code>app.head.script</code> in <code>nuxt.config.ts</code>. It runs before the page renders, checks <code>localStorage</code>, and applies the saved theme immediately." ] },
    { id: "deep-linking", heading: "Hash-Based Deep Linking", content: [
      "The resume timeline supports URL hash navigation, so a link like <code>/resume#best-egg</code> opens the relevant employer section and scrolls directly to it.",
      "The implementation watches <code>route.hash</code>, matches it against a slugified employer heading, and adds the relevant entries to an <code>expandedRoles</code> Set. A custom <code>useScrollToHash</code> composable waits for the DOM to finish updating before calculating scroll position, and it accounts for the sticky header so section headings are not hidden." ] },
    { id: "cicd-delivery", heading: "CI/CD & Edge Delivery", content: [
      "Every push and pull request runs through GitHub Actions before anything reaches production. Two workflows guard the main branch:",
      "• <strong>Unit Tests:</strong> Vitest runs the full suite on every commit, then uploads coverage to Codecov so the README badge reflects current state.",
      "• <strong>Lighthouse CI:</strong> The workflow builds the site, serves it on the runner, and audits each route. A build fails if any page drops below 100 Performance, 95 Accessibility, 90 Best Practices, or 95 SEO. Regressions never reach <code>main</code>.",
      "Production deploys are handled by Netlify. A push to <code>main</code> triggers a fresh static generate that gets served from Netlify\u2019s global CDN." ] },
    { id: "url-handling", heading: "URL Handling & SEO", content: [
      "URLs that lead to the same page should resolve in one hop, not two. Two pieces work together to make that true.",
      "• <strong>Trailing-Slash Rewrites:</strong> Netlify\u2019s default behavior 301-redirects <code>/music</code> to <code>/music/</code> when it finds a subdirectory. The <code>netlify.toml</code> rewrites use status 200 instead, so the no-trailing-slash form serves the file directly.",
      "• <strong>Canonical Tags:</strong> A small <code>useHead</code> setup in <code>app.vue</code> injects a <code>rel=\"canonical\"</code> link on every prerendered route, computed from the current path." ] },
    { id: "testing", heading: "Testing & Coverage", content: [
      "The site is covered by a Vitest unit suite running in the Nuxt test environment with happy-dom. Components, pages, stores, the layout, the router scroll behavior, the theme plugin, and the scroll-to-hash composable all have their own specs.",
      "• <strong>Vitest + @nuxt/test-utils:</strong> Tests boot a real Nuxt context via <code>mountSuspended</code>, so auto-imports, composables, and Pinia all resolve the same way they do at runtime.",
      "• <strong>Coverage Targets:</strong> The v8 coverage reporter tracks every source file. The suite hits 99% lines, 99% statements, 99% functions, and 91% branches.",
      "• <strong>Focus on Behavior:</strong> Tests assert rendered output, route-driven state, and user interactions rather than implementation details." ] },
    { id: "accessibility", heading: "Accessibility (A11Y)", content: [
      "Accessibility was part of the build from the start.",
      "• <strong>Skip Navigation:</strong> A skip-to-content link lets keyboard and screen reader users bypass the header and jump straight to the page content.",
      "• <strong>Semantic HTML:</strong> Proper heading hierarchy, landmark elements, and native interactive controls throughout.",
      "• <strong>Keyboard Navigation:</strong> Every interactive element, including the expanding resume timeline and mobile navigation, is fully operable via keyboard with visible focus indicators.",
      "• <strong>Inert on Collapsed Panels:</strong> The timeline uses the <code>inert</code> attribute on collapsed content panels rather than just <code>aria-hidden</code>.",
      "• <strong>Reduced Motion:</strong> A global <code>prefers-reduced-motion</code> media query disables animations and transitions for users who request it.",
      "• <strong>Dual-Theme Contrast:</strong> Both the dark and light themes use color pairings chosen to maintain readable contrast ratios." ] },
  ],

  footer: {
    legal: [
      "Copyright \u00a92026 Tyler Ingersoll. All rights reserved.",
      "Built with Vue & Nuxt 3 (<a href='Architecture.html'>View Site Architecture</a>). Hosted on Netlify.",
    ],
  },
};

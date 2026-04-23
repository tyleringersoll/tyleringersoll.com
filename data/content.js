export default {
  content: {
    meta: {
      name: "Tyler Ingersoll",
      tag: "<span>Frontend engineer</span> <span>/</span> <span>Musician</span>"
    },
    navigation: [
      { name: "Home", url: "/" },
      { name: "Resume", url: "/resume" },
      { name: "Music", url: "/music" },
      { name: "Architecture", url: "/architecture" }
    ],
    home: [
      {
        id: "hero",
        heading: "Hi, I’m Tyler",
        headingLevel: 2,
        content: [
          "I lead an engineering team focused on building reliable, customer-facing applications that help millions of people. Over the years, I’ve built enterprise frontend solutions for brands like Vanguard, Bank of America, and DuPont.",
          "Outside of work, I’m likely found behind a drumset in my studio. I’ve spent the last three decades touring, recording with a label-supported band, and producing music. Today, I track drums from my home studio in Pennsylvania.",
        ]
      },
      {
        id: "what-i-do",
        heading: "What I do",
        headingLevel: 2,
        content: []
      },
      {
        id: "engineering",
        heading: "Engineering",
        headingLevel: 4,
        content: [
         "I build frontend applications using frameworks like Vue and Angular, or lighter, native web technologies when the project calls for it. My work spans everything from high-volume landing pages and payment flows to specialized fintech integrations and real-time hardware control software. Over the years, I’ve touched almost every corner of the frontend ecosystem—whether that means rolling out division-wide design systems or modernizing legacy architectures so they can scale securely.",
          "<a href='/resume'>View my full resume →</a>"
        ]
      },
      {
        id: "music",
        heading: "Music",
        headingLevel: 4,
        content: [
          "I've played drums professionally for over three decades, spending my time touring and recording under label support, and then anchoring large-scale events from the Mid-Atlantic down to Key West."
        ]
      },
      {
        id: "beyond",
        heading: "Beyond work",
        headingLevel: 3,
        content: [
          "When I’m not writing code or tracking drums, you can usually find me riding one of my bikes, or trying to keep up with my two kids. I’m a craft beer and bourbon fan, enjoy firing up the grill, and am based in southeastern Pennsylvania."
        ]
      }
    ],
    homePage: {
      hero: {
        eyebrow: "Frontend Architect & Engineering Leader"
      },
      engineering: {
        competenciesLabel: "Competencies",
        competencies: [
          { icon: "layers", label: "Frontend Architecture", url: "/resume#best-egg" },
          { icon: "grid", label: "Design Systems", url: "/resume#vanguard" },
          { icon: "shield", label: "Identity & Security", url: "/resume#best-egg" },
          { icon: "credit-card", label: "Payment Platforms", url: "/resume#best-egg" },
          { icon: "code", label: "Fintech Integration", url: "/resume#best-egg" }
        ],
        clientsLabel: "Featured Work",
        clients: [
          { name: "Best Egg", description: "Identity & Payment Platforms at Scale", url: "/resume#best-egg" },
          { name: "Vanguard", description: "FAS Design System & SPA Framework", url: "/resume#vanguard" },
          { name: "Agilent Technologies", description: "Instrument Control UI & Data Visualization", url: "/resume#technical-writers-inc" }
        ],
        cta: "View my full resume"
      },
      music: {
        studioLabel: "Hybrid Drum Tracking Setup",
        studio: {
          text: "Now, I track remote sessions and shoot video content using a hybrid drum setup that pairs live cymbals with nearly-silent mesh drum heads. By using triggers to capture the exact performance as clean MIDI data, this setup delivers the best of both worlds: the human energy of a live performance, the punch and saturation of real cymbals through API preamps, and total digital control to swap drum sounds using any library you choose.",
          url: "https://tyleringersolldrums.com",
          external: true,
          ctaText: "Explore my drum studio"
        },
        cta: "Learn more about my music"
      },
      beyond: {
        cards: [
          { icon: "bicycle", label: "Cyclist", sub: "Road, Gravel, MTB", detail: "I ride year-round on a mix of road, gravel, and mountain bikes across Chester County and beyond.", url: "https://www.strava.com/athletes/3303002", external: true },
          { icon: "users", label: "Family", sub: "Parent of Two", detail: "Most weekends revolve around my two kids, whether that means soccer games, bike rides, or building something in the yard.", url: null },
          { icon: "beer", label: "Enthusiast", sub: "Craft Beer & Bourbon", detail: "I keep a running list of favorite local breweries and always have a solid bourbon on the shelf.", url: null },
          { icon: "map-pin", label: "Local", sub: "Kennett Square, PA", detail: "We live in the Mushroom Capital of the World, surrounded by Brandywine Valley farmland and great trails.", url: null }
        ]
      },
      connect: {
        heading: "Let’s Collaborate",
        subtext: "Engineering, drumming, or just to say hello.",
        cta: "Get in Touch"
      }
    },
    architecture: [
      {
        id: "intro",
        heading: "Architecture",
        headingLevel: 2,
        content: [
          "Think of this site as a living component library and open-source sandbox. Because most of my daily production code is locked behind enterprise firewalls, I designed this layout to balance my engineering background with my session drum work. Built with Vue 3 and Nuxt, it hits the sweet spot between developer ergonomics and production-grade SSR performance.",
          "• <strong>Nuxt 3 & Static Pre-rendering:</strong> Every page is pre-rendered to static HTML at build time, delivering instant first paints and full SEO without a running Node.js server.",
          "• <strong>Vue 3 Composition API:</strong> Component logic is organized with the Composition API and script setup, keeping state management and reactivity clean and composable.",
          "• <strong>Pinia State Management:</strong> A Pinia store wraps the static content file and a separate store manages theme state, keeping both reactive and accessible anywhere in the component tree without prop drilling.",
          "• <strong>SCSS & CSS Custom Properties:</strong> A hand-rolled design system using scoped SCSS modules and CSS custom properties powers the dual-theme color system and responsive layout.",
          "• <strong>SCSS Auto-injection via Vite:</strong> Variables and mixins are injected into every component's style block automatically via Vite's <code>preprocessorOptions.additionalData</code> config. No <code>@import</code> needed in any <code>.vue</code> file. It is a developer ergonomics decision that eliminates boilerplate without changing the output.",
          "• <strong>Page Transitions:</strong> A global fade transition is configured via <code>pageTransition</code> in <code>nuxt.config.ts</code>, with a dedicated <code>_fade.scss</code> partial handling the enter/leave animation classes Nuxt applies during route changes.",
        ]
      },
      {
        id: "performance",
        heading: "Performance & Lighthouse",
        headingLevel: 2,
        content: [
          "Leading an engineering team means treating performance as a fundamental requirement, not an afterthought. I brought that same standard to this site. Pre-rendering every route at build time and keeping the JavaScript payload minimal means consistently strong metrics on live audits."
        ],
        scores: [
          { label: "Performance", value: 100 },
          { label: "Accessibility", value: 100 },
          { label: "Best Practices", value: 100 },
          { label: "SEO", value: 100 }
        ],
        optimizations: [
          "• <strong>Pre-rendered HTML:</strong> Nuxt generates fully-formed HTML at build time, so browsers render content immediately without waiting for client-side JavaScript.",
          "• <strong>Inline SVGs:</strong> The hero illustration is built with clean, hand-coded SVG markup directly in the template, eliminating external image requests and preventing layout shifts.",
          "• <strong>Minimal JavaScript:</strong> No heavy UI libraries or animation frameworks. The bundle stays light by leaning on native browser APIs and Vite's default tree-shaking."
        ]
      },
      {
        id: "content-architecture",
        heading: "Content-Driven Architecture",
        headingLevel: 2,
        content: [
          "All page content lives in a single <code>data/content.js</code> file as a plain JavaScript export. A Pinia store wraps it to make it reactive and globally accessible. Every page uses <code>storeToRefs</code> and <code>computed</code> to derive the exact content slice it needs, with no prop drilling and no repeated data fetching.",
          "This is a deliberate CMS-without-a-CMS pattern. The separation of concerns mirrors what a headless CMS provides: content is authored in one place, the store is the delivery layer, and components are pure renderers. Swapping in a real API or a CMS integration would only require updating the store, leaving every component untouched.",
          "The pre-render config in <code>nuxt.config.ts</code> lists only the routes that exist in the data layer, keeping the build output predictable and the deployment surface minimal."
        ]
      },
      {
        id: "anti-fouc",
        heading: "Anti-FOUC Theme Initialization",
        headingLevel: 2,
        content: [
          "Theme persistence is handled by a Pinia store that reads <code>localStorage</code> and applies a <code>.light-mode</code> class to the html element. But Pinia initializes after the page paints, which means returning users with light mode saved would see a flash of the dark theme on every load.",
          "The fix is a blocking inline script injected into the head via the <code>app.head.script</code> array in <code>nuxt.config.ts</code>. It runs synchronously before any HTML renders, reads <code>localStorage</code>, and applies <code>.light-mode</code> immediately if needed. The script executes in under a millisecond and prevents any visible flash. Without it, the Pinia-driven approach would be correct but visually broken on every page load for light-mode users."
        ]
      },

      {
        id: "deep-linking",
        heading: "Hash-Based Deep Linking",
        headingLevel: 2,
        content: [
          "The resume timeline supports URL hash navigation. Visiting /resume#best-egg automatically expands all of that employer's roles and scrolls to the section. The homepage links to specific employers this way, so the experience feels like navigating directly into a document rather than landing on a page and hunting for content.",
          "The implementation watches <code>route.hash</code>, matches it against a slugified employer heading, and adds the matching entries to an <code>expandedRoles</code> Set. It then calls a custom <code>useScrollToHash</code> composable that uses <code>nextTick</code> plus <code>requestAnimationFrame</code> to wait for the DOM before computing scroll position. The offset calculation accounts for the sticky header height so the section heading is never obscured on arrival."
        ]
      },
      {
        id: "cicd-delivery",
        heading: "CI/CD & Edge Delivery",
        headingLevel: 2,
        content: [
          "I treat deployment and infrastructure as core components of the frontend architecture. This repository is connected to an automated CI/CD pipeline. Every push triggers a strict build process that generates immutable, pre-rendered static assets, which are then distributed globally via Netlify's edge CDN. This guarantees instant cache invalidation on deployments and maximum availability for end users."
        ]
      },
      {
        id: "accessibility",
        heading: "Accessibility (A11Y)",
        headingLevel: 2,
        content: [
          "Building for massive user bases at work taught me that digital quality means building for everyone. I built this site with accessibility as a baseline, not an afterthought.",
          "• <strong>Skip Navigation:</strong> A skip-to-content link lets keyboard and screen reader users bypass the header and jump straight to the page content.",
          "• <strong>Semantic HTML:</strong> Proper heading hierarchy, landmark elements, and native interactive controls throughout.",
          "• <strong>Keyboard Navigation:</strong> Every interactive element, including the expanding resume timeline and mobile navigation, is fully operable via keyboard with visible focus indicators. The mobile menu traps focus while open and closes on Escape.",
          "• <strong>Inert on Collapsed Panels:</strong> The timeline uses the <code>inert</code> attribute on collapsed content panels, not just <code>aria-hidden</code>. <code>aria-hidden</code> removes content from the accessibility tree. <code>inert</code> goes further, removing keyboard focus, pointer events, and accessibility tree presence in a single attribute. It is the correct modern primitive for this pattern.",
          "• <strong>Reduced Motion:</strong> A global <code>prefers-reduced-motion</code> media query disables animations and transitions for users who request it.",
          "• <strong>ARIA Where It Counts:</strong> Custom components like the timeline toggle, theme switch, and mobile menu use appropriate roles, labels, and state attributes for assistive technologies.",
          "• <strong>Dual-Theme Contrast:</strong> Both the dark and light themes use color pairings chosen to maintain readable contrast ratios."
        ]
      },

    ],
    resume: [
      {
        heading: "Resume",
        headingLevel: 2,
        content: [
          "Frontend architect and engineering leader guiding technical strategy and delivering scalable applications. My background spans fintech, scientific instrumentation, and enterprise software, where I modernize legacy architectures, build enterprise design systems, and manage critical third-party integrations."
        ]
      },
      {
        heading: "Engineering Leadership & Development",
        headingLevel: 2,
        content: []
      },
      {
        heading: "Best Egg",
        headingLevel: 3,
        years: "2022 - Present",
        lead: "Leading engineering across core customer platforms, including identity verification, payment processing, and authentication.",
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "Hands-on engineering leader for a customer-facing cross-functional team. I balance active frontend development (~50% IC) with team management, architectural strategy, and cross-functional alignment.",
              "• Partner directly with product managers and stakeholders to define technical priorities, establish delivery timelines, and distribute resources across backend and frontend initiatives.",
              "• Manage the engineering lifecycle and professional development for a single, dedicated team, scaling capacity to meet the demands of our customer-facing verification, servicing, and authentication platforms.",
              "• Guide technical direction and delivery for core customer platforms, contributing directly to high-visibility frontend feature work.",
              "• Contributed to the adoption of Cursor AI and GitHub Copilot across the engineering organization, establishing standards that accelerated feature delivery and standardized code quality.",
              "<strong>Tech:</strong> Angular, TypeScript, DataDog, Figma, Miro, Jira, Confluence, FullStory"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer II · 2024 - 2026",
            content: [
              "Took ownership of frontend architecture and roadmap planning, partnering directly with product and UX while mentoring engineers across the company.",
              "• Managed the technical lifecycle for critical third-party fintech integrations like MX and Method Financial, driving the process from frontend architectural design through production rollout.",
              "• Strengthened frontend security by implementing a Level 3 Content Security Policy (CSP) utilizing dynamic nonces, and operationalized the deployment by integrating violation reporting and alerting through DataDog.",
              "<strong>Tech:</strong> Angular, TypeScript, Node.js, Python, Django, Cursor AI, GitHub Copilot"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer I · 2022 - 2024",
            content: [
              "Modernized legacy Angular codebases and built the foundation our teams use today. Updated the architecture and libraries and established lasting development patterns.",
              "• Drove an architectural update that implemented lazy-loaded modules, reduced main bundle sizes, and migrated the platform from Bootstrap to Angular Material.",
              "• Collaborated to architect and launch No-Auth Quick Pay and automated payment scheduling, simplifying the payment experience for customers.",
              "• Golden Egg Award for \"BE a Builder of Great Teams\" (Q3 2023).",
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
              "As a senior frontend developer for Vanguard's Financial Advisor Services marketing department, I led the engineering of a comprehensive design system within a four-person team, building the core component library to support thousands of advisors across applications serving millions of daily users.",
              "• Guided the technical implementation of the FAS design system during a division-wide rebrand, ensuring UI consistency across all teams.",
              "• Built a web component library with custom element wrappers to allow seamless integration across Vue, Angular, and Adobe Experience Manager. This eliminated the need for framework-specific design system support teams.",
              "• Designed and built a Vue.js/NestJS application prototype that was adopted as the standard foundation for all FAS single-page applications.",
              "• Set up AWS-based CI/CD pipelines to automate internal Storybook-based documentation deployments, establishing transparency and guidelines across FAS development teams.",
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
              "Embedded with Agilent Technologies's R&D software engineering team as the sole frontend specialist, building web-based instrument control interfaces shipped globally with Agilent's flagship hardware product lines.",
              "• Drove the frontend development for Agilent's Gas Chromatography web UI, partnering with a large engineering team to implement real-time WebSocket monitoring and control using Sencha/Ext JS.",
              "• Created data visualization for live instrument data graphing and visual hardware configuration displays.",
              "• Designed custom SVG icons and CSS styling aligned with Agilent's product design standards.",
              "• Designed an automated build system for Adobe RoboHelp documentation across multiple product lines. This supported over eight languages with dynamic template generation and command-line automation.",
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
              "Delivered web, email, and enterprise solutions across multiple agency projects for Fortune 500 brands including Bank of America, David's Bridal, Chemours, Blue Cross Blue Shield Global, and DuPont, ultimately reaching tens of millions of users.",
              "• Built responsive websites and landing pages for enterprise clients like Bank of America, David's Bridal, NASA Federal Credit Union, and Chemours.",
              "• Developed adaptive HTML email campaigns for Bank of America's rewards and retention programs, optimizing for deliverability and cross-client compatibility.",
              "• Acted as Systems Owner for DuPont's SharePoint security auditing system, managing weekly reports and a server migrations alongside IBM consultants.",
              "• Developed SharePoint intranet solutions for Chemours and Everything But Water.",
              "• Managed off-hours, time-sensitive deployments for highly sensitive internal communications with Chemours leadership.",
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
              "As a long-term embedded consultant with Agilent Technologies's R&D software engineering team, I delivered frontend applications and technical documentation for global scientific instrument product lines.",
              "• Designed standalone web-based document delivery applications distributed via USB, DVD, or installed via InstallShield for global product lines.",
              "• Architected custom HTML templates and automated build systems, streamlining multi-product documentation delivery across Gas Chromatography, Mass Spectrometry, and Sampler product lines.",
              "• Authored technical documentation using Adobe FrameMaker and converted it to web-ready HTML.",
              "• Created software UI icons, technical diagrams, and visual assets for R&D teams.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe RoboHelp, Adobe FrameMaker, Adobe Illustrator, Adobe Photoshop"
            ]
          },
          {
            subheading: "Technical Writer / Web Developer · 2003 - 2005",
            content: [
              "Embedded on-site at AstraZeneca; supported the global pharmaceutical regulatory submission team by packaging official FDA submissions and contributing to their global regulatory intranet site.",
              "• Designed and built the global regulatory intranet site to centralize team content and establish an internal digital presence.",
              "• Packaged complex regulatory and compliance documentation for official FDA submissions.",
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
            subheading: "IT Division Intranet Webmaster · 2001 - 2003",
            content: [
              "Started as an intern and earned the full-time IT Division Intranet Webmaster role, designing and building internal web applications used in production across the division.",
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
          "Prior to engineering, built a 30-year career as a professional touring and session drummer. Scaled an independent act to national syndication with major label support (Wind-up Records), secured sync placements in network television, and managed regional business operations for a highly active event band. See full discography and timeline at <a href='/music'>/music</a>."
        ]
      },
      {
        heading: "Education",
        headingLevel: 2,
        content: [
          "<strong>University of Delaware</strong><br>Bachelor of Science, Business Administration<br>Concentrations: Accounting and Finance<br><em>College of Business & Economics</em>"
        ]
      },
      {
        heading: "Technical Skills",
        headingLevel: 2,
        skills: {
          languages: ["JavaScript", "TypeScript", "HTML5", "CSS/SCSS", "Python", "SQL"],
          frameworks: ["Angular", "Vue.js", "Nuxt 3", "NestJS", "Django", "Tailwind CSS", "Angular Material"],
          infrastructure: ["Node.js", "Nginx", "Docker", "AWS", "GitHub Actions", "Netlify", "DataDog", "Figma", "Cursor AI", "GitHub Copilot"],
          concepts: ["Web Components", "Design Systems", "SSR", "Accessibility (WCAG)", "CI/CD", "State Management", "Content Security Policy"]
        }
      }
    ],
    music: [
      {
        headingLevel: 2,
        heading: "Music & Production",
        content: [
          "My approach to tracking is built on 30 years of live performance and major-label studio discipline. Today, I record using a custom hybrid drumset in my studio designed to deliver the exact stage performance with the absolute precision of digital production."
        ]
      },
      {
        headingLevel: 2,
        type: "hero-image",
        src: "/images/studio_kit.jpeg",
        alt: "Hybrid drum kit in Tyler's home studio"
      },
      {
        heading: "The Hybrid Rig",
        headingLevel: 2,
        content: [
          "After taking a step back from professional drum work for nearly a decade, a 2024 reunion show with Omnisoul at World Cafe Live Philly brought everything I loved about drums back into focus. It led directly to building the recording rig I use today in my home studio: a custom hybrid setup engineered for professional remote tracking.",
          "The kit uses nearly silent mesh drum heads. When a mesh head is struck, it fires a piezo trigger through the eDRUMin interface, which converts each hit into precise, low-latency MIDI note data. That MIDI feeds directly into my DAW for sample selection, mixing, and any post-performance editing the session requires. Nothing is approximated. Every dynamic nuance is captured.",
          "The cymbals are acoustic Zildjians, live in my acoustically-treated dead room, running through an API 3124V preamp and Universal Audio x8 digital conversion. The API preamp preserves the full overtone wash of the acoustic source with legendary saturation and clarity. The result pairs the natural cymbal bloom of a live drum room with total digital control over every drum hit — the combination producers actually need."
        ]
      },
      {
        heading: "Explore the Studio",
        headingLevel: 3,
        content: [
          "To see the hybrid rig in action, view my gear list, check out my latest covers, or review my full 30-year discography, visit my dedicated studio site."
        ],
        cta: {
          label: "Visit tyleringersolldrums.com",
          url: "https://tyleringersolldrums.com",
          external: true
        }
      },
      {
        headingLevel: 2,
        heading: "Discography & Recognition",
        albums: [
          { title: "The Crash Motive — Consequence", year: "2007", label: "Wind-up Records", image: "/images/thecrashmotive_consequence.webp", alt: "The Crash Motive – Consequence", url: "https://youtube.com/playlist?list=OLAK5uy_lOh9gG0GIkTXg2aFo5j4g97_C2AysYEpE&si=rPypzHo8Ptd-fLdb" },
          { title: "Fantastic Four: The Album", year: "2005", label: "Wind-up Records", image: "/images/fantastic4_thealbum.webp", alt: "Fantastic Four: The Album", url: "https://youtu.be/WvEj9uWOo04?si=7XOafsoygKkG2uF6" },
          { title: "Omnisoul — Happy Outside", year: "2004", label: "Independent", image: "/images/omnisoul_happyoutside.webp", alt: "Omnisoul – Happy Outside", url: "https://youtube.com/playlist?list=OLAK5uy_kyIVrwfzRWBveu2Tq6yNvsb8rYzj5fqVE&si=yAKZ_yXK7p4jgEj6" },
          { title: "Omnisoul — Climbing Ladders", year: "2002", label: "Independent", image: "/images/omnisoul_climbingladders.jpg", alt: "Omnisoul — Climbing Ladders", url: null }
        ],
        placements: [
          "Super Bowl XLII",
          "Madden NFL 2007",
          "Fantastic Four (2005 Film)",
          "CBS — Joan of Arcadia",
          "NBC — Friday Night Lights",
          "ESPN NFL Live",
          "30+ NFL / MLB / NCAA / NHL stadiums"
        ],
        recording: "<em>Consequence</em> (LP, 2007). Produced by Don Gilmore and Gregg Wattenberg. Tracked at Avatar Studios, New York City and The Pass Recording Studio, Los Angeles. Mixed by Bob Clearmountain and Mark Endert. Mastered by Ted Jensen at Sterling Sound. Wind-up Records. Drum! magazine: &ldquo;demonstrates the sort of pop-with-power sensibility that career dreams are made of.&rdquo;<br><br><em>Fantastic Four: The Album</em> (Soundtrack, 2005). Omnisoul&rsquo;s &ldquo;Waiting (Save Your Life)&rdquo; appeared on this Wind-up Records release alongside a full major-label roster. Drums tracked at Avatar Studios, New York City.<br><br><em>Happy Outside</em> (LP, 2004). Self-produced and recorded between touring stints in 2003 and 2004. Mixed by Grammy-winning engineer Phil Nicolo at Studio 4, Conshohocken, PA. Nicolo also stepped in to track the standout single, &ldquo;Waiting (Save Your Life).&rdquo;<br><br><em>Climbing Ladders</em> (LP, 2002). Independently released and recorded."
      },
      {
        heading: "Timeline",
        headingLevel: 2,
        content: []
      },
      {
        heading: "Remote/Hybrid Studio",
        headingLevel: 3,
        years: "2024 - Present",
        roles: [
          {
            subheading: "Producer & Session Drummer · 2024 - Present",
            content: [
              "• Launched a professional remote tracking studio following two years of intensive research and iterative engineering to perfect a custom hybrid recording rig.",
              "• Bridge the gap between acoustic character and digital control by tracking live Zildjian cymbals through a dedicated API 3124 analog chain, paired with a flawless MIDI translation triggered by physical hits on mesh heads via an eDRUMin 8 interface.",
              "• Provide real-time remote co-production, streaming high-quality studio audio and video directly to client monitors to dial in arrangements on the fly.",
              "• Deliver mix-ready 24-bit / 96kHz WAV files and raw MIDI data within a one-week turnaround, offering clients live cymbal audio, full post-production flexibility, and optional direct bass tracking."
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
            subheading: "Drummer, DJ, & Co-Founder · 2010 - 2016",
            content: [
              "Co-founded and scaled a highly active event band, transitioning from the regional club circuit to high-end corporate events, large-scale universities, and week-long residencies in Key West.",
              "• Performed as drummer and DJ at weddings, corporate events, and club venues throughout the Mid-Atlantic.",
              "• Composed and produced musical sequences with click tracks, serving as the production backbone for live performances.",
              "• Handled business tax filings as part of shared co-founder responsibilities."
            ]
          }
        ]
      },
      {
        heading: "The Crash Motive (formerly Omnisoul)",
        headingLevel: 3,
        years: "2002 - 2008",
        roles: [
          {
            subheading: "Drummer, Studio Musician & Founding Member · 2002 - 2008",
            content: [
              "Scaled an independent college act into a national touring rock band with label support, securing a comprehensive deal with Wind-up Records in 2005 and rebranding as The Crash Motive.",
              "• Built a strong regional following early on, winning the University of Delaware's Battle of the Bands and holding a 31-day #1 requested song run on WSTW 93.7.",
              "• Performed drum parts on studio recordings and arranged drum compositions for albums and singles.",
              "• Toured nationally and performed extensively at major venues, opening for recognized acts like Sugar Ray, The All-American Rejects, Collective Soul, and Lifehouse.",
              "• Secured high-profile sync placements, including Super Bowl XLII, Madden NFL 2007, and The Fantastic Four soundtrack.",
              "• Placed music in network television programming, including CBS's Joan of Arcadia, NBC's Friday Night Lights promos, and ESPN's NFL Live.",
              "• Licensed music for use in over 30 professional sports stadiums across the NFL, MLB, NCAA, and NHL.",
              "• Negotiated and managed business partnerships with label executives, booking agents, and licensing representatives."
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
            subheading: "Drummer · 1999 - 2000",
            content: [
              "• Anchored a pioneering experimental jam band, building a massive local following at staple University of Delaware venues including Deer Park Tavern and The East End Cafe.",
              "• Scaled from the college circuit to outdoor stages, sharing festival bills with national acts like The Disco Biscuits and Lake Trout, and performing at Phish's 65,000-capacity Camp Oswego festival.",
              "• Treated the relentless touring schedule as a masterclass in live performance, honing skills in listening, improvising, and mastering dynamic control to live in the moment rather than just keeping time.",
            ]
          }
        ]
      },
      {
        heading: "Skitzo Calypso",
        headingLevel: 3,
        years: "1996 - 1998",
        roles: [
          {
            subheading: "Drummer & Bassist · 1996 - 1998",
            content: [
              "Began serious studio work with this alt-hard rock project, playing drums and bass and tracking multiple full-length independent records."
            ]
          }
        ]
      },
    ],
    icons: {
      close: "<svg xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"xmlns=\"http://www.w3.org/2000/svg\"xmlns:cc=\"http://creativecommons.org/ns#\"xmlns:dc=\"http://purl.org/dc/elements/1.1/\"xmlns:svg=\"http://www.w3.org/2000/svg\"xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"xmlns:ns1=\"http://sozi.baierouge.fr\"xmlns:xlink=\"http://www.w3.org/1999/xlink\"id=\"svg2\"viewBox=\"0 0 744.09 1052.4\"version=\"1.1\"><g id=\"layer1\"><path id=\"svg-bg\" class=\"svg-bg\" d=\"m814.29 606.65a314.29 314.29 0 1 1 -628.57 0 314.29 314.29 0 1 1 628.57 0z\" stroke=\"#000\" stroke-width=\"5\" transform=\"matrix(1.1048 0 0 1.1048 -179.21 -162.53)\"/><g id=\"g3763\" transform=\"matrix(.91837 0 0 .91837 47.587 10.944)\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-width=\"133.87\" fill=\"none\" > <path id=\"path2991\" class=\"svg-x\" d=\"m176.51 362.87 356.13 356.13\" /> <path id=\"path2993\" class=\"svg-x\" d=\"m532.64 362.87-356.13 356.13\" /></g></g></svg>"
    },
    footer: {
      socialHeading: "Connect with me",
      socialTagline: "If you want to talk engineering or book a remote drum session, <a href='/contact'>get in touch →</a>",
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
        "Copyright ©{YEAR} <a href='https://tyleringersoll.com'>Tyler Ingersoll</a>. All rights reserved.",
        "This page is developed with <a href='https://vuejs.org/' target='_blank'>Vue.js</a> and hosted on <a href='https://www.netlify.com/' target='_blank'>Netlify</a>."
      ]
    }
  }
};
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
          "I lead an engineering team building customer-facing applications.",
          "Outside of work, I’m a professional drummer. I’ve spent the last three decades touring, recording, and playing live, and today I run a custom hybrid drum studio in Pennsylvania."
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
          "I build frontend applications using frameworks like Vue and Angular, and I still like working close to the browser when a lighter solution makes more sense. My work has ranged from high-traffic marketing experiences and payment flows to fintech integrations, design systems, and specialized interfaces for scientific hardware. A lot of that work has involved modernizing legacy frontend architecture so teams can build and ship without creating problems elsewhere.",
          "<a href='/resume'>View my full resume →</a>"
        ]
      },
      {
        id: "music",
        heading: "Music",
        headingLevel: 4,
        content: [
          "I’ve played drums professionally for over three decades, with a background in touring, studio recording, and live event work. These days I spend less time on the road and more time recording in my home studio, where I’ve built a hybrid setup around real cymbals and shell sounds that can be shaped to the track."
        ]
      },
      {
        id: "beyond",
        heading: "Beyond work",
        headingLevel: 3,
        content: [
          "When I’m not writing code or tracking drums, I’m usually riding one of my bikes, doing something with my kids, or working on something around the house. I’m based in southeastern Pennsylvania and spend a lot of time outdoors when I can."
        ]
      }
    ],
    homePage: {
      hero: {
        eyebrow: "Engineering Leader"
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
          { name: "Best Egg", description: "Identity and payment platform work", url: "/resume#best-egg" },
          { name: "Vanguard", description: "FAS Design System & SPA Framework", url: "/resume#vanguard" },
          { name: "Agilent Technologies", description: "Instrument control UI and data visualization", url: "/resume#technical-writers-inc" }
        ],
        cta: "View my full resume"
      },
      music: {
        studioLabel: "Hybrid Drum Tracking Setup",
        studio: {
          text: "I built a hybrid drum tracking setup to solve a practical problem: I wanted the sound and feel of real cymbals without the bleed, volume, and phase problems that come with recording a full acoustic kit in a home studio. The cymbals are recorded live through a dedicated analog chain, while the shells are captured as performance data that can drive whatever drum sound the track needs. It gives me a natural performance with a lot more control after the take. If you want the full signal chain and studio breakdown, that lives on my drum site.",
          url: "https://tyleringersolldrums.com",
          external: true,
          ctaText: "See the full studio setup, gear list, and remote session workflow at tyleringersolldrums.com →"
        },
        cta: "Learn more about my music"
      },
      beyond: {
        cards: [
          { icon: "bicycle", label: "Cycling", sub: "Road, Gravel, MTB", detail: "I ride year-round on road, gravel, and mountain bikes around Chester County and beyond.", url: "https://www.strava.com/athletes/3303002", external: true },
          { icon: "users", label: "Family", sub: "Dad of Two", detail: "Most weekends revolve around my two kids, whether that means sports, bike rides, or building something in the yard.", url: null },
          { icon: "beer", label: "Outside Work", sub: "Family, Riding, Cooking", detail: "Outside work I spend a lot of time with my kids, on a bike, or making something around the house.", url: null },
          { icon: "map-pin", label: "Home Base", sub: "Kennett Square, PA", detail: "I’m based in southeastern Pennsylvania, close to good trails, open space, and a lot of family life.", url: null }
        ]
      },
      connect: {
        heading: "Get in Touch",
        subtext: "Engineering, music, or anything in between.",
        cta: "Get in Touch"
      }
    },
    architecture: [
      {
        id: "intro",
        heading: "Architecture",
        headingLevel: 2,
        content: [
          "This site is both a personal website and a working frontend project. Since most of my professional code lives inside private enterprise systems, I use this as a public place to show how I structure a Vue and Nuxt application, manage content, and think about performance and accessibility.",
          "• <strong>Nuxt 3 & Static Pre-rendering:</strong> Every page is pre-rendered to static HTML at build time, which keeps the site fast, simple to host, and easy for search engines to crawl.",
          "• <strong>Vue 3 Composition API:</strong> I use the Composition API and script setup to keep component logic easier to follow.",
          "• <strong>Pinia State Management:</strong> A Pinia store wraps the static content file, and a separate store manages theme state, so components can access both without prop drilling.",
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
          "Performance matters to me because it affects the actual experience of using a site. I approached this one the same way I approach production frontend work: keep the output lean, render as much as possible ahead of time, and avoid adding JavaScript unless it is doing something useful."
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
          "Deployment is part of the frontend architecture, not something separate from it. This repository is connected to an automated CI/CD pipeline, so every push triggers a build that generates pre-rendered static assets and deploys them through Netlify’s CDN."
        ]
      },
      {
        id: "accessibility",
        heading: "Accessibility (A11Y)",
        headingLevel: 2,
        content: [
          "Building for large user bases at work reinforced something simple: digital quality includes accessibility. I built this site with that in mind from the start.",
          "• <strong>Skip Navigation:</strong> A skip-to-content link lets keyboard and screen reader users bypass the header and jump straight to the page content.",
          "• <strong>Semantic HTML:</strong> Proper heading hierarchy, landmark elements, and native interactive controls throughout.",
          "• <strong>Keyboard Navigation:</strong> Every interactive element, including the expanding resume timeline and mobile navigation, is fully operable via keyboard with visible focus indicators. The mobile menu traps focus while open and closes on Escape.",
          "• <strong>Inert on Collapsed Panels:</strong> The timeline uses the <code>inert</code> attribute on collapsed content panels rather than just <code>aria-hidden</code>. <code>inert</code> removes keyboard focus, pointer events, and accessibility tree presence in one attribute, which is what this pattern actually needs.",
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
          "I lead frontend engineering work across customer-facing platforms. My background includes fintech, scientific instrumentation, and enterprise software, and a lot of my work has involved modernizing legacy systems and helping teams build frontend applications in a more maintainable way."
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
        lead: "Leading engineering for customer-facing identity, payment, and authentication platforms.",
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "Hands-on engineering leader for a customer-facing cross-functional team. I split my time between active frontend development, team leadership, architectural decision-making, and cross-functional planning.",
              "• Partner with product managers and stakeholders to define priorities, shape delivery plans, and allocate work across frontend and backend efforts.",
              "• Manage the engineering lifecycle and growth of a dedicated team supporting customer-facing verification, servicing, and authentication platforms.",
              "• Guide technical direction for core customer platforms while continuing to contribute directly to frontend implementation work.",
              "<strong>Tech:</strong> Angular, TypeScript, DataDog, Figma, Miro, Jira, Confluence, FullStory, Cursor AI, GitHub Copilot, Claude Code"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer II · 2024 - 2026",
            content: [
              "Owned frontend architecture and roadmap planning while partnering closely with product and UX and mentoring engineers across the organization.",
              "• Led the frontend side of third-party fintech integrations including MX and Method Financial, from architecture through implementation and rollout.",
              "• Implemented a Level 3 Content Security Policy using dynamic nonces and set up DataDog reporting and alerting so CSP violations were visible in production.",
              "<strong>Tech:</strong> Angular, TypeScript, Node.js, Python, Django, Cursor AI, GitHub Copilot"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer I · 2022 - 2024",
            content: [
              "Modernized legacy Angular codebases and helped establish the frontend patterns our teams still build on.",
              "• Led an architectural update that introduced lazy-loaded modules, reduced main bundle size, and moved the platform from Bootstrap to Angular Material.",
              "• Helped architect and launch No-Auth Quick Pay and automated payment scheduling to simplify the payment experience for customers.",
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
              "As a senior frontend developer for Vanguard’s Financial Advisor Services marketing group, I worked on a four-person team building a design system and shared frontend foundation used across applications serving advisors and large user bases.",
              "• Built a web component library with custom element wrappers so the system could be used across Vue, Angular, and Adobe Experience Manager without separate framework-specific implementations.",
              "• Partnered with leadership and development teams during a division-wide rebrand to drive adoption of the design system and improve UI consistency across products.",
              "• Designed and built a Vue.js/NestJS exemplar application with CI, content structure, environment setup, and third-party integrations already in place, giving teams a clean starting point for FAS single-page applications.",
              "• Set up AWS-based CI/CD pipelines for Storybook documentation deployments so teams had a shared place to reference components and usage patterns.",
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
              "• Developed HTML email campaigns for Bank of America rewards and retention programs, with a focus on deliverability and cross-client consistency.",
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
              "• Authored technical documentation in Adobe FrameMaker and converted it to web-ready HTML outputs.",
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
          "Before moving fully into engineering, I built a long career as a professional touring and session drummer. That included national touring, major label support, sync placements in television and sports, and years of live event work. See the full discography and music timeline at <a href='/music'>/music</a>."
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
          infrastructure: ["Node.js", "Nginx", "Docker", "AWS", "GitHub Actions", "Netlify", "DataDog", "Figma", "Cursor AI", "GitHub Copilot", "Claude Code"],
          concepts: ["Web Components", "Design Systems", "SSR", "Accessibility (WCAG)", "CI/CD", "State Management", "Content Security Policy"]
        }
      }
    ],
    music: [
      {
        headingLevel: 2,
        type: "hero",
        heading: "Music & Production",
        content: [
          "My playing comes out of decades of live shows, touring, and studio work. These days I’m focused on recording remote sessions from my home studio."
        ],
        src: "/images/studio_kit.jpeg",
        cta: {
          label: "Explore my studio & session work",
          url: "https://tyleringersolldrums.com",
          external: true
        }
      },
      {
        headingLevel: 2,
        heading: "Selected Discography",
        albums: [
          { title: "Veteran Avenue — Nothing Left to Burn", format: "Single", year: "2020", label: "Independent", image: "/images/veteranavenue_nothinglefttoburn.webp", alt: "Veteran Avenue – Nothing Left to Burn", url: "https://youtu.be/BG3R93Kc3H4?si=IflAQRZR3b14lO6e", description: "Live drums recorded at The Deep End Studio in Baltimore for Brad Cox's Veteran Avenue project. Produced and engineered by Grammy-nominated engineer Tony Correlli." },
          { title: "Skitzo Calypso — Ghosts", format: "LP", year: "2013", label: "Independent", image: "/images/skitzocalypso_ghosts.webp", alt: "Skitzo Calypso – Ghosts", url: "https://music.youtube.com/watch?v=WB3pswtUK1g&si=8fKmI7BTeQIMzdQt", description: "Stepped off the drum kit and jumped on bass for the track \"A Night in Hell & A Sunday Morning\". Produced and engineered by Tony Correlli at The Deep End Studio." },
          { title: "Ian Walsh — Please Remember", format: "LP", year: "2008", label: "Independent", image: "/images/ianwalsh_pleaseremember.png", alt: "Ian Walsh – Please Remember", url: "https://youtu.be/orm9pNytYxo?si=DRjpFhRNhJQjZI88&t=1297", description: "Cut live drums for two tracks on this record. The sessions were engineered by legendary producer Nick DiDia, known for his work with Pearl Jam, Rage Against the Machine, and Bruce Springsteen." },
          { title: "The Crash Motive — Consequence", format: "LP", year: "2007", label: "Wind-up Records", image: "/images/thecrashmotive_consequence.webp", alt: "The Crash Motive – Consequence", url: "https://youtube.com/playlist?list=OLAK5uy_lOh9gG0GIkTXg2aFo5j4g97_C2AysYEpE&si=rPypzHo8Ptd-fLdb", description: "Produced by Don Gilmore and Gregg Wattenberg. Tracked at Avatar Studios, New York City and The Pass Recording Studio, Los Angeles. Mixed by Bob Clearmountain and Mark Endert. Mastered by Ted Jensen at Sterling Sound. Drum! magazine: \"demonstrates the sort of pop-with-power sensibility that career dreams are made of.\"" },
          { title: "Fantastic Four: The Album", format: "Soundtrack", year: "2005", label: "Wind-up Records", image: "/images/fantastic4_thealbum.webp", alt: "Fantastic Four: The Album", url: "https://youtu.be/WvEj9uWOo04?si=7XOafsoygKkG2uF6", description: "Omnisoul's \"Waiting (Save Your Life)\" appeared on this Wind-up Records release alongside a full major-label roster. Drums tracked at Avatar Studios, New York City." },
          { title: "Omnisoul — Happy Outside", format: "LP", year: "2004", label: "Independent", image: "/images/omnisoul_happyoutside.webp", alt: "Omnisoul – Happy Outside", url: "https://youtube.com/playlist?list=OLAK5uy_kyIVrwfzRWBveu2Tq6yNvsb8rYzj5fqVE&si=yAKZ_yXK7p4jgEj6", description: "Self-produced and recorded between touring stints in 2003 and 2004. Mixed by Grammy-winning engineer Phil Nicolo at Studio 4, Conshohocken, PA. Nicolo also stepped in to track the standout single, \"Waiting (Save Your Life).\"" },
          { title: "Omnisoul — Climbing Ladders", format: "LP", year: "2002", label: "Independent", image: "/images/omnisoul_climbingladders.jpg", alt: "Omnisoul — Climbing Ladders", url: null, description: "Independently released and recorded." },
          {
            title: "The Healthy Doses — The Healthy Doses", format: "EP", year: "2000", label: "Independent", image: "/images/thehealthydoses_ep.jpg", alt: "The Healthy Doses – The Healthy Doses", url: "https://thehealthydoses.bandcamp.com/album/clay-creek-recording-ep", description: "Recorded live in Clay Creek Recording Studio, in Newark, DE."
          },
          { title: "Skitzo Calypso — Premeditated Acts of Stupidity", format: "LP", year: "1999", label: "Independent", image: "/images/skitzocalypso_premeditatedactsofstupidity.webp", alt: "Skitzo Calypso – Premeditated Acts of Stupidity", url: "https://www.youtube.com/watch?v=GZsOHYEbTpE&list=OLAK5uy_kZNhPkIdxFo0RGqphf9FZvgNeFFlagjiQ", description: "Handled both drum and bass duties throughout this entire record. Engineered by Dave Pace at 12th Planet Recording Studio during the early days of the local scene." },
          { title: "Skitzo Calypso — Join the Cult", format: "LP", year: "1998", label: "Independent", image: "/images/skitzocalypso_jointhecult.webp", alt: "Skitzo Calypso – Join the Cult", url: "https://youtu.be/3ocX1WZt5e4?si=K_xKrm4bXLO26KZo", description: "One of my earliest full-length studio projects. Tracked drums with engineer Dave Pace at Time Machine Starship and 12th Planet Recording Studio." }
        ]
      },
      {
        heading: "Touring & Industry Experience",
        headingLevel: 2,
        content: []
      },
      {
        heading: "Remote Session Drummer & Producer",
        headingLevel: 3,
        years: "2025 - Present",
        roles: [
          {
            subheading: "Custom Hybrid Drum Studio · 2025 - Present",
            content: [
              "Built a remote tracking studio around a hybrid workflow that combines live cymbal recordings with flexible shell sounds.",
              "• Record real Zildjian cymbals through a dedicated analog chain while capturing the shell performance as detailed MIDI.",
              "• Deliver organized cymbal audio, shell tracks, and MIDI that can be mixed, swapped, or layered as needed."
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
              "Co-founded and built a high-volume event band that moved from the regional club circuit into corporate events, universities, weddings, and long residencies in Key West.",
              "• Performed as drummer and DJ at weddings, corporate events, private events, and club venues throughout the Mid-Atlantic.",
              "• Built and ran musical sequences and click-driven arrangements that became a core part of the live show.",
              "• Shared responsibility for business operations, including tax filings."
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
              "Helped take an independent college band into national touring, label support, and larger studio opportunities after signing with Wind-up Records in 2005 and rebranding as The Crash Motive.",
              "• Built a strong regional following early on, including a 31-day #1 requested song run on WSTW 93.7 and a University of Delaware Battle of the Bands win.",
              "• Played drums on studio recordings and helped shape drum arrangements for albums and singles.",
              "• Toured nationally and opened for acts including Sugar Ray, The All-American Rejects, Collective Soul, and Lifehouse.",
              "• Contributed to placements tied to Super Bowl XLII, Madden NFL 2007, The Fantastic Four soundtrack, network television, and stadium playback.",
              "• Worked directly with label, booking, and licensing partners as the band grew."
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
              "Played drums in an experimental jam band that built a strong local following around the University of Delaware and later moved onto larger outdoor stages and festival bills.",
              "• Played regularly at venues including Deer Park Tavern and The East End Cafe.",
              "• Shared festival bills with acts like The Disco Biscuits and Lake Trout, and performed at Phish’s Camp Oswego festival.",
              "• The pace of that band taught me a lot about listening, improvising, and shaping dynamics in real time."
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
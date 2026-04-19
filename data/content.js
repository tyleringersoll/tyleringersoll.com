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
      { name: "Contact", url: "/contact" }
    ],
    home: [
      {
        id: "hero",
        heading: "Hi, I’m Tyler",
        headingLevel: 2,
        content: [
          "I’m a frontend architect and engineering leader. Currently, I lead a team at Best Egg focused on building reliable, customer-facing applications that help millions of people. Over the years, I’ve built enterprise frontend solutions for Fortune 500 brands like Vanguard, Bank of America, and DuPont.",
          "When I'm not working my day job, I’m likely found behind a drum kit in my studio. I’ve spent the last three decades touring, recording, and producing music."
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
          "I build frontend applications using frameworks like Angular and Vue.js, and I guide the teams that ship them. My expertise spans from core identity and payment processing, to specialized third-party fintech integrations and real-time hardware control software. Over my career, I’ve worked across most of the frontend ecosystem—whether that means rolling out division-wide design systems or modernizing legacy architectures so they can scale securely.",
          "<a href='/resume'>View my full resume →</a>"
        ]
      },
      {
        id: "music",
        heading: "Music",
        headingLevel: 4,
        content: [
          "With over three decades behind the kit, I've moved my playing out of the venues and into the studio. After years of touring with bands under label support and playing festival-sized crowds from the Mid-Atlantic to Key West, my focus is now entirely on production. Today, I track remote sessions and shoot drum videos using a hybrid setup that pairs the energy of live cymbals with total digital control."
        ]
      },
      {
        id: "beyond",
        heading: "Beyond work",
        headingLevel: 3,
        content: [
          "When I’m not writing code or tracking drums, you can usually find me riding one of my bikes, or trying to keep up with my two kids. I’m a craft beer and bourbon fan, enjoy firing up the grill, and am based in Kennett Square, Pennsylvania."
        ]
      }
    ],
    homePage: {
      hero: {
        eyebrow: "Frontend Engineer / Musician",
        primaryCta: "View My Work",
        secondaryCta: "Learn More About Me"
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
        cta: "View Full Resume"
      },
      music: {
        studioLabel: "Hybrid Drum Tracking Setup",
        studio: {
          text: "I spent two years engineering a silent hybrid recording rig. By pairing real cymbals with nearly-silent mesh heads and an eDRUMin interface to trigger precise MIDI data, the setup captures the energy of a live room while maintaining total post-performance control.",
          url: "https://tyleringersolldrums.com",
          external: true,
          ctaText: "Explore My Drum Studio"
        },
        cta: "More About My Music"
      },
      beyond: {
        cards: [
          { icon: "bicycle", label: "Cyclist", sub: "Road, Gravel, MTB", url: "https://www.strava.com/athletes/3303002", external: true },
          { icon: "users", label: "Family", sub: "Parent of Two", url: null },
          { icon: "beer", label: "Enthusiast", sub: "Craft Beer & Bourbon", url: null },
          { icon: "map-pin", label: "Local", sub: "Kennett Square, PA", url: null }
        ]
      },
      connect: {
        heading: "Let’s Collaborate",
        subtext: "Engineering, drumming, or just to say hello.",
        cta: "Get in Touch"
      }
    },
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
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "As Director II of Software Engineering, I lead the team building Best Egg's customer-facing identity verification, payment servicing, and authentication applications, which handle millions of interactions annually.",
              "• Guide technical direction and delivery for core customer platforms, focusing on stability and performance at scale.",
              "• Manage an engineering team and establish technical priorities, collaborating cross-functionally with other pods to align delivery with broader business goals.",
              "• Drive team growth and scale engineering capacity to meet expanding technical demands, leading candidate evaluations and key hiring decisions.",
              "• Drive the team's adoption of AI-assisted development tools like Cursor AI and GitHub Copilot, establishing shared standards that improve workflow and code quality.",
              "<strong>Engineering areas:</strong>",
              "• Customer verifications: identity verification and fraud prevention",
              "• Payment servicing: payment processing, auto pay, payment methods, due date changes",
              "• Authentication: login, signup, password recovery, customer servicing hub",
              "<strong>Tech:</strong> Angular, TypeScript, Jasmine, GitHub Actions, Node.js, Nginx, Django, Python, DataDog, FullStory"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer II · 2024 - 2026",
            content: [
              "As Senior Lead Software Engineer II, I directed frontend engineering for Best Egg's core applications, partnering closely with product and UX to shape our roadmap while mentoring engineers across the company.",
              "• Managed the technical lifecycle for critical third-party fintech integrations like MX and Method Financial, driving the process from frontend architectural design through production rollout.",
              "• Strengthened frontend security by implementing a Level 3 Content Security Policy (CSP) utilizing dynamic nonces, and operationalized the deployment by integrating violation reporting and alerting through DataDog.",
              "<strong>Engineering areas:</strong>",
              "• Customer verifications: identity verification and fraud prevention",
              "• Payment servicing: payment processing, auto pay, payment methods, due date changes",
              "• Authentication: login, signup, password recovery, customer servicing hub",
              "<strong>Tech:</strong> Angular, TypeScript, Jasmine, GitHub Actions, Node.js, Nginx, Django, Python, DataDog, FullStory"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer I · 2022 - 2024",
            content: [
              "As Senior Lead Software Engineer I, I joined Best Egg to modernize legacy Angular codebases and build the foundation our teams use today. I updated the architecture and libraries and established lasting development patterns.",
              "• Drove an architectural update that implemented lazy-loaded modules, reduced main bundle sizes, and migrated the platform from Bootstrap to Angular Material.",
              "• Collaborated to architect and launch No-Auth Quick Pay and automated payment scheduling, simplifying the payment experience for customers.",
              "• Golden Egg Award for \"BE a Builder of Great Teams\" (Q3 2023).",
              "<strong>Tech:</strong> Angular, TypeScript, Angular Material, Tailwind CSS, Jasmine, GitHub Actions, Docker, Nginx, Node.js"
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
              "• Built responsive websites and landing pages for enterprise clients like Bank of America, David's Bridal, NASA Federal Credit Union,and Chemours.",
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
        heading: "Professional Music & Production",
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
              "Design and operate a custom hybrid recording architecture (eDRUMin, mesh heads, live cymbals) to produce drum covers and track remote sessions."
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
        heading: "Education",
        headingLevel: 2,
        content: [
          "<strong>University of Delaware</strong><br>Bachelor of Science, Business Administration<br>Concentrations: Accounting and Finance<br><em>College of Business & Economics</em>"
        ]
      },
      {
        heading: "Technical Skills",
        headingLevel: 2,
        contentStyle: "inline",
        content: [
          "JavaScript",
          "TypeScript",
          "Angular",
          "Vue.js",
          "HTML5",
          "CSS/SCSS",
          "Web Components",
          "Design Systems",
          "Storybook",
          "Jest",
          "Cypress",
          "Jasmine",
          "Node.js",
          "NestJS",
          "Nginx",
          "Docker",
          "Git",
          "GitHub Actions",
          "CI/CD",
          "Accessibility (WCAG)",
          "A/B Testing",
          "Observability",
          "Sencha/Ext JS",
          "jQuery",
          "SharePoint",
          "Adobe RoboHelp",
          "Adobe FrameMaker"
        ]
      }
    ],
    music: [
      {
        headingLevel: 2,
        heading: "Music & Production",
        content: [
          "After decades of touring under label support and tracking in major rooms, my focus is now entirely on my home studio. I spend my time outside of engineering producing remote drum sessions and creating content using a custom hybrid recording architecture."
        ]
      },
      {
        heading: "The Hybrid Rig",
        headingLevel: 3,
        content: [
          "The reality of modern recording requires both the raw energy of a live room and the total post-performance control of digital production. I spent two years engineering a silent hybrid recording rig. By pairing acoustic cymbals with mesh heads and an eDRUMin interface to trigger highly precise MIDI data, I can capture the exact feel of a performance with limitless tonal flexibility."
        ]
      },
      {
        heading: "Selected History",
        headingLevel: 3,
        content: [
          "• Toured nationally with bands under label support, playing festival-sized crowds from the Mid-Atlantic to Key West.",
          "• Tracked in legendary studios including Avatar Studios (NYC) and The Pass (LA).",
          "• Secured high-profile sync placements in Super Bowl XLII, Madden NFL, and network television (CBS, NBC, ESPN).",
          "• Co-founded and scaled a highly active event band, anchoring the regional corporate and club circuit."
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
      }
    ],
    contact: [
      {
        heading: "Let's build something",
        headingLevel: 2,
        content: [
          "Whether you are scaling an engineering organization or producing a record, I am always open to talking shop. Choose your path below and get in touch."
        ]
      },
      {
        heading: "Engineering & Leadership",
        headingLevel: 3,
        content: [
          "If you want to discuss frontend architecture, team growth, or how to tackle complex scaling challenges at the enterprise level, my inbox is open."
        ],
        links: [
          { label: "Email Tyler", url: "mailto:tyler@ingersoll.dev" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/tyleringersoll", external: true },
          { label: "GitHub", url: "https://github.com/tyleringersoll", external: true }
        ]
      },
      {
        heading: "Remote Drum Tracks",
        headingLevel: 3,
        content: [
          "Professional, room-tracked drums delivered from a purpose-built hybrid setup. You get the overtone wash of live Zildjian cymbals through an analog API 3124V preamp, paired with a clean MIDI performance for total sample control. Bass tracking is also available. Stems are delivered within a week."
        ],
        links: [
          { label: "Book a Session", url: "mailto:tyler@ingersoll.dev" },
          { label: "Studio Website", url: "https://tyleringersolldrums.com", external: true }
        ]
      }
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
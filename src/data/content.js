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
        heading: "Hi, I'm Tyler",
        headingLevel: 2,
        content: [
          "I'm a frontend architect and engineering leader. Currently, I lead teams at Best Egg building customer-facing products that handle millions of interactions. In the past, I've built solutions for Vanguard, Agilent Technologies, Bank of America, and others.",
          "When I'm not coding, I'm behind a drum kit. I have been playing for thirty years, doing everything from national tours with Wind-up Records to tracking remote sessions out of my studio in Pennsylvania."
        ]
      },
      {
        heading: "What I do",
        headingLevel: 2,
        content: []
      },
      {
        heading: "Engineering",
        headingLevel: 4,
        content: [
          "I build frontend applications using frameworks like Angular and Vue.js, and I guide the teams that ship them. My work usually involves design systems, authentication, payment processing, and scaling customer-facing products.",
          "<a href='/resume'>View my full resume →</a>"
        ]
      },
      {
        heading: "Music",
        headingLevel: 4,
        content: [
          "I've been playing professionally for thirty years. With The Crash Motive on Wind-up Records, I had sync placements in the Super Bowl, Madden NFL, and The Fantastic Four. Today, I track remote drum sessions from a custom-built hybrid studio in Pennsylvania, bridging analog API preamps with zero-latency acoustic to MIDI conversion.",
          "<a href='/music'>More about my music →</a>"
        ]
      },
      {
        heading: "Beyond work",
        headingLevel: 3,
        content: [
          "When I step away from the keyboard and the kit, I'm usually on the bike logging miles on Zwift or trying to keep up with my two kids. I'm a craft beer fan, a vinyl collector, and proudly based in Kennett Square, Pennsylvania."
        ]
      }
    ],
    resume: [
      {
        heading: "Resume",
        headingLevel: 2,
        content: [
          "Frontend architect and engineering leader focused on driving technical strategy and shipping applications at scale. I build high-performing teams, align product cycles with business goals, and set development standards that speed up delivery. My background spans fintech, financial services, and enterprise software, where I've modernized legacy architectures, built enterprise design systems, and managed critical third-party integrations."
        ]
      },
    {
        heading: "Best Egg",
        headingLevel: 3,
        years: "2022 - Present",
        roles: [
          {
            subheading: "Director II, Software Engineering · 2026 - Present",
            content: [
              "As Director II of Software Engineering, I support the teams building Best Egg's customer-facing identity verification, payment servicing, and authentication applications, which handle millions of interactions annually.",
              "• Guide technical direction and delivery for core customer platforms, focusing on stability and performance at scale.",
              "• Manage engineering teams and establish technical priorities, collaborating cross-functionally with other pods to align delivery with broader business goals.",
              "• Drive team growth and scale engineering capacity to meet expanding technical demands, leading candidate evaluations and key hiring decisions.",
              "• Support the team's adoption of AI-assisted development tools like Cursor AI and GitHub Copilot, establishing shared standards that help improve our daily workflow and code quality.",
              "<strong>Engineering areas:</strong>",
              "• Customer verifications: identity verification and fraud prevention",
              "• Payment servicing: payment processing, auto pay, payment methods, due date changes, flexible relief programs",
              "• Authentication: login, signup, password recovery, customer servicing hub",
              "<strong>Tech:</strong> Angular, TypeScript, Jasmine, GitHub Actions, Node.js, Nginx, Django, Python, DataDog, FullStory"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer II · 2024 - 2026",
            content: [
              "As a Senior Lead Software Engineer, I helped direct frontend engineering for Best Egg's core applications, partnering closely with product and UX to shape our roadmap while mentoring engineers across the company.",
              "• Managed the technical lifecycle for critical third-party fintech integrations like MX and Method Financial, driving the process from architectural design through production rollout.",
              "• Strengthened frontend security by implementing a Level 3 Content Security Policy (CSP) utilizing dynamic nonces, and operationalized the deployment by integrating automated violation reporting and alerting through DataDog.",
              "<strong>Engineering areas:</strong>",
              "• Customer verifications: identity verification and fraud prevention",
              "• Payment servicing: payment processing, auto pay, payment methods, due date changes, flexible relief programs",
              "• Authentication: login, signup, password recovery, customer servicing hub",
              "<strong>Tech:</strong> Angular, TypeScript, Jasmine, GitHub Actions, Node.js, Nginx, Django, Python, DataDog, FullStory"
            ]
          },
          {
            subheading: "Senior Lead Software Engineer I · 2022 - 2024",
            content: [
              "I joined Best Egg to help modernize a legacy Angular codebase and build the foundation our team uses today. I worked to update the architecture, migrate the design system, and establish lasting development patterns.",
              "• Drove an architectural update that implemented lazy-loaded modules, reduced main bundle sizes, and migrated the platform from Bootstrap to Angular Material.",
              "• Built a unified design system with Storybook and Tailwind CSS, publishing a shared library of brand-compliant components for the engineering organization.",
              "• Collaborated to architect and launch No-Auth Quick Pay and automated payment scheduling, simplifying the payment experience for customers.",
              "• Golden Egg Award for \"BE a Builder of Great Teams\" (Q3 2023).",
              "<strong>Tech:</strong> Angular, TypeScript, Angular Material, Storybook, Tailwind CSS, Jasmine, GitHub Actions, Docker, Nginx, Node.js"
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
              "Embedded with Agilent Technologies's R&D software team as the sole frontend specialist, building web-based instrument control interfaces shipped globally with Agilent's flagship hardware product lines.",
              "• Built the web-based instrument control UI for Agilent's Gas Chromatography hardware using Sencha/Ext JS, implementing real-time monitoring via WebSockets.",
              "• Created data visualization tools for live instrument data graphing and visual hardware configuration displays.",
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
              "As a frontend specialist embedded across multiple concurrent engagements, I shipped web, email, and enterprise solutions for Fortune 500 brands including Bank of America, David's Bridal, Chemours, and DuPont, reaching tens of millions of users.",
              "• Built responsive websites and landing pages for enterprise clients like Bank of America, David's Bridal, and Chemours.",
              "• Developed adaptive HTML email campaigns for Bank of America's rewards programs, optimizing for deliverability and cross-client compatibility.",
              "• Acted as Systems Owner for DuPont's SharePoint security auditing system, managing weekly reports and server migrations alongside IBM consultants.",
              "• Developed SharePoint intranet solutions for Chemours and Everything But Water.",
              "• Managed off-hours, time-sensitive deployments for highly sensitive internal communications with Chemours leadership.",
              "<strong>Tech:</strong> HTML5, CSS/SCSS, JavaScript, jQuery, SharePoint, Responsive Design, Email Development"
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
              "I co-founded SpeakerCity and helped build it into one of the most in-demand event bands in the Mid-Atlantic. What started with a debut to thousands at the University of Delaware quickly expanded into a year-round schedule playing two to three shows a week.",
              "As we transitioned from the regional club circuit into a high-end wedding and corporate band, our calendar grew to include week-long residencies in Key West, large-scale university events, and performances at major regional sports venues.",
              "• Performed as drummer and DJ at weddings, corporate events, and club venues throughout the Mid-Atlantic.",
              "• Composed and produced musical sequences with click tracks, serving as the production backbone for live performances.",
              "• Handled business tax filings as part of shared co-founder responsibilities."
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
              "As a long-term embedded consultant with Agilent Technologies's R&D team, I delivered frontend applications and technical documentation for global scientific instrumentation product lines.",
              "• Designed standalone web-based document delivery applications distributed via USB or DVD for global product lines.",
              "• Architected custom HTML templates and automated build systems, streamlining multi-product documentation delivery across Gas Chromatography, Mass Spectrometry, and Sampler product lines.",
              "• Authored technical documentation using Adobe FrameMaker and converted it to web-ready HTML.",
              "• Created software UI icons, technical diagrams, and visual assets for R&D teams.",
              "<strong>Tech:</strong> HTML, CSS, JavaScript, Adobe RoboHelp, Adobe FrameMaker, Adobe Illustrator, Adobe Photoshop"
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
              "Helped build the band from an independent college act (originally Omnisoul) into a major label touring rock band. We signed a comprehensive deal with Wind-up Records in 2005 and rebranded as The Crash Motive in 2006.",
              "• Dominated the regional scene early on, winning the University of Delaware's Battle of the Bands and holding a 31-day #1 requested spot on WSTW 93.7.",
              "• Performed drum parts on studio recordings and arranged drum compositions for albums and singles.",
              "• Toured nationally and performed extensively at major venues, opening for recognized acts like Sugar Ray, The All American Rejects, Collective Soul, and Lifehouse.",
              "• Secured music placements including Super Bowl XLII, Madden NFL 2007, and The Fantastic Four soundtrack.",
              "• Licensed music for use in over 30 professional sports stadiums across the NFL, MLB, NCAA, and NHL.",
              "• Placed music in network television programming including NBC, FOX, and CBS promotional campaigns.",
              "• Negotiated and managed business partnerships with label executives, booking agents, and licensing representatives."
            ]
          }
        ]
      },
      {
        heading: "Technical Writers, Inc.",
        headingLevel: 3,
        years: "2003 - 2005",
        roles: [
          {
            subheading: "Technical Writer / Web Developer · 2003 - 2005",
            content: [
              "Embedded on-site at AstraZeneca, I supported the global pharmaceutical regulatory submission team by packaging official FDA submissions and building their global regulatory intranet site.",
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
        heading: "Music",
        content: [
          "I've been playing drums professionally for thirty years, from club residencies in Newark, DE to national tours and major-label studio work. Sync placements include the Super Bowl, Madden NFL, The Fantastic Four, and campaigns across NBC, FOX, CBS, and ESPN. Today I work out of my home studio in Pennsylvania and track remotely for artists and producers who want drums that feel like they were cut in a real room. More at <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a> or <a href='/contact'>get in touch</a>."
        ]
      },
      {
        heading: "Back in the Studio",
        years: "2024–present",
        headingLevel: 3,
        content: [
          "A 2024 reunion show with Omnisoul at World Cafe Live in Philadelphia brought everything back into focus. It reminded me exactly why I started playing, and led to 18 months of researching, building, and refining a state-of-the-art hybrid drum rig from the ground up. Today, I am tracking remotely from my home studio, bringing decades of live experience and major-label studio standards to every session I take on. The rig runs mesh heads with Roland triggers for a clean MIDI performance alongside full-volume Zildjian cymbals mic'd through an API 3124 preamp. More at <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a>."
        ]
      },
      {
        heading: "Veteran Avenue",
        years: "2020",
        headingLevel: 3,
        content: [
          "Live drums were recorded for Brad Cox's Veteran Avenue project on the track \"Nothing Left to Burn\" in February 2020. The session was produced and engineered by Grammy-nominated engineer Tony Correlli at The Deep End Studio in Baltimore, resulting in a release that landed in rotation on SiriusXM.",
          "<iframe allow='autoplay *; encrypted-media *; fullscreen *; clipboard-write' frameborder='0' height='175' style='width:100%;overflow:hidden;background:transparent;border-radius:12px;' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation' src='https://embed.music.apple.com/us/album/no-reflection-after-sunset-ep/1602773266?i=1602773268'></iframe>"
        ]
      },
      {
        heading: "Brad Cox / Skitzo Calypso",
        years: "2013",
        headingLevel: 3,
        content: [
          "Stepping off the drum kit, I tracked bass for the single \"A Night in Hell & A Sunday Morning\" in 2013. The track was released as a Skitzo Calypso single, with production and engineering handled by Tony Correlli at The Deep End Studio in Baltimore.",
          "<iframe style='border-radius:12px; width:100%;' src='https://open.spotify.com/embed/album/6xyAVtQ5oWnMK3dFWVhiC3?utm_source=generator&theme=0' height='152' frameborder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>"
        ]
      },
      {
        heading: "SpeakerCity",
        years: "2010–2016",
        headingLevel: 3,
        content: [
          "Co-founding SpeakerCity in 2010 led to building one of the most in-demand event bands in the Mid-Atlantic. Playing high-energy, three-hour sets night after night forced a seamless transition between pop, rock, hip-hop, and R&B while keeping the pocket deep. The band anchored the regional circuit across the Jersey Shore, Ocean City, Philadelphia, and D.C. By 2016, I shifted my focus toward my family and a career leading software engineering teams, pausing the live performances but never stopping listening.",
          "<div style='position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;'><iframe style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' src='https://www.youtube.com/embed/2D9R9hRWPwM?si=o9nR8Whg3ZEDizJH' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>"
        ]
      },
      {
        heading: "The Crash Motive",
        years: "2005–2008",
        headingLevel: 3,
        content: [
          "Rebranding as The Crash Motive, the band signed a comprehensive deal with Wind-up Records and tracked our debut album, <em>Consequence</em>, in New York and LA. Cutting tracks alongside respected producers like Don Gilmore and Gregg Wattenberg taught me exactly what is expected at the highest levels of the industry. Seeing those same drum parts land in Super Bowl XLII and Madden NFL campaigns proved how crucial it is to craft a groove that translates on a massive scale.",
          "<iframe height='450' width='100%' title='Media player' src='https://embed.music.apple.com/us/album/consequence/1444007166?itscg=30200&itsct=music_box_player&ls=1&app=music&mttnsubad=1444007166&theme=dark' id='embedPlayer' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation' allow='autoplay *; encrypted-media *; clipboard-write' style='border: 0px; border-radius: 12px; width: 100%; height: 450px; max-width: 660px;'></iframe>"
        ]
      },
      {
        heading: "Omnisoul",
        years: "2002–2006",
        headingLevel: 3,
        content: [
          "Entering Omnisoul in 2002 brought a tighter focus on original songwriting and radio success. The band dominated the local scene, winning the University of Delaware's Battle of the Bands and earning support slots with Sugar Ray, The All American Rejects, Collective Soul, and Lifehouse. We recorded a label-shopping EP with Grammy-winning engineer Phil Nicolo that ignited major label interest. Our single \"Waiting (Save Your Life)\" held the number one most requested spot on WSTW 93.7 for 31 consecutive days, a station record that still stands.",
          "<iframe height='450' width='100%' title='Media player' src='https://embed.music.apple.com/us/album/happy-outside/1754410766?itscg=30200&itsct=music_box_player&ls=1&app=music&mttnsubad=1754410766&theme=dark' id='embedPlayer' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation' allow='autoplay *; encrypted-media *; clipboard-write' style='border: 0px; border-radius: 12px; width: 100%; height: 450px; max-width: 660px;'></iframe>"
        ]
      },
      {
        heading: "Yuba Rift",
        years: "2000–2001",
        headingLevel: 3,
        content: [
          "Yuba Rift was built around open and exploratory sessions. Recorded on a tape deck in the corner of a practice space in Newark, DE, the recordings capture a highly improvisational approach. There was no commercial ambition behind the project, simply a small group of musicians exploring ideas and seeing where the music naturally went.",
          "<iframe width='100%' height='450' scrolling='no' frameborder='no' allow='autoplay' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A8377240&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'></iframe>"
        ]
      },
      {
        heading: "The Healthy Doses",
        years: "1998–2000",
        headingLevel: 3,
        content: [
          "A standout couple of years was spent touring with the jam band The Healthy Doses, sharing festival bills with acts like The Disco Biscuits and Lake Trout. The band was a massive part of the thriving late-90s East Coast festival circuit, playing constantly and hitting stages like Phish's Camp Oswego in 1999. That era was a masterclass in listening, improvising, and understanding that drumming is about dynamics and serving the moment, not just keeping time.",
          "<iframe width='100%' height='450' scrolling='no' frameborder='no' allow='autoplay' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2287393&color=%230e1110&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'></iframe>",
          "A few members also played a live set on Main St, Newark, DE on September 2, 2000:",
          "<iframe width='100%' height='300' scrolling='no' frameborder='no' allow='autoplay' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A101787743&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'></iframe>"
        ]
      },
      {
        heading: "Skitzo Calypso",
        years: "1996–1999",
        headingLevel: 3,
        content: [
          "My foundation was built in the Maryland jazz and rock scenes, leading to my first serious studio work with the alt-hard rock project Skitzo Calypso. Led by Brad Cox and produced by Dave Pace at 12th Planet Recording Studio, I handled both drum and bass duties across two full albums, <em>Join the Cult</em> (1998) and <em>Premeditated Acts of Stupidity</em> (1999). This period was my first real experience recording to a specific part rather than simply playing live.",
          "<iframe allow='autoplay *; encrypted-media *;' frameborder='0' height='150' style='width:100%;max-width:660px;overflow:hidden;background:transparent;' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation' src='https://embed.music.apple.com/us/album/asphyxiation/1748465468?i=1748465472'></iframe>"
        ]
      }
    ],
    contact: [
      {
        heading: "Get in touch",
        headingLevel: 2,
        content: [
          "Whether it's engineering, drumming, or just to say hello — email is the fastest way to reach me."
        ]
      },
      {
        heading: "Engineering",
        headingLevel: 3,
        content: [
          "If you want to talk engineering, I'm always up for a good conversation."
        ],
        links: [
          { label: "tyler@ingersoll.dev", url: "mailto:tyler@ingersoll.dev" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/tyleringersoll", external: true },
          { label: "GitHub", url: "https://github.com/tyleringersoll", external: true }
        ]
      },
      {
        heading: "Studio Sessions",
        headingLevel: 3,
        content: [
          "Remote drum sessions from my home studio in Pennsylvania. Live Zildjian cymbals mic'd through an API 3124, plus a clean MIDI performance you can route into any sample library. I can also track bass in the same session. Stems delivered within a week. More at <a href='https://tyleringersolldrums.com' target='_blank' rel='noopener noreferrer'>tyleringersolldrums.com</a>."
        ],
        links: [
          { label: "tyler@ingersoll.dev", url: "mailto:tyler@ingersoll.dev" }
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
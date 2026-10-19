// Abhishek Jadhav (0xAbhi13) — Portfolio Data — JS version
// Mirrors src/data/portfolioData.ts but for vanilla HTML/CSS/JS

const profile = {
  name: "Abhishek Jadhav",
  alias: "0xAbhi13",
  headline: "Creative Developer | C++ • Python • JavaScript | BCA Student — Baramati, Maharashtra",
  shortHeadline: "C++ • PYTHON • JAVASCRIPT • BCA • BARAMATI",
  summary: "BCA student from Baramati learning the craft from the ground up — C++ for fundamentals, Python for shipping, JavaScript for the web. Building small, real products in public. Focused on how memory moves in C++, how Python automates the boring bits, and how JavaScript brings a page to life. I pick a small problem, build something that solves it, get it wrong a few times, read the errors properly, and ship a version I'm proud of. Currently exploring DSA, React, and deeper systems.",
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "BCA Program — Baramati, Maharashtra",
    affiliation: "Computer Science Fundamentals • Data Structures • Databases • Software Development — Currently Enrolled",
    cgpa: "Currently Pursuing",
    graduation: "2026"
  },
  email: "contact.0xabhi13@gmail.com",
  linkedin: "https://linkedin.com/in/0xAbhi13",
  github: "https://github.com/0xAbhi13",
  location: "Baramati, Maharashtra, India",
  avatar: "assets/profile/profilepic.jpg"
};

const experience = []; // removed — kept as empty to avoid reference errors

const projects = [
  {
    id: "developer-portfolio",
    name: "Developer Portfolio — Abhishek OS",
    status: "Live",
    category: "Web • OS • Editorial",
    folder: "web",
    purpose: "This portfolio itself — a macOS-inspired desktop OS built as a fully interactive operating system. Vanilla HTML/CSS/JS only — no frameworks, no build — featuring draggable single-window manager, Spotlight (Ctrl+K), Ask Abhi offline AI, Wavecont 2:24 music bar (file:// + http://), and universal responsive phone 390×780. Every pixel is cinematic motion with zero dependencies.",
    github: "https://github.com/0xAbhi13/MyPortfolio",
    demo: "https://0xabhi13.github.io/MyPortfolio/",
    stack: ["HTML5","CSS3","JavaScript","Tailwind CDN","GSAP 3.12.5","Lottie","Lucide","Web Audio API"],
    facts: ["Desktop OS: ABHISHEK centered + 0xAbhi13 menu + Unsplash wallpaper + particleCanvas 56 + GSAP parallax","Single-window manager: drag/resize/zIndex/traffic (close/min/max) + windowIn 0.38s spring — 1 at a time","Ask Abhi Pro: avatar Online, 6 starters, local searchIndex 45, offline — no API","MusicBar: Wavecont 2:24 assets/audio/wavecont.mp3 5.7MB — preload metadata, crossOrigin='', file:// + http:// both, View→GitHub","Professional icons: 14× 96×96 SVG linearGradient #8b5cf6→#4f46e5 — iconPulseGlow 2.8s + gradientShift 8s","17 projects (BeatForge/PDFForge/MyPortfolio + 4 AI/CV Python + 10 VEDA internship) • Spotlight Ctrl+K • Terminal • Events gallery • Resume Coming Soon 85%","Fully vanilla — CDN Tailwind + lucide + lottie-player + gsap — deployed on GitHub Pages (no build)"],
    screenshots: [{label:"Hero — Desktop OS", src:"assets/projects/developer-portfolio/hero.png"}, {label:"Overview — Window Manager", src:"assets/projects/developer-portfolio/overview.png"}]
  },
  {
    id: "0xbeatforge",
    name: "0xBeatForge",
    status: "Live",
    category: "Web Audio • Music",
    folder: "web",
    purpose: "A cinematic browser-based beat sequencer where music is built layer by layer using the Web Audio API. Craft patterns, stack layers, and shape rhythms in a tactile, studio-inspired interface.",
    github: "https://github.com/0xAbhi13/0xBeatForge",
    demo: "",
    stack: ["JavaScript","Web Audio API","HTML5","CSS3","Python"],
    facts: ["Layer-by-layer beat construction","Web Audio API timing & scheduling","Cinematic studio-inspired UI","Browser-based — no install","Sequencer grid with real-time playback"],
    screenshots: [{label:"Hero", src:"assets/projects/0xbeatforge/hero.png"}, {label:"Overview", src:"assets/projects/0xbeatforge/overview.png"}]
  },
  {
    id: "0xpdfforge",
    name: "0xPDFForge",
    status: "Live",
    category: "PDF • Automation",
    folder: "web",
    purpose: "A creative PDF generation platform that transforms web projects and content into beautifully designed PDF documents using customizable templates and automated analysis. Ideal for portfolios, reports, and docs.",
    github: "https://github.com/0xAbhi13/0xPDFForge",
    demo: "",
    stack: ["Python","JavaScript","HTML","Docker","Shell"],
    facts: ["Web → PDF with custom templates","Automated content analysis","Beautiful typography & layout","Batch generation support","Docker ready"],
    screenshots: [{label:"Hero", src:"assets/projects/0xpdfforge/hero.png"}, {label:"Overview", src:"assets/projects/0xpdfforge/overview.png"}]
  },
  {
    id: "0xemotion",
    name: "0xEmotion",
    status: "Live",
    category: "AI • Vision",
    folder: "python",
    purpose: "AI facial expression recognition that runs entirely offline. Flask + OpenCV detect faces from webcam or upload and classify the visible expression.",
    github: "https://github.com/0xAbhi13/0xEmotion",
    demo: "",
    stack: ["Python","Flask","OpenCV","NumPy"],
    facts: ["Face detection from webcam or upload","Expression classification — offline, no cloud","Flask backend","Transparent fallback when no model"],
    screenshots: [{label:"Interface", src:"assets/projects/0xemotion/interface.png"}, {label:"Demo", src:"assets/projects/0xemotion/demo.png"}]
  },
  {
    id: "0xmagicsearch",
    name: "0xMagicSearch",
    status: "Live",
    category: "Vision • Real-time",
    folder: "python",
    purpose: "Local AI object detection that turns your webcam into a scanner. Lightweight YOLOv4-tiny via OpenCV identifies objects in real time.",
    github: "https://github.com/0xAbhi13/0xMagicSearch",
    demo: "",
    stack: ["Python","Flask","OpenCV","YOLOv4-tiny"],
    facts: ["Real-time object detection via webcam","YOLOv4-tiny with OpenCV DNN","Local knowledge base enriches detection","No cloud API"],
    screenshots: [{label:"Scanner", src:"assets/projects/0xmagicsearch/scanner.png"}, {label:"Detection", src:"assets/projects/0xmagicsearch/detection.png"}]
  },
  {
    id: "0xaircanvas",
    name: "0xAirCanvas",
    status: "Live",
    category: "Interaction • Vision",
    folder: "python",
    purpose: "Draw in thin air. OpenCV and MediaPipe track your hand through the webcam, turning your fingertip into a smooth digital pen.",
    github: "https://github.com/0xAbhi13/0xAirCanvas",
    demo: "",
    stack: ["Python","Flask","OpenCV","MediaPipe"],
    facts: ["Hand tracking via MediaPipe Hands","Fingertip becomes digital pen","Gesture-based controls","No stylus required"],
    screenshots: [{label:"Canvas", src:"assets/projects/0xaircanvas/canvas.png"}, {label:"Tracking", src:"assets/projects/0xaircanvas/tracking.png"}]
  },
  {
    id: "0xvoicevision",
    name: "0xVoiceVision",
    status: "Live",
    category: "Voice • Search",
    folder: "python",
    purpose: "Speak a word and see it. Web Speech API transcribes your voice, Flask cleans the query, and Openverse pulls a matching image.",
    github: "https://github.com/0xAbhi13/0xVoiceVision",
    demo: "",
    stack: ["Python","Flask","Web Speech API","Openverse API"],
    facts: ["Voice → text via Web Speech API","Flask routes query to Openverse","Free Openverse — no API key","Animated reveal"],
    screenshots: [{label:"Voice", src:"assets/projects/0xvoicevision/voice.png"}, {label:"Result", src:"assets/projects/0xvoicevision/result.png"}]
  },
  // ── VEDA Technology Internship — Web Development (excludes internship-task-1/2/3) ──
  {
    id: "veda-tribute-page",
    name: "Tribute Page — Dr. A. P. J. Abdul Kalam",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 1 — tribute to Dr. A. P. J. Abdul Kalam (1931–2015): scientist, 11th President of India, teacher. Biography, achievements, timeline and verified quotes with accessible semantic HTML.",
    github: "https://github.com/0xAbhi13/tribute-page",
    demo: "https://0xabhi13.github.io/tribute-page/",
    stack: ["HTML5","CSS3","Accessible","Responsive"],
    facts: ["Semantic tribute layout — hero + biography + achievements + timeline + quotes", "Official portrait with attribution (Govt. of India / Wikimedia)", "Topbar nav to page sections", "Fully responsive, no framework"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-tribute-page/hero.png"}, {label:"Overview", src:"assets/projects/veda-tribute-page/overview.png"}]
  },
  {
    id: "veda-personal-intro",
    name: "Personal Introduction Page",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology internship personal introduction page of Abhishek Shahaji Jadhav — first-year BCA student and aspiring Web Developer from Baramati. Hero, about, skills, hobbies and contact in clean HTML/CSS with a little JavaScript.",
    github: "https://github.com/0xAbhi13/personal-introduction-page",
    demo: "https://0xabhi13.github.io/personal-introduction-page/",
    stack: ["HTML5","CSS3","JavaScript","Responsive"],
    facts: ["Hero with quick facts — BCA VIIT Baramati", "Sections: Home • About • Skills • Hobbies • Contact", "Mobile nav toggle, skip-link accessible", "GitHub CTA to @0xAbhi13"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-personal-intro/hero.png"}, {label:"Overview", src:"assets/projects/veda-personal-intro/overview.png"}]
  },
  {
    id: "veda-simple-resume",
    name: "Simple Resume Website",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Internship Day 3 of 45 — online resume of Abhishek Shahaji Jadhav (Web Developer & BCA student, VIIT Baramati). Skills, education, projects, internship and contact links plus downloadable resume.pdf.",
    github: "https://github.com/0xAbhi13/simple-resume-website",
    demo: "https://0xabhi13.github.io/simple-resume-website/",
    stack: ["HTML5","CSS3","Responsive","Resume PDF"],
    facts: ["Hero: VEDA Internship Day 3 of 45", "Sections: About • Education • Skills • Projects • Contact", "Download Resume button (resume.pdf)", "Clean header nav + accessible skip-link"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-simple-resume/hero.png"}, {label:"Overview", src:"assets/projects/veda-simple-resume/overview.png"}]
  },
  {
    id: "veda-digital-clock",
    name: "Digital Clock",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 4 — real-time digital clock powered by JavaScript. Syncs from device clock every second, 12H/24H toggle, start/stop/reset, live date, no backend required.",
    github: "https://github.com/0xAbhi13/digital-clock",
    demo: "https://0xabhi13.github.io/digital-clock/",
    stack: ["HTML5","CSS3","JavaScript","Realtime"],
    facts: ["Real-time clock — updates every second", "12H / 24H segmented toggle", "Start / Stop / Reset controls + live status dot", "GitHub Pages compatible relative paths"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-digital-clock/hero.png"}, {label:"Overview", src:"assets/projects/veda-digital-clock/overview.png"}]
  },
  {
    id: "veda-temp-converter",
    name: "Temperature Converter",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 5 — instant temperature converter between Celsius, Fahrenheit and Kelvin. Validated input, unit swap, copy-result, common reference presets, no backend required.",
    github: "https://github.com/0xAbhi13/temperature-converter",
    demo: "https://0xabhi13.github.io/temperature-converter/",
    stack: ["HTML5","CSS3","JavaScript","Realtime"],
    facts: ["Celsius ⇄ Fahrenheit ⇄ Kelvin — instant conversion", "From/To selectors with one-click swap", "Copy result + clear controls", "Common references presets (freezing/boiling point, absolute zero, body temp)"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-temp-converter/hero.png"}, {label:"Overview", src:"assets/projects/veda-temp-converter/overview.png"}]
  },
  {
    id: "veda-bmi-calculator",
    name: "BMI Calculator",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 6 — instant Body Mass Index calculator with weight category, visual BMI scale and per-field validation. No backend, no frameworks.",
    github: "https://github.com/0xAbhi13/BMI-calculator",
    demo: "https://0xabhi13.github.io/BMI-calculator/",
    stack: ["HTML5","CSS3","JavaScript","Validation"],
    facts: ["Standard BMI math — weight / (height in metres²), via one shared calculateBMI() path", "Category badges — Underweight / Normal / Overweight / Obesity with colour coding", "Visual BMI scale — four-segment indicator (14–40) with result marker and boundary ticks", "Inline validation — rejects empty, abc, NaN, Infinity, zero/negative and out-of-range height/weight"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-bmi-calculator/hero.png"}, {label:"Overview", src:"assets/projects/veda-bmi-calculator/overview.png"}]
  },
  {
    id: "veda-basic-calculator",
    name: "Basic Calculator",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 7 — four-operation calculator (add, subtract, multiply, divide) with keyboard support, no eval(), divide-by-zero guard and floating-point cleanup.",
    github: "https://github.com/0xAbhi13/basic-calculator",
    demo: "https://0xabhi13.github.io/basic-calculator/",
    stack: ["HTML5","CSS3","JavaScript","Realtime"],
    facts: ["Four operations via one shared operate() code path — no eval(), no Function()", "Digit entry with overflow guard — 12 digits per number, leading zeros collapsed", "Safe decimals — second dot ignored, leading dot becomes 0.", "Accurate equals — floating-point artefacts cleaned (0.1+0.2=0.3), chained left-to-right model"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-basic-calculator/hero.png"}, {label:"Overview", src:"assets/projects/veda-basic-calculator/overview.png"}]
  },
  {
    id: "veda-quote-generator",
    name: "Random Quote Generator",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 8 — random quote generator with 35 hand-picked quotes across 8 categories, no quote API, no immediate repeats, copy and native Web Share.",
    github: "https://github.com/0xAbhi13/random-quote-generator",
    demo: "https://0xabhi13.github.io/random-quote-generator/",
    stack: ["HTML5","CSS3","JavaScript","Offline"],
    facts: ["35 hand-picked quotes across 8 categories — no quote API, zero runtime network requests", "No immediate repeats — on-screen quote excluded from next draw", "Instant first quote — valid quote on screen at page load", "Copy to clipboard + native Web Share API where supported"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-quote-generator/hero.png"}, {label:"Overview", src:"assets/projects/veda-quote-generator/overview.png"}]
  },
  {
    id: "veda-image-gallery",
    name: "Responsive Image Gallery",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 9 — responsive image gallery with 16 photographs in a fluid CSS Grid, accessible dialog lightbox, full keyboard control and image failure handling.",
    github: "https://github.com/0xAbhi13/image-gallery",
    demo: "https://0xabhi13.github.io/image-gallery/",
    stack: ["HTML5","CSS3","JavaScript","Accessible"],
    facts: ["16 photographs across 5 themes — Mountains, Nature, Wildlife, Architecture, Travel", "Fluid CSS Grid — repeat(auto-fill, minmax(240px,1fr)), no hard-coded column counts", "Accessible lightbox — <dialog showModal()> with Escape handling and focus return", "Full keyboard control — Tab inside preview, arrow keys move images, Esc closes"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-image-gallery/hero.png"}, {label:"Overview", src:"assets/projects/veda-image-gallery/overview.png"}]
  },
  {
    id: "veda-faq-accordion",
    name: "FAQ Accordion",
    status: "Live",
    category: "VEDA Internship • Web",
    folder: "veda",
    purpose: "VEDA Technology Web Development Internship Task 10 — professional, responsive FAQ accordion with 10 questions. Click to expand/collapse, single-open mode by default, fully accessible (aria-expanded, aria-controls, unique panel IDs, keyboard operable), smooth CSS transitions, vanilla JavaScript only — no frameworks, no build step, no backend.",
    github: "https://github.com/0xAbhi13/FAQ-accordion",
    demo: "https://0xabhi13.github.io/FAQ-accordion/",
    stack: ["HTML5","CSS3","JavaScript","Accessible"],
    facts: ["10 FAQ questions with meaningful answers — web development, HTML/CSS/JS, responsiveness, DOM, reusability", "Expand / collapse with smooth max-height transitions measured from scrollHeight", "Single-open mode (toggle to multi-open via one flag)", "Accessible: aria-expanded, aria-controls, unique panel IDs, visible focus rings", "Keyboard operable: Tab, Enter, Space", "Responsive: 320 px to desktop, no horizontal scroll", "Works fully offline — zero dependencies"],
    screenshots: [{label:"Hero", src:"assets/projects/veda-faq-accordion/hero.png"}, {label:"Overview", src:"assets/projects/veda-faq-accordion/overview.png"}]
  }
];

const skills = [
  { category: "Programming", icon: "💻", items: ["C++ (70%)","Python (75%)","JavaScript (68%)","DSA — Learning"] },
  { category: "Web Development", icon: "🌐", items: ["HTML5 (95%) — Semantic & Accessible","CSS3 (90%) — Layout • Motion","JavaScript — Vanilla • GSAP • Lenis","Flask"] },
  { category: "AI / Computer Vision", icon: "🧠", items: ["OpenCV","MediaPipe","NumPy","YOLOv4-tiny","Web Speech API","Openverse API"] },
  { category: "Tools & Workflow", icon: "🛠️", items: ["Git (78%)","GitHub (80%) — @0xAbhi13","VS Code","REST APIs"] },
  { category: "Currently Levelling Up", icon: "✨", items: ["React","GSAP Advanced","Node.js","Deeper DSA","System Design Basics"] }
];

const certifications = [
  // --- Core Programming (existing) ---
  { title: "Complete C++ Language", issuer: "Sheryians Coding School", issued: "Jul 2026", credentialId: "4834427359730082f339b619", image: "assets/certifications/certificate-cpp.jpg", verifyUrl: "https://sheryians.com/certificate/4834427359730082f339b619" },
  { title: "HTML, CSS & JavaScript from Scratch", issuer: "Educative", issued: "Jul 2026", credentialId: "FD9G69XC5T", image: "assets/certifications/certificate-html-css-js.jpg", verifyUrl: "https://www.educative.io/verify-certificate/FD9G69XC5T" },
  { title: "Learn Python 3", issuer: "Educative", issued: "Jul 2026", credentialId: "7HYRJKNF2B", image: "assets/certifications/certificate-python.jpg", verifyUrl: "https://www.educative.io/verify-certificate/7HYRJKNF2B" },
  // --- AI & Foundations (new, systematically added Aug 2026) ---
  { title: "AI Foundation Course Badge", issuer: "Jio Institute — AI Classroom (JioPC)", issued: "Aug 2026", credentialId: "nfJzfbmZP2Id", image: "assets/certifications/certificate-jio-ai-foundation.jpg", verifyUrl: "https://jiopc.embibe.com/verify/credential/nfJzfbmZP2Id" },
  { title: "CS301: Computer Architecture — Certificate of Achievement", issuer: "Saylor University", issued: "Aug 2026", credentialId: "SAYLOR-CS301-81.25%", image: "assets/certifications/certificate-saylor-computer-architecture.jpg", verifyUrl: "https://learn.saylor.org/admin/tool/certificate/index.php" },
  { title: "CS207: Fundamentals of Machine Learning", issuer: "Saylor Academy", issued: "Aug 2026", credentialId: "SAYLOR-CS207-98.00%", image: "assets/certifications/certificate-saylor-machine-learning.jpg", verifyUrl: "https://learn.saylor.org/admin/tool/certificate/index.php" },
  { title: "Git GitHub Mastery", issuer: "freeacademy.ai", issued: "Aug 2026", credentialId: "FA-2026-GGM-6NDHKH", image: "assets/certifications/certificate-git-github-mastery.jpg", verifyUrl: "https://freeacademy.ai/verify/FA-2026-GGM-6NDHKH" },
  { title: "SkillUp 101 — Python Certification", issuer: "EDUCBA", issued: "Aug 2026", credentialId: "OSZL2ZKED", image: "assets/certifications/certificate-educba-skillup-python.jpg", verifyUrl: "https://www.educba.com/certificate/?c=OSZL2ZKED" },
  { title: "YUVA AI For All", issuer: "IndiaAI — TCS iON", issued: "Aug 2026", credentialId: "87006977-0545-17505-4", image: "assets/certifications/certificate-yuva-ai-for-all.jpg", verifyUrl: "https://g09.tcsion.com//LX/ecertificate/verification?id=87006977-0545-17505-4" },
  { title: "AI Fundamentals: Foundations for Understanding AI", issuer: "IBM SkillsBuild", issued: "Sep 2026", credentialId: "e3fpsckg", image: "assets/certifications/certificate-ibm-ai-fundamentals.jpg", verifyUrl: "https://www.credly.com/go/e3fpsckg" },
  { title: "Lifelong Professional Skills", issuer: "IBM SkillsBuild", issued: "Sep 2026", credentialId: "xwe80Hkt", image: "assets/certifications/certificate-ibm-lifelong-professional-skills.jpg", verifyUrl: "https://www.credly.com/go/xwe80Hkt" }
];

// ── Events — expandable data, presentation lives in js/app.js ──
// To add an event later (Hackathon, Workshop, Seminar, Fest), append one
// object with the same shape. Photos live in assets/events/ — replace the
// evolve-2026-*.jpeg files with real photographs, keep the same filenames.
const events = [
  {
    id: "evolve-2026",
    year: 2026,
    title: "EVOLVE 2026",
    subtitle: "BBA & BCA Induction Program",
    location: "VIIT Baramati",
    venue: "Vidya Pratishthan's Institute of Information Technology, Baramati",
    cover: "assets/events/evolve-2026-01.jpeg",
    journeyTitle: "The Journey Begins: From Student to Professional",
    description: "EVOLVE 2026 was the induction program for BBA and BCA students at Vidya Pratishthan's Institute of Information Technology, Baramati. The program marked the beginning of my BCA journey and provided an opportunity to interact with academic leaders, industry professionals, and experienced speakers.",
    speakers: [
      { name: "Dr. Prashant Suryawanshi", role: "Associate Dean, Faculty of Commerce & Management, SPPU" },
      { name: "Rajeev Sawant", role: "Director of Finance, Ferrero India" },
      { name: "Shyamlal Giridhar", role: "General Manager–HR, Piaggio Vehicles Pvt. Ltd." },
      { name: "Hemant Mudaliar", role: "Director–IT, Piaggio Vehicles Pvt. Ltd." }
    ],
    representatives: [
      { name: "Dr. Anand A. Deshmukh", role: "Director, VIIT Baramati" },
      { name: "Dr. Yuvraj Dattatraya Nalwade", role: "HoD, BCA" },
      { name: "Mr. Sagar Gajanan Nimbalkar", role: "Assistant Professor" }
    ],
    photos: [
      { src: "assets/events/evolve-2026-01.jpeg", label: "EVOLVE 2026 — 01" },
      { src: "assets/events/evolve-2026-02.jpeg", label: "EVOLVE 2026 — 02" },
      { src: "assets/events/evolve-2026-03.jpeg", label: "EVOLVE 2026 — 03" }
    ]
  }
  // ── Add future events here, e.g. ──
  // { id: "hackathon-2027", year: 2027, title: "Hackathon 2027", subtitle: "...", location: "VIIT Baramati", venue: "...", cover: "assets/events/hackathon-2027-01.jpeg", journeyTitle: "...", description: "...", speakers: [], representatives: [], photos: [{ src: "assets/events/hackathon-2027-01.jpeg", label: "Hackathon 2027 — 01" }] },
];

const playlist = [
  // Local MP3 — same audio as https://youtu.be/yNXkRYhcH3c — works on file:// and http://
  // Original long file copied to wavecont.mp3 to avoid spaces/brackets encoding (kept both)
  { id: "wavecont-local", title: "Wavecont - Uplifting And Inspiring Acoustic Corporate", artist: "Pro Tunes - Copyright Safe Music", src: "assets/audio/wavecont.mp3", artwork: "assets/audio/wavecont-artwork.jpg", icon: "assets/icons/wavecont.svg", youtubeId: "yNXkRYhcH3c", youtubeEmbed: "https://www.youtube.com/embed/yNXkRYhcH3c", duration: "2:24" }
];

const galleryImages = [
  { src: "assets/profile/profilepic.jpg", label: "Abhishek Jadhav — Creative Developer" },
  { src: "assets/projects/developer-portfolio/hero.png", label: "Developer Portfolio — Hero" },
  { src: "assets/projects/0xemotion/interface.png", label: "0xEmotion — Interface" },
  { src: "assets/projects/0xmagicsearch/scanner.png", label: "0xMagicSearch — Scanner" },
  { src: "assets/projects/0xaircanvas/canvas.png", label: "0xAirCanvas — Air Canvas" },
  { src: "assets/projects/0xvoicevision/voice.png", label: "0xVoiceVision — Voice Search" },
  { src: "assets/projects/veda-tribute-page/hero.png", label: "VEDA Tribute Page — Hero" },
  { src: "assets/projects/veda-personal-intro/hero.png", label: "VEDA Personal Intro — Hero" },
  { src: "assets/projects/veda-simple-resume/hero.png", label: "VEDA Resume Website — Hero" },
  { src: "assets/projects/veda-digital-clock/hero.png", label: "VEDA Digital Clock — Hero" },
  { src: "assets/projects/veda-temp-converter/hero.png", label: "VEDA Temperature Converter — Hero" },
  { src: "assets/projects/veda-bmi-calculator/hero.png", label: "VEDA BMI Calculator — Hero" },
  { src: "assets/projects/veda-basic-calculator/hero.png", label: "VEDA Basic Calculator — Hero" },
  { src: "assets/projects/veda-quote-generator/hero.png", label: "VEDA Quote Generator — Hero" },
  { src: "assets/projects/veda-image-gallery/hero.png", label: "VEDA Image Gallery — Hero" },
  { src: "assets/projects/veda-faq-accordion/hero.png", label: "VEDA FAQ Accordion — Hero" },
  { src: "assets/certifications/certificate-cpp.jpg", label: "Complete C++ — Sheryians" },
  { src: "assets/certifications/certificate-html-css-js.jpg", label: "HTML CSS JS — Educative" }
];

// Search index for Spotlight
const searchIndex = [];
projects.forEach(p => searchIndex.push({ title:p.name, category:(p.folder==='veda' ? "Project — VEDA Internship" : (p.folder==='python' ? "Project — Python" : "Project — Web")), appId:"projects", subRoute:p.id, keywords:[p.name, p.category, p.folder||'', ...(p.stack||[]), ...(p.facts||[])].join(" ").toLowerCase() }));
skills.forEach(s => s.items.forEach(item => searchIndex.push({ title:item, category:`Skill — ${s.category}`, appId:"skills", keywords:(item+" "+s.category).toLowerCase() })));
certifications.forEach(c => searchIndex.push({ title:c.title, category:"Certification", appId:"certifications", keywords:[c.title,c.issuer,c.issued].join(" ").toLowerCase() }));
searchIndex.push({ title:"Abhishek Jadhav", category:"Profile", appId:"about", keywords:"abhishek jadhav 0xabhi13 about bca creative developer baramati" });
searchIndex.push({ title:"Resume", category:"Document", appId:"resume", keywords:"resume cv pdf download" });
searchIndex.push({ title:"Contact", category:"Contact", appId:"contact", keywords:"contact email linkedin github baramati" });
events.forEach(ev => {
  searchIndex.push({ title: ev.title, category: "Event", appId: "events", subRoute: ev.id, keywords: [ev.title, ev.subtitle, ev.location, ev.venue, ev.year].join(" ").toLowerCase() });
  (ev.photos || []).forEach((ph, i) => searchIndex.push({ title: `${ev.title} — Photo ${String(i + 1).padStart(2, "0")}`, category: "Event Photo", appId: "events", subRoute: ev.id, keywords: (ev.title + " photo gallery " + ph.label).toLowerCase() }));
});

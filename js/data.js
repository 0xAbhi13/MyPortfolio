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
    purpose: "This portfolio itself — a macOS-inspired desktop OS built as a fully interactive operating system. Vanilla HTML/CSS/JS only — no frameworks, no build — featuring draggable single-window manager, Spotlight (Ctrl+K), Ask Abhi offline AI, Wavecont 2:24 music bar (file:// + http://), and universal responsive phone 390×780. Every pixel is cinematic motion with zero dependencies.",
    github: "https://github.com/0xAbhi13/MyPortfolio",
    demo: "https://0xabhi13.github.io/MyPortfolio/",
    stack: ["HTML5","CSS3","JavaScript","Tailwind CDN","GSAP 3.12.5","Lottie","Lucide","Web Audio API"],
    facts: ["Desktop OS: ABHISHEK centered + 0xAbhi13 menu + Unsplash wallpaper + particleCanvas 56 + GSAP parallax","Single-window manager: drag/resize/zIndex/traffic (close/min/max) + windowIn 0.38s spring — 1 at a time","Ask Abhi Pro: avatar Online, 6 starters, local searchIndex 45, offline — no API","MusicBar: Wavecont 2:24 assets/audio/wavecont.mp3 5.7MB — preload metadata, crossOrigin='', file:// + http:// both, View→GitHub","Professional icons: 14× 96×96 SVG linearGradient #8b5cf6→#4f46e5 — iconPulseGlow 2.8s + gradientShift 8s","7 projects (BeatForge/PDFForge/MyPortfolio + 4 AI/CV) • Spotlight Ctrl+K • Terminal • Photos masonry • Resume Coming Soon 85%","Fully vanilla — CDN Tailwind + lucide + lottie-player + gsap — deployed on GitHub Pages (no build)"],
    screenshots: [{label:"Hero — Desktop OS", src:"assets/projects/developer-portfolio/hero.png"}, {label:"Overview — Window Manager", src:"assets/projects/developer-portfolio/overview.png"}]
  },
  {
    id: "0xbeatforge",
    name: "0xBeatForge",
    status: "Live",
    category: "Web Audio • Music",
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
    purpose: "Speak a word and see it. Web Speech API transcribes your voice, Flask cleans the query, and Openverse pulls a matching image.",
    github: "https://github.com/0xAbhi13/0xVoiceVision",
    demo: "",
    stack: ["Python","Flask","Web Speech API","Openverse API"],
    facts: ["Voice → text via Web Speech API","Flask routes query to Openverse","Free Openverse — no API key","Animated reveal"],
    screenshots: [{label:"Voice", src:"assets/projects/0xvoicevision/voice.png"}, {label:"Result", src:"assets/projects/0xvoicevision/result.png"}]
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
  { title: "YUVA AI For All", issuer: "IndiaAI — TCS iON", issued: "Aug 2026", credentialId: "87006977-0545-17505-4", image: "assets/certifications/certificate-yuva-ai-for-all.jpg", verifyUrl: "https://g09.tcsion.com//LX/ecertificate/verification?id=87006977-0545-17505-4" }
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
  { src: "assets/certifications/certificate-cpp.jpg", label: "Complete C++ — Sheryians" },
  { src: "assets/certifications/certificate-html-css-js.jpg", label: "HTML CSS JS — Educative" }
];

// Search index for Spotlight
const searchIndex = [];
projects.forEach(p => searchIndex.push({ title:p.name, category:"Project", appId:"projects", subRoute:p.id, keywords:[p.name, p.category, ...p.stack, ...p.facts].join(" ").toLowerCase() }));
skills.forEach(s => s.items.forEach(item => searchIndex.push({ title:item, category:`Skill — ${s.category}`, appId:"skills", keywords:(item+" "+s.category).toLowerCase() })));
certifications.forEach(c => searchIndex.push({ title:c.title, category:"Certification", appId:"certifications", keywords:[c.title,c.issuer,c.issued].join(" ").toLowerCase() }));
searchIndex.push({ title:"Abhishek Jadhav", category:"Profile", appId:"about", keywords:"abhishek jadhav 0xabhi13 about bca creative developer baramati" });
searchIndex.push({ title:"Resume", category:"Document", appId:"resume", keywords:"resume cv pdf download" });
searchIndex.push({ title:"Contact", category:"Contact", appId:"contact", keywords:"contact email linkedin github baramati" });

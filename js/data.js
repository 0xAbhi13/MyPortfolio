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
    name: "Developer Portfolio",
    status: "Live",
    category: "Web • Editorial",
    purpose: "This website — fully responsive, dark, editorial portfolio built from scratch with plain HTML, CSS and JavaScript. No frameworks, no build tools — just solid fundamentals and cinematic motion.",
    github: "https://github.com/0xAbhi13",
    demo: "https://0xabhi13.github.io/MyPortfolio/",
    stack: ["HTML5","CSS3","JavaScript","GSAP","Lenis"],
    facts: ["Responsive editorial layout — hero left vs visual centered","Cinematic loader, grain, particles, magnetic buttons","ScrollTrigger choreography in every section","No frameworks — CDN GSAP + Lenis","Deployed on GitHub Pages"],
    screenshots: [{label:"Hero", src:"assets/projects/developer-portfolio/hero.png"}, {label:"Overview", src:"assets/projects/developer-portfolio/overview.png"}]
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
  { title: "Complete C++ Language", issuer: "Sheryians Coding School", issued: "Jul 2026", credentialId: "4834427359730082f339b619", image: "assets/certifications/certificate-cpp.jpg", verifyUrl: "https://sheryians.com/certificate/4834427359730082f339b619" },
  { title: "HTML, CSS & JavaScript from Scratch", issuer: "Educative", issued: "Jul 2026", credentialId: "FD9G69XC5T", image: "assets/certifications/certificate-html-css-js.jpg", verifyUrl: "https://www.educative.io/verify-certificate/FD9G69XC5T" },
  { title: "Learn Python 3", issuer: "Educative", issued: "Jul 2026", credentialId: "7HYRJKNF2B", image: "assets/certifications/certificate-python.jpg", verifyUrl: "https://www.educative.io/verify-certificate/7HYRJKNF2B" }
];

const playlist = [
  { id: "wavecont-local", title: "Wavecont - Uplifting And Inspiring Acoustic Corporate", artist: "Pro Tunes - Copyright Safe Music", src: "assets/audio/Wavecont - Uplifting And Inspiring Acoustic Corporate [Copyright Safe Background Music] - Pro Tunes - Copyright Safe Music.mp3", artwork: "assets/audio/wavecont-artwork.jpg", icon: "assets/icons/wavecont.svg", youtubeId: "yNXkRYhcH3c", youtubeEmbed: "https://www.youtube.com/embed/yNXkRYhcH3c", duration: "2:24" }
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

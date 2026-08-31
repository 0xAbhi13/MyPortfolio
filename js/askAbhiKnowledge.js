// ASK_ABHI_KNOWLEDGE — centralized, dynamic, production-ready
// Loads AFTER js/data.js, BEFORE js/app.js
// Single source of truth for Ask Abhi. Update this file (or js/data.js) and Ask Abhi auto-updates.
// Architecture: identity / about / education / skills / projects / certificates / links / contact / website / assistant
// All data is derived from live portfolio globals where possible — no duplication.
(function(global){
  const VERSION = "2.1.0";
  const LAST_UPDATE = "2026-08-31";

  // safe live getter — reads current value each time (dynamic website awareness)
  // Handles const/let top-level globals (not on window) — critical for 0 projects/certificates bug
  const live = (name, fallback) => {
    try { if(typeof window !== 'undefined' && window[name] !== undefined) return window[name]; } catch(e){}
    try { if(typeof globalThis !== 'undefined' && globalThis[name] !== undefined) return globalThis[name]; } catch(e){}
    try {
      if(name === 'profile' && typeof profile !== 'undefined') return profile;
      if(name === 'projects' && typeof projects !== 'undefined') return projects;
      if(name === 'skills' && typeof skills !== 'undefined') return skills;
      if(name === 'certifications' && typeof certifications !== 'undefined') return certifications;
      if(name === 'certs' && typeof certs !== 'undefined') return certs;
      if(name === 'playlist' && typeof playlist !== 'undefined') return playlist;
      if(name === 'galleryImages' && typeof galleryImages !== 'undefined') return galleryImages;
      if(name === 'searchIndex' && typeof searchIndex !== 'undefined') return searchIndex;
    } catch(e){}
    return fallback;
  };

  const knowledge = {
    version: VERSION,
    lastUpdate: LAST_UPDATE,

    // ── Core identity ── Ask Abhi is the assistant, Abhishek is the owner/creator
    identity: {
      assistantName: "Ask Abhi",
      assistantFullName: "Ask Abhi — Portfolio AI Assistant",
      ownerName: "Abhishek Jadhav",
      ownerAlias: "0xAbhi13",
      githubUsername: "0xAbhi13",
      creator: "Abhishek Jadhav",
      assistantCreator: "Abhishek Jadhav",
      portfolioRepository: "MyPortfolio",
      githubPortfolio: "https://github.com/0xAbhi13/MyPortfolio",
      portfolioWebsite: "https://0xabhi13.github.io/MyPortfolio/",
      description: "Official AI assistant for Abhishek Jadhav's portfolio — helps visitors learn about Abhishek, his skills, projects, certificates, and website"
    },

    // ── Owner / About — dynamic from profile ──
    get owner(){
      const p = live('profile', {});
      return {
        name: p.name || "Abhishek Jadhav",
        alias: p.alias || "0xAbhi13",
        headline: p.headline || "Creative Developer | C++ • Python • JavaScript | BCA Student — Baramati, Maharashtra",
        shortHeadline: p.shortHeadline || "C++ • PYTHON • JAVASCRIPT • BCA • BARAMATI",
        summary: p.summary || "",
        location: p.location || "Baramati, Maharashtra, India",
        avatar: p.avatar || "assets/profile/profilepic.jpg",
        github: p.github || "https://github.com/0xAbhi13",
        linkedin: p.linkedin || "https://linkedin.com/in/0xAbhi13",
        email: p.email || "contact.0xabhi13@gmail.com"
      };
    },
    get about(){ const p = live('profile', {}); return p.summary || ""; },
    get education(){
      const p = live('profile', {});
      return p.education || {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "BCA Program — Baramati, Maharashtra",
        affiliation: "Computer Science Fundamentals • Data Structures • Databases • Software Development — Currently Enrolled",
        cgpa: "Currently Pursuing",
        graduation: "2026"
      };
    },

    // ── Skills — dynamic ──
    get skills(){ return live('skills', []); },

    // ── Projects — dynamic, with full intelligence ──
    get projects(){ return live('projects', []); },

    // ── Certificates — dynamic (supports both certifications & certs globals) ──
    get certificates(){
      const a = live('certifications', null);
      if(Array.isArray(a)) return a;
      const b = live('certs', []);
      return Array.isArray(b) ? b : [];
    },
    get certs(){ return this.certificates; },

    // ── Links — dynamic — never fake ──
    get links(){
      const p = live('profile', {});
      return {
        github: p.github || "https://github.com/0xAbhi13",
        githubProfile: p.github || "https://github.com/0xAbhi13",
        githubUsername: "0xAbhi13",
        linkedin: p.linkedin || "https://linkedin.com/in/0xAbhi13",
        email: p.email || "contact.0xabhi13@gmail.com",
        portfolioRepo: "MyPortfolio",
        githubPortfolio: "https://github.com/0xAbhi13/MyPortfolio",
        portfolioWebsite: "https://0xabhi13.github.io/MyPortfolio/",
        portfolioUrl: "https://0xabhi13.github.io/MyPortfolio/",
        sourceCode: "https://github.com/0xAbhi13/MyPortfolio"
      };
    },
    get contact(){
      const p = live('profile', {});
      return {
        email: p.email || "contact.0xabhi13@gmail.com",
        github: p.github || "https://github.com/0xAbhi13",
        linkedin: p.linkedin || "https://linkedin.com/in/0xAbhi13",
        location: p.location || "Baramati, Maharashtra, India",
        availability: "Open to internships, junior roles & collaboration — replies within 24h (contact via email/GitHub/LinkedIn). Ask Abhi cannot detect Abhishek's real-time personal presence."
      };
    },

    // ── Website metadata — only known, no invention ──
    website: {
      title: "Abhishek Jadhav — 0xAbhi13 | Creative Developer Portfolio",
      url: "https://0xabhi13.github.io/MyPortfolio/",
      repo: "https://github.com/0xAbhi13/MyPortfolio",
      portfolioRepo: "MyPortfolio",
      githubPortfolio: "https://github.com/0xAbhi13/MyPortfolio",
      hosting: "GitHub Pages",
      hostingNote: "Deployed on GitHub Pages (no build, static vanilla HTML/CSS/JS). Source: https://github.com/0xAbhi13/MyPortfolio",
      sourceCode: "https://github.com/0xAbhi13/MyPortfolio",
      builtWith: ["HTML5","CSS3","JavaScript (Vanilla)","Tailwind CDN","GSAP 3.12.5","Lottie","Lucide","Web Audio API","HTML5 Canvas","JetBrains Mono / Syne / Inter"],
      features: ["Desktop OS shell with Windows-style controls on right (_ □ ×)","Single-window manager (drag/resize 8-dir, zIndex, windowIn 0.38s)","Phone 390×780 frame with pop sheet 0.48s for every section","Spotlight search Ctrl+K","Ask Abhi offline AI (no API)","Wallpaper Unsplash + mesh + particles (desktop 56, phone 28)","Wavecont 2:24 audio (file:// + http://)","Briefcase favicon gradient","Universal responsive 320→1536"],
      sections: ["Finder","About","Projects","Skills","Certifications (9)","Photos (Coming Soon)","Resume (Coming Soon)","Contact","Terminal","Ask Abhi","Music Player","Spotlight"],
      design: "Dark theme #050510 / #0a0a1a, violet #8b5cf6→#4f46e5, Windows controls on right, macOS-inspired desktop, cinematic motion",
      animations: ["Boot shimmer 1.2s (3s)","wallpaperPan 30s (desktop)","iconPulseGlow 2.8s + gradientShift 8s","windowIn 0.38s spring","phone pop 0.48s spring 0.34,1.56","msgIn 0.24s","particleCanvas"],
      developerInterests: ["C++ fundamentals","Python automation","JavaScript web","DSA","React","GSAP Advanced","Node.js","System Design Basics"],
      lastUpdate: LAST_UPDATE
    },

    // ── Assistant behavior & status ──
    assistant: {
      name: "Ask Abhi",
      fullName: "Ask Abhi — Portfolio AI Assistant",
      version: VERSION,
      status: "online",
      description: "Official AI assistant for Abhishek Jadhav's portfolio",
      purpose: "Helps visitors learn about Abhishek, his portfolio, projects, skills, education, certificates, contact and website features",
      capabilities: [
        "Answer who is Abhishek / who owns portfolio / who is Ask Abhi",
        "List and explain all projects with stacks, GitHub, features (natural language)",
        "List and verify all 9 certificates with issuer, ID, verify link",
        "Detail skills by category and currently levelling up",
        "Provide contact & social links (never fake)",
        "Explain portfolio architecture, hosting, sections, design",
        "Navigate portfolio (open Projects/Skills/Certs etc.)",
        "Context-aware follow-ups (which one uses flask? give me its github)",
        "Detect online/offline — never hallucinate Abhishek's personal presence"
      ],
      limitations: "Offline, no backend, no hallucination. If unknown: 'I don't have that information in my portfolio knowledge base yet.' / Hindi: 'मेरे पास यह जानकारी नहीं है' / Marathi: 'माझ्याकडे ही माहिती नाही' — Never invent.",
      lastKnowledgeUpdate: LAST_UPDATE,
      languageSupport: ["English","Casual Indian English (bhai, what does abhi do, show projects)","Hindi (Devanagari & Roman) — understands and replies in Hindi","Marathi (Devanagari & Roman) — understands and replies in Marathi"]
    }
  };

  // ── Helpers — intelligence (live, no duplication) ──
  // Find projects by natural language
  knowledge.findProjects = function(query){
    const q = (query||"").toLowerCase();
    const all = this.projects;
    if(!q.trim()) return all;
    // special intents
    if(q.includes('flask')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('flask'));
    if(q.includes('javascript') || q.includes(' js')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('javascript'));
    if(q.includes('python')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('python'));
    if(q.includes('sqlite')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('sqlite'));
    if(q.includes('php')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('php'));
    if(q.includes('mysql')) return all.filter(p=> p.stack.join(' ').toLowerCase().includes('mysql'));
    if(q.includes('music') || q.includes('audio') || q.includes('beat')) return all.filter(p=> (p.category||'').toLowerCase().includes('audio') || p.name.toLowerCase().includes('beat'));
    if(q.includes('pdf')) return all.filter(p=> p.name.toLowerCase().includes('pdf'));
    if(q.includes('vision') || q.includes('opencv') || q.includes('mediapipe')) return all.filter(p=> (p.category||'').toLowerCase().includes('vision') || p.stack.join(' ').toLowerCase().includes('opencv'));
    // generic token search
    return all.filter(p=>{
      const hay = [p.name, p.id, p.category, p.purpose, p.stack.join(' '), (p.facts||[]).join(' ')].join(' ').toLowerCase();
      return q.split(/\s+/).some(tok=> tok.length>2 && hay.includes(tok)) || hay.includes(q);
    });
  };

  knowledge.getProjectByIdOrName = function(q){
    const lower = (q||"").toLowerCase();
    return this.projects.find(p=> lower.includes(p.id.toLowerCase()) || lower.includes(p.name.toLowerCase()) );
  };

  // Certificates intelligence
  knowledge.findCertificates = function(query){
    const q = (query||"").toLowerCase();
    const all = this.certificates;
    if(!q.trim()) return all;
    return all.filter(c=>{
      const hay = [c.title, c.issuer, c.credentialId||'', c.issued||''].join(' ').toLowerCase();
      return q.split(/\s+/).some(tok=> tok.length>2 && hay.includes(tok)) || hay.includes(q);
    });
  };
  knowledge.getCertificateByQuery = function(q){
    const lower = (q||"").toLowerCase();
    // try exact credentialId or title
    return this.certificates.find(c=>
      lower.includes((c.credentialId||'').toLowerCase()) ||
      lower.includes(c.title.toLowerCase()) ||
      lower.includes(c.issuer.toLowerCase())
    );
  };

  // Skills helper
  knowledge.getSkillsText = function(){
    return this.skills.map(s=> `${s.category}: ${s.items.join(', ')}`).join('\n');
  };

  // Link intelligence — never fake
  knowledge.getLink = function(type){
    const t = (type||"").toLowerCase();
    if(t.includes('github')) return this.links.github;
    if(t.includes('linkedin')) return this.links.linkedin;
    if(t.includes('portfolio') || t.includes('website')) return this.links.portfolioWebsite;
    if(t.includes('repo') || t.includes('source')) return this.links.githubPortfolio;
    if(t.includes('email') || t.includes('mail')) return this.links.email;
    return null;
  };

  // System status — online/offline awareness
  knowledge.getAssistantStatus = function(){
    // Ask Abhi is online if this JS is running and knowledge is loaded
    const online = typeof window !== 'undefined' && !!window.ASK_ABHI_KNOWLEDGE;
    return online ? "online" : "offline";
  };
  knowledge.getWebsiteStatus = function(){
    // Hosting is known from website.hosting
    return this.website.hosting || "unknown — portfolio does not expose reliable hosting info unless configured";
  };
  // Abhishek personal presence — cannot be determined without presence system
  knowledge.getOwnerPresence = function(){
    return "I can't confirm Abhishek's personal real-time availability unless a live presence system is connected. Ask Abhi being online does not mean Abhishek is online.";
  };

  // Suggested questions — generated from actual knowledge (dynamic) — education+contact removed per request, Hindi/Marathi supported
  knowledge.getSuggestedQuestions = function(){
    const projs = this.projects.slice(0,2).map(p=> `Tell me about ${p.name}`);
    return [
      "Who is Abhishek Jadhav?",
      "What are Abhishek's skills?",
      `Show me his ${this.projects.length} projects`,
      "List all 9 certifications with verify links",
      "Which project uses Flask?",
      ...projs
    ].slice(0,6);
  };

  // Expose globally
  global.ASK_ABHI_KNOWLEDGE = knowledge;
  global.AskAbhiKnowledge = knowledge;
  global.AskAbhi_KNOWLEDGE = knowledge;
})(typeof window !== 'undefined' ? window : this);

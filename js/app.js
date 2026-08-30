// Abhishek Portfolio — Vanilla JS — Desktop OS — 0xAbhi13

/* ---------- Boot ---------- */
(function(){
  const boot = document.getElementById('bootScreen');
  const text = document.getElementById('bootText');
  const bar = document.getElementById('bootBar');
  const steps = ['Initializing workspace...','Loading portfolio...','Loading projects...','Initializing Ask Abhi...','Ready.'];
  if(sessionStorage.getItem('booted')){ boot.classList.add('hide'); setTimeout(()=>boot.remove(),500); return; }
  let i=0;
  const iv=setInterval(()=>{ if(i<steps.length){ text.textContent=steps[i]; bar.style.width=((i+1)/steps.length*100)+'%'; i++; } else { clearInterval(iv); } }, 420);
  setTimeout(()=>{ boot.classList.add('hide'); sessionStorage.setItem('booted','1'); setTimeout(()=>boot.remove(),500); }, 3000);
})();

/* ---------- Time ---------- */
function tickTime(){
  const d=new Date();
  const menuEl=document.getElementById('menuTime');
  if(menuEl) menuEl.textContent=d.toLocaleString('en-US',{weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'});
  const phoneEl=document.getElementById('phoneTime');
  if(phoneEl) phoneEl.textContent=d.toLocaleTimeString('en-US',{hour:'numeric', minute:'2-digit', hour12:false});
}
tickTime(); setInterval(tickTime,60000);

/* ---------- Online Graphics — Particles + GSAP Parallax ---------- */
(function initOnlineGraphics(){
  // Particle canvas — subtle floating dots with connections (online feel, no external lib)
  const cvs=document.getElementById('particleCanvas');
  if(cvs){
    const ctx=cvs.getContext('2d'); let w,h, pts=[];
    const DPR=Math.min(2, window.devicePixelRatio||1);
    function resize(){ w=cvs.width=window.innerWidth*DPR; h=cvs.height=window.innerHeight*DPR; cvs.style.width=window.innerWidth+'px'; cvs.style.height=window.innerHeight+'px'; ctx.setTransform(DPR,0,0,DPR,0,0); const n=Math.min(56, Math.floor(window.innerWidth*window.innerHeight/26000)); pts=Array.from({length:n},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.25,r:Math.random()*1.1+0.3})); }
    function tick(){
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      pts.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>window.innerWidth) p.vx*=-1; if(p.y<0||p.y>window.innerHeight) p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.18)'; ctx.fill(); });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){ const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy); if(d<120){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(139,92,246,${0.08*(1-d/120)})`; ctx.lineWidth=0.6; ctx.stroke(); } }
      requestAnimationFrame(tick);
    }
    resize(); window.addEventListener('resize', resize); tick();
  }
  // GSAP wallpaper parallax only — ABHISHEK stays static centered per request
  if(window.gsap){
    const wallpaper=document.getElementById('wallpaper');
    if(wallpaper){
      window.addEventListener('mousemove', (e)=>{
        const x=(e.clientX/window.innerWidth-0.5), y=(e.clientY/window.innerHeight-0.5);
        gsap.to(wallpaper, {x:x*-6, y:y*-4, duration:1.2, ease:'power2.out'});
      });
    }
  }
})();

/* ---------- Icons config ---------- */
const APPS = [
  {id:'finder', label:'Portfolio', icon:'folder', color:'#5b9dff', accent:'#5b9dff'},
  {id:'projects', label:'Projects', icon:'code', color:'#10b981', accent:'#45c99a'},
  {id:'resume', label:'Resume.pdf', icon:'file-text', color:'#ef4444', accent:'#ef746d'},
  {id:'about', label:'About Abhi', icon:'user', color:'#a78bfa', accent:'#ad83e8'},
  {id:'certifications', label:'Certifications', icon:'award', color:'#fb923c', accent:'#e89b59'},
  {id:'terminal', label:'Terminal', icon:'terminal', color:'#94a3b8', accent:'#9ca8b8'},
  {id:'askabhi', label:'Ask Abhi', icon:'sparkles', color:'#f472b6', accent:'#e783b7', special:true},
];

const DOCK_APPS = [
  {id:'finder', label:'Finder', icon:'folder', accent:'#5b9dff'},
  {id:'about', label:'About', icon:'user', accent:'#ad83e8'},
  {id:'projects', label:'Projects', icon:'code', accent:'#45c99a'},
  {id:'skills', label:'Skills', icon:'cpu', accent:'#61b9d0'},
  {id:'certifications', label:'Certs', icon:'award', accent:'#e89b59'},
  {id:'resume', label:'Resume', icon:'file-text', accent:'#ef746d'},
  {id:'terminal', label:'Terminal', icon:'terminal', accent:'#9ca8b8'},
  {id:'askabhi', label:'Ask Abhi', icon:'sparkles', accent:'#8b5cf6', special:true},
];

const WINDOW_DEFS = {
  finder:{title:'0xAbhi13 Portfolio', w:860, h:520},
  about:{title:'About Abhishek', w:780, h:560},
  projects:{title:'Projects', w:880, h:580},
  skills:{title:'Skills', w:780, h:520},
  certifications:{title:'Certifications', w:860, h:560},
  photos:{title:'Photos', w:860, h:560},
  resume:{title:'Resume', w:780, h:600},
  contact:{title:'Contact', w:560, h:420},
  terminal:{title:'Terminal', w:700, h:460},
  askabhi:{title:'Ask Abhi', w:680, h:540},
};

/* ---------- Render Desktop & Dock ---------- */
function renderIcons(){
  const c=document.getElementById('desktopIcons');
  c.innerHTML = APPS.map(a=>`
    <div class="desktop-icon ${windows[a.id]?.isOpen?'is-open':''}" ondblclick="openApp('${a.id}')" onclick="handleIconClick('${a.id}', this)">
      <div class="desktop-icon-img" style="background:transparent;border:none;box-shadow:none;padding:0;width:56px;height:56px;display:grid;place-items:center;">
        <img src="assets/icons/${a.id}.svg" alt="${a.label}" class="w-[56px] h-[56px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" loading="eager" onerror="this.outerHTML='<i data-lucide=&quot;${a.icon}&quot; class=&quot;w-6 h-6&quot; style=&quot;color:${a.accent}&quot;></i>'">
      </div>
      <span class="desktop-icon-label">${a.label}</span>
    </div>
  `).join('');
  lucide.createIcons();
}
function renderDock(){
  const d=document.getElementById('dock');
  if(!d) return; // dock removed — replaced by music bar
  d.innerHTML = DOCK_APPS.map(a=>`
    <div class="dock-item">
      <button class="dock-btn ${a.special?'is-special':''} ${windows[a.id]?.isOpen?'is-open':''}" onclick="openApp('${a.id}')" title="${a.label}" style="background:transparent;border:none;padding:0;">
        <img src="assets/icons/${a.id}.svg" alt="${a.label}" class="${a.special?'w-[110px] h-[44px] object-contain':'w-[48px] h-[48px] object-contain'} drop-shadow-lg" loading="eager" onerror="this.outerHTML='<i data-lucide=&quot;${a.icon}&quot; class=&quot;w-5 h-5&quot;></i>'">
        ${a.special?`<span class="hidden">${a.label}</span>`:''}
      </button>
      <div class="dock-dot ${windows[a.id]?.isOpen?'on':''}"></div>
    </div>
  `).join('');
  lucide.createIcons();
}
function handleIconClick(id, el){
  // bounce animation then open
  if(el){ el.classList.add('icon-bounce'); setTimeout(()=>el.classList.remove('icon-bounce'), 400); }
  openApp(id);
}
function renderMobileGrid(){
  const g=document.getElementById('mobileGrid');
  if(!g) return;
  const list=[{id:'about',label:'About',icon:'user'},{id:'projects',label:'Projects',icon:'code'},{id:'skills',label:'Skills',icon:'cpu'},{id:'certifications',label:'Certs',icon:'award'},{id:'photos',label:'Photos',icon:'image'},{id:'resume',label:'Resume',icon:'file-text'},{id:'contact',label:'Contact',icon:'mail'},{id:'terminal',label:'Terminal',icon:'terminal'}];
  g.innerHTML = list.map(a=>`
    <button onclick="openMobileApp('${a.id}')" class="flex flex-col items-center gap-2 active:scale-95 transition-transform">
      <img src="assets/icons/${a.id}.svg" alt="${a.label}" class="w-14 h-14 object-contain drop-shadow-lg" loading="lazy" onerror="this.outerHTML='<span class=&quot;w-14 h-14 rounded-2xl bg-white/10 border border-white/10 grid place-items:center&quot;><i data-lucide=&quot;${a.icon}&quot; class=&quot;w-6 h-6 opacity-70&quot;></i></span>'">
      <span class="text-[11px] text-white/60">${a.label}</span>
    </button>
  `).join('');
  lucide.createIcons();
}

/* ---------- Window Manager ---------- */
let zCounter=10;
const windows={};
Object.keys(WINDOW_DEFS).forEach(id=>{
  windows[id]={id, ...WINDOW_DEFS[id], isOpen:false, isMinimized:false, isMaximized:false, isFocused:false, z:0, x:0,y:0,w:WINDOW_DEFS[id].w,h:WINDOW_DEFS[id].h, prev:null, hasOpened:false};
});

function getWorkArea(){
  const menu=28, dock=88, m=8;
  return {left:m, top:menu+m, right:window.innerWidth-m, bottom:window.innerHeight-dock, w:window.innerWidth-2*m, h:window.innerHeight-menu-dock-2*m};
}
function initialPos(id){
  const wa=getWorkArea(); const idx=Object.keys(WINDOW_DEFS).indexOf(id); const win=windows[id];
  const w=Math.min(win.w, wa.w), h=Math.min(win.h, wa.h);
  const cascade=(idx%5)*20;
  const x=Math.min(wa.right-w, Math.max(wa.left, (wa.left+wa.right-w)/2 + cascade -40));
  const y=Math.min(wa.bottom-h, Math.max(wa.top, (wa.top+wa.bottom-h)/2 + cascade -20));
  return {x,y,w,h};
}
function openApp(id, sub){
  const win=windows[id]; if(!win) return;
  if(win.isOpen && !win.isMinimized){ focusApp(id); win.sub = sub || null; renderWindows(); return; }
  // Single-window mode: close all other windows so only 1 open at a time
  Object.values(windows).forEach(v=>{ if(v.id!==id){ v.isOpen=false; v.isMinimized=false; v.isMaximized=false; v.isFocused=false; v.sub=null; } });
  if(!win.hasOpened){ const p=initialPos(id); win.x=p.x; win.y=p.y; win.w=p.w; win.h=p.h; win.prev={...p}; win.hasOpened=true; }
  win.isOpen=true; win.isMinimized=false; win.sub=sub||null;
  zCounter++; win.z=zCounter;
  Object.values(windows).forEach(v=>{ if(v.id!==id) v.isFocused=false; }); win.isFocused=true;
  // hide mobile if open
  document.getElementById('mobileAppView')?.classList.add('hidden');
  renderWindows(); renderDock(); renderIcons();
  if(window.innerWidth<768 && !['finder','askabhi'].includes(id) && !win.isMaximized){
    // optional: maximize on mobile for better UX? currently keep as window but also allow mobile sheet
  }
}
function closeApp(id){ const w=windows[id]; w.isOpen=false; w.isMinimized=false; w.isMaximized=false; w.isFocused=false; w.sub=null; renderWindows(); renderDock(); renderIcons(); }
function minimizeApp(id){ windows[id].isMinimized=true; windows[id].isFocused=false; const next=Object.values(windows).filter(v=>v.isOpen&&!v.isMinimized).sort((a,b)=>b.z-a.z)[0]; if(next) next.isFocused=true; renderWindows(); renderDock(); }
function maximizeApp(id){
  const w=windows[id];
  if(w.isMaximized){ // restore
    Object.assign(w, w.prev); w.isMaximized=false;
  } else {
    w.prev={x:w.x,y:w.y,w:w.w,h:w.h}; const wa=getWorkArea(); w.x=wa.left; w.y=wa.top; w.w=wa.w; w.h=wa.h; w.isMaximized=true;
  }
  renderWindows();
}
function focusApp(id){
  const win=windows[id]; if(!win || win.isFocused) {
    // still bring to front if already focused but not on top
    if(win && win.z !== zCounter){
      zCounter++; win.z=zCounter;
      const el=document.querySelector(`.window[data-id="${id}"]`);
      if(el) el.style.zIndex=win.z;
    }
    return;
  }
  zCounter++; win.z=zCounter;
  Object.values(windows).forEach(v=>v.isFocused=v.id===id);
  // update DOM without full re-render to avoid destroying clicked button before click fires
  document.querySelectorAll('.window').forEach(el=>{
    const wid=el.dataset.id; const w=windows[wid];
    if(!w) return;
    el.classList.toggle('is-focused', w.isFocused);
    el.style.zIndex=w.z;
  });
  // update dock highlight
  renderDock();
}

function renderWindows(){
  const layer=document.getElementById('windowLayer');
  layer.innerHTML='';
  const open=Object.values(windows).filter(w=>w.isOpen).sort((a,b)=>a.z-b.z);
  open.forEach(win=>{
    const el=document.createElement('div');
    el.className=`window ${win.isFocused?'is-focused':''} ${win.isMinimized?'is-minimized':''} ${win.isMaximized?'is-maximized':''}`;
    el.style.left=win.x+'px'; el.style.top=win.y+'px'; el.style.width=win.w+'px'; el.style.height=win.h+'px'; el.style.zIndex=win.z;
    el.dataset.id=win.id;
    el.innerHTML=`
      <div class="window-header" data-drag="${win.id}">
        <div class="flex items-center gap-1.5">
          <button class="traffic close" onmousedown="event.stopPropagation()" onclick="closeApp('${win.id}'); event.stopPropagation()">×</button>
          <button class="traffic min" onmousedown="event.stopPropagation()" onclick="minimizeApp('${win.id}'); event.stopPropagation()">−</button>
          <button class="traffic max" onmousedown="event.stopPropagation()" onclick="maximizeApp('${win.id}'); event.stopPropagation()">□</button>
        </div>
        <div class="window-title">${win.title}</div>
        <div class="w-14"></div>
      </div>
      <div class="window-content" id="win-${win.id}">${getAppHTML(win.id, win.sub)}</div>
      <div class="window-resize" data-resize="${win.id}"></div>
    `;
    el.addEventListener('mousedown',()=>focusApp(win.id));
    layer.appendChild(el);
  });
  // bind drag & resize
  bindDrag(); bindResize();
  lucide.createIcons();
  // after render hook for apps that need JS
  setTimeout(bindAppEvents,0);
}

/* ---------- Drag & Resize ---------- */
let drag=null, resize=null;
function bindDrag(){
  document.querySelectorAll('[data-drag]').forEach(h=>{
    h.onmousedown=(e)=>{
      if(e.target.closest('button')) return;
      const id=h.dataset.drag, win=windows[id];
      if(win.isMaximized) return;
      focusApp(id);
      drag={id, sx:e.clientX, sy:e.clientY, ox:win.x, oy:win.y};
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', onDragEnd);
      e.preventDefault();
    };
  });
}
function onDragMove(e){
  if(!drag) return;
  const win=windows[drag.id];
  win.x=drag.ox + (e.clientX-drag.sx);
  win.y=drag.oy + (e.clientY-drag.sy);
  // clamp
  const wa=getWorkArea();
  win.x=Math.max(wa.left, Math.min(wa.right-win.w, win.x));
  win.y=Math.max(wa.top, Math.min(wa.bottom-win.h, win.y));
  const el=document.querySelector(`.window[data-id="${drag.id}"]`);
  if(el){ el.style.left=win.x+'px'; el.style.top=win.y+'px'; }
}
function onDragEnd(){ drag=null; document.removeEventListener('mousemove', onDragMove); document.removeEventListener('mouseup', onDragEnd); }

function bindResize(){
  document.querySelectorAll('[data-resize]').forEach(h=>{
    h.onmousedown=(e)=>{
      const id=h.dataset.resize, win=windows[id];
      if(win.isMaximized) return;
      focusApp(id);
      resize={id, sx:e.clientX, sy:e.clientY, ow:win.w, oh:win.h};
      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('mouseup', onResizeEnd);
      e.preventDefault();
    };
  });
}
function onResizeMove(e){
  if(!resize) return;
  const win=windows[resize.id];
  win.w=Math.max(360, resize.ow + (e.clientX-resize.sx));
  win.h=Math.max(260, resize.oh + (e.clientY-resize.sy));
  const wa=getWorkArea();
  win.w=Math.min(wa.w, win.w); win.h=Math.min(wa.h, win.h);
  const el=document.querySelector(`.window[data-id="${resize.id}"]`);
  if(el){ el.style.width=win.w+'px'; el.style.height=win.h+'px';}
}
function onResizeEnd(){ resize=null; document.removeEventListener('mousemove', onResizeMove); document.removeEventListener('mouseup', onResizeEnd); }

/* ---------- App HTML Generators ---------- */
function getAppHTML(id, sub){
  switch(id){
    case 'finder': return appFinder();
    case 'about': return appAbout();
    case 'projects': return sub? appProjectDetail(sub) : appProjects();
    case 'skills': return appSkills();
    case 'certifications': return appCertifications();
    case 'photos': return appPhotos();
    case 'resume': return appResume();
    case 'contact': return appContact();
    case 'terminal': return appTerminal();
    case 'askabhi': return appAskAbhi();
    default: return `<div class="p-6">App ${id}</div>`;
  }
}

function appFinder(){
  const items=[
    {id:'about', label:'About Abhishek', icon:'user'},
    {id:'projects', label:'Projects', icon:'code'},
    {id:'skills', label:'Skills', icon:'cpu'},
    {id:'certifications', label:'Certifications', icon:'award'},
    {id:'photos', label:'Photos', icon:'image'},
    {id:'resume', label:'Resume', icon:'file-text'},
    {id:'contact', label:'Contact', icon:'mail'},
  ];
  return `
  <div class="flex h-full">
    <div class="w-[200px] bg-black/30 border-r border-white/10 p-2 hidden sm:flex flex-col gap-1">
      <div class="text-[11px] opacity-50 px-2 py-1">Favorites</div>
      ${items.map(i=>`<button onclick="openApp('${i.id}')" class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-sm text-left"><img src="assets/icons/${i.id}.svg" class="w-5 h-5 object-contain" alt="${i.label}" onerror="this.outerHTML='<i data-lucide=&quot;${i.icon}&quot; class=&quot;w-4 h-4 text-violet-300&quot;></i>'"> ${i.label}</button>`).join('')}
    </div>
    <div class="flex-1 p-4 overflow-auto">
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        ${items.map(i=>`
          <button onclick="openApp('${i.id}')" class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 group">
            <img src="assets/icons/${i.id}.svg" class="w-14 h-14 object-contain group-hover:scale-105 transition-transform drop-shadow-lg" alt="${i.label}" onerror="this.outerHTML='<span class=&quot;w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 grid place-items:center&quot;><i data-lucide=&quot;${i.icon}&quot; class=&quot;w-6 h-6&quot;></i></span>'">
            <span class="text-xs">${i.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function appAbout(){
  const p=profile;
  return `
  <div class="p-6 space-y-6 max-w-3xl mx-auto">
    <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <img src="${p.avatar}" alt="${p.name}" class="w-28 h-28 rounded-2xl object-cover border border-white/15 bg-white/5"/>
      <div class="flex-1 text-center sm:text-left">
        <h1 class="text-2xl font-bold">${p.name} <span class="text-violet-300 text-sm font-mono">${p.alias}</span></h1>
        <p class="text-sm text-white/60 mt-1">${p.headline}</p>
        <p class="text-sm text-white/70 mt-3 leading-relaxed">${p.summary}</p>
        <div class="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
          <a href="${p.github}" target="_blank" class="chip flex items-center gap-1"><i data-lucide="github" class="w-3 h-3"></i> GitHub</a>
          <a href="${p.linkedin}" target="_blank" class="chip flex items-center gap-1"><i data-lucide="linkedin" class="w-3 h-3"></i> LinkedIn</a>
          <a href="mailto:${p.email}" class="chip flex items-center gap-1"><i data-lucide="mail" class="w-3 h-3"></i> ${p.email}</a>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold mb-2 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-violet-400 rounded-full"></span> Education</h3>
      <div class="text-sm">
        <div class="font-medium">${p.education.degree}</div>
        <div class="text-white/70">${p.education.institution}</div>
        <div class="text-white/50 text-xs mt-1">${p.education.affiliation}</div>
        <div class="flex gap-2 mt-2"><span class="chip">${p.education.graduation}</span><span class="chip">${p.education.cgpa}</span><span class="chip">${p.location}</span></div>
      </div>
    </div>
    <div class="card bg-gradient-to-r from-violet-600/15 to-indigo-600/15">
      <h3 class="font-semibold">Focus</h3>
      <p class="text-sm text-white/70 mt-1">Building practical products with C++, Python, JavaScript, OpenCV, MediaPipe, Flask — shipping in public as <b class="text-white">@0xAbhi13</b>.</p>
    </div>
  </div>`;
}

function appProjects(){
  return `
  <div class="p-4">
    <div class="grid-projects">
      ${projects.map(p=>`
        <div class="card card-hover cursor-pointer flex flex-col overflow-hidden p-0" onclick="openApp('projects','${p.id}')">
          <div class="h-36 bg-gradient-to-br from-gray-800 to-black relative overflow-hidden">
            ${p.screenshots[0]?`<img src="${p.screenshots[0].src}" alt="${p.name}" class="w-full h-full object-cover opacity-80 hover:opacity-100 transition">`:`<div class="grid place-items:center h-full text-4xl opacity-20">${p.name[0]}</div>`}
            <span class="absolute top-2 right-2 chip chip-live text-[10px]">${p.status}</span>
            <span class="absolute bottom-2 left-2 chip text-[10px]">${p.category}</span>
          </div>
          <div class="p-3 flex-1 flex flex-col">
            <h3 class="font-bold text-sm">${p.name}</h3>
            <p class="text-xs text-white/60 line-clamp-2 mt-1 flex-1">${p.purpose}</p>
            <div class="flex flex-wrap gap-1 mt-2">${p.stack.slice(0,3).map(s=>`<span class="chip text-[9px]">${s}</span>`).join('')}${p.stack.length>3?`<span class="chip text-[9px]">+${p.stack.length-3}</span>`:''}</div>
            <div class="flex gap-2 mt-2">
              ${p.github?`<a href="${p.github}" target="_blank" onclick="event.stopPropagation()" class="p-1.5 bg-white/10 rounded hover:bg-white/20"><i data-lucide="github" class="w-3 h-3"></i></a>`:''}
              ${p.demo?`<a href="${p.demo}" target="_blank" onclick="event.stopPropagation()" class="p-1.5 bg-white/10 rounded hover:bg-white/20"><i data-lucide="external-link" class="w-3 h-3"></i></a>`:''}
              ${p.github?`<a href="${p.github}" target="_blank" onclick="event.stopPropagation()" class="ml-auto text-[11px] text-violet-300 hover:text-violet-200 hover:underline">View →</a>`:`<span class="ml-auto text-[11px] text-violet-300">View →</span>`}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}
function appProjectDetail(id){
  const p=projects.find(x=>x.id===id); if(!p) return appProjects();
  return `
  <div class="h-full overflow-auto">
    <button onclick="openApp('projects')" class="m-3 text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 flex items-center gap-1"><i data-lucide="arrow-left" class="w-3 h-3"></i> Back</button>
    <div class="px-4 pb-6 space-y-4">
      <div class="rounded-xl overflow-hidden border border-white/10 bg-black/20">
        ${p.screenshots[0]?`<img src="${p.screenshots[0].src}" class="w-full h-48 object-cover">`:`<div class="h-48 grid place-items:center bg-gradient-to-br from-violet-900/30 to-indigo-900/30 text-3xl">${p.name}</div>`}
      </div>
      <div>
        <h2 class="text-xl font-bold">${p.name} <span class="chip chip-live ml-2 align-middle">${p.status}</span></h2>
        <p class="text-xs opacity-60">${p.category}</p>
        <p class="text-sm text-white/70 mt-2">${p.purpose}</p>
      </div>
      <div>
        <h3 class="text-xs font-semibold opacity-60 uppercase tracking-wide">Stack</h3>
        <div class="flex flex-wrap gap-1.5 mt-1">${p.stack.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
      </div>
      <div>
        <h3 class="text-xs font-semibold opacity-60 uppercase tracking-wide">Facts</h3>
        <ul class="list-disc list-inside text-sm text-white/70 mt-1 space-y-0.5">${p.facts.map(f=>`<li>${f}</li>`).join('')}</ul>
      </div>
      ${p.limitations?`<div class="text-xs p-2 bg-amber-500/10 border border-amber-500/20 rounded text-amber-200">⚠ ${p.limitations}</div>`:''}
      <div class="flex gap-2">
        ${p.github?`<a href="${p.github}" target="_blank" class="flex-1 text-center py-2 bg-white text-black rounded-full text-sm font-medium">GitHub ↗</a>`:''}
        ${p.demo?`<a href="${p.demo}" target="_blank" class="flex-1 text-center py-2 bg-white/10 rounded-full text-sm">Live Demo ↗</a>`:''}
      </div>
      ${p.screenshots.length>1?`<div class="grid grid-cols-2 gap-2">${p.screenshots.slice(1).map(s=>`<img src="${s.src}" class="rounded-lg border border-white/10">`).join('')}</div>`:''}
    </div>
  </div>`;
}

function appSkills(){
  return `
  <div class="p-4 grid gap-3">
    ${skills.map(s=>`
      <div class="card">
        <h3 class="font-semibold text-sm flex items-center gap-2"><span>${s.icon}</span> ${s.category}</h3>
        <div class="flex flex-wrap gap-1.5 mt-2">${s.items.map(it=>`<span class="chip">${it}</span>`).join('')}</div>
      </div>
    `).join('')}
  </div>`;
}

function appCertifications(){
  return `
  <div class="p-4 grid gap-3 max-w-3xl mx-auto">
    ${certifications.map(c=>`
      <div class="card flex gap-3">
        <img src="${c.image}" class="w-24 h-16 rounded-lg object-cover border border-white/10 bg-white/5 shrink-0">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-sm leading-tight">${c.title}</h3>
          <p class="text-xs text-violet-300">${c.issuer} • ${c.issued}</p>
          ${c.credentialId?`<p class="text-[11px] opacity-50 font-mono truncate">${c.credentialId}</p>`:''}
          <div class="flex gap-2 mt-2">
            <button onclick="window.open('${c.image}','_blank')" class="flex-1 text-xs px-3 py-1.5 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 flex items-center justify-center gap-1.5 font-medium transition">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> View
            </button>
            ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="flex-1 text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full flex items-center justify-center gap-1.5 font-semibold shadow-md shadow-emerald-500/20 transition text-center"> <i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verify</a>` : `<span class="flex-1 text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/30 text-center">No verify</span>`}
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function appPhotos(){
  return `
  <div class="p-3">
    <div class="columns-2 md:columns-3 gap-3 space-y-3">
      ${galleryImages.map((img,i)=>`
        <div class="break-inside-avoid rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group" onclick="openPhoto(${i})">
          <img src="${img.src}" alt="${img.label}" loading="lazy" class="w-full h-auto group-hover:scale-[1.02] transition">
          ${img.label?`<div class="p-2 text-xs bg-black/40">${img.label}</div>`:''}
        </div>
      `).join('')}
    </div>
    <div id="photoModal" class="fixed inset-0 bg-black/90 hidden place-items:center p-4 z-50" onclick="this.classList.add('hidden')">
      <img id="photoModalImg" class="max-w-full max-h-[85vh] rounded-xl" onclick="event.stopPropagation()">
      <button class="absolute top-4 right-4 p-2 bg-white/10 rounded-full" onclick="document.getElementById('photoModal').classList.add('hidden')"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
  </div>`;
}
function openPhoto(i){ const m=document.getElementById('photoModal'), img=document.getElementById('photoModalImg'); img.src=galleryImages[i].src; m.classList.remove('hidden'); m.classList.add('grid'); }

function appResume(){
  return `
  <div class="h-full flex flex-col bg-[#0f0f1e] relative overflow-hidden">
    <!-- subtle background -->
    <div class="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-600/10 pointer-events-none"></div>
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 24px 24px;"></div>

    <!-- header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20 backdrop-blur shrink-0">
      <div class="flex items-center gap-2 text-sm font-medium">
        <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
        Abhishek_Resume.pdf
        <span class="hidden sm:inline-flex ml-2 text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/20">Coming Soon</span>
      </div>
      <span class="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-full opacity-60">v1.0 • Updating</span>
    </div>

    <!-- coming soon center -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 md:p-10 text-center relative">
      <div class="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-600/30 mb-6 animate-[windowIn_0.6s_cubic-bezier(0.16,1,0.3,1)]">
        <i data-lucide="file-text" class="w-10 h-10 md:w-12 md:h-12 text-white"></i>
        <span class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 border-2 border-[#0f0f1e] grid place-items:center"><i data-lucide="clock" class="w-3.5 h-3.5 text-black"></i></span>
      </div>
      <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Resume — Coming Soon</h2>
      <p class="text-sm md:text-base text-white/60 max-w-md mt-2 leading-relaxed">
        Abhishek is crafting a professional, ATS-friendly resume.<br>
        Stay tuned — it will be available for view & download shortly.
      </p>

      <!-- progress -->
      <div class="w-full max-w-sm mt-6">
        <div class="flex justify-between text-[11px] opacity-60 mb-1.5">
          <span>Progress</span><span class="text-amber-300">85% • Final review</span>
        </div>
        <div class="h-2 bg-white/10 rounded-full overflow-hidden p-1">
          <div class="h-full w-[85%] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-sm">
        <button disabled class="flex-1 py-3 px-4 bg-white/10 border border-white/10 rounded-full text-sm font-medium flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
          <i data-lucide="download" class="w-4 h-4"></i> Download — Soon
        </button>
        <button onclick="openApp('contact')" class="flex-1 py-3 px-4 bg-white text-black rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition">
          <i data-lucide="mail" class="w-4 h-4"></i> Contact Instead
        </button>
      </div>

      <p class="text-[11px] opacity-30 mt-6">Need it urgently? Reach out via Email • GitHub • LinkedIn</p>
      <div class="flex gap-2 mt-3 text-[11px]">
        <a href="mailto:${profile.email}" class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">Email</a>
        <a href="${profile.github}" target="_blank" class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">GitHub</a>
        <a href="${profile.linkedin}" target="_blank" class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10">LinkedIn</a>
      </div>
    </div>
  </div>`;
}

function appContact(){
  const p=profile;
  return `
  <div class="p-6 flex flex-col items-center gap-4 max-w-md mx-auto w-full">
    <h2 class="text-xl font-bold flex items-center gap-2"><i data-lucide="message-circle" class="w-5 h-5 text-violet-400"></i> Get in touch</h2>
    <p class="text-sm opacity-60 text-center">Open to internships, junior roles & collaboration — replies within 24h.</p>
    <div class="w-full space-y-3">
      <a href="mailto:${p.email}" class="group flex items-center gap-3 p-3.5 bg-white/[0.06] border border-white/10 rounded-2xl hover:bg-white/[0.09] hover:border-violet-500/20 transition-all">
        <span class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform"><i data-lucide="mail" class="w-5 h-5 text-blue-300 shrink-0"></i></span>
        <span class="flex-1 min-w-0"><span class="text-xs opacity-60">Email</span><br><b class="text-sm truncate">${p.email}</b></span>
        <span class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition"><i data-lucide="arrow-up-right" class="w-4 h-4 opacity-60 group-hover:opacity-100 shrink-0"></i></span>
      </a>
      <a href="${p.github}" target="_blank" class="group flex items-center gap-3 p-3.5 bg-white/[0.06] border border-white/10 rounded-2xl hover:bg-white/[0.09] hover:border-white/20 transition-all">
        <span class="w-11 h-11 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform"><svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>
        <span class="flex-1 min-w-0"><span class="text-xs opacity-60">GitHub</span><br><b class="text-sm">github.com/0xAbhi13</b></span>
        <span class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition"><i data-lucide="external-link" class="w-4 h-4 opacity-60 shrink-0"></i></span>
      </a>
      <a href="${p.linkedin}" target="_blank" class="group flex items-center gap-3 p-3.5 bg-white/[0.06] border border-white/10 rounded-2xl hover:bg-white/[0.09] hover:border-sky-500/20 transition-all">
        <span class="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform"><svg class="w-5 h-5 text-sky-300 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></span>
        <span class="flex-1 min-w-0"><span class="text-xs opacity-60">LinkedIn</span><br><b class="text-sm">linkedin.com/in/0xAbhi13</b></span>
        <span class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition"><i data-lucide="arrow-up-right" class="w-4 h-4 opacity-60 group-hover:opacity-100 shrink-0"></i></span>
      </a>
      <div class="flex items-center gap-3 p-3.5 bg-white/[0.04] border border-white/10 rounded-2xl">
        <span class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center shrink-0"><i data-lucide="map-pin" class="w-5 h-5 text-violet-300 shrink-0"></i></span>
        <span class="flex-1 min-w-0"><span class="text-xs opacity-60">Location</span><br><b class="text-sm">${p.location}</b></span>
        <span class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 opacity-40"><i data-lucide="navigation" class="w-4 h-4 shrink-0"></i></span>
      </div>
    </div>
    <button onclick="openApp('resume')" class="mt-2 px-6 py-2.5 bg-white/10 border border-white/10 text-white/70 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/15 hover:text-white transition">
      <i data-lucide="clock" class="w-4 h-4 shrink-0"></i> Resume — Coming Soon
    </button>
  </div>`;
}

function appTerminal(){
  return `
  <div class="h-full bg-[#0a0a1a] font-mono text-sm flex flex-col p-3 overflow-hidden" onclick="document.getElementById('termInput')?.focus()">
    <div id="termOut" class="flex-1 overflow-auto space-y-2 text-green-300">
      <div>Welcome to Abhi's Terminal — 0xAbhi13<br>Type <b>help</b> for commands.</div>
    </div>
    <form onsubmit="return termCmd(event)" class="flex gap-2 mt-2 text-blue-400">
      <span>0xAbhi13@portfolio ~ $</span>
      <input id="termInput" autocomplete="off" spellcheck="false" class="flex-1 bg-transparent outline-none text-white">
    </form>
  </div>`;
}
function termCmd(e){
  e.preventDefault();
  const inp=document.getElementById('termInput'), out=document.getElementById('termOut');
  const cmd=inp.value.trim(); if(!cmd) return false;
  let html='';
  const lc=cmd.toLowerCase();
  if(lc==='help') html='<div class="text-green-400">help, about, projects, skills, certifications, contact, resume, clear</div>';
  else if(lc==='about') html=`<div>${profile.summary}</div>`;
  else if(lc==='projects') html='<div>'+projects.map(p=>`<div><b class="text-cyan-400">${p.name}</b> — ${p.status}</div>`).join('')+'</div>';
  else if(lc==='skills') html='<div>'+skills.map(s=>`<div><b class="text-yellow-300">${s.category}:</b> ${s.items.join(', ')}</div>`).join('')+'</div>';
  else if(lc==='certifications') html='<div>'+certifications.map(c=>`<div>• ${c.title} — ${c.issuer}</div>`).join('')+'</div>';
  else if(lc==='contact') html=`<div>Email: ${profile.email}<br>GitHub: ${profile.github}<br>LinkedIn: ${profile.linkedin}</div>`;
  else if(lc==='resume') html='<span class="text-amber-300">Resume — Coming Soon</span> <span class="opacity-60">• 85% final review • Use <b>contact</b> for latest</span> <button onclick="openApp(&quot;resume&quot;)" class="ml-2 px-2 py-0.5 bg-white/10 rounded text-xs">Open</button>';
  else if(lc==='clear'){ out.innerHTML='<div>Welcome to Abhi\'s Terminal — 0xAbhi13<br>Type <b>help</b> for commands.</div>'; inp.value=''; return false; }
  else html='<div class="text-red-400">Command not found. Try help</div>';
  out.innerHTML+=`<div class="mt-3"><div class="text-blue-400">0xAbhi13@portfolio ~ $ <span class="text-white">${cmd}</span></div><div class="mt-1">${html}</div></div>`;
  inp.value=''; out.scrollTop=out.scrollHeight;
  return false;
}

function appAskAbhi(){
  return `
  <div class="h-full flex flex-col bg-[#0f0f1e] overflow-hidden">
    <!-- Professional Header -->
    <div class="px-3 md:px-4 py-3 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-transparent backdrop-blur shrink-0">
      <div class="relative">
        <img src="assets/profile/profilepic.jpg" alt="Abhishek" class="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-white/15 shadow-lg">
        <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f0f1e] flex items-center justify-center"><span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span></span>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-sm flex items-center gap-1.5">Ask Abhi <span class="hidden sm:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/20"><span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Online</span></h3>
        <p class="text-[11px] text-white/60 truncate hidden sm:block">Ask about projects, skills, certifications — instant local AI • 5 projects • BCA • Baramati</p>
        <p class="text-[11px] text-white/60 sm:hidden">0xAbhi13 • 5 projects • Replies instantly</p>
      </div>
      <span class="hidden md:flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-full"><i data-lucide="shield-check" class="w-3 h-3 text-violet-400"></i> Offline AI</span>
      <span class="px-2 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-[11px] font-bold hidden sm:block">0xAbhi13</span>
    </div>

    <!-- Messages -->
    <div id="askMsgs" class="flex-1 overflow-auto p-3 md:p-4 space-y-4 scroll-smooth">
      <!-- Welcome bubble -->
      <div class="flex gap-2 md:gap-3">
        <img src="assets/profile/profilepic.jpg" alt="Abhi" class="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 hidden sm:block shrink-0 mt-1">
        <div class="flex-1 max-w-[88%] sm:max-w-[78%]">
          <div class="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.07] border border-white/10 backdrop-blur text-sm leading-relaxed">
            Hi! I'm <b class="text-violet-300">Ask Abhi</b> — professional assistant for <b>Abhishek Jadhav (0xAbhi13)</b>.<br>
            <span class="opacity-70">Ask me about projects, skills, certifications, or contact. I run 100% offline on GitHub Pages — no API needed.</span>
            <div class="flex items-center gap-2 mt-2 text-[11px] opacity-50">
              <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Just now • Local AI • Private
            </div>
          </div>
        </div>
      </div>

      <!-- Starters -->
      <div id="askStarters" class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
        ${[
          {q:"What projects has Abhishek built?", icon:"code-2", desc:"5 shipped • View all"},
          {q:"What skills does he have?", icon:"cpu", desc:"C++ • Python • JS"},
          {q:"Tell me about 0xEmotion", icon:"eye", desc:"AI Vision • Offline"},
          {q:"What certifications has he earned?", icon:"award", desc:"3 verified • Sheryians"},
          {q:"Show me his resume.", icon:"file-text", desc:"Coming Soon • 85%"},
          {q:"What is his education?", icon:"book-open", desc:"BCA 2026 • Baramati"},
        ].map(item=>`
          <button onclick="askSend('${item.q.replace(/'/g,"\\'")}')" class="group text-left p-3 bg-white/[0.05] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white/10 hover:border-violet-500/40 rounded-2xl flex items-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.98] shadow-sm">
            <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/25 to-indigo-600/25 border border-violet-500/20 grid place-items:center group-hover:from-violet-600/35 group-hover:to-indigo-600/35 shrink-0 shadow-inner"><i data-lucide="${item.icon}" class="w-[18px] h-[18px] text-violet-300"></i></span>
            <span class="flex-1 min-w-0"><span class="block text-[13px] font-semibold leading-tight line-clamp-2">${item.q}</span><span class="block text-[11px] opacity-60 mt-0.5">${item.desc}</span></span>
            <span class="hidden sm:grid w-7 h-7 rounded-full bg-white/5 border border-white/10 place-items:center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition"><i data-lucide="arrow-up-right" class="w-3.5 h-3.5 opacity-70 group-hover:opacity-100"></i></span>
          </button>
        `).join('')}
      </div>

      <!-- Quick chips -->
      <div class="flex flex-wrap gap-1.5 pt-1">
        <span class="text-[11px] opacity-40 mr-1 hidden sm:block">Try:</span>
        ${["0xMagicSearch","0xAirCanvas","Skills","Contact"].map(t=>`<button onclick="askSend('${t}')" class="text-[11px] px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"> ${t}</button>`).join('')}
      </div>
    </div>

    <!-- Input -->
    <div class="p-2.5 md:p-3 border-t border-white/10 bg-black/20 backdrop-blur shrink-0">
      <form onsubmit="return askForm(event)" class="flex gap-2 items-end max-w-3xl mx-auto">
        <div class="flex-1 relative">
          <input id="askInput" placeholder="Ask about projects, skills, certifications..." autocomplete="off" class="w-full px-4 py-3 md:py-3 pr-12 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-white/15 focus:border-violet-500/40 focus:bg-white/[0.08] outline-none text-sm placeholder-white/30 transition-all">
          <span class="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] px-1.5 py-1 bg-white/5 border border-white/10 rounded-full opacity-60">↵</span>
        </div>
        <button type="submit" class="w-11 h-11 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 grid place-items:center shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:scale-105 active:scale-95 transition-all shrink-0"><i data-lucide="send" class="w-4 h-4 text-white"></i></button>
      </form>
      <p class="text-[10px] opacity-25 text-center mt-1.5 hidden sm:block">AI can make mistakes. Verify via portfolio apps • Offline • Private • No data stored</p>
    </div>
  </div>`;
}
function askSend(q){
  const inp=document.getElementById('askInput');
  if(inp) inp.value=q;
  askForm(new Event('submit'));
}
function askForm(e){
  if(e) e.preventDefault();
  const inp=document.getElementById('askInput'), box=document.getElementById('askMsgs');
  const q=(inp.value||'').trim(); if(!q) return false;
  inp.value='';
  // hide starters
  const starters=document.getElementById('askStarters'); if(starters) starters.style.display='none';
  // user bubble
  box.innerHTML+=`<div class="flex justify-end"><div class="max-w-[80%] px-3 py-2 rounded-2xl bg-violet-600 text-white text-sm">${q}</div></div>`;
  // bot thinking
  const botId='bot-'+Date.now();
  box.innerHTML+=`<div id="${botId}" class="flex gap-2"><div class="w-6 h-6 rounded-full bg-violet-500/20 grid place-items:center flex-shrink-0"><i data-lucide="bot" class="w-3 h-3 text-violet-400"></i></div><div class="flex-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm"><span class="opacity-60">Thinking…</span></div></div>`;
  box.scrollTop=box.scrollHeight;
  lucide.createIcons();
  setTimeout(()=>{
    const ans=getLocalAnswer(q);
    const el=document.getElementById(botId);
    if(el){
      const content=renderAskContent(ans);
      el.outerHTML=`<div class="flex gap-2"><div class="w-6 h-6 rounded-full bg-violet-500/20 grid place-items:center flex-shrink-0"><i data-lucide="bot" class="w-3 h-3 text-violet-400"></i></div><div class="flex-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm whitespace-pre-wrap">${content}</div></div>`;
      lucide.createIcons();
      box.scrollTop=box.scrollHeight;
    }
  }, 400);
  return false;
}
function getLocalAnswer(q){
  const lower=q.toLowerCase();
  const has=(...ks)=>ks.some(k=>lower.includes(k));
  if(has('project','0xemotion','0xmagic','0xair','0xvoice','portfolio')){
    const list=projects.map(p=>`• ${p.name} [${p.status}] — ${p.category}: ${p.purpose}`).join('\n');
    return `Abhishek (0xAbhi13) has shipped 5 projects:\n${list}\n\nGitHub: https://github.com/0xAbhi13\n[OPEN_PROJECTS]`;
  }
  if(has('skill','stack','tech','c++','python','javascript','html','css','git')){
    const s=skills.map(sk=>`${sk.category}: ${sk.items.join(', ')}`).join('\n');
    return `Tech stack:\n${s}\n\nLeveling up: React • GSAP • Node • DSA\n[OPEN_SKILLS]`;
  }
  if(has('bca','baramati','education')){
    return `${profile.name} — ${profile.education.degree} — ${profile.education.institution} — ${profile.education.graduation}\n${profile.summary}\n[OPEN_ABOUT]`;
  }
  if(has('certificate','certification','sheryians','educative')){
    const c=certifications.map(c=>`• ${c.title} — ${c.issuer} (${c.issued})`).join('\n');
    return `Certified:\n${c}\n[OPEN_CERTIFICATIONS]`;
  }
  if(has('contact','email','linkedin','github')){
    return `Reach Abhishek:\nEmail: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\nLocation: ${profile.location}\n[OPEN_CONTACT]`;
  }
  if(has('resume','cv','download')){
    return `Resume — Coming Soon (85% final review). Open Resume app for status or contact for latest.\n[OPEN_RESUME]`;
  }
  if(has('about','who','abhishek','0xabhi13','creative')){
    return `${profile.name} — ${profile.headline}\n\n${profile.summary}\nLocation: ${profile.location}\n[OPEN_ABOUT]`;
  }
  if(has('photos','gallery')){
    return `Photos: ${galleryImages.map(g=>g.label).join(', ')}\n[OPEN_PHOTOS]`;
  }
  const hits=searchIndex.filter(it=> lower.split(/\s+/).some(w=>w.length>2 && it.keywords.includes(w))).slice(0,4);
  if(hits.length) return `Found related to "${q}":\n${hits.map(h=>`• ${h.title} (${h.category})`).join('\n')}`;
  return `I'm Ask Abhi — assistant for Abhishek's portfolio (0xAbhi13). Try: projects, skills, certifications, contact. This runs offline on GitHub Pages.`;
}
function renderAskContent(txt){
  // convert [OPEN_*] to buttons
  const map={"[OPEN_PROJECTS]":["projects","Open Projects"],"[OPEN_SKILLS]":["skills","Open Skills"],"[OPEN_CERTIFICATIONS]":["certifications","Open Certifications"],"[OPEN_PHOTOS]":["photos","Open Photos"],"[OPEN_RESUME]":["resume","Open Resume"],"[OPEN_ABOUT]":["about","Open About"],"[OPEN_CONTACT]":["contact","Open Contact"]};
  let html=txt.replace(/\[OPEN_[A-Z_]+\]/g,m=>{
    const v=map[m]; if(!v) return '';
    return `<button onclick="openApp('${v[0]}')" class="mt-2 mr-2 px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs border border-violet-500/20">${v[1]}</button>`;
  });
  return html.replace(/\n/g,'<br>');
}

/* ---------- Spotlight ---------- */
let spotlightOpen=false;
function toggleSpotlight(force){
  const el=document.getElementById('spotlight');
  spotlightOpen= typeof force==='boolean'?force:!spotlightOpen;
  el.classList.toggle('hidden', !spotlightOpen);
  if(spotlightOpen){ document.getElementById('spotlightInput').value=''; renderSpotlight(''); document.getElementById('spotlightInput').focus(); }
}
function renderSpotlight(q){
  const res=document.getElementById('spotlightResults');
  const lower=q.toLowerCase().trim();
  if(!lower){ res.innerHTML='<div class="p-4 text-center text-sm opacity-40">Search projects, skills, certifications…</div>'; return; }
  const hits=searchIndex.filter(it=> it.title.toLowerCase().includes(lower) || it.keywords.includes(lower)).slice(0,12);
  if(!hits.length){ res.innerHTML=`<div class="p-4 text-center text-sm opacity-40">No results for “${q}”</div>`; return; }
  const grouped={}; hits.forEach(h=>{ (grouped[h.category]=grouped[h.category]||[]).push(h); });
  res.innerHTML=Object.entries(grouped).map(([cat,items])=>`
    <div class="cat">${cat}</div>
    ${items.map(it=>`<button class="item w-full text-left hover:bg-white/5" onclick="openApp('${it.appId}','${it.subRoute||''}'); toggleSpotlight(false)"><span>${it.title}</span><span class="text-[10px] px-1.5 py-0.5 bg-white/10 rounded">Open</span></button>`).join('')}
  `).join('');
}
document.getElementById('spotlightInput')?.addEventListener('input',e=>renderSpotlight(e.target.value));
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&& e.key.toLowerCase()==='k'){ e.preventDefault(); toggleSpotlight(); }
  if(e.key==='Escape' && spotlightOpen) toggleSpotlight(false);
});

/* ---------- Mobile ---------- */
function openMobileApp(id){
  const view=document.getElementById('mobileAppView'), title=document.getElementById('mobileAppTitle'), content=document.getElementById('mobileAppContent');
  title.textContent = (WINDOW_DEFS[id]?.title || id);
  content.innerHTML = getAppHTML(id);
  view.classList.remove('hidden'); view.classList.add('flex');
  lucide.createIcons();
  bindAppEvents();
}
function closeMobileApp(){ document.getElementById('mobileAppView').classList.add('hidden'); }

/* ---------- App events hook ---------- */
function bindAppEvents(){
  // nothing now, but placeholder for future
}

/* ---------- Init ---------- */
renderIcons(); renderDock(); renderMobileGrid(); renderWindows(); lucide.createIcons();
window.openApp=openApp; window.closeApp=closeApp; window.minimizeApp=minimizeApp; window.maximizeApp=maximizeApp; window.focusApp=focusApp; window.toggleSpotlight=toggleSpotlight; window.openMobileApp=openMobileApp; window.closeMobileApp=closeMobileApp; window.openPhoto=openPhoto; window.askSend=askSend; window.askForm=askForm; window.termCmd=termCmd; window.handleIconClick=handleIconClick;

// no auto-open — user must double-click icon/dock
// setTimeout(()=>{ if(window.innerWidth>=768) openApp('finder'); }, 2200);

// universal responsive — clamp windows on resize for any device
window.addEventListener('resize',()=>{
  if(window.innerWidth<768){ document.getElementById('mobileLayout')?.classList.remove('hidden'); }
  else { document.getElementById('mobileLayout')?.classList.add('hidden'); document.getElementById('mobileAppView')?.classList.add('hidden'); }
  // clamp open windows to new work area (tablet rotation, phone resize, desktop resize)
  const wa=getWorkArea();
  Object.values(windows).forEach(w=>{
    if(!w.isOpen || w.isMinimized) return;
    if(w.isMaximized){ w.x=wa.left; w.y=wa.top; w.w=wa.w; w.h=wa.h; }
    else {
      w.w=Math.min(w.w, wa.w); w.h=Math.min(w.h, wa.h);
      w.x=Math.max(wa.left, Math.min(wa.right-w.w, w.x));
      w.y=Math.max(wa.top, Math.min(wa.bottom-w.h, w.y));
    }
  });
  renderWindows();
});

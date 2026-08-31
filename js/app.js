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

/* ---------- Online Graphics — Particles + GSAP Parallax (Desktop + Phone) ---------- */
(function initOnlineGraphics(){
  // Desktop Particle canvas — subtle floating dots with connections (online feel, no external lib)
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
  // Phone Particle canvas — mirrors desktop but sized to phoneWallpaper (390×~740)
  (function initPhoneParticles(){
    const pcvs=document.getElementById('phoneParticleCanvas');
    const wall=document.getElementById('phoneWallpaper');
    const device=document.querySelector('.phone-device');
    if(!pcvs || !wall) return;
    const ctx=pcvs.getContext('2d');
    const DPR=Math.min(2, window.devicePixelRatio||1);
    let pts=[], rafId, running=true;
    function getSize(){
      const r=wall.getBoundingClientRect();
      return {w:Math.max(1, Math.round(r.width)), h:Math.max(1, Math.round(r.height))};
    }
    function resize(){
      const {w,h}=getSize();
      pcvs.width=w*DPR; pcvs.height=h*DPR;
      pcvs.style.width=w+'px'; pcvs.style.height=h+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
      const n=Math.min(28, Math.max(16, Math.floor(w*h/18000)));
      pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.32,vy:(Math.random()-0.5)*0.32,r:Math.random()*1.1+0.4}));
    }
    function tick(){
      if(!running) return;
      const {w,h}=getSize();
      // skip if hidden (mobile layout display:none on desktop)
      if(w<10||h<10){ rafId=requestAnimationFrame(tick); return; }
      ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.22)'; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
        if(d<90){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(139,92,246,${0.10*(1-d/90)})`; ctx.lineWidth=0.7; ctx.stroke(); }
      }
      rafId=requestAnimationFrame(tick);
    }
    resize(); tick();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', ()=>setTimeout(resize, 200));
    if(window.ResizeObserver){
      const ro=new ResizeObserver(()=>resize());
      ro.observe(wall);
      if(device) ro.observe(device);
    }
    // pause when phone not visible to save battery
    document.addEventListener('visibilitychange', ()=>{ running=!document.hidden; if(running) tick(); });
  })();
  // GSAP wallpaper parallax — desktop + phone (touch/mouse)
  if(window.gsap){
    const wallpaper=document.getElementById('wallpaper');
    if(wallpaper){
      window.addEventListener('mousemove', (e)=>{
        const x=(e.clientX/window.innerWidth-0.5), y=(e.clientY/window.innerHeight-0.5);
        gsap.to(wallpaper, {x:x*-6, y:y*-4, duration:1.2, ease:'power2.out'});
      });
    }
    // Phone floating removed per request — phoneWall stays static (no tilt / no auto-drift)
    // keep wallpaper and particles only, no GSAP transform on #phoneWallpaper
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
        <div class="window-title">${win.title}</div>
        <div class="flex items-center gap-0 ml-auto">
          <button class="traffic min" onmousedown="event.stopPropagation()" onclick="minimizeApp('${win.id}'); event.stopPropagation()" title="Minimize">−</button>
          <button class="traffic max" onmousedown="event.stopPropagation()" onclick="maximizeApp('${win.id}'); event.stopPropagation()" title="${win.isMaximized?'Restore':'Maximize'}">${win.isMaximized?'❐':'□'}</button>
          <button class="traffic close" onmousedown="event.stopPropagation()" onclick="closeApp('${win.id}'); event.stopPropagation()" title="Close">×</button>
        </div>
      </div>
      <div class="window-content" id="win-${win.id}">${getAppHTML(win.id, win.sub)}</div>
      <div class="window-resize-handle window-resize-n" data-resize="${win.id}" data-dir="n" title="Resize"></div>
      <div class="window-resize-handle window-resize-s" data-resize="${win.id}" data-dir="s" title="Resize"></div>
      <div class="window-resize-handle window-resize-e" data-resize="${win.id}" data-dir="e" title="Resize"></div>
      <div class="window-resize-handle window-resize-w" data-resize="${win.id}" data-dir="w" title="Resize"></div>
      <div class="window-resize-handle window-resize-ne" data-resize="${win.id}" data-dir="ne" title="Resize"></div>
      <div class="window-resize-handle window-resize-nw" data-resize="${win.id}" data-dir="nw" title="Resize"></div>
      <div class="window-resize-handle window-resize-se" data-resize="${win.id}" data-dir="se" title="Resize"></div>
      <div class="window-resize-handle window-resize-sw" data-resize="${win.id}" data-dir="sw" title="Resize"></div>
      <div class="window-resize window-resize-se" data-resize="${win.id}" data-dir="se" style="opacity:0.6"><svg width="10" height="10" viewBox="0 0 10 10" class="absolute right-1 bottom-1 opacity-40"><path d="M7 2 L9 2 L9 4 M5 4 L9 4 L9 8 M3 6 L9 6 L9 9" stroke="white" stroke-width="0.9" fill="none" stroke-linecap="round"/></svg></div>
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
    h.ondblclick=(e)=>{
      if(e.target.closest('button')) return;
      const id=h.dataset.drag;
      maximizeApp(id);
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
    const start = (e)=>{
      const id=h.dataset.resize, win=windows[id];
      if(!win || win.isMaximized) return;
      const dir=h.dataset.dir || 'se';
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      focusApp(id);
      resize={id, dir, sx:cx, sy:cy, ox:win.x, oy:win.y, ow:win.w, oh:win.h};
      const el=document.querySelector(`.window[data-id="${id}"]`);
      if(el) el.classList.add('is-resizing');
      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('mouseup', onResizeEnd);
      document.addEventListener('touchmove', onResizeMove, {passive:false});
      document.addEventListener('touchend', onResizeEnd);
      e.preventDefault();
      e.stopPropagation();
    };
    h.addEventListener('mousedown', start);
    h.addEventListener('touchstart', start, {passive:false});
  });
}
function onResizeMove(e){
  if(!resize) return;
  if(e.touches) e.preventDefault();
  const win=windows[resize.id];
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  const dx = cx - resize.sx;
  const dy = cy - resize.sy;
  const dir = resize.dir || 'se';
  const wa=getWorkArea();
  const minW = window.innerWidth < 640 ? 280 : 360;
  const minH = window.innerWidth < 640 ? 200 : 260;
  let nx = resize.ox, ny = resize.oy, nw = resize.ow, nh = resize.oh;
  if(dir.includes('e')) nw = resize.ow + dx;
  if(dir.includes('w')) { nw = resize.ow - dx; nx = resize.ox + dx; }
  if(dir.includes('s')) nh = resize.oh + dy;
  if(dir.includes('n')) { nh = resize.oh - dy; ny = resize.oy + dy; }
  // clamp size
  if(nw < minW){ if(dir.includes('w')) nx -= (minW - nw); nw = minW; }
  if(nh < minH){ if(dir.includes('n')) ny -= (minH - nh); nh = minH; }
  // clamp to work area
  nw = Math.min(nw, wa.w);
  nh = Math.min(nh, wa.h);
  // clamp position for w/n
  if(dir.includes('w')){ nx = Math.max(wa.left, Math.min(wa.right - nw, nx)); }
  else { nx = Math.max(wa.left, Math.min(wa.right - nw, nx)); if(dir==='e' || dir==='se' || dir==='ne') nx = resize.ox; }
  if(dir.includes('n')){ ny = Math.max(wa.top, Math.min(wa.bottom - nh, ny)); }
  else { ny = Math.max(wa.top, Math.min(wa.bottom - nh, ny)); if(dir==='s' || dir==='se' || dir==='sw') ny = resize.oy; }
  // if only e/s, keep original xy
  if(dir==='e' || dir==='se' || dir==='s'){ nx = resize.ox; if(dir==='e') ny = resize.oy; }
  if(dir==='se'){ nx = resize.ox; ny = resize.oy; }
  win.x = nx; win.y = ny; win.w = nw; win.h = nh;
  const el=document.querySelector(`.window[data-id="${resize.id}"]`);
  if(el){ el.style.left=win.x+'px'; el.style.top=win.y+'px'; el.style.width=win.w+'px'; el.style.height=win.h+'px';}
}
function onResizeEnd(){
  if(resize){
    const el=document.querySelector(`.window[data-id="${resize.id}"]`);
    if(el) el.classList.remove('is-resizing');
  }
  resize=null;
  document.removeEventListener('mousemove', onResizeMove);
  document.removeEventListener('mouseup', onResizeEnd);
  document.removeEventListener('touchmove', onResizeMove);
  document.removeEventListener('touchend', onResizeEnd);
}

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
      <div class="card flex gap-3 min-w-0 overflow-hidden">
        <img src="${c.image}" class="w-24 h-16 min-w-[96px] min-h-[64px] max-w-[96px] max-h-[64px] rounded-lg object-cover border border-white/10 bg-white/5 flex-none shrink-0">
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
  <div class="h-full flex flex-col bg-[#0f0f1e] relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 pointer-events-none"></div>
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 24px 24px;"></div>
    <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20 backdrop-blur shrink-0">
      <div class="flex items-center gap-2 text-sm font-medium">
        <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        Photos Gallery
        <span class="hidden sm:inline-flex ml-2 text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/20">Coming Soon</span>
      </div>
      <span class="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-full opacity-60">Gallery • Updating</span>
    </div>
    <div class="flex-1 flex flex-col items-center justify-center p-6 md:p-10 text-center relative">
      <div class="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 mb-6 relative">
        <i data-lucide="image" class="w-10 h-10 md:w-12 md:h-12 text-white"></i>
        <span class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 border-2 border-[#0f0f1e] grid place-items:center"><i data-lucide="clock" class="w-3.5 h-3.5 text-white"></i></span>
      </div>
      <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Photos — Coming Soon</h2>
      <p class="text-sm md:text-base text-white/60 max-w-md mt-2 leading-relaxed">
        Curated moments and project visuals are being organized.<br>
        A polished, high-resolution gallery will be live shortly.
      </p>
      <div class="w-full max-w-sm mt-6">
        <div class="flex justify-between text-[11px] opacity-60 mb-1.5">
          <span>Progress</span><span class="text-blue-300">70% • Curating</span>
        </div>
        <div class="h-2 bg-white/10 rounded-full overflow-hidden p-1">
          <div class="h-full w-[70%] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-sm">
        <button disabled class="flex-1 py-3 px-4 bg-white/10 border border-white/10 rounded-full text-sm font-medium flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
          <i data-lucide="images" class="w-4 h-4"></i> Gallery — Soon
        </button>
        <button onclick="openApp('projects')" class="flex-1 py-3 px-4 bg-white text-black rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition">
          <i data-lucide="code-2" class="w-4 h-4"></i> View Projects
        </button>
      </div>
      <p class="text-[11px] opacity-30 mt-6">Want a preview? Check Projects for screenshots</p>
    </div>
  </div>`;
}
function openPhoto(i){ const m=document.getElementById('photoModal'), img=document.getElementById('photoModalImg'); if(!m||!img) return; img.src=galleryImages[i].src; m.classList.remove('hidden'); m.classList.add('grid'); }

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
  <div class="h-full min-h-0 flex flex-col bg-[#0a0a1f] overflow-hidden">
    <!-- Professional Header — compact, premium — fixed collapsing -->
    <div class="px-3 md:px-4 py-3 border-b border-white/[0.07] flex items-center gap-3 bg-gradient-to-r from-violet-600/[0.08] via-indigo-600/[0.07] to-transparent backdrop-blur-xl shrink-0 min-w-0">
      <div class="relative shrink-0 flex-none">
        <div class="w-10 h-10 md:w-11 md:h-11 min-w-[40px] min-h-[40px] max-w-[44px] max-h-[44px] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-[1.5px] flex-none">
          <img src="assets/profile/profilepic.jpg" alt="Abhishek" class="w-full h-full object-cover rounded-[10px] border-2 border-[#0a0a1f]">
        </div>
        <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 min-w-[14px] min-h-[14px] bg-emerald-500 rounded-full border-2 border-[#0a0a1f] flex items-center justify-center shadow-sm flex-none">
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="font-bold text-[13px] md:text-sm tracking-tight">Ask Abhi</h3>
          <span class="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-emerald-500/12 text-emerald-400 rounded-full border border-emerald-500/20 font-medium"><span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online</span>
          <span class="hidden sm:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-violet-500/12 text-violet-300 rounded-full border border-violet-500/20">Professional</span>
          <span class="hidden lg:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-white/5 text-white/60 rounded-full border border-white/10">Offline AI</span>
        </div>
        <p class="text-[11px] leading-none text-white/50 mt-0.5 truncate hidden sm:block">${(typeof ASK_ABHI_KNOWLEDGE !== 'undefined' ? ASK_ABHI_KNOWLEDGE.projects.length : 7)} projects • ${(typeof ASK_ABHI_KNOWLEDGE !== 'undefined' ? ASK_ABHI_KNOWLEDGE.certificates.length : 9)} certs • skills • architecture • replies instantly • private</p>
        <p class="text-[11px] leading-none text-white/50 mt-0.5 sm:hidden">0xAbhi13 • ${(typeof ASK_ABHI_KNOWLEDGE !== 'undefined' ? ASK_ABHI_KNOWLEDGE.projects.length : 7)} projects • ${(typeof ASK_ABHI_KNOWLEDGE !== 'undefined' ? ASK_ABHI_KNOWLEDGE.certificates.length : 9)} certs</p>
      </div>
      <div class="hidden sm:flex items-center gap-1.5 shrink-0">
        <span class="hidden md:inline-flex items-center gap-1.5 text-[10px] px-2 py-1 bg-white/[0.04] border border-white/10 rounded-full text-white/60"><i data-lucide="shield-check" class="w-3 h-3 text-violet-400"></i> No data stored</span>
        <button onclick="clearAskChat()" title="Clear chat" class="inline-flex items-center gap-1 text-[11px] px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"><i data-lucide="trash-2" class="w-3 h-3"></i> Clear</button>
        <span class="px-2.5 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-[11px] font-bold text-white shadow-md shadow-violet-600/20">0xAbhi13</span>
      </div>
      <button onclick="clearAskChat()" title="Clear chat" class="sm:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items:center shrink-0"><i data-lucide="trash-2" class="w-3.5 h-3.5 opacity-70"></i></button>
    </div>

    <!-- Messages — subtle mesh + scrollbar — fixed min-h-0 so input stays visible -->
    <div id="askMsgs" class="flex-1 min-h-0 overflow-auto p-3 md:p-4 space-y-3.5 scroll-smooth bg-[radial-gradient(600px_200px_at_20%_0%,rgba(139,92,246,0.07),transparent_70%),radial-gradient(500px_200px_at_90%_10%,rgba(6,182,212,0.06),transparent_70%)] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent]">
      <!-- Welcome — premium card — fixed collapsing icon -->
      <div class="flex gap-2.5 min-w-0">
        <div class="w-8 h-8 min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border border-white/10 hidden sm:flex items-center justify-center flex-none shrink-0 mt-0.5 shadow-md overflow-hidden">
          <i data-lucide="sparkles" class="w-4 h-4 min-w-[16px] min-h-[16px] text-white shrink-0"></i>
        </div>
        <div class="flex-1 min-w-0 max-w-[90%] sm:max-w-[78%]">
          <div class="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-sm leading-relaxed shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-bold tracking-wide text-violet-300">Ask Abhi</span>
              <span class="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-full opacity-60">Professional</span>
              <span class="text-[10px] opacity-40">• Just now</span>
            </div>
            <p class="font-medium">Hi! I'm <span class="text-violet-300">Ask Abhi</span> — your professional guide to <span class="text-white font-semibold">Abhishek Jadhav (0xAbhi13)</span>.</p>
            <p class="opacity-70 mt-1.5 text-[13px] leading-relaxed">I know <b class="text-white/90 font-semibold">everything</b> in this portfolio: <b>7 projects</b> with stacks & GitHub, <b>9 certifications</b> with verify links, 5 skill categories, BCA 2026 Baramati, contact, photos & architecture. Ask in natural language.</p>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span class="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-violet-500/12 text-violet-300 rounded-full border border-violet-500/20 font-medium"><i data-lucide="code-2" class="w-3 h-3"></i> 7 projects</span>
              <span class="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-emerald-500/12 text-emerald-300 rounded-full border border-emerald-500/20 font-medium"><i data-lucide="award" class="w-3 h-3"></i> 9 certs verified</span>
              <span class="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-white/[0.04] rounded-full border border-white/10 opacity-70"><i data-lucide="lock" class="w-3 h-3"></i> Offline • Private</span>
            </div>
          </div>
          <p class="text-[10px] opacity-30 mt-1.5 ml-1 hidden sm:block">Tip: try “Verify Jio AI” or “What is CS301?”</p>
        </div>
      </div>

      <!-- Starters — 2-col premium cards — dynamic from knowledge -->
      <div id="askStarters" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${(() => {
          const K = (typeof window !== 'undefined' && window.ASK_ABHI_KNOWLEDGE) ? window.ASK_ABHI_KNOWLEDGE : null;
          const qs = K ? K.getSuggestedQuestions() : ["Who is Abhishek Jadhav?","What are Abhishek's skills?","Show me his 7 projects","List all 9 certifications with verify links","Which project uses Flask?","Tell me about 0xBeatForge"];
          const meta = [
            {icon:"user", desc:"Owner • BCA 2026 • Baramati", grad:"from-violet-600/20 to-indigo-600/20", border:"border-violet-500/20"},
            {icon:"cpu", desc:"5 cats • C++/Python/JS", grad:"from-amber-500/15 to-orange-500/15", border:"border-amber-500/20"},
            {icon:"code-2", desc:"7 shipped • stacks • GitHub", grad:"from-violet-600/20 to-indigo-600/20", border:"border-violet-500/20"},
            {icon:"award", desc:"9 verified • Saylor • Jio • EDUCBA", grad:"from-emerald-500/15 to-teal-500/15", border:"border-emerald-500/20"},
            {icon:"github", desc:"@0xAbhi13 • Source", grad:"from-zinc-700/20 to-zinc-800/20", border:"border-white/10"},
            {icon:"music", desc:"Web Audio • BeatForge", grad:"from-blue-500/15 to-cyan-500/15", border:"border-blue-500/20"},
          ];
          return qs.map((q,i)=> {
            const m = meta[i % meta.length];
            return `<button onclick="askSend('${q.replace(/'/g,"\\'")}')" class="group text-left p-3.5 bg-white/[0.04] hover:bg-white/[0.07] active:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 rounded-2xl flex items-start gap-3 transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] overflow-hidden">
              <span class="w-9 h-9 min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-xl bg-gradient-to-br ${m.grad} border ${m.border} flex items-center justify-center flex-none shrink-0 mt-0.5 group-hover:scale-105 transition-transform overflow-hidden"><i data-lucide="${m.icon}" class="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-white/90 shrink-0"></i></span>
              <span class="flex-1 min-w-0 overflow-hidden">
                <span class="block text-[13px] font-semibold leading-tight text-white group-hover:text-white break-words">${q}</span>
                <span class="block text-[11px] opacity-55 mt-1 leading-none">${m.desc}</span>
              </span>
              <span class="hidden sm:flex w-7 h-7 min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px] rounded-full bg-white/[0.04] border border-white/10 items-center justify-center flex-none shrink-0 group-hover:bg-white/10 group-hover:border-white/15 transition mt-1"><i data-lucide="arrow-up-right" class="w-3.5 h-3.5 min-w-[14px] min-h-[14px] opacity-50 group-hover:opacity-100 shrink-0"></i></span>
            </button>`;
          }).join('');
        })()}
      </div>
    </div>

    <!-- Input — pill, premium — fixed collapsing -->
    <div class="p-3 border-t border-white/[0.06] bg-[#0a0a1f]/80 backdrop-blur-xl shrink-0">
      <form onsubmit="return askForm(event)" class="flex gap-2 items-end max-w-3xl mx-auto min-w-0">
        <div class="flex-1 min-w-0 relative group">
          <input id="askInput" placeholder="Ask anything: projects, 9 certs, verify links, skills, contact..." autocomplete="off" class="w-full min-w-0 pl-4 pr-11 py-3 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-white/15 focus:border-violet-500/30 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20 outline-none text-[13px] placeholder-white/35 transition-all">
          <span class="absolute right-1.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-7 h-7 min-w-[28px] min-h-[28px] bg-white/5 border border-white/10 rounded-full opacity-60 group-focus-within:opacity-100 transition flex-none shrink-0">
            <i data-lucide="corner-down-left" class="w-3.5 h-3.5 opacity-60 shrink-0"></i>
          </span>
        </div>
        <button type="submit" aria-label="Send" class="w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-95 flex items-center justify-center flex-none shrink-0 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 transition-all border border-white/10 overflow-hidden">
          <i data-lucide="send" class="w-4 h-4 min-w-[16px] min-h-[16px] text-white translate-x-[1px] shrink-0"></i>
        </button>
      </form>
      <p class="text-[10px] opacity-25 text-center mt-2 hidden sm:block tracking-wide">Professional • Offline • No API • Answers from portfolio data • Verify via app buttons</p>
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
  const starters=document.getElementById('askStarters'); if(starters) starters.style.display='none';
  const esc = s=> s.replace(/[&<>"']/g, m=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  box.innerHTML+=`<div class="flex justify-end msg-user min-w-0"><div class="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm shadow-md border border-violet-500/20 break-words">${esc(q)}</div></div>`;
  const botId='bot-'+Date.now();
  box.innerHTML+=`<div id="${botId}" class="flex gap-2 msg-user min-w-0"><div class="w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-none shrink-0 mt-0.5 overflow-hidden"><i data-lucide="bot" class="w-3 h-3 min-w-[12px] min-h-[12px] text-violet-400 shrink-0"></i></div><div class="flex-1 min-w-0 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.07] text-sm backdrop-blur break-words overflow-hidden flex items-center gap-2"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style="animation-delay:0ms"></span><span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style="animation-delay:150ms"></span><span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style="animation-delay:300ms"></span></span><span class="opacity-60 text-xs">Ask Abhi is typing…</span></div></div>`;
  box.scrollTop=box.scrollHeight;
  lucide.createIcons();
  setTimeout(()=>{
    const ans=getLocalAnswer(q);
    const el=document.getElementById(botId);
    if(el){
      const content=renderAskContent(ans);
      // store raw text for copy
      const rawForCopy = ans.replace(/<[^>]*>/g,'').replace(/\[OPEN_[^\]]+\]/g,'').trim().slice(0,4000);
      const escCopy = rawForCopy.replace(/'/g,"\\'").replace(/"/g,'&quot;');
      el.outerHTML=`<div class="flex gap-2 msg-user min-w-0 group/msg"><div class="w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-none shrink-0 mt-0.5 overflow-hidden"><i data-lucide="bot" class="w-3 h-3 min-w-[12px] min-h-[12px] text-violet-400 shrink-0"></i></div><div class="flex-1 min-w-0 relative px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/[0.08] text-sm whitespace-pre-wrap leading-relaxed backdrop-blur shadow-sm break-words overflow-hidden"><button onclick="copyAskResponse(this, '${escCopy.replace(/\n/g,'\\n')}')" title="Copy response" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 transition flex"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button><div class="pr-8">${content}</div></div></div>`;
      lucide.createIcons();
      box.scrollTop=box.scrollHeight;
      // update context with assistant answer
      if(typeof askAbhiContext !== 'undefined'){ askAbhiContext.history.push({role:'assistant', text: rawForCopy}); if(askAbhiContext.history.length>20) askAbhiContext.history.shift(); }
    }
  }, 380);
  return false;
}
function copyAskResponse(btn, text){
  const clean = text.replace(/\\n/g, '\n');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(clean).then(()=>{
      const orig = btn.innerHTML;
      btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>';
      lucide.createIcons();
      btn.classList.add('bg-emerald-500/20','border-emerald-500/30');
      setTimeout(()=>{ btn.innerHTML = orig; lucide.createIcons(); btn.classList.remove('bg-emerald-500/20','border-emerald-500/30'); }, 1400);
    }).catch(()=>{ fallbackCopy(clean, btn); });
  } else fallbackCopy(clean, btn);
  function fallbackCopy(t, b){
    const ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); b.innerHTML='<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>'; lucide.createIcons(); setTimeout(()=>{ b.innerHTML='<i data-lucide="copy" class="w-3.5 h-3.5"></i>'; lucide.createIcons(); },1200);}catch(e){} ta.remove();
  }
}
function clearAskChat(){
  const box=document.getElementById('askMsgs');
  const starters=document.getElementById('askStarters');
  if(!box) return;
  // keep first welcome bubble, remove rest
  const kids=Array.from(box.children);
  kids.forEach((el,i)=>{ if(i>0) el.remove(); });
  if(starters) starters.style.display='';
  box.scrollTop=0;
  if(typeof askAbhiContext !== 'undefined'){ askAbhiContext.history=[]; askAbhiContext.lastProject=null; askAbhiContext.lastCert=null; askAbhiContext.lastQuery=""; }
  const inp=document.getElementById('askInput');
  if(inp){ inp.value=''; inp.focus(); }
  // error state clear
  const err=document.getElementById('askError'); if(err) err.remove();
  lucide.createIcons();
}
// keyboard support: Esc clears, Ctrl+K already handled for spotlight
document.addEventListener('keydown', (e)=>{
  const active = document.activeElement && document.activeElement.id==='askInput';
  if(e.key==='Escape' && active && document.getElementById('mobileAppView') && !document.getElementById('mobileAppView').classList.contains('hidden')){
    // if ask input focused in mobile, let mobileAppView handle? still allow clear on Esc when input has text
  }
});
// ── Ask Abhi — Centralized Knowledge + Context ──
let askAbhiContext = { lastProject: null, lastCert: null, lastQuery: "", history: [] };
function getLocalAnswer(q){
  const K = (typeof window !== 'undefined' && window.ASK_ABHI_KNOWLEDGE) ? window.ASK_ABHI_KNOWLEDGE : null;
  // fallbacks to raw globals if knowledge not loaded
  const _profile = K ? K.owner : (typeof profile !== 'undefined' ? profile : {name:"Abhishek Jadhav", alias:"0xAbhi13", headline:"Creative Developer | C++ • Python • JavaScript | BCA Student — Baramati, Maharashtra", summary:"BCA student from Baramati learning the craft from the ground up — C++ for fundamentals, Python for shipping, JavaScript for the web.", location:"Baramati, Maharashtra, India", email:"contact.0xabhi13@gmail.com", github:"https://github.com/0xAbhi13", linkedin:"https://linkedin.com/in/0xAbhi13", education:{degree:"Bachelor of Computer Applications (BCA)", institution:"BCA Program — Baramati, Maharashtra", graduation:"2026", cgpa:"Currently Pursuing", affiliation:"Computer Science Fundamentals"}});
  const _education = K ? K.education : (_profile.education || {degree:"Bachelor of Computer Applications (BCA)", institution:"BCA Program — Baramati, Maharashtra", graduation:"2026", cgpa:"Currently Pursuing", affiliation:"Computer Science Fundamentals"});
  const _projects = K ? K.projects : (typeof projects !== 'undefined' ? projects : []);
  const _certs = K ? K.certificates : (typeof certifications !== 'undefined' ? certifications : []);
  const _skills = K ? K.skills : (typeof skills !== 'undefined' ? skills : []);
  const _links = K ? K.links : { github:"https://github.com/0xAbhi13", linkedin:"https://linkedin.com/in/0xAbhi13", portfolioWebsite:"https://0xabhi13.github.io/MyPortfolio/", githubPortfolio:"https://github.com/0xAbhi13/MyPortfolio", portfolioUrl:"https://0xabhi13.github.io/MyPortfolio/", email:_profile.email };
  const _website = K ? K.website : { hosting:"GitHub Pages", url:"https://0xabhi13.github.io/MyPortfolio/", repo:"https://github.com/0xAbhi13/MyPortfolio", builtWith:["HTML5","CSS3","JavaScript"] };
  const _identity = K ? K.identity : { assistantName:"Ask Abhi", ownerName:"Abhishek Jadhav", githubUsername:"0xAbhi13", creator:"Abhishek Jadhav" };
  const _contact = K ? K.contact : { email:_profile.email, github:_profile.github, linkedin:_profile.linkedin, location:_profile.location };

  const raw = (q||"").trim();
  const lower = raw.toLowerCase();
  const clean = lower.replace(/[^a-z0-9\u0900-\u097F\s]/g,' ').replace(/\s+/g,' ').trim();
  const tokens = clean.split(' ').filter(Boolean);
  const has = (...ks) => ks.some(k=> {
    const lk = k.toLowerCase();
    // check both clean and raw lower for Devanagari
    return clean.includes(lk) || lower.includes(lk);
  });
  const hasAny = (...ks) => has(...ks);
  const hasAll = (...ks) => ks.every(k=> clean.includes(k.toLowerCase()) || lower.includes(k.toLowerCase()));
  // casual Indian English normalization: bhai, bro, yaar, abhi, abhishek
  const isCasual = has('bhai','bro','yaar','abhi','abhishek');
  // track history
  askAbhiContext.lastQuery = raw;
  askAbhiContext.history.push({role:'user', text: raw});
  if(askAbhiContext.history.length>20) askAbhiContext.history.shift();

  // ── 0. Greeting — respectful, professional (handles hi, hello, namaste, good morning etc.) ──
  const greetingWords = ["hi","hello","hey","hola","namaste","नमस्ते","namaskar","नमस्कार","pranam","प्रणाम","helo","greetings","good morning","good afternoon","good evening","good night","hey there","hi there","hello there","hi hello","hello hi","hey abhi","hi abhi","hello abhi","namaste bhai","नमस्ते भाई","hello bhai","hi bhai","hey bhai"];
  const isPureGreeting = (()=> {
    const c = clean;
    if(greetingWords.includes(c)) return true;
    if(["hi","hello","hey","hola","namaste","helo","greetings"].includes(c)) return true;
    if(c === "hi hello" || c === "hello hi" || c === "hey hi" || c === "hi hey") return true;
    // tokens 1-2 and all are greeting related
    if(tokens.length <= 2 && tokens.length>0 && tokens.every(t=> ["hi","hello","hey","hola","namaste","namaskar","pranam","helo","greetings","good","morning","afternoon","evening","night","there","abhi","bhai","bro","yaar"].includes(t)) && c.length < 20) return true;
    // good morning/afternoon/evening exact
    if(["good morning","good afternoon","good evening","good night"].includes(c)) return true;
    return false;
  })();
  if(isPureGreeting){
    const hour = new Date().getHours();
    let timeGreet = "Hello";
    if(clean.includes("good morning")) timeGreet = "Good morning";
    else if(clean.includes("good afternoon")) timeGreet = "Good afternoon";
    else if(clean.includes("good evening")) timeGreet = "Good evening";
    else if(clean.includes("good night")) timeGreet = "Good night";
    else if(hour < 12) timeGreet = "Good morning";
    else if(hour < 17) timeGreet = "Good afternoon";
    else timeGreet = "Good evening";
    const greetEmoji = timeGreet.includes("morning") ? "🌅" : timeGreet.includes("evening") ? "🌆" : timeGreet.includes("night") ? "🌙" : "👋";
    // respectful, professional, mentions owner
    return `${timeGreet}! ${greetEmoji} <b>Namaste!</b> I'm <b>Ask Abhi</b> — the official AI assistant for <b>${_identity.ownerName} (${_identity.ownerAlias})</b>.<br><br>It's a pleasure to have you here on <b>${_identity.ownerName}'s</b> portfolio. I have complete knowledge of his <b>${_projects.length} projects</b>, <b>${_certs.length} certifications</b> (with verify links), skills, education (BCA 2026, Baramati), and this website itself.<br><br>How may I help you today? You can ask me things like:<br>• <i>Who is Abhishek?</i><br>• <i>What projects has he built?</i><br>• <i>List all 9 certifications</i><br>• <i>Where is his GitHub?</i><br><br>Feel free to ask in English or casual Indian English — like “<i>bhai who is abhishek?</i>”<br>[OPEN_ABOUT] [OPEN_PROJECTS] [OPEN_CERTIFICATIONS]`;
  }
  // if greeting + question (e.g., "hi who is abhishek"), strip greeting prefix and continue to other intents
  // (we let it fall through — the other handlers will answer the question, but we still greet respectfully as prefix if needed)
  // For combined like "hello who is abhishek", the specific handlers below will catch "who is abhishek" and answer correctly.

  // ── Hindi / Marathi — understand and respond in same language ──
  const wantsHindi = has('hindi me','hindi mai','in hindi','hindi mein','hindi bolo','hindi bol','hindi language','hindi main bolo');
  const wantsMarathi = has('marathi me','marathi mai','marathi mein','in marathi','marathi bolo','marathi sang','marathi bol','marathi main sang');
  const isDevanagari = /[\u0900-\u097F]/.test(raw);
  const hasHindiTokens = has('kaun','kya','kahan','kaise','hai','hain','aap','apka','aapka','mera','tumhara','tum','kya karta','kya padhta','kaunse','uske','usne','uska','batao','hai','ho','kya hai','kaun hai','hame','bhai ye','कौन','क्या','कहाँ','कैसे','है','हैं','आप','आपका','मेरा','तुम्हारा','क्या करता','कौन है','कौन हैं','क्या है');
  const hasMarathiTokens = has('kon','ahe','aahe','kay','kuthe','kontya','kuthun','kasa','kashi','tyache','tyane','tyacha','majha','tumcha','sang','ahet','kuthe','ahe','mala','tula','kon ahe','kay karto','kuthe shikto','konti','कोण','आहे','काय','कुठे','कोणत्या','माझे','तुमचे','त्याचे','त्याने','त्याचा','कोण आहे','काय करतो','कुठे शिकतो','कोणती');
  let lang = 'en';
  if(wantsHindi) lang='hi';
  else if(wantsMarathi) lang='mr';
  else if(isDevanagari){
    const marathiDev = ['अहे','आहे','काय','कुठे','कोणत्या','माझे','तुझे','तुमचे','त्याचे','त्याने','त्याचा','कोण','कसा','कशी','कुठून','सांगा'].some(w=> raw.includes(w));
    lang = marathiDev ? 'mr' : 'hi';
  } else if(hasMarathiTokens && !hasHindiTokens) lang='mr';
  else if(hasHindiTokens && !hasMarathiTokens) lang='hi';
  else if(hasHindiTokens && hasMarathiTokens){
    if(has('ahe','aahe','kuthe','kontya','majha')) lang='mr'; else lang='hi';
  }
  if(lang==='hi' || lang==='mr'){
    // explicit language request without other content
    if((wantsHindi || wantsMarathi) && tokens.length <= 3){
      if(lang==='mr') return `होय, नक्की! आता मी <b>मराठी</b> मध्ये बोलेन. विचारा — <i>अभिषेक कोण आहे?</i>, <i>त्याचे प्रोजेक्ट्स कोणते?</i>, <i>सर्टिफिकेट्स कोणती?</i> किंवा <i>संपर्क कसा करायचा?</i><br><span class="opacity-60 text-xs">भाषा बदलण्यासाठी “hindi me bolo” किंवा “in english” म्हणा.</span>`;
      return `हां, बिल्कुल! अब मैं <b>हिंदी</b> में जवाब दूंगा। पूछिए — <i>अभिषेक कौन है?</i>, <i>उसके प्रोजेक्ट्स कौन से हैं?</i>, <i>सर्टिफिकेट्स कौन से हैं?</i> या <i>संपर्क कैसे करें?</i><br><span class="opacity-60 text-xs">भाषा बदलने के लिए “marathi me sang” या “in english” कहें।</span>`;
    }
    // Hindi/Marathi intents — who is abhishek — handles Roman & Devanagari
    if(has('kaun hai','कौन है','kon ahe','कोण आहे','abhishek kaun','अभिषेक कौन','abhishek kon','अभिषेक कोण','who is abhishek','अभिषेक कौन है','अभिषेक कोण आहे')){
      if(lang==='mr') return `<b>Abhishek Jadhav</b> ha <b>${_profile.headline}</b> cha Creative Developer ahe.<br>To Baramati, Maharashtra cha BCA 2026 cha vidyarthi ahe. C++, Python, JavaScript var kaam karto. GitHub: <b>0xAbhi13</b> — <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a> • Portfolio: <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a><br>[OPEN_ABOUT]`;
      return `<b>Abhishek Jadhav</b> ek <b>${_profile.headline}</b> hai.<br>Wo Baramati, Maharashtra se BCA 2026 ka student hai aur C++, Python, JavaScript me kaam karta hai. GitHub: <b>0xAbhi13</b> — <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a><br>[OPEN_ABOUT]`;
    }
    if(has('kya karta hai','क्या करता है','kay karto','काय करतो','what does') && has('abhishek')){
      if(lang==='mr') return `<b>Abhishek</b> web applications banavto, modern technologies var prayog karto — <b>7 projects</b> (BeatForge, PDFForge, Emotion, MagicSearch, AirCanvas, VoiceVision + Portfolio) ani <b>9 certifications</b>. Tyache focus C++ fundamentals, Python, JavaScript, DSA ahe.<br>[OPEN_ABOUT]`;
      return `<b>Abhishek</b> web applications banata hai aur modern technologies par experiment karta hai — <b>7 projects</b> aur <b>9 certifications</b>. Focus: C++ fundamentals, Python, JavaScript, DSA, React.<br>[OPEN_ABOUT]`;
    }
    if(has('kya padhta hai','kahan padhta','kuthe shikto','shikshan','education') && (has('abhishek') || has('padhta') || has('shikto'))){
      if(lang==='mr') return `<b>Shikshan:</b> ${_education.degree} — ${_education.institution} (${_education.graduation})<br><span class="opacity-60">${_education.affiliation}</span><br>Thikan: ${_profile.location}<br>[OPEN_ABOUT]`;
      return `<b>Padhai:</b> ${_education.degree} — ${_education.institution} (${_education.graduation})<br><span class="opacity-60">${_education.affiliation}</span><br>Location: ${_profile.location}<br>[OPEN_ABOUT]`;
    }
    if(has('skills kya hai','skills kay','takneek','technologies','kya aata hai','kay yeta')){
      if(lang==='mr') return `<b>Skills — 5 prakar:</b><br>${_skills.map(s=> `• <b>${s.category}</b>: ${s.items.join(' • ')}`).join('<br>')}<br>[OPEN_SKILLS]`;
      return `<b>Skills — 5 categories:</b><br>${_skills.map(s=> `• <b>${s.category}</b>: ${s.items.join(' • ')}`).join('<br>')}<br>[OPEN_SKILLS]`;
    }
    if(has('projects kaunse','projects kaun','konte projects','projects kay','projects kya')){
      if(lang==='mr') return `<b>7 Projects — 0xAbhi13</b><br>${_projects.map(p=> `• <b>${p.name}</b> — ${p.category}`).join('<br>')}<br>[OPEN_PROJECTS]`;
      return `<b>7 Projects — 0xAbhi13</b><br>${_projects.map(p=> `• <b>${p.name}</b> — ${p.category}`).join('<br>')}<br>[OPEN_PROJECTS]`;
    }
    if(has('certificates kaunse','certificates kaun','konti cert','certificates kay','pramanpatra')){
      if(lang==='mr') return `<b>9 Certificates:</b><br>${_certs.map(c=> `• <b>${c.title}</b> — ${c.issuer} (${c.issued})`).join('<br>')}<br>[OPEN_CERTIFICATIONS]`;
      return `<b>9 Certificates:</b><br>${_certs.map(c=> `• <b>${c.title}</b> — ${c.issuer} (${c.issued})`).join('<br>')}<br>[OPEN_CERTIFICATIONS]`;
    }
    if(has('contact kaise','contact kasa','kaise contact','kasa contact','sampark kaise','sampark kasa','github kahan','github kuthe','linkedin kahan')){
      if(lang==='mr') return `<b>Sampark:</b><br>Email: <a href="mailto:${_contact.email}" class="text-violet-300 underline">${_contact.email}</a><br>GitHub: <a href="${_contact.github}" target="_blank" class="text-violet-300 underline">${_contact.github}</a><br>LinkedIn: <a href="${_contact.linkedin}" target="_blank" class="text-violet-300 underline">${_contact.linkedin}</a><br>Thikan: ${_contact.location}<br>[OPEN_CONTACT]`;
      return `<b>Contact:</b><br>Email: <a href="mailto:${_contact.email}" class="text-violet-300 underline">${_contact.email}</a><br>GitHub: <a href="${_contact.github}" target="_blank" class="text-violet-300 underline">${_contact.github}</a><br>LinkedIn: <a href="${_contact.linkedin}" target="_blank" class="text-violet-300 underline">${_contact.linkedin}</a><br>[OPEN_CONTACT]`;
    }
    if(has('flask') || has('javascript') || has('python') || has('project') || has('sqlite') || has('php') || has('mysql') || has('certificate') || has('cert') || has('skill') || has('contact') || has('github') || has('linkedin') || has('portfolio') || has('hosting') || has('education') || has('padhta') || has('shikto') || has('kaunse') || has('konti') || has('kya') || has('kay')){
      // let tech/project queries fall through to main handlers (they handle Hindi roman too)
    } else {
      // pure Hindi/Marathi greeting or unclear — respond in that language
      if(lang==='mr'){
        return `नमस्कार! 🙏 मी <b>Ask Abhi</b> — <b>${_identity.ownerName}</b> चा portfolio assistant.<br>तुम्ही मराठीत विचारू शकता: <i>अभिषेक कोण आहे?</i>, <i>त्याचे प्रोजेक्ट्स कोणते?</i>, <i>सर्टिफिकेट्स कोणती?</i>, <i>संपर्क कसा करायचा?</i><br><span class="opacity-60 text-xs">इंग्रजीसाठी “in english” म्हणा.</span><br>[OPEN_ABOUT]`;
      } else {
        return `नमस्ते! 🙏 मैं <b>Ask Abhi</b> — <b>${_identity.ownerName}</b> का portfolio assistant हूँ।<br>आप हिंदी में पूछ सकते हैं: <i>अभिषेक कौन है?</i>, <i>उसके प्रोजेक्ट्स कौन से हैं?</i>, <i>सर्टिफिकेट्स कौन से हैं?</i>, <i>संपर्क कैसे करें?</i><br><span class="opacity-60 text-xs">For English, say “in english”.</span><br>[OPEN_ABOUT]`;
      }
    }
  }

  const fmtCert = c => `• <b>${c.title}</b> — <span class="text-violet-300">${c.issuer}</span> <span class="opacity-60">(${c.issued})</span><br><span class="text-[11px] opacity-60">ID: <span class="font-mono">${c.credentialId||'—'}</span> • <a href="${c.verifyUrl}" target="_blank" rel="noopener" class="text-violet-300 underline">Verify →</a></span>`;
  const fmtProj = p => `• <b>${p.name}</b> <span class="text-[11px] px-1.5 py-0.5 bg-emerald-500/12 text-emerald-300 rounded-full border border-emerald-500/20 ml-1">${p.status}</span> <span class="opacity-60">— ${p.category}</span><br><span class="opacity-70 text-xs">${p.purpose}</span><br><span class="text-[11px] opacity-60">Stack: ${p.stack.join(' • ')} • <a href="${p.github}" target="_blank" class="text-violet-300 underline">GitHub →</a></span>`;
  const allCertsList = _certs.map(c=> fmtCert(c)).join('<br><br>');
  const allProjsList = _projects.map(p=> fmtProj(p)).join('<br><br>');
  const skillsList = _skills.map(s=> `<b>${s.category}</b> ${s.icon||''}: ${s.items.join(' • ')}`).join('<br>');
  const topLangs = (()=>{ const cats=_skills.find(s=> s.category.toLowerCase().includes('programming')); return cats? cats.items.join(', ') : 'C++, Python, JavaScript'; })();

  // ── 1. Identity: who is abhishek / who owns / who is ask abhi / who created ──
  if( has('who is abhishek') || has('who is abhishek jadhav') || has('who is abhi') && !has('ask abhi') || (has('bhai who is abhishek')) ){
    // distinguish Ask Abhi vs Abhishek
    if(has('ask abhi') || has('who are you')){
      return `<b>Ask Abhi — Portfolio AI Assistant</b><br><br>I am <b>Ask Abhi</b>, the official AI assistant for <b>${_identity.ownerName} (${_identity.ownerAlias})</b>'s portfolio. I was created by <b>${_identity.creator}</b> to help visitors learn about his portfolio, projects, skills, education, certificates and website features. I run 100% offline in this site — no API, no backend, no data stored.<br><br><b>Status:</b> ${K ? K.getAssistantStatus() : 'online'} and available to answer. I know <b>${_projects.length} projects</b> and <b>${_certs.length} certifications</b> with full details.<br>[OPEN_ABOUT]`;
    }
    return `<b>Abhishek Jadhav — ${_profile.headline}</b><br><br>${_profile.summary || 'BCA student from Baramati, building web experiences with C++, Python, JavaScript. Loves practical products, DSA and shipping in public as @0xAbhi13.'}<br><br><b>Alias:</b> ${_identity.ownerAlias} • <b>Location:</b> ${_profile.location} • <b>Education:</b> ${_education.degree} (${_education.graduation}) • <b>GitHub:</b> <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a><br>[OPEN_ABOUT] [OPEN_CONTACT]`;
  }
  if( has('who owns this portfolio') || has('who owns this website') || has('owner of this portfolio') || has('who is the owner')){
    return `<b>This portfolio belongs to ${_identity.ownerName}</b> and is maintained under his GitHub identity <b>${_identity.githubUsername}</b>.<br><br>Owner: <b>${_identity.ownerName} (${_identity.ownerAlias})</b><br>GitHub: <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a><br>Portfolio: <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a><br>Repository: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a><br>[OPEN_ABOUT]`;
  }
  if( has('who created this portfolio') || has('who made this website') || has('who made this portfolio') || has('who created this website') || has('who built this portfolio')){
    return `<b>${_identity.ownerName} created and owns this portfolio.</b><br>It is his personal portfolio website (repository <code>${_identity.portfolioRepository}</code>) built with vanilla HTML/CSS/JS and deployed to <b>${_website.hosting}</b>.<br>Source: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a> • Live: <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a><br>[OPEN_ABOUT]`;
  }
  if( has('who is ask abhi') || has('what is ask abhi') || has('who created ask abhi') || has('why was ask abhi created') || has('what can ask abhi do') ){
    return `<b>Ask Abhi</b> is the official AI assistant for <b>${_identity.ownerName}'s</b> portfolio.<br><br><b>Created by:</b> ${_identity.creator}<br><b>Purpose:</b> ${(K && K.assistant && K.assistant.purpose) || 'Help visitors learn about Abhishek, his portfolio, projects, skills, education, certificates and website features'}<br><b>What I can do:</b> ${(K && K.assistant && K.assistant.capabilities) ? K.assistant.capabilities.map(c=> `• ${c}`).join('<br>') : '• Answer about projects, skills, certificates, education, contact, architecture, navigation'}<br><br>I understand natural language, casual Indian English (bhai, bro, show projects), and context from previous messages. All answers come from the centralized knowledge at <code>js/askAbhiKnowledge.js</code> + live portfolio data.<br>[OPEN_ABOUT]`;
  }

  // ── 2. Online / Offline awareness ──
  if( has('is ask abhi online') || has('is ask abhi available') || has('are you online') || has('are you available')){
    const st = K ? K.getAssistantStatus() : 'online';
    return st === 'online' ? `Yes — <b>Ask Abhi is currently online and available</b> to answer questions. I am running locally in this portfolio (offline AI, no API) and ready to help.<br><span class="text-[11px] opacity-60">Status: online • Version ${K ? K.version : '2.1.0'} • Last update ${K ? K.lastUpdate : '2026-08-31'}</span>` : `Ask Abhi is currently <b>offline</b> because the AI service is unavailable. Please try again shortly.`;
  }
  if( has('is abhishek online') || has('is abhishek available') || has('is abhishek here') || has('is abhi online') && !has('ask abhi')){
    return K ? K.getOwnerPresence() : `I can't confirm Abhishek's personal real-time availability unless a live presence system is connected. Ask Abhi being online does not mean Abhishek is online. For urgent contact, use email <a href="mailto:${_contact.email}" class="text-violet-300 underline">${_contact.email}</a> or LinkedIn.`;
  }

  // ── 3. Host / Ownership ──
  if( has('who hosts this website') || has('where is this portfolio hosted') || has('hosting') || has('where is this portfolio hosted') ){
    return `<b>Hosting:</b> ${ _website.hosting || 'GitHub Pages'}<br><span class="opacity-70">${_website.hostingNote || 'Deployed statically — no backend. Source: '+_links.githubPortfolio}</span><br><br>Repo: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a><br>URL: <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a>`;
  }
  if( has('what is the github repository') || has('what is the portfolio url') || has('where is the source code') || has('what technology is this website built with') || has('what is the github repository') || has('where is the source code')){
    return `<b>Portfolio:</b> <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a><br><b>Repository:</b> <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a><br><b>Owner:</b> ${_identity.ownerName} (${_identity.githubUsername})<br><b>Built with:</b> ${_website.builtWith.join(' • ')}<br><b>Hosting:</b> ${_website.hosting}<br>[OPEN_ABOUT]`;
  }

  // ── 4. Navigation intents ──
  if( has('take me to') || has('open github') || has('open linkedin') || has('show certificates') || has('show projects') || has('where is the skills section') || has('contact abhishek') || has('show me the projects') || has('take me to about') ){
    if(has('project')) return `Opening <b>Projects</b> for you — 7 shipped. You can also press <code>Ctrl+K</code> → search.<br>[OPEN_PROJECTS]`;
    if(has('certif')) return `Opening <b>Certifications — 9 verified</b>.<br>[OPEN_CERTIFICATIONS]`;
    if(has('skill')) return `Opening <b>Skills — 5 categories</b>.<br>[OPEN_SKILLS]`;
    if(has('about')) return `Opening <b>About — Abhishek</b>.<br>[OPEN_ABOUT]`;
    if(has('contact')) return `Opening <b>Contact</b> — email, GitHub, LinkedIn.<br>[OPEN_CONTACT]`;
    if(has('github') && !has('project')){ return `<b>GitHub — ${_identity.githubUsername}</b>: <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a> • Repo: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a>`; }
    if(has('linkedin')){ return `<b>LinkedIn:</b> <a href="${_links.linkedin}" target="_blank" class="text-violet-300 underline">${_links.linkedin}</a>`; }
  }

  // ── 5. Project intelligence — natural language ──
  // context-aware: "which one uses flask" after listing
  const flaskProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('flask'));
  const jsProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('javascript'));
  const pyProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('python'));
  const phpProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('php'));
  const sqliteProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('sqlite'));
  const mysqlProjects = _projects.filter(p=> p.stack.join(' ').toLowerCase().includes('mysql'));
  if( has('which project uses flask') || has('what projects use flask') || (has('flask') && !has('project') && askAbhiContext.lastProject) || (has('which one uses flask')) ){
    if(flaskProjects.length){
      askAbhiContext.lastProject = flaskProjects[0];
      return `<b>Projects using Flask — ${flaskProjects.length}</b><br><br>${flaskProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
    } else return `I don't have information about Flask projects in my portfolio knowledge base yet. Current stacks: ${[...new Set(_projects.flatMap(p=> p.stack))].join(', ')}`;
  }
  if( has('which project uses javascript') || has('what projects use javascript') || has('javascript project')){
    return `<b>Projects using JavaScript — ${jsProjects.length}</b><br><br>${jsProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
  }
  if( has('which project uses python') || has('what projects use python') || has('python project')){
    return `<b>Projects using Python — ${pyProjects.length}</b><br><br>${pyProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
  }
  if( has('sqlite') ){
    if(sqliteProjects.length) return `<b>Projects using SQLite — ${sqliteProjects.length}</b><br><br>${sqliteProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
    return `I don't have that information in my portfolio knowledge base yet — no project currently lists <b>SQLite</b> in its stack. Known stacks: ${[...new Set(_projects.flatMap(p=> p.stack))].join(', ')}`;
  }
  if( has('php') ){
    if(phpProjects.length) return `<b>Projects using PHP — ${phpProjects.length}</b><br><br>${phpProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
    return `I don't have that information in my portfolio knowledge base yet — no project currently lists <b>PHP</b> in its stack. Known stacks: ${[...new Set(_projects.flatMap(p=> p.stack))].join(', ')}`;
  }
  if( has('mysql') ){
    if(mysqlProjects.length) return `<b>Projects using MySQL — ${mysqlProjects.length}</b><br><br>${mysqlProjects.map(p=> fmtProj(p)).join('<br><br>')}<br>[OPEN_PROJECTS]`;
    return `I don't have that information in my portfolio knowledge base yet — no project currently lists <b>MySQL</b> in its stack. Known stacks: ${[...new Set(_projects.flatMap(p=> p.stack))].join(', ')}`;
  }
  if( has('which project is related to music') || has('music project') || (has('music') && !has('wavecont')) ){
    const m = _projects.filter(p=> (p.category||'').toLowerCase().includes('audio') || p.id.includes('beat'));
    if(m.length) return `<b>Music Project — ${m[0].name}</b><br>${fmtProj(m[0])}<br><br>Facts: ${m[0].facts.join(' • ')}<br>[OPEN_PROJECTS]`;
  }
  if( has('source code library') || has('library project')){
    return `I don't have a project explicitly labeled as a source code library in my portfolio knowledge base yet. Available projects are: ${_projects.map(p=> p.name).join(', ')}.`;
  }
  if( has('what is abhisheks best project') || has('best project')){
    return `My knowledge base doesn't rank a single “best” project — ${_identity.ownerName} hasn't designated one. Here are all <b>${_projects.length} projects</b> by category:<br><br>${_projects.map(p=> `• <b>${p.name}</b> — ${p.category} [${p.status}]`).join('<br>')}<br><br>Tell me a preference (e.g., “which uses Flask?” or “music”) and I'll recommend.<br>[OPEN_PROJECTS]`;
  }
  // specific project by name (natural)
  const projByName = _projects.find(p=> {
    const n=p.name.toLowerCase(), id=p.id.toLowerCase();
    return clean.includes(id) || clean.includes(n) || lower.includes(p.name.toLowerCase());
  });
  if(projByName && (has(projByName.name.toLowerCase()) || has(projByName.id) || has('tell me about') && has(projByName.name.split(' ')[0].toLowerCase())) ){
    askAbhiContext.lastProject = projByName;
    return `<b>${projByName.name} — ${projByName.category}</b> <span class="chip chip-live">${projByName.status}</span><br>${fmtProj(projByName)}<br><br>Facts: ${projByName.facts.join(' • ')}<br>GitHub: <a href="${projByName.github}" target="_blank" class="text-violet-300 underline">${projByName.github}</a>${projByName.demo?` • Live: <a href="${projByName.demo}" target="_blank" class="text-violet-300 underline">${projByName.demo}</a>`:''}<br>[OPEN_PROJECTS]`;
  }
  // context: "which one uses flask" -> already handled, "give me its github" -> use lastProject
  if( (has('give me its github') || has('its github') || has('github of that') || has('send github')) && askAbhiContext.lastProject){
    const p=askAbhiContext.lastProject;
    return `<b>${p.name} — GitHub:</b> <a href="${p.github}" target="_blank" class="text-violet-300 underline">${p.github}</a>`;
  }
  if( has('project','projects','shipped') && !has('certif') && !has('skill')){
    // general project list (covers "what projects has abhishek built", "tell me about abhisheks projects", "show me his projects")
    const list = _projects.map(p=> fmtProj(p)).join('<br><br>');
    // remember first as last
    if(_projects[0]) askAbhiContext.lastProject = _projects[0];
    return `<b>${_projects.length} Projects Shipped — ${_identity.githubUsername}</b><br><br>${list}<br><br>All have View → GitHub and are searchable via <b>Ctrl+K</b>.<br>[OPEN_PROJECTS]`;
  }

  // ── 6. Certificate intelligence ──
  const certByQuery = _certs.find(c=> clean.includes(c.title.toLowerCase()) || clean.includes(c.issuer.toLowerCase()) || clean.includes((c.credentialId||'').toLowerCase()));
  if(certByQuery && (has(certByQuery.title.toLowerCase().split(' ')[0]) || has(certByQuery.issuer.toLowerCase().split(' ')[0]) || has(certByQuery.credentialId?.toLowerCase()))){
    askAbhiContext.lastCert = certByQuery;
    return `<b>${certByQuery.title} — ${certByQuery.issuer}</b><br>${fmtCert(certByQuery)}<br><br>Skills covered: see issuer details. Image: <code>${certByQuery.image}</code>.<br>[OPEN_CERTIFICATIONS]`;
  }
  // general cert list covers "what certificates does abhishek have", "show me certificates", "which organization issued", "when did he receive"
  if(has('certificate','certificates','certs','certified') || has('which organization issued') || has('when did abhishek receive')){
    return `<b>Abhishek — ${_certs.length} Certifications (Systematic)</b><br><br>${allCertsList}<br><br>All images renamed to <code>certificate-*.jpg</code> — View + Verify on each card. Ask “Verify Jio AI” or “What is CS301?” for details.<br>[OPEN_CERTIFICATIONS]`;
  }
  if(has('what certificates does abhishek have') || has('show me abhisheks certificates')){
    return `<b>9 Certificates — ${certs.length} Verified</b><br><br>${allCertsList}<br>[OPEN_CERTIFICATIONS]`;
  }

  // ── 7. Skills ──
  if(has('what are abhisheks skills') || has('what are his skills') || has('what programming languages does abhishek know') || has('what technologies does abhishek use') || has('what tech does he know') || has('skill') || has('stack')){
    return `<b>Tech Stack — ${_skills.length} Categories</b><br><br>${skillsList}<br><br>Currently levelling up: ${_skills.find(s=> s.category.toLowerCase().includes('levelling'))?.items.join(' • ')||'React • GSAP Advanced • Node.js'}<br><br>Ask “which project uses Flask?” to see applied skills.<br>[OPEN_SKILLS]`;
  }
  if(has('what does abhishek do') || has('what does abhishek study') || has('what does abhi do')){
    return `<b>${_profile.name} — ${_profile.headline}</b><br><br>${_profile.summary}<br><br><b>Studies:</b> ${_education.degree} — ${_education.institution} (${_education.graduation})<br><b>Focus:</b> C++ fundamentals, Python shipping, JavaScript web, DSA, React.<br>[OPEN_ABOUT]`;
  }

  // ── 8. Links / Contact ──
  if(has('where can i see abhisheks github') || has('where can i find abhishek on github') || has('github') && !has('project') && !has('certif')){
    return `<b>GitHub — ${_identity.githubUsername}:</b> <a href="${_links.github}" target="_blank" class="text-violet-300 underline">${_links.github}</a><br>Portfolio repo: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a>`;
  }
  if(has('where can i find abhishek on linkedin') || has('linkedin') ){
    return `<b>LinkedIn:</b> <a href="${_links.linkedin}" target="_blank" class="text-violet-300 underline">${_links.linkedin}</a>`;
  }
  if(has('how can i contact abhishek') || has('contact') || has('how to reach')){
    return `<b>Contact — ${_identity.ownerName}</b><br><br><b>Email:</b> <a href="mailto:${_contact.email}" class="text-violet-300 underline">${_contact.email}</a><br><b>GitHub:</b> <a href="${_contact.github}" target="_blank" class="text-violet-300 underline">${_contact.github}</a><br><b>LinkedIn:</b> <a href="${_contact.linkedin}" target="_blank" class="text-violet-300 underline">${_contact.linkedin}</a><br><b>Location:</b> ${_contact.location}<br><span class="opacity-60">Open to internships, junior roles & collaboration — replies within 24h.</span><br>[OPEN_CONTACT]`;
  }
  if(has('what is abhisheks portfolio') || has('what is this portfolio about') || has('portfolio about')){
    return `<b>Portfolio — ${_website.title}</b><br><br>Interactive desktop OS portfolio for <b>${_identity.ownerName}</b>. ${(_website.features||[]).slice(0,5).join(' • ')}.<br><br>Hosted on <b>${_website.hosting}</b> • Repo: <a href="${_links.githubPortfolio}" target="_blank" class="text-violet-300 underline">${_links.githubPortfolio}</a> • Live: <a href="${_links.portfolioWebsite}" target="_blank" class="text-violet-300 underline">${_links.portfolioWebsite}</a><br>Built with: ${_website.builtWith.slice(0,5).join(' • ')}<br>[OPEN_ABOUT]`;
  }
  if(has('what technologies does he use') || has('what technologies does abhishek use') || has('tech stack')){
    return `<b>Technologies — ${_identity.ownerName} uses:</b><br><br>${_website.builtWith.join(' • ')}<br><br>Skills:<br>${skillsList}<br>[OPEN_SKILLS]`;
  }

  // ── 9. Resume / Photos / Music ──
  if(has('resume','cv')){
    return `📄 <b>Resume — Coming Soon</b> (85% final review, v1.0 Updating)<br><br>Professional ATS-friendly resume in final review. Use <b>Contact Instead</b> or open Resume app.<br>[OPEN_RESUME] [OPEN_CONTACT]`;
  }
  if(has('photo','photos','gallery')){
    return `<b>Photos — Coming Soon</b><br>Curated gallery will be live shortly. Check Projects for screenshots or use Finder.<br>[OPEN_PHOTOS]`;
  }
  if(has('music','wavecont','playlist')){
    const pl= (typeof playlist !== 'undefined' && playlist[0]) ? playlist[0] : {title:'Wavecont', artist:'Pro Tunes', duration:'2:24', src:'assets/audio/wavecont.mp3'};
    return `<b>Music — ${pl.title}</b> (${pl.duration}) — ${pl.artist}<br>Local MP3 <code>${pl.src}</code> (5.7MB) • Works on <b>file://</b> + <b>http://</b> • Original YouTube yNXkRYhcH3c<br>`;
  }

  // ── 10. System status ──
  if(has('system status') || has('assistant status') || has('website status') || has('backend status')){
    const aSt = K ? K.getAssistantStatus() : 'online';
    const wSt = K ? K.getWebsiteStatus() : _website.hosting;
    return `<b>System Status</b><br>• Assistant (Ask Abhi): <b>${aSt}</b> (v${K?K.version:'2.1.0'})<br>• Website: ${_website.url} — hosted on <b>${wSt}</b><br>• Last knowledge update: ${K?K.lastUpdate:'2026-08-31'}<br>• Backend: offline (no API, local knowledge at <code>js/askAbhiKnowledge.js</code>)<br><span class="opacity-60 text-xs">No secrets exposed — no API keys, no env vars.</span>`;
  }

  // ── 11. Search fallback — dynamic ──
  const hits = (typeof searchIndex !== 'undefined' ? searchIndex : []).filter(it=> tokens.some(w=> w.length>2 && it.keywords.includes(w))).slice(0,4);
  if(hits.length) return `<b>Found related to “${raw.replace(/</g,'&lt;')}”:</b><br>${hits.map(h=>`• <b>${h.title}</b> <span class="opacity-60">(${h.category})</span>`).join('<br>')}<br><br>Try: <i>List all 9 certifications</i> • <i>Verify Jio AI</i> • <i>What is CS301?</i>`;
  // ── 12. Unknown — no hallucination ──
  return `I don't have that information in my portfolio knowledge base yet.<br><br>I can help with: <b>who is Abhishek</b>, <b>9 certifications</b> with verify, <b>7 projects</b> (try “which uses Flask?”), <b>skills</b>, <b>education</b>, <b>contact</b>, <b>hosting</b> (${_website.hosting}), and <b>navigation</b> (say “take me to projects”).<br><span class="opacity-60 text-xs">Knowledge: <code>js/askAbhiKnowledge.js</code> v${K?K.version:'2.1.0'} • ${K?K.lastUpdate:'2026-08-31'} • Never invent — only portfolio data.</span>`;
}
function renderAskContent(txt){
  const map={"[OPEN_PROJECTS]":["projects","Open Projects"],"[OPEN_SKILLS]":["skills","Open Skills"],"[OPEN_CERTIFICATIONS]":["certifications","Open Certifications"],"[OPEN_PHOTOS]":["photos","Open Photos"],"[OPEN_RESUME]":["resume","Open Resume"],"[OPEN_ABOUT]":["about","Open About"],"[OPEN_CONTACT]":["contact","Open Contact"]};
  let html=txt.replace(/\[OPEN_[A-Z_]+\]/g,m=>{
    const v=map[m]; if(!v) return '';
    return `<button onclick="openApp('${v[0]}')" class="mt-2 mr-2 px-2.5 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs border border-violet-500/20 hover:bg-violet-500/30 transition">${v[1]}</button>`;
  });
  // keep <br> and <b> etc, convert \n
  html = html.replace(/\n/g,'<br>');
  // auto-link verify URLs already in <a> from fmtCert
  return html;
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

/* ---------- Mobile — popup sheet with pop animation ---------- */
function openMobileApp(id){
  const view=document.getElementById('mobileAppView'), title=document.getElementById('mobileAppTitle'), content=document.getElementById('mobileAppContent');
  if(!view || !title || !content) return;
  const isHidden = view.classList.contains('hidden');
  title.textContent = (WINDOW_DEFS[id]?.title || id);
  content.innerHTML = getAppHTML(id);
  lucide.createIcons();
  bindAppEvents();
  if(isHidden){
    view.classList.remove('hidden','mobile-pop-out');
    view.classList.add('flex');
    // restart pop-in
    view.classList.remove('mobile-pop-in');
    void view.offsetWidth;
    view.classList.add('mobile-pop-in');
    const onEnd = (e)=>{
      if(e.target===view && e.animationName==='mobilePopIn'){
        view.classList.remove('mobile-pop-in');
        view.removeEventListener('animationend', onEnd);
      }
    };
    view.addEventListener('animationend', onEnd);
  } else {
    // already open — pop content for section switch
    content.style.animation='none';
    void content.offsetHeight;
    content.style.animation='mobilePopInContent 0.34s cubic-bezier(0.16,1,0.3,1) both';
    setTimeout(()=>{ content.style.animation=''; }, 400);
  }
}
function closeMobileApp(){
  const view=document.getElementById('mobileAppView');
  if(!view || view.classList.contains('hidden')) return;
  view.classList.remove('mobile-pop-in');
  view.classList.add('mobile-pop-out');
  const finish = ()=>{
    view.classList.add('hidden');
    view.classList.remove('flex','mobile-pop-out');
  };
  const handler = (e)=>{
    if(e.target===view && e.animationName==='mobilePopOut'){
      finish();
      view.removeEventListener('animationend', handler);
    }
  };
  view.addEventListener('animationend', handler);
  setTimeout(()=>{ // fallback
    if(!view.classList.contains('hidden')) finish();
  }, 300);
}

/* ---------- App events hook ---------- */
function bindAppEvents(){
  // nothing now, but placeholder for future
}

/* ---------- Init ---------- */
renderIcons(); renderDock(); renderMobileGrid(); renderWindows(); lucide.createIcons();
window.openApp=openApp; window.closeApp=closeApp; window.minimizeApp=minimizeApp; window.maximizeApp=maximizeApp; window.focusApp=focusApp; window.toggleSpotlight=toggleSpotlight; window.openMobileApp=openMobileApp; window.closeMobileApp=closeMobileApp; window.openPhoto=openPhoto; window.askSend=askSend; window.askForm=askForm; window.termCmd=termCmd; window.handleIconClick=handleIconClick;
window.copyAskResponse=typeof copyAskResponse!=='undefined'?copyAskResponse:()=>{}; window.clearAskChat=typeof clearAskChat!=='undefined'?clearAskChat:()=>{}; window.askAbhiContext=typeof askAbhiContext!=='undefined'?askAbhiContext:null;

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

// Music Player — Now Playing Bar (replaces dock) — 0xAbhi13 — FIXED 2026
// YouTube mode: plays https://youtu.be/yNXkRYhcH3c ( Wavecont ) via iframe API — no local fallback
// Fixed 0:00 by showing playlist duration instantly + polling YT getDuration()
(function(){
  const AUDIO = document.getElementById('musicAudio');
  if(!AUDIO) return;

  let YT_PLAYER = null;
  let YT_READY = false;
  let USE_YT = false;
  let ytInterval = null;

  const $ = (s)=>document.querySelector(s);
  const fmtTime = (s)=>{
    if(isNaN(s) || !isFinite(s) || s===null) return '0:00';
    s = Math.max(0, s);
    const m=Math.floor(s/60), sec=Math.floor(s%60);
    return `${m}:${String(sec).padStart(2,'0')}`;
  };
  const parseDuration = (str)=>{
    if(!str || typeof str !== 'string') return 0;
    const parts = str.split(':').map(n=>parseInt(n,10));
    if(parts.length===2 && !isNaN(parts[0]) && !isNaN(parts[1])) return parts[0]*60 + parts[1];
    return 0;
  };
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  // YouTube Iframe API ready
  window.onYouTubeIframeAPIReady = function(){
    YT_READY = true;
    const t = getTrack(currentIdx);
    if(t && t.youtubeId && isYouTubeSource(t)) initYT(t.youtubeId);
  };
  function isYouTubeSource(t){
    return !!(t && t.youtubeId && t.src && t.src.includes('youtube.com'));
  }
  function isLocalTrack(t){
    return t && t.src && /\.(wav|mp3|ogg|m4a|webm)(\?|$)/i.test(t.src);
  }
  const IS_FILE = window.location.protocol === 'file:';
  function initYT(videoId){
    if(IS_FILE){
      console.warn('file:// detected — YouTube iframe blocked by browser, will use localFallback');
      tryLocalFallback();
      return;
    }
    if(!window.YT || !window.YT.Player) return;
    if(YT_PLAYER) { try{ YT_PLAYER.loadVideoById(videoId); }catch(e){} return; }
    const el = document.getElementById('youtubePlayer');
    if(!el) return;
    const pv = { playsinline: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0 };
    if(location.origin && location.origin !== 'null') pv.origin = location.origin;
    YT_PLAYER = new YT.Player('youtubePlayer', {
      height: '1', width: '1',
      videoId: videoId,
      playerVars: pv,
      events: {
        onReady: ()=>{
          YT_READY=true;
          updateIcons();
          waitForYTDuration(0);
          try{
            const v=parseFloat(localStorage.getItem('abhi_music_volume')||'0.85');
            YT_PLAYER.setVolume(v*100);
            if(localStorage.getItem('abhi_music_muted')==='1') YT_PLAYER.mute();
          }catch(e){}
        },
        onStateChange: (e)=>{
          if(e.data===1){ isPlaying=true; updateIcons(); startYTProgress(); }
          else if(e.data===2){ isPlaying=false; updateIcons(); stopYTProgress(); }
          else if(e.data===0){
            isPlaying=false; updateIcons(); stopYTProgress();
            if(playlist.length<=1){ try{ YT_PLAYER.seekTo(0,true); YT_PLAYER.playVideo(); }catch(err){} }
            else { nextTrack(); }
          }
        },
        onError: (e)=>{ console.warn('YT error, trying local fallback'); tryLocalFallback(); }
      }
    });
    // Safety: if YT fails to initialize in 8s, fallback to local
    if(ytFallbackTimer) clearTimeout(ytFallbackTimer);
    ytFallbackTimer = setTimeout(()=>{
      if(!YT_READY && USE_YT){
        console.warn('YT initialization timeout, falling back to local');
        tryLocalFallback();
      }
    }, 8000);
  }
  function startYTProgress(){
    stopYTProgress();
    ytInterval = setInterval(()=>{ if(USE_YT && YT_PLAYER && YT_PLAYER.getCurrentTime) updateProgress(); }, 250);
  }
  function stopYTProgress(){ if(ytInterval){ clearInterval(ytInterval); ytInterval=null; } }

  // --- state ---
  let currentIdx = 0;
  let isPlaying = false;
  let isSeeking = false;
  let isMuted = false;
  let prevVolume = 0.85;
  let fallbackTried = false;
  let ytFallbackTimer = null;

  // Load persisted state
  try{
    const savedVol = localStorage.getItem('abhi_music_volume');
    if(savedVol !== null) AUDIO.volume = clamp(parseFloat(savedVol),0,1);
    else AUDIO.volume = 0.85;
    const savedIdx = localStorage.getItem('abhi_music_lastTrack');
    if(savedIdx !== null){
      const idx = parseInt(savedIdx,10);
      if(!isNaN(idx) && idx>=0 && idx<playlist.length) currentIdx = idx;
    }
    const savedMute = localStorage.getItem('abhi_music_muted');
    if(savedMute === '1'){ isMuted=true; AUDIO.muted=true; }
  }catch(e){}
  prevVolume = AUDIO.volume;
  AUDIO.preload = 'metadata';
  AUDIO.crossOrigin = 'anonymous';

  // --- UI refs (desktop + mobile) ---
  const els = {
    art: $('#musicArt'),
    artMobile: $('#musicArtMobile'),
    title: $('#musicTitle'),
    titleMobile: $('#musicTitleMobile'),
    artist: $('#musicArtist'),
    artistMobile: $('#musicArtistMobile'),
    play: $('#musicPlay'),
    playMobile: $('#musicPlayMobile'),
    prev: $('#musicPrev'),
    prevMobile: $('#musicPrevMobile'),
    next: $('#musicNext'),
    nextMobile: $('#musicNextMobile'),
    mute: $('#musicMute'),
    volume: $('#musicVolume'),
    current: $('#musicCurrent'),
    duration: $('#musicDuration'),
    progress: $('#musicProgress'),
    progressWrap: $('#musicProgressWrap'),
    progressMobile: $('#musicProgressMobile'),
    bar: $('#musicBar'),
    barMobile: $('#musicBarMobile'),
    barMain: $('#musicBarMain'),
  };

  function getTrack(idx){
    return playlist[idx] || playlist[0];
  }

  function setIcon(btn, name, cls){
    if(!btn) return;
    btn.innerHTML = `<i data-lucide="${name}" class="${cls}"></i>`;
  }
  function updateIcons(){
    const iconPlay = isPlaying ? 'pause' : 'play';
    const vol = USE_YT && YT_PLAYER && YT_PLAYER.getVolume ? YT_PLAYER.getVolume()/100 : AUDIO.volume;
    const muted = USE_YT ? (YT_PLAYER && YT_PLAYER.isMuted ? YT_PLAYER.isMuted() : isMuted) : (isMuted || AUDIO.muted || AUDIO.volume===0);
    const iconVol = muted || vol===0 ? 'volume-x' : vol < 0.5 ? 'volume-1' : 'volume-2';
    if(els.play){
      setIcon(els.play, iconPlay, isPlaying ? 'w-4 h-4' : 'w-4 h-4 ml-0.5');
      els.play.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    }
    if(els.playMobile){
      setIcon(els.playMobile, iconPlay, isPlaying ? 'w-4 h-4' : 'w-4 h-4 ml-0.5');
      els.playMobile.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    }
    if(els.mute){
      setIcon(els.mute, iconVol, 'w-4 h-4');
    }
    if(window.lucide) lucide.createIcons();
  }

  function updateBarInfo(){
    const t = getTrack(currentIdx);
    if(els.art) { els.art.src = t.artwork; els.art.alt = t.title + ' artwork'; }
    if(els.artMobile) { els.artMobile.src = t.artwork; els.artMobile.alt = t.title + ' artwork'; }
    if(els.title) els.title.textContent = t.title;
    if(els.titleMobile) els.titleMobile.textContent = t.title;
    if(els.artist) els.artist.textContent = t.artist;
    if(els.artistMobile) els.artistMobile.textContent = t.artist;
    // show fallback duration immediately so UI never stays 0:00 (for both local and YouTube)
    const fallbackSec = parseDuration(t.duration);
    if(fallbackSec && els.duration){
      // show 2:25 instantly; real YT duration will overwrite after API ready
      els.duration.textContent = fmtTime(fallbackSec);
    }
    if(fallbackSec && els.duration && !els.duration.textContent) els.duration.textContent = t.duration;
    try{ localStorage.setItem('abhi_music_lastTrack', String(currentIdx)); }catch(e){}
  }

  function tryLocalFallback(){
    if(fallbackTried) return;
    const t = getTrack(currentIdx);
    const fallback = t.localFallback || t.src;
    if(fallback && /\.(wav|mp3|ogg|m4a)(\?|$)/i.test(fallback) && AUDIO.src !== fallback){
      console.log('Falling back to local audio', fallback);
      fallbackTried = true;
      USE_YT=false;
      stopYTProgress();
      try{ if(YT_PLAYER && YT_PLAYER.pauseVideo) YT_PLAYER.pauseVideo(); }catch(e){}
      AUDIO.src = fallback;
      AUDIO.load();
      // update duration display to fallback immediately
      if(t.duration && els.duration) els.duration.textContent = t.duration;
      updateProgress();
    }
  }

  function loadTrack(idx, autoplay=false){
    if(idx<0) idx=playlist.length-1;
    if(idx>=playlist.length) idx=0;
    currentIdx = idx;
    const t = getTrack(currentIdx);
    fallbackTried = false;
    if(ytFallbackTimer) { clearTimeout(ytFallbackTimer); ytFallbackTimer=null; }
    updateBarInfo();
    updateIcons();

    // Determine if this track should use YouTube (only if src is youtube URL)
    const needsYT = isYouTubeSource(t);
    // file:// cannot reliably play YouTube (origin null, iframe blocked) — force localFallback
    if(IS_FILE && needsYT && t.localFallback){
      USE_YT = false;
      stopYTProgress();
      try{ if(YT_PLAYER && YT_PLAYER.pauseVideo) YT_PLAYER.pauseVideo(); }catch(e){}
      AUDIO.src = t.localFallback;
      AUDIO.load();
      isPlaying=false;
      updateIcons();
      // for file:// show real fallback file duration (1:01) but keep playlist 2:25 as fallback until metadata loads
      updateProgress();
      if(autoplay){
        AUDIO.play().then(()=>{ isPlaying=true; updateIcons(); }).catch((e)=>{
          console.warn('Local fallback play failed on file://', e);
          isPlaying=false; updateIcons();
        });
      }
      return;
    }
    if(needsYT){
      // http/https — play YouTube as requested (https://youtu.be/yNXkRYhcH3c)
      // localFallback is ignored unless YT errors
      // No local fallback — use YT directly as requested
      USE_YT = true;
      try{ AUDIO.pause(); }catch(e){}
      AUDIO.removeAttribute('src'); AUDIO.load();
      // show fallback instantly so never 0:00 before YT API responds
      if(t.duration && els.duration) els.duration.textContent = t.duration.includes(':') ? t.duration : fmtTime(parseDuration(t.duration));
      updateProgress();
      if(YT_READY && YT_PLAYER && YT_PLAYER.loadVideoById){
        try{ YT_PLAYER.loadVideoById(t.youtubeId); if(!autoplay) setTimeout(()=>{ try{ YT_PLAYER.pauseVideo(); }catch(e){} }, 400); }catch(e){ console.warn('YT load failed',e); }
      } else if(YT_READY){
        initYT(t.youtubeId);
        if(!autoplay) setTimeout(()=>{ try{ YT_PLAYER && YT_PLAYER.pauseVideo(); }catch(e){} }, 700);
      } else {
        console.log('YT not ready, will init onReady', t.youtubeId);
      }
      if(autoplay && YT_READY && YT_PLAYER){
        setTimeout(()=>{ try{ YT_PLAYER.playVideo(); }catch(e){} }, 500);
      }
      // safety: if YT duration still 0 after 3s, fallback to local if available or keep showing t.duration
      ytFallbackTimer = setTimeout(()=>{
        if(USE_YT && YT_PLAYER && YT_PLAYER.getDuration){
          const d = YT_PLAYER.getDuration();
          if(!d || d===0){
            console.warn('YT duration still 0, trying fallback');
            tryLocalFallback();
          }
        }
      }, 3500);
      return;
    }

    // Local audio track — the normal reliable path
    USE_YT = false;
    stopYTProgress();
    try{ if(YT_PLAYER && YT_PLAYER.pauseVideo) YT_PLAYER.pauseVideo(); }catch(e){}
    // Always set src to t.src (local wav)
    // Avoid unnecessary reload if same file already loaded and not switching track
    const trackFile = (t.src||'').split('/').pop().split('?')[0];
    const currentFile = AUDIO.src ? AUDIO.src.split('/').pop().split('?')[0] : '';
    // If same file already loaded, just update UI and optionally play
    if(currentFile && trackFile && currentFile===trackFile && AUDIO.src && AUDIO.src.includes(trackFile)){
      updateBarInfo();
      if(autoplay && AUDIO.paused){
        AUDIO.play().then(()=>{ isPlaying=true; updateIcons(); }).catch((e)=>{
          console.warn('Play failed', e);
          isPlaying=false; updateIcons();
        });
      } else if(!autoplay){
        isPlaying = !AUDIO.paused;
        updateIcons();
      }
      updateProgress();
      return;
    }
    AUDIO.src = t.src;
    AUDIO.load();
    isPlaying=false;
    updateIcons();
    // Show fallback duration instantly so user never sees 0:00
    if(t.duration && els.duration) els.duration.textContent = t.duration;
    // When metadata loads, real duration will replace it
    if(autoplay){
      const p = AUDIO.play();
      if(p && p.then){
        p.then(()=>{ isPlaying=true; updateIcons(); }).catch((e)=>{
          console.warn('Autoplay blocked or failed', e);
          isPlaying=false; updateIcons();
          // Most browsers block autoplay without user gesture — keep UI ready for click
        });
      }
    } else {
      // Preload metadata
      updateProgress();
    }
  }

  function togglePlay(){
    const t=getTrack(currentIdx);
    // file:// — force local audio (YouTube iframe blocked, origin null)
    if(IS_FILE && t.localFallback){
      if(USE_YT) { try{ if(YT_PLAYER && YT_PLAYER.pauseVideo) YT_PLAYER.pauseVideo(); }catch(e){} USE_YT=false; stopYTProgress(); }
      if(!AUDIO.src || AUDIO.src.includes('youtube.com') || AUDIO.src !== t.localFallback){
        AUDIO.src = t.localFallback;
        AUDIO.load();
      }
      if(isPlaying && !AUDIO.paused) AUDIO.pause();
      else AUDIO.play().then(()=>{ isPlaying=true; updateIcons(); }).catch((e)=>{ console.warn('file:// play failed',e); isPlaying=false; updateIcons(); });
      return;
    }
    const needsYT = USE_YT || isYouTubeSource(t);
    if(needsYT){
      if(!YT_PLAYER || !YT_READY){
        // If YT not ready, try local fallback only on file://, otherwise wait for YT
        if(IS_FILE && t.localFallback){
          USE_YT=false;
          AUDIO.src = t.localFallback;
          AUDIO.load();
          AUDIO.play().then(()=>{ isPlaying=true; updateIcons(); }).catch(()=>{});
          return;
        }
        loadTrack(currentIdx, true);
        return;
      }
      const state = YT_PLAYER.getPlayerState ? YT_PLAYER.getPlayerState() : -1;
      if(state===1){ YT_PLAYER.pauseVideo(); }
      else {
        // Ensure volume restored
        try{
          if(YT_PLAYER.isMuted && YT_PLAYER.isMuted()) YT_PLAYER.unMute();
          const v = parseFloat(localStorage.getItem('abhi_music_volume')||'0.85');
          YT_PLAYER.setVolume(v*100);
        }catch(e){}
        YT_PLAYER.playVideo();
      }
      return;
    }
    // Local audio
    if(!AUDIO.src || AUDIO.src === '' || AUDIO.src === window.location.href){
      loadTrack(currentIdx, true);
      return;
    }
    // If audio has no src file loaded (youtube artifact), reload
    if(AUDIO.src.includes('youtube.com')){
      loadTrack(currentIdx, true);
      return;
    }
    if(isPlaying && !AUDIO.paused){
      AUDIO.pause();
    } else {
      // Resume or start
      if(AUDIO.readyState===0) loadTrack(currentIdx, true);
      else {
        AUDIO.play().then(()=>{
          isPlaying=true; updateIcons();
        }).catch((e)=>{
          console.warn('Play failed', e);
          // Common: NotAllowedError due to autoplay policy — user must interact
          // Show hint
          if(e && e.name==='NotAllowedError'){
            console.info('Autoplay blocked — needs user gesture');
          }
          // Try fallback if source might be bad
          if(AUDIO.error || !AUDIO.src) tryLocalFallback();
          isPlaying=false; updateIcons();
        });
      }
    }
  }

  function nextTrack(){
    const wasPlaying = isPlaying || !AUDIO.paused;
    if(playlist.length===1){
      if(USE_YT && YT_PLAYER){
        try{ YT_PLAYER.seekTo(0,true); YT_PLAYER.playVideo(); }catch(e){}
      } else {
        AUDIO.currentTime=0;
        if(wasPlaying) AUDIO.play().catch(()=>{});
        updateProgress();
      }
      return;
    }
    loadTrack(currentIdx+1, wasPlaying);
  }
  function prevTrack(){
    const wasPlaying = isPlaying || !AUDIO.paused;
    if(USE_YT && YT_PLAYER){
      try{
        const cur = YT_PLAYER.getCurrentTime ? YT_PLAYER.getCurrentTime() : 0;
        if(cur > 3) YT_PLAYER.seekTo(0,true);
        else loadTrack(currentIdx-1, wasPlaying);
      }catch(e){ loadTrack(currentIdx-1, wasPlaying); }
      return;
    }
    if(AUDIO.currentTime > 3) AUDIO.currentTime=0;
    else loadTrack(currentIdx-1, wasPlaying);
  }

  function seekTo(percent){
    percent = clamp(percent,0,1);
    if(USE_YT && YT_PLAYER && YT_PLAYER.getDuration){
      const dur = YT_PLAYER.getDuration() || 0;
      if(dur) YT_PLAYER.seekTo(percent*dur, true);
      updateProgress();
      return;
    }
    // For local, if duration not yet known, use fallback duration to estimate
    if(!AUDIO.duration || isNaN(AUDIO.duration) || !isFinite(AUDIO.duration)){
      const t=getTrack(currentIdx);
      const fallbackSec = parseDuration(t.duration);
      if(fallbackSec){
        AUDIO.currentTime = percent * fallbackSec;
      }
      return;
    }
    AUDIO.currentTime = percent * AUDIO.duration;
    updateProgress();
  }

  function updateProgress(){
    let cur=0, dur=0;
    if(USE_YT && YT_PLAYER && YT_PLAYER.getCurrentTime){
      try{ cur = YT_PLAYER.getCurrentTime()||0; dur = YT_PLAYER.getDuration()||0; }catch(e){}
      // If YT duration not yet available, use fallback string
      if(!dur){
        const t=getTrack(currentIdx);
        dur = parseDuration(t.duration) || 0;
      }
    } else {
      cur = AUDIO.currentTime || 0;
      dur = AUDIO.duration || 0;
      if((!dur || isNaN(dur) || !isFinite(dur))){
        const t=getTrack(currentIdx);
        const fallbackSec = parseDuration(t.duration);
        if(fallbackSec) dur = fallbackSec;
      }
    }
    const pct = dur ? (cur/dur)*100 : 0;
    if(els.progress) els.progress.style.width = pct+'%';
    if(els.progressMobile) els.progressMobile.style.width = pct+'%';
    if(els.current) els.current.textContent = fmtTime(cur);
    if(els.duration) els.duration.textContent = fmtTime(dur);
    if(els.progressWrap){
      els.progressWrap.setAttribute('aria-valuenow', String(Math.round(pct)));
      els.progressWrap.setAttribute('aria-valuetext', fmtTime(cur)+' of '+fmtTime(dur));
    }
  }

  function setVolume(v){
    v=clamp(v,0,1);
    if(USE_YT && YT_PLAYER && YT_PLAYER.setVolume){
      try{ YT_PLAYER.setVolume(v*100); if(v>0) YT_PLAYER.unMute(); isMuted = v===0; }catch(e){}
    } else {
      AUDIO.volume=v;
      AUDIO.muted=false;
      isMuted=false;
    }
    if(els.volume) els.volume.value = String(v);
    if(v>0) prevVolume=v;
    try{ localStorage.setItem('abhi_music_volume', String(v)); localStorage.setItem('abhi_music_muted', isMuted?'1':'0'); }catch(e){}
    updateIcons();
  }
  function toggleMute(){
    if(USE_YT && YT_PLAYER){
      try{
        if(YT_PLAYER.isMuted && YT_PLAYER.isMuted()){ YT_PLAYER.unMute(); isMuted=false; }
        else { YT_PLAYER.mute(); isMuted=true; }
      }catch(e){ isMuted=!isMuted; }
      try{ localStorage.setItem('abhi_music_muted', isMuted?'1':'0'); }catch(e){}
      updateIcons();
      return;
    }
    isMuted = !isMuted;
    AUDIO.muted = isMuted;
    // Also sync volume slider icon
    try{ localStorage.setItem('abhi_music_muted', isMuted?'1':'0'); }catch(e){}
    updateIcons();
  }

  // --- Event bindings ---
  [els.play, els.playMobile].forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); togglePlay(); });
  });
  [els.prev, els.prevMobile].forEach(btn=>{ if(btn) btn.addEventListener('click', (e)=>{ e.stopPropagation(); prevTrack(); }); });
  [els.next, els.nextMobile].forEach(btn=>{ if(btn) btn.addEventListener('click', (e)=>{ e.stopPropagation(); nextTrack(); }); });
  if(els.mute) els.mute.addEventListener('click', (e)=>{ e.stopPropagation(); toggleMute(); });
  if(els.volume){
    els.volume.value = String(AUDIO.volume);
    els.volume.addEventListener('input', (e)=> setVolume(parseFloat(e.target.value)));
  }
  function bindSeek(wrap){
    if(!wrap) return;
    let dragging=false;
    const getPct = (e)=>{
      const rect = wrap.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return clamp(x/rect.width,0,1);
    };
    const onDown = (e)=>{
      dragging=true; isSeeking=true;
      const p=getPct(e);
      if(els.progress) els.progress.style.width = (p*100)+'%';
      if(els.progressMobile) els.progressMobile.style.width = (p*100)+'%';
      seekTo(p);
      e.preventDefault();
    };
    const onMove = (e)=>{
      if(!dragging) return;
      const p=getPct(e);
      if(els.progress) els.progress.style.width = (p*100)+'%';
      if(els.progressMobile) els.progressMobile.style.width = (p*100)+'%';
    };
    const onUp = (e)=>{
      if(!dragging) return;
      dragging=false; isSeeking=false;
      const p=getPct(e.changedTouches ? e.changedTouches[0] : e);
      seekTo(p);
    };
    wrap.addEventListener('mousedown', onDown);
    wrap.addEventListener('touchstart', onDown, {passive:false});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive:false});
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    wrap.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowLeft'){ e.preventDefault(); seekTo(clamp(((AUDIO.currentTime||0)-5)/(AUDIO.duration||parseDuration(getTrack(currentIdx).duration)||1),0,1)); }
      if(e.key==='ArrowRight'){ e.preventDefault(); seekTo(clamp(((AUDIO.currentTime||0)+5)/(AUDIO.duration||parseDuration(getTrack(currentIdx).duration)||1),0,1)); }
      if(e.key==='Home'){ e.preventDefault(); seekTo(0); }
      if(e.key==='End'){ e.preventDefault(); seekTo(1); }
    });
  }
  bindSeek(els.progressWrap);

  function openMusicWindow(){
    if(typeof window.openApp === 'function'){
      if(window.WINDOW_DEFS && window.WINDOW_DEFS.music) window.openApp('music');
    }
  }
  if(els.barMain){
    els.barMain.addEventListener('click', (e)=>{
      if(e.target.closest('button') || e.target.closest('input')) return;
      // Don't open window, just play/pause if bar clicked — more intuitive
      // openMusicWindow();
    });
    els.barMain.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); togglePlay(); }
    });
  }
  if(els.barMobile){
    els.barMobile.addEventListener('click', (e)=>{
      if(e.target.closest('button')) return;
      // same — do nothing extra
    });
  }

  // Audio events (for local)
  AUDIO.addEventListener('play', ()=>{ if(!USE_YT){ isPlaying=true; updateIcons(); els.bar && els.bar.classList.add('is-playing'); }});
  AUDIO.addEventListener('pause', ()=>{ if(!USE_YT){ isPlaying=false; updateIcons(); els.bar && els.bar.classList.remove('is-playing'); }});
  AUDIO.addEventListener('ended', ()=>{
    if(!USE_YT){
      // Auto-advance to next track (loops)
      nextTrack();
      // Auto-play next if was playing
      setTimeout(()=>{ AUDIO.play().catch(()=>{}); }, 80);
    }
  });
  AUDIO.addEventListener('timeupdate', ()=>{ if(!USE_YT && !isSeeking) updateProgress(); });
  AUDIO.addEventListener('loadedmetadata', ()=>{
    if(!USE_YT){
      updateProgress();
      console.log('Audio metadata loaded, duration', AUDIO.duration);
    }
  });
  AUDIO.addEventListener('loadeddata', ()=>{ if(!USE_YT) updateProgress(); });
  AUDIO.addEventListener('durationchange', ()=>{ if(!USE_YT) updateProgress(); });
  AUDIO.addEventListener('canplay', ()=>{ if(!USE_YT) updateProgress(); });
  AUDIO.addEventListener('volumechange', ()=>{ if(!USE_YT){ updateIcons(); if(els.volume) els.volume.value=String(AUDIO.volume); }});
  AUDIO.addEventListener('error', (e)=>{
    console.warn('Audio error', AUDIO.error, e);
    if(!USE_YT && !fallbackTried) tryLocalFallback();
    else if(!USE_YT){ isPlaying=false; updateIcons(); }
  });

  function waitForYTDuration(attempt){
    if(!USE_YT || !YT_PLAYER || !YT_PLAYER.getDuration) return;
    const d=YT_PLAYER.getDuration();
    if(d && d>0){ updateProgress(); }
    else if(attempt<8) { setTimeout(()=>waitForYTDuration(attempt+1), 400); }
    else {
      // still 0 after retries — show fallback string
      const t=getTrack(currentIdx);
      if(t.duration && els.duration) els.duration.textContent = t.duration;
    }
  }

  window.addEventListener('keydown', (e)=>{
    const tag = document.activeElement?.tagName;
    const isTyping = tag==='INPUT' || tag==='TEXTAREA' || document.activeElement?.isContentEditable;
    if(isTyping) return;
    if(document.getElementById('spotlight') && !document.getElementById('spotlight').classList.contains('hidden')) return;
    if(e.code==='Space'){
      e.preventDefault(); togglePlay();
    } else if(e.key==='m' || e.key==='M'){
      if(!isTyping){ e.preventDefault(); toggleMute(); }
    }
  });
  [els.bar, els.barMobile].forEach(el=>{
    if(!el) return;
    el.addEventListener('keydown', (e)=>{
      if(e.code==='Space'){ e.preventDefault(); togglePlay(); }
      if(e.key==='m' || e.key==='M'){ e.preventDefault(); toggleMute(); }
      if(e.key==='ArrowLeft'){ e.preventDefault(); seekTo(clamp(((AUDIO.currentTime||0)-5)/(AUDIO.duration||parseDuration(getTrack(currentIdx).duration)||1),0,1)); }
      if(e.key==='ArrowRight'){ e.preventDefault(); seekTo(clamp(((AUDIO.currentTime||0)+5)/(AUDIO.duration||parseDuration(getTrack(currentIdx).duration)||1),0,1)); }
      if(e.key==='Escape'){ e.preventDefault(); const expanded = document.getElementById('musicExpanded'); if(expanded) expanded.classList.add('hidden'); }
    });
  });

  // Init UI — load first track WITHOUT autoplay, but show real duration instantly
  loadTrack(currentIdx, false);
  if(els.volume) els.volume.value = String(AUDIO.volume);
  updateProgress();
  updateIcons();
  requestAnimationFrame(()=>{
    if(els.bar) els.bar.classList.add('music-ready');
    if(els.barMobile) els.barMobile.classList.add('music-ready');
    if(window.lucide) lucide.createIcons();
  });
  window.musicPlayer = { audio: AUDIO, playlist, get currentIdx(){return currentIdx}, get isPlaying(){return isPlaying}, togglePlay, nextTrack, prevTrack, loadTrack, setVolume, toggleMute, seekTo, get USE_YT(){return USE_YT} };
  console.log('Music Player ready — YouTube playlist', playlist.map(p=>p.title+' ('+p.youtubeId+')').join(' | '), '— volume', AUDIO.volume);
})();

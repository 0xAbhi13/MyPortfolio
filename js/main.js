/* ==========================================================================
   Cinematic GSAP Portfolio — main.js
   Distinct style per section + ScrollTrigger on every section + hero fix
   ========================================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ---------- Lenis smooth scroll — disabled on phone to prevent hang ---------- */
  let lenis;
  const isPhone = window.matchMedia('(max-width: 600px)').matches;
  if (!prefersReduced && !isPhone && !isTouch && typeof Lenis !== 'undefined' && window.innerWidth > 768) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.4
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Preloader — premium cinematic ONLY ---------- */
  const Loader = (() => {
    const el = document.getElementById('loader');
    const countEl = document.getElementById('loader-count');
    const lineEl = document.querySelector('.preloader-line-el');
    if (!el || !countEl) return { init() {} };
    function init() {
      document.body.style.overflow = 'hidden';
      // initial states — black screen
      gsap.set('.preloader-counter', { y: 8, opacity: 0 });
      gsap.set('.preloader-word', { yPercent: 110, clipPath: 'inset(0 0 100% 0)', letterSpacing: '0.14em', opacity: 0 });
      gsap.set('.preloader-roles span', { yPercent: 100, opacity: 0 });
      gsap.set('.preloader-line-wrap', { scaleX: 0, opacity: 0, transformOrigin: 'center' });
      gsap.set(lineEl, { xPercent: -100 });
      gsap.set('.loader-curtain.top', { yPercent: 0 });
      gsap.set('.loader-curtain.bottom', { yPercent: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1. percentage 0 -> 100 (minimal)
      tl.to('.preloader-counter', { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.22);

      let p = 0;
      const doCount = () => {
        p += Math.random() * 7 + 4;
        if (p > 100) p = 100;
        countEl.textContent = String(Math.floor(p)).padStart(2, '0');
        if (p < 100) setTimeout(doCount, 55 + Math.random() * 45);
      };
      setTimeout(doCount, 280);

      // 2. ABHISHEK JADHAV mask/clip + tracking
      tl.to('.preloader-word', {
        yPercent: 0, clipPath: 'inset(0 0 0% 0)', letterSpacing: '-0.04em', opacity: 1,
        duration: 0.95, stagger: 0.09, ease: 'expo.out'
      }, 0.45)
        .to('.preloader-roles span', { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'expo.out' }, 0.62)
      // 3. subtle line/light sweep
        .to('.preloader-line-wrap', { scaleX: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }, 0.72)
        .to(lineEl, { xPercent: 100, duration: 1.15, ease: 'power3.inOut' }, 0.82);

      // 5. hold after 100% then 6. cinematic exit
      const hide = () => {
        if (el.classList.contains('is-hidden')) return;
        el.classList.add('is-hidden');
        const out = gsap.timeline({
          onComplete: () => {
            el.style.display = 'none';
            document.body.style.overflow = '';
            ScrollTrigger.refresh();
            window.dispatchEvent(new CustomEvent('loaderDone'));
          }
        });
        if (prefersReduced) {
          out.to(el, { opacity: 0, duration: 0.35 }, 0);
        } else {
          out.to('.preloader-word', { yPercent: -110, clipPath: 'inset(0 0 100% 0)', letterSpacing: '0.08em', opacity: 0, duration: 0.5, stagger: 0.06, ease: 'expo.in' }, 0)
            .to('.preloader-counter, .preloader-roles span', { y: -8, opacity: 0, duration: 0.32, stagger: 0.03, ease: 'power2.in' }, 0.05)
            .to('.preloader-line-wrap', { scaleX: 0, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.07)
            .to(el, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.12);
          // fallback clipPath for browsers not supporting inset animation fully
          gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
        }
      };

      // 3s total — as requested
      setTimeout(hide, 3000);
      setTimeout(() => { if (!el.classList.contains('is-hidden') && p >= 100) hide(); }, 3400);
      window.addEventListener('load', () => setTimeout(() => { if (p >= 100) hide(); }, 420));
    }
    function hide() {} // not used externally
    return { init };
  })();

  /* ---------- Custom cursor ---------- */
  const Cursor = (() => {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const textEl = document.querySelector('.cursor-text');
    const enabled = !isTouch && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!enabled || !dot || !ring) return { init() {} };
    return {
      init() {
        let mx = 0, my = 0, rx = 0, ry = 0;
        window.addEventListener('mousemove', (e) => {
          mx = e.clientX; my = e.clientY;
          dot.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
        });
        gsap.ticker.add(() => {
          rx += (mx - rx) * 0.14;
          ry += (my - ry) * 0.14;
          ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        });
        const enter = (txt) => {
          ring.classList.add('active');
          if (textEl) textEl.textContent = txt || 'VIEW';
        };
        const leave = () => ring.classList.remove('active');
        document.querySelectorAll('a, button').forEach(a => {
          a.addEventListener('mouseenter', () => ring.classList.add('active'));
          a.addEventListener('mouseleave', () => ring.classList.remove('active'));
        });
        document.querySelectorAll('.project').forEach(p => {
          p.addEventListener('mouseenter', () => enter('VIEW'));
          p.addEventListener('mouseleave', leave);
        });
        document.querySelectorAll('.cert-inner').forEach(c => {
          c.addEventListener('mouseenter', () => enter('TILT'));
          c.addEventListener('mouseleave', leave);
        });
      }
    };
  })();

  /* ---------- Particles — lightweight, off on phone to prevent hang ---------- */
  const Particles = (() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || prefersReduced || isPhone) return { init() {} };
    return {
      init() {
        const ctx = canvas.getContext('2d', { alpha: true });
        let parts = [];
        const DPR = Math.min(2, window.devicePixelRatio || 1);
        const density = 15000;
        const resize = () => {
          canvas.width = window.innerWidth * DPR;
          canvas.height = window.innerHeight * DPR;
          canvas.style.width = window.innerWidth + 'px';
          canvas.style.height = window.innerHeight + 'px';
          ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
          const count = Math.min(72, Math.floor((window.innerWidth * window.innerHeight) / density));
          parts = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.3 + 0.5
          }));
        };
        const step = () => {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          parts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.22)';
            ctx.fill();
          });
          for (let i = 0; i < parts.length; i++) {
            for (let j = i + 1; j < parts.length; j++) {
              const a = parts[i], b = parts[j];
              const dx = a.x - b.x, dy = a.y - b.y;
              const d = Math.hypot(dx, dy);
              if (d < 132) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(0,229,255,${0.10 * (1 - d / 132)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
          requestAnimationFrame(step);
        };
        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(step);
      }
    };
  })();

  /* ---------- Navigation + Menu ---------- */
  const Navigation = (() => {
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.querySelector('.menu-close');
    const menuLinks = document.querySelectorAll('.menu-link');
    return {
      init() {
        const onScroll = () => {
          if (nav) nav.classList.toggle('scrolled', window.scrollY > 22);
          let current = '';
          sections.forEach(s => {
            const r = s.getBoundingClientRect();
            if (r.top <= 160 && r.bottom >= 160) current = s.id;
          });
          links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        document.querySelectorAll('a[href^="#"]').forEach(a => {
          a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            this.closeMenu();
            const y = target.getBoundingClientRect().top + window.pageYOffset - 72;
            if (lenis) lenis.scrollTo(y, { duration: 1.0 });
            else gsap.to(window, { duration: 0.9, ease: 'expo.inOut', scrollTo: y });
          });
        });
        if (toggle && overlay) {
          toggle.addEventListener('click', () => {
            const open = overlay.classList.contains('open');
            open ? this.closeMenu() : this.openMenu();
          });
        }
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeMenu());
        menuLinks.forEach(l => l.addEventListener('click', () => this.closeMenu()));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeMenu(); });
        overlay?.addEventListener('click', (e) => { if (e.target === overlay) this.closeMenu(); });
      },
      openMenu() {
        const overlay = document.getElementById('menu-overlay');
        const toggle = document.querySelector('.nav-toggle');
        if (!overlay) return;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        toggle?.classList.add('open');
        toggle?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      },
      closeMenu() {
        const overlay = document.getElementById('menu-overlay');
        const toggle = document.querySelector('.nav-toggle');
        if (!overlay) return;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        toggle?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    };
  })();

  /* ---------- Magnetic + tilt + hero mouse parallax ---------- */
  const Interactions = (() => {
    return {
      init() {
        if (!isTouch && !prefersReduced) {
          document.querySelectorAll('[data-magnetic]').forEach(el => {
            el.addEventListener('mousemove', (e) => {
              const rect = el.getBoundingClientRect();
              const dx = (e.clientX - rect.left - rect.width / 2) * 0.28;
              const dy = (e.clientY - rect.top - rect.height / 2) * 0.35;
              gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power3.out' });
            });
            el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.35)' }));
          });
        }
        const heroVisual = document.querySelector('.hero-visual');
        const hero = document.getElementById('hero');
        if (heroVisual && hero && !prefersReduced && !isTouch) {
          hero.addEventListener('mousemove', (e) => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(heroVisual, { rotationY: px * 8, rotationX: -py * 6, x: px * 10, y: py * 8, duration: 0.7, ease: 'power3.out', transformPerspective: 900 });
            gsap.to('.float-card-1', { x: px * -12, y: py * -10, duration: 0.7, ease: 'power3.out' });
            gsap.to('.float-card-2', { x: px * 14, y: py * 12, duration: 0.7, ease: 'power3.out' });
            gsap.to('.hero-title', { x: px * 10, duration: 0.8, ease: 'power3.out' });
          });
          hero.addEventListener('mouseleave', () => {
            gsap.to(heroVisual, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
            gsap.to('.hero-title', { x: 0, duration: 0.8, ease: 'power3.out' });
          });
        }
        const tiltEls = document.querySelectorAll('[data-tilt]');
        if (tiltEls.length && !isTouch && !prefersReduced) {
          tiltEls.forEach(card => {
            const max = 9;
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              const ry = (px - 0.5) * max * 2;
              const rx = (0.5 - py) * max * 2;
              card.classList.add('is-tilting');
              card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              card.style.setProperty('--mx', `${px * 100}%`);
              card.style.setProperty('--my', `${py * 100}%`);
            });
            card.addEventListener('mouseleave', () => {
              card.classList.remove('is-tilting');
              card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
          });
        }
      }
    };
  })();

  /* ---------- Cert marquee duplicate for seamless scroll ---------- */
  (function setupCertMarquee() {
    const track = document.getElementById('certTrack');
    if (!track) return;
    const originals = Array.from(track.children);
    originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a,button').forEach(el => el.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });
    if (prefersReduced) return;
    const marquee = track.closest('.cert-marquee');
    if (!marquee) return;
    const pause = () => track.classList.add('is-paused');
    const resume = () => track.classList.remove('is-paused');
    marquee.addEventListener('touchstart', pause, { passive: true });
    marquee.addEventListener('touchend', resume, { passive: true });
    marquee.addEventListener('focusin', pause);
    marquee.addEventListener('focusout', resume);
  })();

  /* ---------- Scroll choreography: distinct per section + every section has ScrollTrigger ---------- */
  const ScrollChoreo = (() => {
    let ctx;
    return {
      init() {
        ctx = gsap.context(() => {
          if (prefersReduced) {
            gsap.set('.hero-word, .about-title .clip span, .contact-title .clip span', { clearProps: 'transform' });
            document.querySelectorAll('.skill-bar .fill').forEach(b => {
              const lvl = b.closest('.skill')?.getAttribute('data-level');
              if (lvl) b.style.width = lvl + '%';
            });
            return;
          }

          /* Hero opening — FIXED for compact hero (now 40px-102px) */
          const heroTl = () => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
            gsap.set('.hero-word', { yPercent: 110 });
            gsap.set('.hero-sub', { yPercent: 110, opacity: 0 });
            gsap.set('.hero-kicker, .hero-badge', { y: 14, opacity: 0 });
            gsap.set('.hero-desc-col > *', { y: 18, opacity: 0 });
            gsap.set('.hero-visual', { y: 28, opacity: 0, scale: 0.98 });
            gsap.set('.hero-marquee, .strip', { y: 12, opacity: 0 });
            gsap.set('.hero-side', { x: 14, opacity: 0 });
            tl.to('.hero-kicker', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.15)
              .to('.hero-badge', { y: 0, opacity: 1, duration: 0.6 }, 0.25)
              .to('.hero-word', { yPercent: 0, duration: 1.05, stagger: 0.09, ease: 'expo.out' }, 0.22)
              .to('.hero-sub', { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, 0.95)
              .to('.hero-desc-col > *', { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out' }, 0.9)
              .to('.hero-visual', { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.55)
              .to('.hero-marquee', { y: 0, opacity: 1, duration: 0.6 }, 1.15)
              .to('.strip', { y: 0, opacity: 1, duration: 0.6 }, 1.2)
              .to('.hero-side', { x: 0, opacity: 1, duration: 0.6 }, 1.1);
            gsap.to('.float-card-1', { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });
            gsap.to('.float-card-2', { y: 5, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.8 });
          };
          if (document.getElementById('loader')?.classList.contains('is-hidden') || !document.getElementById('loader')) {
            heroTl();
          } else {
            window.addEventListener('loaderDone', heroTl, { once: true });
            setTimeout(() => { if (gsap.getTweensOf('.hero-word')[0] === undefined) heroTl(); }, 4200);
          }

          // PHONE: lightweight — no scrub, perfect look, ensure stats visible
          if (isPhone) {
            document.querySelectorAll('.section-head').forEach(head => {
              const eyebrow = head.querySelector('.eyebrow');
              const line = head.querySelector('.head-line');
              if (eyebrow) gsap.from(eyebrow, { x: -10, opacity: 0, duration: 0.45, scrollTrigger: { trigger: head, start: 'top 92%' } });
              if (line) gsap.from(line, { scaleX: 0, transformOrigin: 'left', duration: 0.6, scrollTrigger: { trigger: head, start: 'top 92%' } });
            });
            // ensure about stats + other cards are visible immediately (no hidden until scroll) — fixes phone not showing
            gsap.set('.a-stat, .t-item, .skill, .project, .cert-inner, .edu-item, .c-card', { clearProps: 'all' });
            document.querySelectorAll('.a-stat, .t-item, .skill, .project, .cert-inner, .edu-item, .c-card').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
            gsap.from('.about-title .clip span', { yPercent: 30, opacity: 0, duration: 0.6, stagger: 0.06, scrollTrigger: { trigger: '.about-title', start: 'top 90%' } });
            // phone hero — lightweight scroll (no heavy hang)
            gsap.to('.hero-visual', { y: -10, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
            gsap.to('.hero-title', { y: -8, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
            // phone marquee for stack — requested: marquee on scroll
            const kl = document.querySelector('.kinetic-track:not(.reverse)');
            const kr = document.querySelector('.kinetic-track.reverse');
            if (kl) gsap.to(kl, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.stack-kinetic', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
            if (kr) gsap.fromTo(kr, { xPercent: -8 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.stack-kinetic', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
            document.querySelectorAll('.skill-bar .fill').forEach(b => {
              const lvl = b.closest('.skill')?.getAttribute('data-level');
              if (lvl) ScrollTrigger.create({ trigger: b.closest('.skill'), start: 'top 92%', once: true, onEnter: () => b.style.width = lvl + '%' });
            });
            document.querySelectorAll('.a-stat .num[data-count]').forEach(el => {
              const target = +el.getAttribute('data-count');
              const obj = { v: 0 };
              ScrollTrigger.create({
                trigger: el,
                start: 'top 95%',
                once: true,
                onEnter: () => gsap.to(obj, { v: target, duration: 1, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(obj.v) + (el.textContent.includes('+') || target===3 ? '+' : '') })
              });
            });
            return;
          }

          /* Global progress + every section-head draws */
          gsap.to('#progress-bar', {
            width: '100%',
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
          });
          document.querySelectorAll('.section-head').forEach(head => {
            const eyebrow = head.querySelector('.eyebrow');
            const line = head.querySelector('.head-line');
            if (eyebrow) gsap.from(eyebrow, { x: -14, opacity: 0, duration: 0.55, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 88%' } });
            if (line) gsap.from(line, { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: head, start: 'top 88%' } });
          });
          gsap.to('.strip', { xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: 0.8 } });

          /* About — distinct paper + grid */
          gsap.set('.about-title .clip span', { yPercent: 110 });
          gsap.to('.about-title .clip span', { yPercent: 0, duration: 1, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '.about-title', start: 'top 82%' } });
          gsap.from('.about-paras > *', { y: 18, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.about-right', start: 'top 82%' } });
          gsap.from('.a-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.about-stats-grid', start: 'top 88%' } });
          document.querySelectorAll('.a-stat .num[data-count]').forEach(el => {
            const target = +el.getAttribute('data-count');
            const obj = { v: 0 };
            ScrollTrigger.create({
              trigger: el,
              start: 'top 88%',
              once: true,
              onEnter: () => gsap.to(obj, { v: target, duration: 1.2, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(obj.v) + (target > 9 ? '+' : '') })
            });
          });
          gsap.from('.t-item', { y: 22, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.timeline-grid', start: 'top 86%' } });
          gsap.from('.about-meta .mono', { y: 12, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.about-meta', start: 'top 88%' } });
          gsap.from('.timeline-line', { scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.timeline-wrap', start: 'top 86%' } });

          /* Stack — industrial kinetic, vivid accent */
          gsap.from('.stack-intro h2', { y: 18, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.stack-intro', start: 'top 86%' } });
          gsap.from('.stack-intro p', { y: 14, opacity: 0, duration: 0.55, delay: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.stack-intro', start: 'top 86%' } });
          const kineticLeft = document.querySelector('.kinetic-track:not(.reverse)');
          const kineticRight = document.querySelector('.kinetic-track.reverse');
          if (kineticLeft) {
            gsap.to(kineticLeft, { xPercent: -18, ease: 'none', scrollTrigger: { trigger: '.stack-kinetic', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
          }
          if (kineticRight) {
            gsap.fromTo(kineticRight, { xPercent: -18 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.stack-kinetic', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
          }
          document.querySelectorAll('.skill').forEach((card, i) => {
            const bar = card.querySelector('.fill');
            const lvl = card.getAttribute('data-level');
            if (bar && lvl) {
              ScrollTrigger.create({
                trigger: card,
                start: 'top 88%',
                once: true,
                onEnter: () => requestAnimationFrame(() => bar.style.width = lvl + '%')
              });
            }
            gsap.from(card, { y: 20, opacity: 0, rotation: i % 2 ? 0.4 : -0.4, duration: 0.55, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 92%' } });
          });

          /* Work — intro + cinematic per project */
          gsap.set('.work-title span', { yPercent: 80, opacity: 0 });
          gsap.to('.work-title span', { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.work-intro', start: 'top 84%' } });
          gsap.from('.projects-wrap', { opacity: 0, duration: 0.4, scrollTrigger: { trigger: '.projects-wrap', start: 'top 92%' } });
          document.querySelectorAll('.project').forEach(proj => {
            const media = proj.querySelector('.media-frame');
            const img = proj.querySelector('.media-frame img');
            const infoChildren = proj.querySelectorAll('.p-eyebrow, .p-title, .p-desc, .p-tech, .p-links');
            const bgNum = proj.querySelector('.project-bg-num');
            if (media && img && !proj.classList.contains('next')) {
              gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: proj, start: 'top 88%', end: 'top 12%', scrub: 0.8 } });
              gsap.from(media, { clipPath: 'inset(10% 10% 10% 10% round 18px)', duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: proj, start: 'top 82%' } });
              if (bgNum) gsap.to(bgNum, { y: -40, ease: 'none', scrollTrigger: { trigger: proj, start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
              gsap.from(infoChildren, { y: 22, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: proj.querySelector('.project-info'), start: 'top 84%' } });
              gsap.to(media, { y: -14, ease: 'none', scrollTrigger: { trigger: proj, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
            }
            if (proj.classList.contains('next')) {
              gsap.from(proj.querySelectorAll('.next-left > *'), { y: 18, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: proj, start: 'top 84%' } });
              gsap.from('.next-big', { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: proj, start: 'top 80%' } });
            }
          });

          /* Certificates — light paper stage */
          gsap.from('.certs-intro > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.certs-intro', start: 'top 86%' } });
          gsap.from('.cert-card .cert-inner', { y: 24, opacity: 0, rotation: 0.6, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.cert-marquee', start: 'top 85%' } });

          /* Education — concrete archive */
          gsap.from('.edu-left h2', { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.edu-left', start: 'top 84%' } });
          gsap.from('.edu-desc', { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.edu-desc', start: 'top 88%' } });
          gsap.from('.edu-right .edu-item', { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.edu-right', start: 'top 86%' } });
          gsap.from('.edu-when', { scale: 0.88, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.15)', scrollTrigger: { trigger: '.edu-right', start: 'top 84%' } });

          /* Contact — brutalist inverted */
          gsap.set('.contact-title .clip span', { yPercent: 110 });
          gsap.to('.contact-title .clip span', { yPercent: 0, duration: 0.95, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.contact-title', start: 'top 84%' } });
          gsap.from('.contact-right > *', { y: 18, opacity: 0, duration: 0.6, stagger: 0.075, ease: 'power3.out', scrollTrigger: { trigger: '.contact-right', start: 'top 86%' } });
          gsap.from('.c-card', { x: 14, opacity: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.contact-cards', start: 'top 88%' } });
          gsap.to('.contact-bg-text', { y: -30, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
          gsap.from('.contact-label .eyebrow', { x: -12, opacity: 0, duration: 0.5, scrollTrigger: { trigger: '.contact-label', start: 'top 88%' } });
          gsap.from('.footer-line', { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.footer', start: 'top 92%' } });
          gsap.from('.footer-left, .footer-right', { y: 12, opacity: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: '.footer-inner', start: 'top 92%' } });

          /* Hero scroll parallax — gentle (with compact hero) */
          gsap.to('.hero-visual', { y: -40, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
          gsap.to('.hero-title', { y: -18, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
        });
      },
      revert() { ctx && ctx.revert(); }
    };
  })();

  /* ---------- Back to top + footer year ---------- */
  const Footer = (() => {
    const btn = document.querySelector('.back-to-top');
    const yearEl = document.getElementById('current-year');
    return {
      init() {
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        if (!btn) return;
        const toggle = () => btn.classList.toggle('visible', window.scrollY > 600);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();
        btn.addEventListener('click', () => {
          if (lenis) lenis.scrollTo(0, { duration: 1.1 });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    };
  })();

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    Loader.init();
    Cursor.init();
    Particles.init();
    Navigation.init();
    Interactions.init();
    ScrollChoreo.init();
    Footer.init();
    let images = document.querySelectorAll('img');
    let loaded = 0;
    const maybeRefresh = () => { loaded++; if (loaded === images.length) ScrollTrigger.refresh(); };
    images.forEach(img => {
      if (img.complete) maybeRefresh();
      else { img.addEventListener('load', maybeRefresh); img.addEventListener('error', maybeRefresh); }
    });
    setTimeout(() => ScrollTrigger.refresh(), 1200);
  });

  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => ScrollTrigger.refresh(), 160);
  });

})();

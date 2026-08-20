/* ==========================================================================
   Abhishek Jadhav — Developer Portfolio
   main.js — vanilla JS only, no dependencies
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Loading screen
  ------------------------------------------------------------------ */
  const LoadingScreen = {
    el: document.getElementById('loading-screen'),
    promptEl: document.getElementById('loader-prompt'),
    init() {
      if (!this.el) return;
      document.body.style.overflow = 'hidden';
      const messages = ['booting environment…', 'installing dependencies…', 'compiling portfolio…'];
      let i = 0;
      if (this.promptEl) {
        this.promptEl.textContent = messages[0];
        const interval = setInterval(() => {
          i++;
          if (i < messages.length && this.promptEl) {
            this.promptEl.textContent = messages[i];
          } else {
            clearInterval(interval);
          }
        }, 420);
      }
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.el.classList.add('hidden');
          document.body.style.overflow = '';
        }, 900);
      });
      // Safety fallback in case 'load' already fired
      setTimeout(() => this.el.classList.add('hidden'), 3500);
    }
  };

  /* ------------------------------------------------------------------
     2. Custom cursor (dot + ring) — desktop only
  ------------------------------------------------------------------ */
  const CustomCursor = {
    dot: document.querySelector('.cursor-dot'),
    ring: document.querySelector('.cursor-ring'),
    enabled: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    init() {
      if (!this.enabled || !this.dot || !this.ring) return;
      let ringX = 0, ringY = 0;

      window.addEventListener('mousemove', (e) => {
        this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });

      const animateRing = () => {
        ringX += (lastX - ringX) * 0.16;
        ringY += (lastY - ringY) * 0.16;
        this.ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
      };
      let lastX = 0, lastY = 0;
      window.addEventListener('mousemove', (e) => { lastX = e.clientX; lastY = e.clientY; });
      requestAnimationFrame(animateRing);

      document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach((elm) => {
        elm.addEventListener('mouseenter', () => this.ring.classList.add('active'));
        elm.addEventListener('mouseleave', () => this.ring.classList.remove('active'));
      });
    }
  };

  /* ------------------------------------------------------------------
     3. Mouse glow effect
  ------------------------------------------------------------------ */
  const MouseGlow = {
    el: document.getElementById('mouse-glow'),
    init() {
      if (!this.el || prefersReducedMotion) return;
      window.addEventListener('mousemove', (e) => {
        this.el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
  };

  /* ------------------------------------------------------------------
     4. Particle background (lightweight canvas network)
  ------------------------------------------------------------------ */
  const Particles = {
    canvas: document.getElementById('particles-canvas'),
    init() {
      if (!this.canvas || prefersReducedMotion) return;
      const ctx = this.canvas.getContext('2d');
      let particles = [];
      let w, h;
      const density = 12000; // px^2 per particle

      const resize = () => {
        w = this.canvas.width = window.innerWidth;
        h = this.canvas.height = window.innerHeight;
        const count = Math.min(90, Math.floor((w * h) / density));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        }));
      };

      const step = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(88, 166, 255, 0.45)';
          ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0, 229, 255, ${0.14 * (1 - dist / 130)})`;
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

  /* ------------------------------------------------------------------
     5. Typing animation — hero subtitle
  ------------------------------------------------------------------ */
  const TypingEffect = {
    el: document.getElementById('typed-text'),
    phrases: [
      'building things for the web.',
      'learning C++ & Python.',
      'exploring open source on GitHub.',
      'turning curiosity into code.'
    ],
    init() {
      if (!this.el) return;
      if (prefersReducedMotion) { this.el.textContent = this.phrases[0]; return; }

      let phraseIndex = 0, charIndex = 0, deleting = false;

      const tick = () => {
        const current = this.phrases[phraseIndex];
        if (!deleting) {
          charIndex++;
          this.el.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            return setTimeout(tick, 1600);
          }
        } else {
          charIndex--;
          this.el.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % this.phrases.length;
          }
        }
        const speed = deleting ? 35 : 55;
        setTimeout(tick, speed);
      };
      tick();
    }
  };

  /* ------------------------------------------------------------------
     6. Terminal window line reveal
  ------------------------------------------------------------------ */
  const TerminalLines = {
    init() {
      const lines = document.querySelectorAll('.term-line');
      lines.forEach((line, idx) => {
        line.style.animationDelay = `${0.3 + idx * 0.35}s`;
      });
    }
  };

  /* ------------------------------------------------------------------
     7. Scroll reveal (IntersectionObserver)
  ------------------------------------------------------------------ */
  const ScrollReveal = {
    init() {
      const targets = document.querySelectorAll('[data-reveal]');
      if (!targets.length) return;

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        targets.forEach((t) => t.classList.add('revealed'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      targets.forEach((t) => observer.observe(t));
    }
  };

  /* ------------------------------------------------------------------
     8. Skill progress bars (animate width on reveal)
  ------------------------------------------------------------------ */
  const SkillBars = {
    init() {
      const bars = document.querySelectorAll('.skill-bar-fill');
      if (!bars.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const level = target.getAttribute('data-level') || '0';
            requestAnimationFrame(() => { target.style.width = `${level}%`; });
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.4 });

      bars.forEach((bar) => observer.observe(bar));
    }
  };

  /* ------------------------------------------------------------------
     8b. Subtle hero parallax on scroll
  ------------------------------------------------------------------ */
  const HeroParallax = {
    visual: document.querySelector('.hero-visual'),
    hero: document.getElementById('hero'),
    init() {
      if (!this.visual || !this.hero || prefersReducedMotion) return;
      window.addEventListener('scroll', () => {
        const rect = this.hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = window.scrollY * 0.08;
        this.visual.style.transform = `translateY(${offset}px)`;
      }, { passive: true });
    }
  };

  /* ------------------------------------------------------------------
     8c. Certificate marquee — clone track for a seamless right-to-left
     scroll, then pause on hover / touch so people can actually read a card.
  ------------------------------------------------------------------ */
  (function setupCertMarquee() {
    const track = document.getElementById('certTrack');
    if (!track) return;

    // Duplicate the cards once so the track can loop from 0 -> -50%
    // without a visible jump. Runs before CertTilt below queries
    // [data-tilt], so the clones get tilt + shine too. Runs on every
    // device — the marquee auto-scrolls on phone and PC alike.
    const originalCards = Array.from(track.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });

    if (prefersReducedMotion) return;

    // Pause on hover (CSS already handles mouse via :hover) and on
    // touch/focus, so the scroll stops long enough to interact with.
    const marquee = track.closest('.cert-marquee');
    if (!marquee) return;

    const pause = () => track.classList.add('is-paused');
    const resume = () => track.classList.remove('is-paused');

    marquee.addEventListener('touchstart', pause, { passive: true });
    marquee.addEventListener('touchend', resume, { passive: true });
    marquee.addEventListener('focusin', pause);
    marquee.addEventListener('focusout', resume);
  })();

  /* ------------------------------------------------------------------
     8d. Certificate cards — pointer-tracked 3D tilt + holographic shine
  ------------------------------------------------------------------ */
  const CertTilt = {
    cards: document.querySelectorAll('[data-tilt]'),
    enabled: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    init() {
      if (!this.cards.length || !this.enabled || prefersReducedMotion) return;

      this.cards.forEach((card) => {
        const maxTilt = 8; // degrees

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;  // 0 -> 1
          const py = (e.clientY - rect.top) / rect.height;  // 0 -> 1

          const rotateY = (px - 0.5) * (maxTilt * 2);
          const rotateX = (0.5 - py) * (maxTilt * 2);

          card.classList.add('is-tilting');
          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          card.style.setProperty('--mx', `${px * 100}%`);
          card.style.setProperty('--my', `${py * 100}%`);
        };

        const onLeave = () => {
          card.classList.remove('is-tilting');
          card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    }
  };

  /* ------------------------------------------------------------------
     9. Navbar: scrolled state + active link highlighting + smooth scroll
  ------------------------------------------------------------------ */
  const Navigation = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.nav-links a, .mobile-menu a'),
    sections: document.querySelectorAll('main section[id]'),
    toggle: document.querySelector('.nav-toggle'),
    mobileMenu: document.querySelector('.mobile-menu'),

    init() {
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      this.onScroll();

      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              const offset = 88;
              const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
              window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
            this.closeMobileMenu();
          }
        });
      });

      if (this.toggle && this.mobileMenu) {
        this.toggle.addEventListener('click', () => {
          const isOpen = this.mobileMenu.classList.toggle('open');
          this.toggle.classList.toggle('open', isOpen);
          this.toggle.setAttribute('aria-expanded', String(isOpen));
        });
      }
    },

    closeMobileMenu() {
      if (this.mobileMenu) this.mobileMenu.classList.remove('open');
      if (this.toggle) { this.toggle.classList.remove('open'); this.toggle.setAttribute('aria-expanded', 'false'); }
    },

    onScroll() {
      if (this.navbar) this.navbar.classList.toggle('scrolled', window.scrollY > 24);

      let currentId = '';
      this.sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) currentId = section.id;
      });
      this.navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  };

  /* ------------------------------------------------------------------
     10. Back to top button
  ------------------------------------------------------------------ */
  const BackToTop = {
    btn: document.querySelector('.back-to-top'),
    init() {
      if (!this.btn) return;
      window.addEventListener('scroll', () => {
        this.btn.classList.toggle('visible', window.scrollY > 500);
      }, { passive: true });
      this.btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    }
  };

  /* ------------------------------------------------------------------
     11. Footer year
  ------------------------------------------------------------------ */
  const FooterYear = {
    init() {
      const el = document.getElementById('current-year');
      if (el) el.textContent = new Date().getFullYear();
    }
  };

  /* ------------------------------------------------------------------
     Init everything once DOM is ready
  ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    LoadingScreen.init();
    CustomCursor.init();
    MouseGlow.init();
    Particles.init();
    TypingEffect.init();
    HeroParallax.init();
    TerminalLines.init();
    ScrollReveal.init();
    SkillBars.init();
    CertTilt.init();
    Navigation.init();
    BackToTop.init();
    FooterYear.init();
  });
})();

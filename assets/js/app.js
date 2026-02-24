/**
 * WikiDocs — app.js
 * Modular interactive behavior for the docs template.
 *
 * Modules:
 *   1. ThemeToggle         — dark / light theme switch
 *   2. SidebarDrawer       — mobile off-canvas sidebar
 *   3. SidebarAccordion    — collapsible nav sections
 *   4. TOCScrollspy        — highlight current section in TOC
 *   5. TOCCollapsible      — mobile accordion TOC
 *   6. BackToTop           — floating scroll-to-top button
 *   7. CopyCodeButton      — copy code block contents
 *   8. CopyLinkButton      — copy current page URL
 *   9. FeedbackBlock       — yes/no feedback widget
 *  10. SearchOverlay       — keyboard-accessible search modal
 *  11. SmoothAnchorScroll  — offset scroll for fixed navbar
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Debounce — limits how often fn is called */
function debounce(fn, ms = 80) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/** Temporarily show "copied" state on a button */
function showCopied(btn, textEl, ms = 1800) {
  btn.setAttribute('data-copied', 'true');
  btn.setAttribute('aria-label', 'Copied!');
  setTimeout(() => {
    btn.removeAttribute('data-copied');
    btn.setAttribute('aria-label', 'Copy code');
  }, ms);
}


/* ═══════════════════════════════════════════════════════════
   MODULE 1: ThemeToggle
   Persists preference in localStorage.
   ═══════════════════════════════════════════════════════════ */

function initThemeToggle() {
  const STORAGE_KEY = 'wiki-theme';
  const html = document.documentElement;

  // Apply saved theme immediately (avoids flash)
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  html.setAttribute('data-theme', saved);

  $$('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      btn.setAttribute('aria-label', `Switch to ${current} mode`);
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 2: SidebarDrawer (mobile)
   Opens/closes the off-canvas sidebar on mobile.
   ═══════════════════════════════════════════════════════════ */

function initSidebarDrawer() {
  const sidebar  = $('.sidebar');
  const overlay  = $('.sidebar-overlay');
  const openBtns = $$('[data-action="toggle-sidebar"]');
  const closeBtns = $$('[data-action="close-sidebar"]');

  if (!sidebar) return;

  function open() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    openBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
    // Trap focus inside sidebar
    sidebar.focus?.();
  }

  function close() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    openBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  openBtns.forEach(btn => btn.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('is-open');
    isOpen ? close() : open();
  }));

  closeBtns.forEach(btn => btn.addEventListener('click', close));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
  });

  // Close when clicking a sidebar link on mobile
  $$('.sidebar-item__link', sidebar).forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) close();
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 3: SidebarAccordion
   Toggles collapsible nav sections via aria-expanded.
   ═══════════════════════════════════════════════════════════ */

function initSidebarAccordion() {
  $$('[data-accordion]').forEach(trigger => {
    const list = trigger.nextElementSibling;
    if (!list) return;

    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    if (expanded) list.classList.add('is-open');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      list.setAttribute('aria-hidden', String(isOpen));
      list.classList.toggle('is-open', !isOpen);
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 4: TOC Scrollspy
   Highlights the active TOC item based on scroll position.
   Uses IntersectionObserver for performance.
   ═══════════════════════════════════════════════════════════ */

function initTOCScrollspy() {
  const tocLinks = $$('.toc-link[href^="#"]');
  if (!tocLinks.length) return;

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
  ) || 56;

  // Collect all observed headings
  const headingIds = tocLinks
    .map(a => a.getAttribute('href').slice(1))
    .filter(Boolean);

  const headings = headingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!headings.length) return;

  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    tocLinks.forEach(a => {
      const target = a.getAttribute('href').slice(1);
      a.classList.toggle('is-active', target === id);
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      // Find the topmost visible heading
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    {
      rootMargin: `-${navHeight + 8}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  headings.forEach(h => observer.observe(h));
}


/* ═══════════════════════════════════════════════════════════
   MODULE 5: TOCCollapsible (mobile inline accordion)
   ═══════════════════════════════════════════════════════════ */

function initTOCCollapsible() {
  $$('.toc-collapsible').forEach(el => {
    const trigger = $('.toc-collapsible__trigger', el);
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = el.getAttribute('aria-expanded') === 'true';
      el.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 6: BackToTop button
   Shows after scrolling 300px, scrolls to top on click.
   ═══════════════════════════════════════════════════════════ */

function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  const onScroll = debounce(() => {
    btn.classList.toggle('is-visible', window.scrollY > 300);
  }, 50);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 7: CopyCodeButton
   Copies the code content to clipboard.
   ═══════════════════════════════════════════════════════════ */

function initCopyCode() {
  $$('[data-action="copy-code"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pre = btn.closest('.code-block')?.querySelector('.code-block__code');
      if (!pre) return;

      try {
        await navigator.clipboard.writeText(pre.innerText);
        showCopied(btn);
      } catch {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = pre.innerText;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied(btn);
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 8: CopyLinkButton
   Copies the current page URL to clipboard.
   ═══════════════════════════════════════════════════════════ */

function initCopyLink() {
  $$('[data-action="copy-link"]').forEach(btn => {
    const original = btn.innerHTML;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      btn.classList.add('is-copied');
      const prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        btn.innerHTML = original;
      }, 2000);
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 9: FeedbackBlock
   ═══════════════════════════════════════════════════════════ */

function initFeedback() {
  $$('.feedback-block').forEach(block => {
    const thanks = $('.feedback-block__thanks', block);

    $$('.feedback-btn', block).forEach(btn => {
      btn.addEventListener('click', () => {
        // Mark selected
        $$('.feedback-btn', block).forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');

        // Show thanks message
        if (thanks) {
          thanks.hidden = false;
          // Log feedback type (placeholder — replace with your analytics/API call)
          const type = btn.dataset.action === 'feedback-yes' ? 'positive' : 'negative';
          console.info('[Feedback]', type, window.location.href);
        }
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 10: SearchOverlay
   Opens/closes the search modal dialog.
   ═══════════════════════════════════════════════════════════ */

function initSearchOverlay() {
  const overlay = $('#search-overlay');
  if (!overlay) return;

  const input = $('input[type="search"]', overlay);
  const closeBtns = $$('[data-action="close-search"]');
  const openBtns  = $$('[data-action="open-search"]');

  function open() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => input?.focus());
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (input) input.value = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtns.forEach(btn => btn.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    // Ctrl+K or Cmd+K to open
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.hidden ? open() : close();
    }
    // Escape to close
    if (e.key === 'Escape' && !overlay.hidden) close();
  });
}


/* ═══════════════════════════════════════════════════════════
   MODULE 11: Smooth Anchor Scroll with navbar offset
   ═══════════════════════════════════════════════════════════ */

function initAnchorScroll() {
  const navHeight = () =>
    parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 56;

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight() - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    // Update URL without jumping
    history.pushState(null, '', `#${id}`);
  });
}


/* ═══════════════════════════════════════════════════════════
   BOOT — Initialize all modules on DOMContentLoaded
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSidebarDrawer();
  initSidebarAccordion();
  initTOCScrollspy();
  initTOCCollapsible();
  initBackToTop();
  initCopyCode();
  initCopyLink();
  initFeedback();
  initSearchOverlay();
  initAnchorScroll();
});

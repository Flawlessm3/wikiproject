import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      // ── Colors via CSS variables ──────────────────────────
      // All values come from globals.css :root / .dark blocks.
      // To change the palette: edit globals.css only.
      colors: {
        bg: {
          base:     'rgb(var(--bg-base) / <alpha-value>)',
          surface:  'rgb(var(--bg-surface) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
          hover:    'rgb(var(--bg-hover) / <alpha-value>)',
          active:   'rgb(var(--bg-active) / <alpha-value>)',
          subtle:   'rgb(var(--bg-subtle) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          subtle:  'rgb(var(--border-subtle) / <alpha-value>)',
          strong:  'rgb(var(--border-strong) / <alpha-value>)',
        },
        text: {
          primary:   'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted:     'rgb(var(--text-muted) / <alpha-value>)',
          disabled:  'rgb(var(--text-disabled) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover:   'rgb(var(--accent-hover) / <alpha-value>)',
          active:  'rgb(var(--accent-active) / <alpha-value>)',
          subtle:  'rgb(var(--accent-subtle) / <alpha-value>)',
          border:  'rgb(var(--accent-border) / <alpha-value>)',
        },
        callout: {
          info:    'rgb(var(--callout-info) / <alpha-value>)',
          tip:     'rgb(var(--callout-tip) / <alpha-value>)',
          warning: 'rgb(var(--callout-warning) / <alpha-value>)',
          danger:  'rgb(var(--callout-danger) / <alpha-value>)',
          note:    'rgb(var(--callout-note) / <alpha-value>)',
        },
      },

      // ── Fonts via CSS variables ───────────────────────────
      // Swap font: change --font-sans / --font-mono in globals.css
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },

      // ── Layout dimensions ─────────────────────────────────
      width: {
        sidebar: '268px',
        toc: '220px',
      },
      maxWidth: {
        content: '748px',
        page: '1440px',
      },
      height: {
        navbar: 'var(--nav-height)',
      },

      // ── Animations ────────────────────────────────────────
      animation: {
        'fade-in':   'fadeIn 150ms ease-in-out',
        'slide-in':  'slideIn 260ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out': 'slideOut 260ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer':   'shimmer 1.6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },

      // ── Typography prose overrides ────────────────────────
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':        'rgb(var(--text-secondary))',
            '--tw-prose-headings':    'rgb(var(--text-primary))',
            '--tw-prose-lead':        'rgb(var(--text-secondary))',
            '--tw-prose-links':       'rgb(var(--accent))',
            '--tw-prose-bold':        'rgb(var(--text-primary))',
            '--tw-prose-counters':    'rgb(var(--text-muted))',
            '--tw-prose-bullets':     'rgb(var(--border-strong))',
            '--tw-prose-hr':          'rgb(var(--border))',
            '--tw-prose-quotes':      'rgb(var(--text-secondary))',
            '--tw-prose-quote-borders': 'rgb(var(--accent-border))',
            '--tw-prose-captions':    'rgb(var(--text-muted))',
            '--tw-prose-code':        'rgb(var(--accent-active))',
            '--tw-prose-pre-code':    'rgb(var(--text-primary))',
            '--tw-prose-pre-bg':      'rgb(var(--bg-subtle))',
            '--tw-prose-th-borders':  'rgb(var(--border))',
            '--tw-prose-td-borders':  'rgb(var(--border-subtle))',
            maxWidth: 'none',
            // Custom element styles
            a: {
              textDecoration: 'underline',
              textDecorationColor: 'rgb(var(--accent-border))',
              textUnderlineOffset: '3px',
              fontWeight: '500',
              transition: 'color 150ms ease',
            },
            'a:hover': {
              color: 'rgb(var(--accent-hover))',
            },
            code: {
              fontWeight: '400',
              borderRadius: '3px',
              padding: '0.1em 0.4em',
              background: 'rgb(var(--bg-elevated))',
              border: '1px solid rgb(var(--border))',
            },
            'code::before': { content: 'none' },
            'code::after':  { content: 'none' },
            pre: {
              background: 'rgb(var(--bg-subtle))',
              border: '1px solid rgb(var(--border))',
              borderRadius: '8px',
            },
            'pre code': {
              background: 'none',
              border: 'none',
              padding: '0',
            },
            h1: { letterSpacing: '-0.02em' },
            h2: { letterSpacing: '-0.02em', scrollMarginTop: '5rem' },
            h3: { letterSpacing: '-0.01em', scrollMarginTop: '5rem' },
            h4: { scrollMarginTop: '5rem' },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: 'rgb(var(--accent-border))',
              background: 'rgb(var(--bg-elevated))',
              borderRadius: '0 8px 8px 0',
              padding: '1rem 1.5rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body':        'rgb(var(--text-secondary))',
            '--tw-prose-headings':    'rgb(var(--text-primary))',
            '--tw-prose-lead':        'rgb(var(--text-secondary))',
            '--tw-prose-links':       'rgb(var(--accent-hover))',
            '--tw-prose-bold':        'rgb(var(--text-primary))',
            '--tw-prose-counters':    'rgb(var(--text-muted))',
            '--tw-prose-bullets':     'rgb(var(--border-strong))',
            '--tw-prose-hr':          'rgb(var(--border))',
            '--tw-prose-quotes':      'rgb(var(--text-secondary))',
            '--tw-prose-quote-borders': 'rgb(var(--accent-border))',
            '--tw-prose-captions':    'rgb(var(--text-muted))',
            '--tw-prose-code':        'rgb(var(--accent-active))',
            '--tw-prose-pre-code':    'rgb(var(--text-primary))',
            '--tw-prose-pre-bg':      'rgb(var(--bg-subtle))',
            '--tw-prose-th-borders':  'rgb(var(--border))',
            '--tw-prose-td-borders':  'rgb(var(--border-subtle))',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

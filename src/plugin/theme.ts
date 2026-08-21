import type { Config } from 'tailwindcss';

export const theme: Config['theme'] = {
  fontFamily: {
    sans: [
      '"DM Sans"',
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ],
    serif: [
      'Vollkorn',
      'ui-serif',
      'Georgia',
      'Cambria',
      '"Times New Roman"',
      'Times',
      'serif',
    ],
    mono: [
      '"IBM Plex Mono"',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ],
  },
  extend: {
    colors: {
      primary: {
        '50': '#eff8ff',
        '100': '#daeffe',
        '200': '#b0d9fd',
        '300': '#58a6ff',
        '400': '#3d9afa',
        '500': '#1281f9',
        '600': '#0969da',
        '700': '#0752ae',
        '800': '#073e82',
        '900': '#062d5e',
        '950': '#041c3b',
      },
      info: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
      },
      warning: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      neutral: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
    fontSize: {
      // Headings - Primary
      'h1-sans': [
        '2.25rem',
        {
          lineHeight: '1.112',
          fontWeight: '800',
          letterSpacing: '0.008em',
        },
      ],
      'h1-sans-desktop': [
        '3rem',
        {
          lineHeight: '1.112',
          fontWeight: '800',
          letterSpacing: '0.004em',
        },
      ],
      'h2-sans': [
        '1.5rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'h2-sans-desktop': [
        '1.75rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.008em',
        },
      ],
      'h3-sans': [
        '1.25rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'h4-sans': [
        '1.125rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'h5-sans': [
        '1rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'h6-sans': [
        '0.875rem',
        {
          lineHeight: '1.112',
          fontWeight: '600',
          letterSpacing: '0.024em',
        },
      ],
      // Headings - Secondary
      'h1-serif': [
        '2.25rem',
        {
          lineHeight: '1.112',
          fontWeight: '500',
          letterSpacing: '0.008em',
        },
      ],
      'h1-serif-desktop': [
        '3rem',
        {
          lineHeight: '1.112',
          fontWeight: '500',
          letterSpacing: '0.004em',
        },
      ],
      'h2-serif': [
        '1.5rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.008em',
        },
      ],
      'h2-serif-desktop': [
        '1.75rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.008em',
        },
      ],
      'h3-serif': [
        '1.25rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.012em',
        },
      ],
      'h4-serif': [
        '1.125rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.012em',
        },
      ],
      'h5-serif': [
        '1rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.012em',
        },
      ],
      'h6-serif': [
        '0.875rem',
        {
          lineHeight: '1.112',
          fontWeight: '700',
          letterSpacing: '0.024em',
        },
      ],
      // Body styles
      'body-md-primary': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: '400',
          letterSpacing: '0.012em',
        },
      ],
      'body-md-primary-bold': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'body-md-secondary': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: '400',
          letterSpacing: '0.008em',
        },
      ],
      'body-md-secondary-bold': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: '600',
          letterSpacing: '0.008em',
        },
      ],
      'body-sm-primary': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: '400',
          letterSpacing: '0.012em',
        },
      ],
      'body-sm-primary-bold': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: '600',
          letterSpacing: '0.012em',
        },
      ],
      'body-sm-secondary': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: '400',
          letterSpacing: '0.008em',
        },
      ],
      'body-sm-secondary-bold': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: '600',
          letterSpacing: '0.008em',
        },
      ],
      // Button and other styles
      button: [
        '0.875rem',
        {
          lineHeight: '1.2',
          fontWeight: '600',
          letterSpacing: '0.024em',
        },
      ],
      caption: [
        '0.75rem',
        {
          lineHeight: '1.2',
          fontWeight: '400',
          letterSpacing: '0.024em',
        },
      ],
      label: [
        '1rem',
        {
          lineHeight: '1.2',
          fontWeight: '600',
          letterSpacing: '0.024em',
        },
      ],
      // Code styles
      'code-sm': [
        '0.75rem',
        {
          lineHeight: '1.6',
          fontWeight: '400',
          letterSpacing: '0',
        },
      ],
      'code-md': [
        '0.875rem',
        {
          lineHeight: '1.6',
          fontWeight: '400',
          letterSpacing: '0',
        },
      ],
    },
    borderRadius: {
      input: '0.375rem',
      tag: '0.375rem',
    },
    opacity: {
      disabled: '0.4',
    },
    ringWidth: {
      DEFAULT: '3px',
    },
    ringOffsetWidth: {
      DEFAULT: '0px',
    },
    ringOffsetColor: {
      DEFAULT: 'transparent',
    },
    ringColor: {
      DEFAULT: 'rgba(9, 105, 218, .6)', // primary-600/60
    },
  },
};

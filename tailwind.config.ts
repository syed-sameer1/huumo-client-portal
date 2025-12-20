import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A',
      },
      colors: {
        background: {
          secondary: {
            DEFAULT: 'hsl(var(--background-secondary))',
          },
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        foreground: {
          DEFAULT: 'var(--foreground-default)',
        },
      },
    },
  },
};

export default config;

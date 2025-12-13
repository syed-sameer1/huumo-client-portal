import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
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
      },
    },
  },
};

export default config;

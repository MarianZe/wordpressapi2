import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        fg: {
          1: 'var(--fg-1)',
          2: 'var(--fg-2)',
          3: 'var(--fg-3)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          fg: 'var(--accent-fg)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        border: 'var(--border)',
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

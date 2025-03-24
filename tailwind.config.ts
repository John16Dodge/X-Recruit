
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                
                // Custom colors for X-Recruit
                xr: {
                    'blue': '#0052CC',
                    'blue-light': '#4C9AFF',
                    'blue-dark': '#0747A6',
                    'teal': '#00B8D9',
                    'teal-light': '#79E2F2',
                    'purple': '#6554C0',
                    'purple-light': '#998DD9',
                    'gray-dark': '#172B4D',
                    'gray': '#505F79',
                    'gray-light': '#F4F5F7',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(10px)' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' }
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'slide-in-bottom': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.4s ease-out',
                'fade-in-slow': 'fade-in 0.6s ease-out',
                'fade-in-slower': 'fade-in 0.8s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'slide-in-right': 'slide-in-right 0.5s ease-out',
                'slide-in-left': 'slide-in-left 0.5s ease-out',
                'slide-in-bottom': 'slide-in-bottom 0.5s ease-out'
			},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-pattern': 'url("/src/assets/grid-pattern.svg")',
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                'button': '0 4px 6px -1px rgba(0, 82, 204, 0.1), 0 2px 4px -1px rgba(0, 82, 204, 0.06)',
                'button-hover': '0 10px 15px -3px rgba(0, 82, 204, 0.2), 0 4px 6px -2px rgba(0, 82, 204, 0.1)',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

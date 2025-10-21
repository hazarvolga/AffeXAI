"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const design_tokens_1 = require("./src/lib/design-tokens");
exports.default = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/emails/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // Optimize CSS generation
    future: {
        hoverOnlyWhenSupported: true, // Only apply hover styles when supported
    },
    // Remove unused CSS in production
    safelist: [
        // Keep critical utility classes that might be dynamically generated
        'bg-primary',
        'bg-secondary',
        'bg-success',
        'bg-warning',
        'bg-info',
        'bg-destructive',
        'text-primary',
        'text-secondary',
        'text-success',
        'text-warning',
        'text-info',
        'text-destructive',
        // Chart colors
        'fill-chart-1',
        'fill-chart-2',
        'fill-chart-3',
        'fill-chart-4',
        'fill-chart-5',
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ['var(--font-inter)', ...design_tokens_1.typography.fontFamily.sans],
                headline: ['var(--font-inter)', ...design_tokens_1.typography.fontFamily.sans],
                code: design_tokens_1.typography.fontFamily.mono,
                sans: ['var(--font-inter)', ...design_tokens_1.typography.fontFamily.sans],
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    ...design_tokens_1.colors.primary,
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    ...design_tokens_1.colors.primary,
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    ...design_tokens_1.colors.neutral,
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    ...design_tokens_1.colors.primary,
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    ...design_tokens_1.colors.error,
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
            },
            borderRadius: {
                ...design_tokens_1.borderRadius,
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            spacing: {
                ...design_tokens_1.spacing,
            },
            fontSize: {
                ...design_tokens_1.typography.fontSize,
            },
            fontWeight: {
                ...design_tokens_1.typography.fontWeight,
            },
            lineHeight: {
                ...design_tokens_1.typography.lineHeight,
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                wave: {
                    '0%': {
                        transform: 'translateX(-100%)',
                    },
                    '50%': {
                        transform: 'translateX(100%)',
                    },
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                wave: 'wave 1.5s linear infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
//# sourceMappingURL=tailwind.config.js.map
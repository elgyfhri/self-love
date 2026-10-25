import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"','Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                serene: {
                    bg: '#f7f9fb',
                    primary: '#006a45',
                    'primary-hover': '#005234',
                    secondary: '#caead7',
                    'on-secondary': '#4e6b5c',
                    text: '#191c1e',
                    muted: '#6e7a71',
                    container: '#eceef0',
                },
                brand: {
                    DEFAULT: '#128c5e',
                    light: '#2ecc71',
                    dark: '#0e6b48',
                    surface: '#f3fbf7',
                },
            },
            boxShadow: {
                ambient: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            },
        },
    },

    plugins: [forms],
};

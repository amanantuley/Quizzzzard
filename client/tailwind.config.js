/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#667eea",
                secondary: "#764ba2",
                // Custom gradients defined in CSS often, but we can add utility helpers if needed
            },
        },
    },
    plugins: [],
}

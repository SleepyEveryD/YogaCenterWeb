/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                color1: "#006A71",
                color2: "#48A6A7",
                color3: "#9ACBD0",
                color4: "#FFFFFF",
            }
        },
        fontFamily: {
            Montserrat: ["Montserrat", "sans-serif"],
        },
        container: {
            center: true,
            padding: "2rem",
        }
    },
}



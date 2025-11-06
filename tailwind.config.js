 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
     extend: {
       colors: {
         primary: {
           DEFAULT: '#AD4728',
           light: '#FCA65E',
           lighter: '#FD9139',
         },
         orange: {
           DEFAULT: '#FD9139',
           light: '#FCA65E',
           dark: '#D4461C',
         },
       },
     },
   },
   plugins: [],
 }
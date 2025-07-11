module.exports = {
  content: [
    "./views/**/*.{html}"
  ],
    theme: {    
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
                accent: '#657786',
                background: '#E1E8ED',
                text: '#14171A',
            },
            fontFamily: {
                sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
        },
    },
    plugins: []
};
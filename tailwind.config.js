module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        container: '240px',
        logo: '175px',
        logosm: '225px',
      },
      maxWidth: {
        mintablename: '250px',
        headersmall: '250px',
      },
      minWidth: {
        mincontainer: '1000px',
        mincontainersm: '740px',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
};

/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: { max: '480px' },
        '3xl': '1792px',
        '4xl': '2048px',
      },
      colors: {
        primary: '#F1803E',
        silver: '#C4C4C4',
        tundora: '#4C4C4C',
        scorpion: '#5F5F5F',
        tuscany: '#CD6C34',
        mine: '#333333',
        input: '#EDEDED',
        alabaster: '#F7F7F7',
        codGray: '#191919',
        shipGray: '#3C3B40',
        grayLight: '#EEEEEE',
        mystic: '#e1e5ee',
        breadcrumb: '#16a085',
        orangefocus: '#5baa00',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '4.5xl': '2.5rem',
      },
      backgroundColor: {
        banner: '#F1F1F1',
        'h-review': '#F6F2F2',
      },
      backgroundImage: {
        'btn-border':
          'linear-gradient(45deg, rgba(229, 183, 97, 0.5), rgba(229, 183, 97, 1)), linear-gradient(rgba(248, 228, 142, 1), rgba(229, 183, 97, 1))',
        btn: 'linear-gradient(90deg, #E5B761 2.65%, #F8E48E 100%)',
        'slide-5': 'linear-gradient(90.21deg, #DF569B 0.17%, #5982E2 99.07%)',
      },
      boxShadow: {
        '4x': '0 0 5px 2px rgba(0, 0, 0, 0.1)',
        drop: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'cart-popup':
          '5px 0px 4px -4px rgba(99, 69, 69, 0.2), 3px 0px 20px 0 rgba(0, 0, 0, 0.19)',
        emailPopup: '1px 1px 3px 0px rgb(2 2 2 / 31%)',
        emailInput: 'rgba(0,0,0,.0980392)0 1px',
      },
      textShadow: {
        slide: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        inner: '2px 2px 3px rgba(0, 0, 0, 0.25)',
      },
      borderWidth: {
        3: '3px',
      },
      padding: {
        22: '5.5rem',
      },
      height: {
        15: '3.75rem',
        23: '5.625rem',
      },
      width: {
        15: '3.75rem',
        23: '5.625rem',
      },
      maxWidth: {
        97: '25rem',
      },
      translate: {
        13: '3.125rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      transitionProperty: {
        width: 'width',
        maxHeight: 'max-height',
      },
      transitionDuration: {
        400: '400ms',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h1: {
              fontSize: '40px',
              lineHeight: '40px',
              fontWeight: 800,
              marginBottom: '2%',
            },
            h3: {
              fontSize: '28px',
              lineHeight: '32px',
              fontWeight: 700,
              marginTop: '10px',
              marginBottom: '10px',
            },
            p: {
              margin: '0px 0px 24px',
            },
            strong: {
              fontWeight: 700,
            },
            a: {
              color: '#F1803E',
              lineHeight: '24px',
              fontWeight: 400,
              textDecoration: 'none',
              borderBottom: '2px solid #eee',
              '&:hover': {
                borderBottom: '2px solid #F1803E',
              },
            },
            div: {
              fontSize: '16px',
              lineHeight: '30px',
              strong: {
                fontSize: '18px',
                // display: 'block',
              },
              ul: {
                li: {
                  fontSize: '16px',
                  strong: {
                    fontSize: '16px',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/typography')({
      className: 'entry-content',
    }),
  ],
};

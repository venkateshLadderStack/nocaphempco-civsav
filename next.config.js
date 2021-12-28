/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      'nocaphempco.com',
      'i2.wp.com',
      'wordpress-700791-2317305.cloudwaysapps.com',
      'images.unsplash.com',
    ],
    // disableStaticImages: true,
  },
  eslint: {
    dirs: ['src'],
  },
  env: {
    API_URL: process.env.API_URL,
    INSTGRAM_TOKEN: process.env.INSTGRAM_TOKEN,
    WOO_CONSUMER_KEY: process.env.WOO_CONSUMER_KEY,
    WOO_CONSUMER_SECRET: process.env.WOO_CONSUMER_SECRET,
    CART_SECRET_KEY: process.env.CART_SECRET_KEY,
  },
};

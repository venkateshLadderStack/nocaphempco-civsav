/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      'nocaphempco.com',
      'i2.wp.com',
      'wordpress-700791-2317305.cloudwaysapps.com',
    ],
    // disableStaticImages: true,
  },
  eslint: {
    dirs: ['src'],
  },
  env: {
    API_URL: process.env.API_URL,
    WOO_CONSUMER_KEY: process.env.WOO_CONSUMER_KEY,
    WOO_CONSUMER_SECRET: process.env.WOO_CONSUMER_SECRET,
  },
};

const config = {};

if (ENVIRONMENT === 'production') {
  config.url = './bookmark/prod/'; // DIRECTORY PATH WHERE YOUR PROD ASSETS ARE HOSTED example: 'https://MY-AWESOME-SITE.com/public/prod/'
} else if (ENVIRONMENT === 'staging') {
  config.url = './bookmark/stag/';
} else {
  config.url = '/dist/';
}

export default config;

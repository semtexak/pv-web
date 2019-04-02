const protocol = 'https';
const hostname = 'payvont.com';

export const environment = {
  production: true,
  API_URL: `${protocol}://${hostname}:8765`,
  PLUGIN_URL: `${protocol}://${hostname}/assets/plugin/dist/js/bundle.js`,
  grantType: 'password',
  clientId: 'test',
  clientSecret: 'secret',
  autoLogin: true
};

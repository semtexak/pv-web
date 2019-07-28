const protocol = 'http';
const hostname = 'payvont.com';

export const environment = {
  production: true,
  hostname: hostname,
  socialStatus: {
    facebook: false
  },
  basePluginImagePath: `${protocol}://${hostname}`,
  API_URL: `${protocol}://${hostname}:8765`,
  PLUGIN_URL: `${protocol}://${hostname}/assets/plugin/dist/js/bundle.js`,
  grantType: 'password',
  clientId: 'test',
  clientSecret: 'secret',
  autoLogin: false,
  autoLoginOnActivation: true,
  activationRequired: false
};

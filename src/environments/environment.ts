const protocol = 'http';
const hostname = 'localhost';
const pluginHostname = hostname;
const pluginPort = '8080';

export const environment = {
  production: false,
  basePluginImagePath: `${protocol}://${hostname}:4200`,
  hostname: hostname,
  socialStatus: {
    facebook: true
  },
  API_URL: `${protocol}://${hostname}:8765`,
  PLUGIN_URL: `${protocol}://${pluginHostname}:${pluginPort}/js/bundle.js`,
  grantType: 'password',
  clientId: 'test',
  clientSecret: 'secret',
  autoLogin: false,
  autoLoginOnActivation: true,
  activationRequired: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

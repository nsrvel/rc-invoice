import helmet, { HelmetOptions } from 'helmet';

function middleware() {
  const options: HelmetOptions = {
    // contentSecurityPolicy: !envDev.includes(config.env)
    //   ? {
    //       directives: {
    //         'script-src': ["'self'", 'jsreport.net']
    //       }
    //     }
    //   : false
  };

  return helmet(options);
}

export default middleware;

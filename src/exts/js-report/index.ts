import jsReport from 'jsreport';

import config from './config';

const jsReportInstance = jsReport({
  ...config,
  extensions: {
    ...config.extensions,
    // express: { app: reportingApp, server: server }
    express: { enabled: false },
    studio: { enabled: false }
  }
});

jsReportInstance.init();

export function jsReportClient() {
  return jsReportInstance;
}

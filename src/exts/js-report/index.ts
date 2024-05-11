import jsReport from 'jsreport';
import fetch from 'node-fetch';

import config from './config';
import env from '../../config/config';
import logger from '../../utils/logger';

import { btoa } from '../../utils/common';

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

export function jsReportCloud() {
  if (!env.jsReportCloudBaseUrl || !env.jsReportCloudUsername || !env.jsReportCloudPassword) {
    return {
      render() {
        logger.error('missing js-report cloud credential');
      }
    };
  }

  const token = btoa(`${env.jsReportCloudUsername}:${env.jsReportCloudPassword}`);

  return {
    async render(data: jsReport.Request) {
      const response = await fetch(`${env.jsReportCloudBaseUrl}/api/report`, {
        method: 'POST',
        headers: { Authorization: `Basic ${token}` },
        body: JSON.stringify(data)
      });

      return response;
    }
  };
}

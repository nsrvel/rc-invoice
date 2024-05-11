import jsReport from 'jsreport-client';
import config from './config/config';

const client = jsReport(
  config.jsReportCloudBaseUrl,
  config.jsReportCloudUsername,
  config.jsReportCloudPassword
);

export default client;

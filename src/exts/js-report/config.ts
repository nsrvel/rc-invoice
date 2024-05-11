import path from 'path';
import env from '../../config/config';

const rootPath = path.resolve(__dirname);

export const config = {
  store: {
    provider: 'fs'
  },
  blobStorage: {
    provider: 'fs'
  },
  logger: {
    console: {
      transport: 'console',
      level: 'debug'
    },
    file: {
      transport: 'console',
      level: 'off'
    },
    // file: {
    //   transport: 'file',
    //   level: 'info',
    //   filename: `${rootPath}/store/logs/reporter.log`
    // },
    error: {
      transport: 'file',
      level: 'error',
      filename: `${rootPath}/store/logs/error.log`
    }
  },
  trustUserCode: true,
  reportTimeout: 60000,
  workers: {
    numberOfWorkers: 2
  },
  extensions: {
    authentication: {
      cookieSession: {
        secret: env.jsReportCookieSeshSecret
      },
      admin: {
        username: env.jsReportUsername,
        password: env.jsReportPassword
      },
      enabled: true
    },
    'fs-store': { dataDirectory: `${rootPath + env.jsReportFs}` }
    // 'sample-template': { createSamples: true }
  }
} as any;

export default config;

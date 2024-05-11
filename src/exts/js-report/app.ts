import logger from '../../utils/logger';
import JsReport from 'jsreport';
import config from './config';

const port = 9000;

JsReport({ ...config, httpPort: port })
  .init()
  .then(() => {
    logger.info('js-report initialized and running on port: ' + port);
  })
  .catch((err) => {
    logger.error(err);
  });

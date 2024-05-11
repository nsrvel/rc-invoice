import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

import config from './config/config';
import morgan from './utils/morgan';
import helmet from './middlewares/helmet';
import xss from './middlewares/xss';
import { error404, errorConverter, errorHandler } from './middlewares/error';
import rc1001 from './invoice/rc1001/rc1001.route';

const app = express();

// serve static files from react
app.use(express.static(path.join(__dirname, config.clientOutDir)));

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (_req, res) => {
  try {
    res.sendFile(path.join(__dirname, './public/home.html'));
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
});
//
// v1 api routes
app.use(rc1001);

// swagger

// send back a 404 error for any unknown api request
error404(app, path.join(__dirname, `${config.clientOutDir}/index.html`));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;

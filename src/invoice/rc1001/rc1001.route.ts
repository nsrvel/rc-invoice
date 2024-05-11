import express from 'express';
// import validate from '../../middlewares/validate';
// import validation from './rc1001.validation';
import controller from './rc1001.controller';

const router = express.Router();

router.route('/api/invoice/rc1001').post(controller);

export default router;

import auth from './auth';

const router = require('express').Router();

router.use('/auth', auth);

export default router;

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashboardRoutes');
const errRoutes = require('./errRoutes');

router.use('/', homeRoutes);
router.use('/dash', dashRoutes);
router.use('/api', apiRoutes);
router.use('*', errRoutes);

module.exports = router;
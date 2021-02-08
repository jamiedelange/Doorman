const router = require('express').Router();
const withAuth = require('../utils/auth');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const loginRoutes = require('./login-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//router.use('/login', loginRoutes);

router.use((req, res) => {
  res.status(404).end();
});
  
module.exports = router;
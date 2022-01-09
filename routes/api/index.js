const router = require('express').Router();

const Users = require('./UserRoutes');
const Thoughts = require('./ThoughtRoutes');

router.use('/ThoughtRoutes', Thoughts);
router.use('/UserRoutes', Users);

module.exports = router;

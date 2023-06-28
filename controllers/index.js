const router = require("express").Router();

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const blogRoutes = require('./blogRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('blogs', blogRoutes)

module.exports = router
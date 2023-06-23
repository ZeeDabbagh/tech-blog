const router = require("express").Router();

const blogRoutes = require('./blogRoutes')
const userRoutes = require('./userRoute')
const commentRoutes = require ('./commentRoutes')

router.use('/users', userRoutes)
router.use('/blogs', blogRoutes)
router.use('/comments', commentRoutes);


module.exports=router;
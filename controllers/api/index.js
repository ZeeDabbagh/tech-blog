const router = require("express").Router();

blogRoutes = require('./blogPostRoute')
userRoutes = require('./userRoute')
commentRoutes = require('./commentRoute')

router.use('/dashboard', blogRoutes);
// router.use('/users', userRoutes)
// router.user('/blog', commentRoutes)

module.exports=router;
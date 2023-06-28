const router = require('express').Router();
const {Blog} = require('../models');
const withAuth = require('../utils/auth');

// GET /dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        where: {user_id: req.session.user_id},
        order:[['blog_date', 'ASC']]
      });
  
      const userBlogs = blogData.map((blog) => blog.get({plain: true}))

      res.render('dashboard', {logged_in: req.session.logged_in, userBlogs})
  
  
    } catch(err) {
      console.log(err)
      res.status(500).json(err)
    }
  })

  module.exports = router
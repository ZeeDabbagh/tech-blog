const router = require('express').Router();
const {Blog, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try{
      const blogData = await Blog.findAll({
          include:[{model: User, attributes:'name'}],
          order:[['blog_date', 'ASC']]
      });
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render('homepage', {blogs})
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  } 
})

router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router
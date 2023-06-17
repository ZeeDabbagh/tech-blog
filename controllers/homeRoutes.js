const router = require('express').Router();
const { truncate } = require('graceful-fs');
const {Blog, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');


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

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            include: [{model: Blog}, {model: User, attributes:'name'}],
            order:[['blog_date', 'ASC']]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
})

module.exports = router
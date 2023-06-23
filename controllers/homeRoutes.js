const router = require('express').Router();
const {Blog, User} = require('../models');
const withAuth = require('../utils/auth');


// GET /
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
// GET /dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {id: req.session.userId},
      include: [{model: User, attributes: 'name'}],
      order:[['blog_date', 'ASC']]
    });

    const userBlogs = blogData.map((blog) => blog.get({plain: true}))

    res.render('dashboard', {
      loggedIn: req.session.loggedIn
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
  // TODO: Check if user is logged in
  // If not logged in, kick them out to either / or /login
  // loggedIn
  // try{
  //     const blogData = await Blog.findAll({
  //       where: {id: req.session.userId},
  //       include:[{model: User, attributes:'name'}],
  //       order:[['blog_date', 'ASC']]
  //     });
  //     const myBlogs = blogData.map((blog) => blog.get({ plain: true }));
  //     res.render('dashboard', {myBlogs})
  // } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  // } 
})

// GET /blogs/:blogId
router.get('/blogs/:blogId', withAuth, async (req, res) => {
  // TODO: Check if user is logged in
  // If not logged in, kick them out to either / or /login

  try{
      const blogData = await Blog.findByPk( req.params.id, {
        include:[{model: User, attributes:'name'}],
        order:[['blog_date', 'ASC']]
      });
      const myBlogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        myBlogs})
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  } 
})

// router.get('/', async (req, res) => {
//   res.render('homepage');
// });

// GET /login
// Shows login form at Login.handlebars
router.get('/login', (req, res) => {
  // But if already logged in, dont show login form
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

// GET /register
// Shows signup form at Signup.handlebars
router.get('/register', (req, res) => {
  // But if already logged in, dont show signup form
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router
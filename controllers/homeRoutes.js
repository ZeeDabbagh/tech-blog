const router = require('express').Router();
const {Blog, User, Comment} = require('../models');
const withAuth = require('../utils/auth');


// GET /
router.get('/', async (req, res) => {


  try{
      //const blogData = await Blog.findAll({})

      const blogData = await Blog.findAll({
        include: [
          {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ["id", "comment_text"],
          include:{
            model:User, 
            attributes:["name"],
          }
        }
      ],

      attributes: [
        'id','title','blog_text',"blog_date"
      ]
      })

      const blogs = blogData.map((blog) => blog.get({ plain: true }))
      console.log(blogs)

      // res.json(blogs);

      res.render('homepage', {blogs, loggedIn: req.session.logged_in})
      //res.render('homepage')
      //res.send(compiledHandlebarsIntoHTML)
  } catch (err) {
  }
})


// GET /dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {id: req.session.user_id},
      order:[['blog_date', 'ASC']]
    });

    const userBlogs = blogData.map((blog) => blog.get({plain: true}))

    res.render('dashboard', {
      loggedIn: req.session.logged_in,
      userBlogs
    })
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// GET /blogs/:blogId
router.get('/blogs/:id', withAuth, async (req, res) => {

  try{
      const blogData = await Blog.findByPk( req.params.id, {
        include:[
          {model: User, attributes:'name'},
        {
          model: Comment,
          attributes: ['comment_text', 'comment_date'],
          include: {model: User, attributes: ['name']}
        }],
        order:[['blog_date', 'ASC']]
      });
      const myBlogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render('dashboard', {
        loggedIn: req.session.logged_in,
        myBlogs})
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  } 
})

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
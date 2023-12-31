const router = require('express').Router();
const {Blog, User, Comment} = require('../models');
const withAuth = require('../utils/auth');


// GET /
router.get('/', async (req, res) => {


  try{
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


      res.render('homepage', {blogs, logged_in: req.session.logged_in})

  } catch (err) {
  }
})


// GET /login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

// GET /register
router.get('/register', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router
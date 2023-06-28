const router = require('express').Router()
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Get one blog

router.get('/:blog_id', withAuth, async (req, res) => {

    try{
        const blogData = await Blog.findByPk( req.params.blog_id, {
          include:[
            {model: User, attributes:'name'},
          {
            model: Comment,
            attributes: ['comment_text', 'comment_date'],
            include: {model: User, attributes: ['name']}
          }],
        });

        const blog = blogData.get({plain: true})
        const canEdit = req.session.user_id === blog.user_id
        res.render('blog', {blog, logged_in: req.session.logged_in, canEdit})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
  })

module.exports = router
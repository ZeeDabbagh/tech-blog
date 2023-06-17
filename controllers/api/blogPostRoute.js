const express = require("express");
const router = express.Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require("../utils/auth");

//get by ID
router.get('/:id', withAuth, async (req, res) => {
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include:[{model: User, attributes:'name'}, {model: Comment, foreignKey: 'blog_id'}],
        })

        if (!blogData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        const blog = blogData.get({ plain: true });

        res.render('blog', {loggedIN: req.session.logged_in, blog})
    } catch (err) {
        console.log('error')
        res.redirect('/')
        res.status(500).json(err)
    }
})

//post

router.post('/dashboard', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            blog_text: req.body.blog_text
        })

        res.status(201).json(newBlog)
        
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
})

//update by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            const { title, blog_text } = req.body
            await blog.update({
                title,
                blog_text
            })
            res.json(blog)
        } else {
            res.status(404).json({message: 'Blog post not found'})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
})

//delete by ID

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deletedPost = await Blog.destroy({where:{id: req.params.id}})
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
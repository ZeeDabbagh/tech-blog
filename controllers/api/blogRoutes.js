const router = require('express').Router()
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Post new blog
router.post('/', withAuth, async (req, res) => {
    
    try {
        const newBlog = await Blog.create(req.body)
        console.log(newBlog)
        res.status(201).json(newBlog)
        
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
})

//Update a blog

router.put('/:blog_id', withAuth, async (req, res) => {
    try {

        const blog = await Blog.update({
            title: req.body.title, 
            blog_text: req.body.blog_text
        },
        {
            where:{ id: req.params.blog_id},
        })

        if(blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({message:'No such blog exists.'});
        }

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Delete blog

router.delete('/:blog_id', withAuth, async (req, res) => {
    try{
        const deleteBlog = await Blog.destroy({
            where:
            {
                id: req.params.blog_id,
            }
        })

        if (deleteBlog) {
            res.status(200).json({message: 'Blog deleted', info:deleteBlog})
        } else {
            res.status(404).json({message: 'No such blog found'})
        }
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//Create new comment
router.post('/:blog_id/comments', withAuth, async (req, res) =>{
    try {

        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            blog_id: req.params.blog_id
        })
        res.status(200).json(comment)

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});




module.exports = router
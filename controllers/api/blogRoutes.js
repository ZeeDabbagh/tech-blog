const router = require('express').Router()
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// //get by ID
// router.get('/:id', withAuth, async (req, res) => {
//     try{
//         const blogData = await Blog.findByPk(req.params.id, {
//             include:[{model: User, attributes:'name'}, {model: Comment, foreignKey: 'blog_id'}],
//         })

//         if (!blogData) {
//             res.status(404).json({ message: 'No post found' });
//             return;
//         }
//         const blog = blogData.get({ plain: true });

//         res.render('blog', {loggedIN: req.session.logged_in, blog})
//     } catch (err) {
//         console.log('error')
//         res.redirect('/')
//         res.status(500).json(err)
//     }
// })

//post

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            blog_text: req.body.blog_text,
            userId: req.session.userId
        })
        console.log(newBlog)
        res.status(201).json(newBlog)
        
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// //Get form to edit blog
// router.get('/:id/edit', withAuth, async (req, res) => {
//     try {
//         const blog = await Blog.findByPk(req.params.id)

//         if (blog) {
//             res.render('edit-blog', {blog})
//         } else {
//             res.status(404).json({message: 'Blog not found'})
//         }
    
//     } catch(err){
//         console.log(err)
//         res.status(500).json(err);
//     }
// })

//Update a blog

router.put('/:id', withAuth, async (req, res) => {
    try {

        const blog = await Blog.update({
            title: req.body.title, 
            blog_text: req.body.blog_text
        },
        {
            where:{ id: req.params.id, userId: req.session.userId},
        })

        if(blog) {
            res.json(blog)
        } else {
            res.status(404).json({message:'No such blog exists.'});
        }

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


        // if (blog) {
        //     const { title, blog_text } = req.body
        //     await blog.update({
        //         title,
        //         blog_text
        //     })
        //     res.json(blog)
        // } else {
        //     res.status(404).json({message: 'Blog post not found'})
        // }


//delete by ID

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deleteBlog = await Blog.destroy({
            where:
            {
                id: req.params.id,
                userId: req.session.userId
            }
        })

        if (deleteBlog) {
            res.status(200).json({message: 'Blog deleted'})
        } else {
            res.status(404).json({message: 'No such blog found'})
        }
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
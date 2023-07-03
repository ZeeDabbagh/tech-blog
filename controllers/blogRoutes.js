const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//Get one blog

router.get("/:blog_id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.blog_id, {
      include: [
      {
      model: User,
      attributes: ['name']
    },
    {
      model: Comment,
      attributes: ["id", "comment_text", "comment_date"],
      include:{
        model:User, 
        attributes:["name"],
      }
    }
  ],

  attributes: [
    'id','title','blog_text',"blog_date"
  ]
  });

    //const blog = blogData.get({ plain: true });
    console.log("******* cl *******")
    console.log(blogData.comments.length)
    console.log("******* cd *******")
    console.log(blogData.comments[0].comment_date)


    const blog = blogData.toJSON();
    const canEdit = req.session.user_id === blog.user_id;

    console.log({blog, logged_in: req.session.logged_in, canEdit})
    res.render("blog", { blog, logged_in: req.session.logged_in, canEdit });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

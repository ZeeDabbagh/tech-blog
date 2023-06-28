const router = require('express').Router()
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

const withAuth000 = (req,res,next)=>{
    next();
}
//Update existing comment

router.put('/:comment_id', withAuth000, async (req, res) => {
    try {
        const comment = await Comment.update({comment_text: req.body.comment_text},
            {
            where:  {
                id: req.params.comment_id,
                }
            })

            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: 'No comment found with this ID'})
            }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})


router.delete('/:comment_id', withAuth000, async (req, res) => {
    try {
      let blogUserId
      let commentUserId
  
      const aComment = await Comment.findOne({
        where: {
          id: req.params.comment_id,
        },
      });
  
      if (aComment) {
        const commentUserId = aComment.user_id;
        const blogId = aComment.blog_id;
  
        const blog = await Blog.findOne({
          where: {
            id: blogId,
          },
        });
  
        if (blog) {
          blogUserId = blog.user_id;
        }
      }
  
      if (
        req.session.user_id &&
        (req.session.user_id === commentUserId || req.session.user_id === blogUserId)
      ) {
        const comment = await Comment.destroy({
          where: {
            id: req.params.comment_id,
            user_id: req.session.user_id,
          },
        });
  
        if (comment) {
          res.status(200).json({ message: 'Comment deleted' });
        } else {
          res.status(404).json({ message: 'No comment found with this ID' });
        }
      } else {
        res
          .status(403)
          .json({ message: 'Unauthorized. You are neither comment author nor blog author' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//-----------OG CODE STARTS ----------------//  

//Delete comment

// router.delete('/:comment_id', withAuth000, async (req, res) => {
//     try {


        // const comment = await Comment.destroy({
        //     where: {
        //         id: req.params.comment_id, 
        //         user_id: req.session.user_id
        //     }
        // })

        // if (comment) {
        //     res.status(200).json({message: 'Comment deleted'})
        // } else {
        //     res.status(404).json({message: 'No comment found with this ID'})
        // }


//     } catch(err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

//------------ OG CODE ENDS --------------- //
module.exports = router
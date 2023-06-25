const router = require('express').Router()
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Update existing comment

router.put('/comments/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.update({comment_text: req.body.comment_text},
            {
            where:  {
                id: req.params.id,
                userId: req.session.user_id
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


//Delete comment

router.delete('/comments/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.user_id
            }
        })

        if (comment) {
            res.status(200).json({message: 'Comment deleted'})
        } else {
            res.status(404).json({message: 'No comment found with this ID'})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router
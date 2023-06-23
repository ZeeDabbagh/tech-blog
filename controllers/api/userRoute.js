const router = require('express').Router()
const { User } = require('../../models')

//create new user

router.post('/', async (req, res) => {
    try {

        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.userId = userData.id
            req.session.loggedIn = true

            res.status(200).json(userData)
        })

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//login

router.post('/login', async (req, res) => {
    try {

        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return
        }

        const validPassword = await userData.checkPassowrd(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return
        }
        req.session.save(() => {
            req.session.userId = userData.id
            req.session.loggedIn = true
            
            console.log(req.session)

            res.render('homepage', 
            {
                user: userData,
                message: 'You are logged in!',
                loggedIn: req.session.loggedIn
            })
        })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//logout

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router
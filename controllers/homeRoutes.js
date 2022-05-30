const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    try {
        Post.findAll({
            attributes: ['id', 'title', 'body', 'date'],
            order: [['date', 'DESC']],
            mapToModel: true,
            model: Post,
            include: [{
                model: Comment,
                attributes: ['id', 'commentBody', 'postId', 'userId', 'date'],
                include: {
                    model: User,
                    attributes: ['name']
                },
            },
            {
                model: User,
                attributes: ['name']
            }]
        }).then(data => {
            //   apply the Posts data to a variable
            const posts = data.map(post => post.get({ plain: true }));
            // render the homepage with the posts
            res.render('homepage', {
                posts,
                loggedIn: req.session.logged_in
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/contributors', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('contributors', {
            users,
            loggedIn: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'body', 'title', 'date'],
        include: [{
            model: Comment,
            attributes: ['id', 'commentBody', 'postId', 'userId', 'date'],
            include: {
                model: User,
                attributes: ['name']
            }
        },
        {
            model: User,
            attributes: ['name']
        }
        ]
    })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = data.get({ plain: true });
            console.log(post);
            res.render('post', { post, loggedIn: req.session.logged_in });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;

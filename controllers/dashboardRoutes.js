const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    // pull all posts from the db where req.user_id matches post.userId
    Post.findAll({
        where: {
            userId: req.session.user_id
        },
        attributes: ['id', 'title', 'body', 'userId', 'date'],
        // include from other tables
        include: [{
            model: Comment,
            attributes: ['id', 'commentBody', 'postId', 'userId', 'date'],
            // foreign key reference within an include
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
            const posts = data.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedin: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'body', 'userId', 'date'],
        include: [{
            model: User,
            attributes: ['name']
        },
        {
            model: Comment,
            attributes: ['id', 'commentBody', 'postId', 'userId', 'date'],
            include: {
                model: User,
                attributes: ['name']
            }
        }
        ]
    })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = data.get({ plain: true });
            res.render('edit', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('create');
});



module.exports = router;
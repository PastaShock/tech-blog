const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll()
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.session.user_id
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body,
    },
    {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(data);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
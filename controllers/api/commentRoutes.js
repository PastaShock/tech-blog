const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            commentBody: req.body.commentBody,
            postId: req.body.postId,
            userId: req.session.user_id,
        })
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.put('/:id', (req, res) => {
    Comment.update({
        commentBody: req.body.commentBody
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: `no  comment with id:${req.params.id}` });
            return;
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: `no  comment with id:${req.params.id}` });
            return;
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
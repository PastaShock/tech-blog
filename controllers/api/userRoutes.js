const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    try {
        User.findAll().then(data => {
            res.status(200).json(data);
        });
    } catch {
        res.status(500).json({ message: 'user routing error' });
    }
});

router.get('/:id', (req, res) => {
    try {
        User.findOne({ where: { id: req.params.id } }).then(data => {
            res.status(200).json(data);
        });
    } catch {
        res.status(500).json({ message: 'user routing error' });
    }
});

router.put('/:id', (req, res) => {
    try {
        User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        },
        {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(200).json(data);
        });
    } catch {
        res.status(500).json({ message: 'user routing error' });
    }
});

router.post('/', (req, res) => {
    try {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } catch {
        res.status(500).json({ message: 'user routing error' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(200).json(data);
        });
    } catch {
        res.status(500).json({ message: 'user routing error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
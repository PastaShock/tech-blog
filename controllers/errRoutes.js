// 404 route
const emoji = require('emoji.json');

const getEmoji = () => {
    const randomNum = Math.floor(Math.random() * emoji.length);
    return emoji[randomNum].char;
};

const errText = `you must be lost------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------
-------------------------------------------------------------`;

let emojified = () => {
    return errText.replace(/[\u002d]/g, getEmoji);
};

const fourOhFour = (req, res) => {
    res.status(404).send(emojified());


};

module.exports = fourOhFour;
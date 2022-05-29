const emoji = require('emoji.json');
const Day = require('dayjs');

module.exports = {
  get_emoji: () => {
    emojiArr = [];
    // for (let i = 0; i > 1; i++) {
        const randomNum = Math.floor(Math.random() * emoji.length);
       emojiArr.push(emoji[randomNum].char)
    // }
    return `<span for="img" aria-label="book">${emojiArr[0]}</span>`;
  },
  getReadableDate: (date) => {
    return Day(date).format('DD/MM/YYY');
  }
};

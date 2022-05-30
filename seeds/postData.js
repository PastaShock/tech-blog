// const Day = require('dayjs');

// const postArr = [
//     {
//         "title": "",
//         "body": "password12345",
//         "author": "",
//         "date": ""
//     },
//     {
//         "name": "Lernantino",
//         "email": "lernantino@gmail.com",
//         "password": "password12345"
//     },
//     {
//         "name": "Amiko",
//         "email": "amiko2k20@aol.com",
//         "password": "password12345"
//     },
//     {
//         "name": "Jordan",
//         "email": "jordan99@msn.com",
//         "password": "password12345"
//     },
//     {
//         "name": "Blake",
//         "email": "the_blake@yahoo.com",
//         "password": "password12345"
//     },
//     {
//         "name": "george",
//         "email": "gpastushok@yahoo.com",
//         "password": "pastushok"
//     },
//     {
//         "name": "admin",
//         "email": "admin@website.com",
//         "password": "password"
//     }
// ]
const postArr = [];

const createPosts = () => {
    for (let i = 0; i < 5; i++) {
        // fill post arr with posts
        //  title:
        //  author:
        //  body:
        //  date:
        // let date = Day(Date()).format('MM/DD/YYY');
        postArr.push({
            title: 'title',
            body: 'body',
            author: 'george pastushok',
            // date: date
        });
    }
    return postArr;
};

module.exports = createPosts;
// home button route
const goHome = async () => {
    document.location.replace('/');
}
document.querySelector('#home').addEventListener('click', goHome);

// users button route
const goUsers = async () => {
    document.location.replace('/users');
}
document.querySelector('#users').addEventListener('click', goUsers);

// create login button for users on the homepage
const goLogin = async () => {
    document.location.replace('/login');
}
document.querySelector('#login').addEventListener('click', goLogin);

// create dashboard button to navigate to the dashboard
const goDash = async () => {
    document.location.replace('/dash');
}

document.querySelector('#dash').addEventListener('click', goDash);
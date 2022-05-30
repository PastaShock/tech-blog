async function signupFormHandler(event) {
    event.preventDefault();
    // add the name, email and password to the api package
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/dash');
        } else {
            alert(response.statusText);
        }
    } else {
        alert('You need to enter in a valid name, email and password');
    }
}

document.querySelector('#signup').addEventListener('submit', signupFormHandler);
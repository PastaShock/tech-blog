const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const body = document.querySelector('input[name="body"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#createPost')
    .addEventListener('submit', createPostHandler);
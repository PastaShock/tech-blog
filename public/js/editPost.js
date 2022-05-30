async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const body = document.querySelector('input[name="body"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(response);
        // document.location.replace('/dash/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.editPost').addEventListener('submit', editFormHandler);
const id = () => {
    return window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
};

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const body = document.querySelector('input[name="body"]').value.trim();


    const response = await fetch(`/api/posts/${id()}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dash/');
    } else {
        alert(response.statusText);
    }

}

async function deleteFormHandler(event) {
    event.preventDefault();
    const response = await fetch(`/api/posts/${id()}`, {
        method: 'DELETE',
        body: JSON.stringify({
            postId: id()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dash/');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.deletePost').addEventListener('click', deleteFormHandler);

document.querySelector('.editPost').addEventListener('submit', editFormHandler);
async function commentFormHandler(event) {
    event.preventDefault();

    const commentBody = document.querySelector('input[name="commentBody"]').value.trim();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentBody) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentBody
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#commentForm').style.display = 'block';
        }
    }
}

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);
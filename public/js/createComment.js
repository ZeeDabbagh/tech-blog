const addCommentHandler = async (event) => {
    event.preventDefault();

    const commentText = document.querySelector('#comment-text').value.trim();
console.log('COMMENT TEXT' + commentText)
    if (commentText) {
        const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text: commentText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post comment.')
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', addCommentHandler);
const blogForm = document.querySelector(".blog-form");
const createBtn = document.querySelector('#create-btn');

const showBlogForm = () => {
    blogForm.style.display = 'block';
    createBtn.style.display = 'none';

}


const blogFormHandler = async (event) => {
    event.preventDefault();
    document.querySelector
    console.log("creating a blog")

    const title = document.querySelector('#title').value.trim();
    const blog_text = document.querySelector('#blog-text').value.trim();

    if (title && blog_text) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({title, blog_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to create blog.');
        }
    }
};

// event listeners  
document.querySelector('.blog-form').addEventListener('submit', blogFormHandler);
document.querySelector('#create-btn').addEventListener('click', showBlogForm);
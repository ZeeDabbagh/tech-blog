const blogForm = document.querySelector(".blog-form");
const createBlogBtn = document.querySelector('#create-btn');

// shows create new blog form once create new blog button is clicked 
const showBlogForm = () => {
    blogForm.style.display = 'block';
    createBlogBtn.style.display = 'none';
}

// logic for creating a new blog post 
const blogFormHandler = async (event) => {
    event.preventDefault();
    document.querySelector
    console.log("creating a blog")

    const blogTitle = document.querySelector('#title').value.trim();
    const blogText = document.querySelector('#blog-text').value.trim();

    if (blogTitle && blogText) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ blogTitle, blogText }),
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
const editBtn = document.querySelector('#edit-btn');
const deleteBtn = document.querySelector('#delete-btn');

// handles logic for editing blog post 
const handleEditBlog = async (event) => {
    event.preventDefault()
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogText = document.querySelector('#blog-text').value.trim();
    if (blogTitle && blogText) {
        var id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: blogTitle, blog_text: blogText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to sign up.');
        }
    }
}

// event listener for editing blog post, shows edit form for blog post once edit button is clicked
editBtn.addEventListener("click", function (event) {
    var form = document.querySelector(".blog-form")
    form.style.display = "block"
    form.addEventListener("submit", handleEditBlog)
})



// event listener and logic for deleting blog post 
deleteBtn.addEventListener("click", async function (event) {
    var id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace("/dashboard")
    } else {
        alert('Failed to delete the post.');
    }
})
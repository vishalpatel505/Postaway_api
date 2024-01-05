const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiY3VzdG9tZXIxQGdtYWlsLmNvbSIsImlhdCI6MTcwMDI5NjA0NywiZXhwIjoxNzAwMjk5NjQ3fQ.8OeRThveDprk435Od8jOgIazM8uKTtIy7PFQjZSsn6w"



fetch('http://localhost:3400/api/posts', {
    headers: {
        "authorization": token
    }
})
    .then(response => {
        console.log("a")
        return response.json();
    })
    .then(data => {
        console.log("b")
        console.log(data)
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';

        data.forEach(value => {

            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const userElement = document.createElement('h2');
            userElement.textContent = value.userId;

            const captionElement = document.createElement('h3');
            captionElement.textContent = value.caption;

            const imageElement = document.createElement('img');
            imageElement.src = value.imageUrl;
            imageElement.alt = 'Post Image';

            postElement.appendChild(userElement)
            postElement.appendChild(captionElement)
            postElement.appendChild(imageElement)

            postsContainer.appendChild(postElement)
        })
    })
    .catch(error => {
        console.log('Error', error)
    })
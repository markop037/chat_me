let session = new Session();
sessionData = session.getSession();

if(sessionData !== ""){
    document.querySelector("#username").innerText = sessionData.username;

    document.querySelector("#fullName").value = sessionData.fullName;
    document.querySelector("#email").value = sessionData.email;
    document.querySelector("#usernameForm").value = sessionData.username;
} else{
    window.location.href = "/";
}

document.querySelector("#signout").addEventListener("click", e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = "/";
})

document.querySelector("#editAccount").addEventListener("click", e => {
    e.preventDefault();

    document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", e => {
    e.preventDefault();

    document.querySelector(".custom-modal").style.display = "none";

    document.querySelector("#fullName").value = sessionData.fullName;
    document.querySelector("#email").value = sessionData.email;
    document.querySelector("#usernameForm").value = sessionData.username;
    document.querySelector("#password").value = "";
    document.querySelector("#passwordError").style.display = "none";
});

document.getElementById('editForm').addEventListener('submit', e => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('usernameForm').value;
    const password = document.getElementById('password').value;

    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';

        const updatedUser = {
            id: sessionData.user_id,
            fullName: fullName,
            email: email,
            username: username,
            password: password
        };
        
        fetch('http://localhost:8080/users/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Profile successfully updated!');
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }
});

document.querySelector("#deleteProfile").addEventListener("click", e => {
    const userId = sessionData.user_id;

    if(userId){
        fetch(`http://localhost:8080/users/delete?id=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            if(response.ok){
                return response.text();
            } else{
                return response.text();
            }
        })
        .then(message => {
            alert(message);
            if(message === "User deleted successfully."){
                session.destroySession();
                window.location.href = "/";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert('An error occurred while deleting the profile');
        });
    } else{
        alert("No user is logged in");
    }
});

document.querySelector("#postForm").addEventListener("submit", e => {
    e.preventDefault();

    async function createPost(){
        let content = document.querySelector("#postContent").value;
        document.querySelector("#postContent").value = "";
        let post = new Post();
        post.post_content = content;
        post = await post.create();

        let current_user = new User();
        current_user = await current_user.get(sessionData.user_id)
        
        let html = document.querySelector("#allPostsWrapper").innerHTML;

        let delete_post_html = "";

        if(sessionData.user_id == post.user_id){
            delete_post_html = `<button class="btnRemove" onclick="removeMyPost(this)">Remove</button>`;
        }

        document.querySelector("#allPostsWrapper").innerHTML = `<div class="single-post" data-post_id=${post.post_id}">
                                                                    <div class="post-content">${post.content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Author: </b>${current_user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS btnLike"><span>${post.likes}</span> Likes</button>
                                                                            <button class="btnComment" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div>
                                                                    </div>

                                                                    <div class="post-comments">
                                                                    <form>
                                                                        <input placeholder="Write a comment" type="text">
                                                                        <button onclick="commentSubmit(event)">Comment</button>
                                                                    </form>
                                                                    </div>
                                                                </div>` + html;
    }

    createPost();
});

async function getAllPosts(){
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser(){
            let user = new User();
            user = await user.get(post.user_id);

            let html = document.querySelector("#allPostsWrapper").innerHTML;

            let delete_post_html = "";
            if(sessionData.user_id == post.user_id){
                delete_post_html = `<button class="btnRemove" onclick="removeMyPost(this)">Remove</button>`;
            }

            document.querySelector("#allPostsWrapper").innerHTML = `<div class="single-post" data-post_id=${post.post_id}">
                                                                    <div class="post-content">${post.content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Author: </b>${user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS btnLike"><span>${post.likes}</span> Likes</button>
                                                                            <button class="btnComment" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div>
                                                                    </div>

                                                                    <div class="post-comments">
                                                                    <form>
                                                                        <input placeholder="Write a comment" type="text">
                                                                        <button onclick="commentSubmit(event)">Comment</button>
                                                                    </form>
                                                                    </div>
                                                                </div>` + html;
        }
        getPostUser();
    });
}

getAllPosts();

const commentSubmit = event => {

}

const removeMyPost = event => {

}

const likePost = event => {

}

const commentPost = event => {

}
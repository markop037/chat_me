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

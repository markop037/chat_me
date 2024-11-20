document.querySelectorAll('input').forEach(input => {
    input.setAttribute('autocomplete', 'off');
});


let session = new Session();
session = session.getSession();

if(session !== ""){
    window.location.href = "chatme.html"
}

document.querySelector("#signup").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".signup-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".signup-modal").style.display = "none";
});

let config = {
    "fullName": {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    "email": {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    "username": {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    "password": {
        required: true,
        minlength: 5,
        maxlength: 50,
        matching: "confirmPassword"
    },
    "confirmPassword": {
        required: true,
        minlength: 5,
        maxlength: 50,
        matching: "password"
    }
};

let validation = new Validation(config, "#registrationForm");

document.querySelector("#registrationForm").addEventListener("submit", e => {
    e.preventDefault();

    if(validation.validationPassed()){
      const user = {
        fullName: document.querySelector("#fullName").value,
        email: document.querySelector("#email").value,
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
      }
      
      fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
      })
      .then(response => {
        if(response.ok){
            return response.text().then(message => {
                alert(message);
                document.querySelector("#fullName").value = '';
                document.querySelector("#email").value = '';
                document.querySelector("#username").value = '';
                document.querySelector("#password").value = '';
                document.querySelector(".signup-modal").style.display = "none";
            });
        }else {
            return response.text().then(message => {
                alert("Registration failed: " + message);
            });
        }
    })
}else{
        alert("You must fill in all fields!");
    }
});

document.querySelector("#loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const username = document.querySelector("#login_username").value;
    const password = document.querySelector("#login_password").value;

    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username, 
            password: password
        }),
    })
    .then(response => {
        if(!response.ok){
            return response.text().then(text => {
                throw new Error(text);
            })
        };
        return response.json();
    })
    .then(data => {
        let session = new Session();
        session.user_id = data.id;
        session.username = data.username;
        session.email = data.email;
        session.fullName = data.fullName;
        session.startSession();

        window.location.href = "chatme.html";

        const passwordDiv = document.querySelector(".password");
        const existingError = passwordDiv.nextElementSibling;
        if (existingError && existingError.tagName === "DIV" && existingError.querySelector("ul")) {
            existingError.remove();
        }
    })
    .catch(error => {
        const passwordDiv = document.querySelector(".password");
        const existingError = passwordDiv.nextElementSibling;
        if (!existingError || existingError.tagName !== "DIV" || !existingError.querySelector("ul")) {
            const errorList = document.createElement('ul');
            const errorItem = document.createElement('li');
            errorItem.innerText = error.message;
            errorList.appendChild(errorItem);
            
            const container = document.createElement("div");
            container.appendChild(errorList);
            passwordDiv.parentNode.insertBefore(container, passwordDiv.nextSibling);
        }
    })
});
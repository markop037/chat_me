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
            password: password}),
    })
    .then(response => response.json())
    .then(exists => {
        const passwordDiv = document.querySelector("#login_password").closest(".password");
        if (exists) {
            const existingError = passwordDiv.nextElementSibling;
            if (existingError && existingError.tagName === "DIV" && existingError.querySelector("ul")) {
                existingError.remove();
            }
            alert('User exists, login successful!');
        } else {
            const existingError = passwordDiv.nextElementSibling;
            if (!existingError || existingError.tagName !== "DIV" || !existingError.querySelector("ul")) {
                const errorList = document.createElement('ul');
                const errorItem = document.createElement('li');
                errorItem.innerText = 'Invalid username or password.';
                errorList.appendChild(errorItem);
                
                const container = document.createElement("div");
                container.appendChild(errorList);
                passwordDiv.parentNode.insertBefore(container, passwordDiv.nextSibling);
            }
        }
    })
    .catch(error => {
        alert('An error occurred: ' + error.message);
    });
});
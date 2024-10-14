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
      
      fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
      })
      .then(() => {
        document.querySelector(".signup-modal").style.display = "none";
        alert("You have successfully registered!"); 
      })


    }else{
        alert("You must fill in all fields!");
    }
});
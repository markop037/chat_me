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
        alert("Sve ok!");
    }else{
        alert("Nije sve ok!")
    }
});
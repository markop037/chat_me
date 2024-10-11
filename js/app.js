document.querySelector("#signup").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".signup-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".signup-modal").style.display = "none";
});
let session = new Session();
sessionData = session.getSession();

if(sessionData !== ""){
    document.querySelector("#username").innerText = sessionData.username;
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
});
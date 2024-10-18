class Session{
    user_id = "";

    startSession(){
        const d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "user_id=" + this.user_id + ";" + expires;
    }
}
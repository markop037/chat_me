class Session{
    user_id = "";
    username = "";

    startSession(){
        const d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "user_id=" + this.user_id + ";" + expires;
        document.cookie = "username=" + this.username + ";" + expires;
    }

    getSession() {
        let sessionData = {};
        document.cookie.split(";").forEach(cookie => {
            let [key, value] = cookie.trim().split("=");
            if (key === "user_id") sessionData.user_id = value;
            if (key === "username") sessionData.username = value;
        });
    
        return sessionData.user_id ? sessionData : "";
    }

    destroySession(){
        document.cookie.split(";").forEach(cookie => {
            let [key] = cookie.trim().split("=");
            document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
        })
    }
}
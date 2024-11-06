class Session {
    user_id = "";
    username = "";
    email = "";
    fullName = "";

    startSession() {
        const d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();

        document.cookie = "user_id=" + this.user_id + ";" + expires;
        document.cookie = "username=" + this.username + ";" + expires;
        document.cookie = "email=" + this.email + ";" + expires;
        document.cookie = "fullName=" + this.fullName + ";" + expires;
    }

    getSession() {
        let sessionData = {};
        document.cookie.split(";").forEach(cookie => {
            let [key, value] = cookie.trim().split("=");
            if (key === "user_id") sessionData.user_id = value;
            if (key === "username") sessionData.username = value;
            if (key === "email") sessionData.email = value;
            if (key === "fullName") sessionData.fullName = value;
        });

        return sessionData.user_id ? sessionData : "";
    }

    destroySession() {
        document.cookie = "user_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "email=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "fullName=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}

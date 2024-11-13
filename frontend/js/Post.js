class Post {
    post_id = "";
    user_id = "";
    post_content = "";
    likes = "";

    async create(){
        let session = new Session();
        let sessionData = session.getSession();

        let data = {
            user_id: sessionData.user_id,
            content: this.post_content,
            likes: 0
        }

        data = JSON.stringify(data);

        let response = await fetch("http://localhost:8080/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        data = await response.json();

        return data;
    }

    async getAllPosts(){
        let response = await fetch("http://localhost:8080/posts/all");
        let data = await response.json();
        return data;
    }
}
class Comment {
    user_id = "";
    post_id = "";
    content = "";

    create() {
        let data = {
            user_id: this.user_id,
            post_id: this.post_id,
            content: this.content
        }

        data = JSON.stringify(data);

        fetch("http://localhost:8080/comments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {alert("Comment posted")});
    }

    async get(post_id){
        let response = await fetch("http://localhost:8080/comments/all");
        let data = await response.json();
        let post_comments = [];

        let i = 0;

        data.forEach(item => {
            if(item.post_id === post_id){
                post_comments[i] = item;
                i++;
            }
        });

        return post_comments;
    }
}
class User {
    user_id = "";
    full_name = "";
    email = "";
    username = "";

    async get(user_id){
        let api_url = `http://localhost:8080/users/${user_id}`;
        let response = await fetch(api_url);
        let data = await response.json();

        return data;
    }
}
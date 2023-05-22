async function login(email, password){
    const fetch_json = {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    };
    console.log(fetch_json);
    const response = await fetch(`http://localhost:3000/users/login`, fetch_json);
    const reponse_json = await response.json()
    if (reponse_json.token){
        document.cookie=`access_token=${reponse_json.token}`
        alert("logado com sucesso");
        window.location.replace("index.html");
    }else {
        alert("error")
    }
}

const submit_login = document.getElementById("submit_login");
submit_login.addEventListener('click', (e) => {
    e.preventDefault();

    const login_form = document.forms['login'];

    const email = login_form['email'].value;
    const password = login_form['password'].value;

    login(email, password);
});

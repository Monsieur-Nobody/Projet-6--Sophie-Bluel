

const $form = document.querySelector('form');
const $email = document.getElementById("email")
const $password = document.getElementById("password")


$form.addEventListener("submit", (event) => {
    event.preventDefault();


    // console.log($email.value)
    // console.log($password.value)

    $verifierChamps($email);
    $verifierChamps($password);


    const user = {
        
            "email": $email.value,
            "password": $password.value,
          
    }



    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                // Gérer les erreurs HTTP spécifiques ici
                if (response.status === 401) {
                    throw new Error("Erreur : Identifiants incorrects");
                } else if (response.status === 404) {
                    throw new Error("Erreur : Identifiants incorrects");
                }
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('isLoggedIn', 'true' );
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error(error.message);
            alert(error.message); // Affiche le message d'erreur à l'utilisateur
        });
});

function $verifierChamps(champ) {
    if (champ.value.trim() === ""){
        champ.classList.add("error")
        $email.placeholder = " Veuillez remplir ce champ."
        $password.placeholder = " Veuillez remplir ce champ."
    } else {
        champ.classList.remove("error")
    }
}

const $verifierEmail = (balise) => {
    let $emailValide = new RegExp("/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]/gm")
    if ($emailValide.test(balise.value)){
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}
const $verifierPassword = (balise) => {
    let $passwordValide = new RegExp("/[a-zA-Z0-9._-]+/gm")
    if ($passwordValide.test(balise.value)){
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}





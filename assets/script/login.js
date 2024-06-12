// document.addEventListener("DOMContentLoaded", (event) => {
//     console.log("Page chargée.")

    
// });

const $form = document.querySelector('form');
const $email = document.getElementById("email")
const $password = document.getElementById("password")


$form.addEventListener("submit", (event) => {
    event.preventDefault();

    $verifierChamps($email);
    $verifierChamps($password);
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





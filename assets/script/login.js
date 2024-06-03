document.addEventListener("DOMContentLoaded", () => {

const $informationsLogin = document.getElementById("login_id")

    $informationsLogin.addEventListener("submit" , (event) => {

    event.preventDefault();

    const $email = document.getElementById("email").value;
    const $password = document.getElementById("password").value;
    
    console.log("E-mail:", $email);
    console.log("Password:", $password);


   // Exemple d'envoi des données à une API
   const donnees = {
    email: $email,
    password: $password
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(donnees)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Succès:", data);
    // Ajouter ici la gestion des cas de succès, par exemple rediriger l'utilisateur
  })
  .catch(error => {
    console.error("Erreur:", error);
    // Ajouter ici la gestion des erreurs
  });
});
});

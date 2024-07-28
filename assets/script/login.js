const $form = document.querySelector("form");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $allowedToSubmit = document.getElementById("submit");

const AllowedToInteract = () => {
  if ($email.value.trim() !== "" && $password.value.trim() !== "") {
    $allowedToSubmit.classList.add("active");
  } else {
    $allowedToSubmit.classList.remove("active");
  }
};

$email.addEventListener("input", AllowedToInteract);
$password.addEventListener("input", AllowedToInteract);

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log($email.value)
  // console.log($password.value)

  const user = {
    email: $email.value,
    password: $password.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        // Gérer les erreurs HTTP spécifiques ici
        if (response.status === 401 || response.status === 404) {
          throw new Error("Erreur : Identifiants incorrects");
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error.message);
      alert(error.message); // Affiche le message d'erreur à l'utilisateur
    });
});

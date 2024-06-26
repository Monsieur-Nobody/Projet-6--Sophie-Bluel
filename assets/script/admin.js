const isAdmin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

console.log(isAdmin());

if (isAdmin) {
} else {
}

document.addEventListener("DOMContentLoaded", () => {
if (sessionStorage.getItem("isLoggedIn") != "true") {
    return;
  }



afficherDeconnexion();
afficherModeEdition();


});

const afficherModeEdition = () => {
    document.querySelectorAll('.adminOnly').forEach(element => {
        element.style.display = 'flex';
    });

};



const afficherDeconnexion = () => {
  

  const loginLogoutLink = document.getElementById("LinkLog");
  loginLogoutLink.textContent = "logout";
  loginLogoutLink.href = "#";
  loginLogoutLink.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.setItem("isLoggedIn", "false");
    window.location.reload(); // Recharge la page pour refléter l'état de déconnexion
  });
};

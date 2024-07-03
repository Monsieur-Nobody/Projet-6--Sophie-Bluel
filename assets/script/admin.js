const isAdmin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

document.addEventListener("DOMContentLoaded", () => {
  if (isAdmin()) {
    afficherModeEdition();
  }
});

const afficherModeEdition = () => {
  document.querySelectorAll(".adminOnly").forEach((element) => {
    element.style.display = "flex";
  });
  afficherDeconnexion();
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

//Variables
const ouvreModal = document.querySelectorAll(".lienModal");

const modal = document.querySelector(".modal");

const close = document.querySelectorAll(".fa-xmark");

const editGallery = document.getElementById("editGallery");

const addPicture = document.getElementById("addPicture");

const boutonAdd = document.getElementById("addPictureBtn");

const arrowBack = document.querySelector(".fa-arrow-left");

// Fonctions d'ouvertures , de gestion et de navigation dans la modal

ouvreModal.forEach((element) => {
  element.addEventListener("click", function () {
    modal.style.display = "flex";
  });
});

close.forEach((element) => {
  element.addEventListener("click", function () {
    modal.style.display = "none";
  });
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

acceuilModal = document.querySelector(".frameOneModal");

const afficherImagesModal = () => {
  acceuilModal.innerHTML = "";

  $images.forEach((i) => {
    // console.log(i)
    acceuilModal.innerHTML += `  <article>
                                      <img src='${i.imageUrl}' alt='${i.title}'>
                                      </article>   `;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  afficherImagesModal();
});

boutonAdd.addEventListener("click", () => {
  addPicture.style.display = "flex";
  editGallery.style.display = "none";
});

arrowBack.addEventListener("click", () => {
  addPicture.style.display = "none";
  editGallery.style.display = "flex";
});

// Fonction d'affichage des categories et envoie du formulaire

const selectCategory = document.getElementById("selectCategory");

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des catégories :", error);
  });


 const photoInput = document.getElementById("photo");
  const labelPhoto = document.getElementById("labelPhoto");
  const picture = document.getElementById("picture");

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        picture.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

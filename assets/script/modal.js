//Variables
const ouvreModal = document.querySelectorAll(".lienModal");

const modal = document.querySelector(".modal");

const close = document.querySelectorAll(".fa-xmark");

const editGallery = document.getElementById("editGallery");

const addPicture = document.getElementById("addPicture");

const boutonAdd = document.getElementById("addPictureBtn");

const arrowBack = document.querySelector(".fa-arrow-left");

const acceuilModal = document.querySelector(".frameOneModal");

const confirmationPopup = document.getElementById("confirmationPopup");

const confirmDeleteBtn = document.getElementById("confirmDelete");

const cancelDeleteBtn = document.getElementById("cancelDelete");

const selectCategory = document.getElementById("selectCategory");

const photoInput = document.getElementById("photo");

const labelPhoto = document.getElementById("labelPhoto");

const picture = document.getElementById("picture");

const validerAjoutBtn = document.getElementById('valider');

let imageIdToDelete = null;

// Fonctions d'ouvertures , de gestion et de navigation dans la modal

ouvreModal.forEach((element) => {
  element.addEventListener("click", function () {
    modal.style.display = "flex";
  });
});

function resetModal() {
  addPicture.style.display = "none";
  editGallery.style.display = "flex";
  resetForm(); // Réinitialiser le formulaire
}

close.forEach((element) => {
  element.addEventListener("click", function () {
    modal.style.display = "none";
    resetModal();
  });
  
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetModal();

  }
});



const afficherImagesModal = () => {
  acceuilModal.innerHTML = "";

  $images.forEach((i) => {
    const galleryItem = document.createElement('article');
    galleryItem.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = i.imageUrl;
    img.alt = i.title;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
    deleteIcon.addEventListener('click', () => {
      imageIdToDelete = i.id;
      confirmationPopup.style.display = "flex";
    
    });

    galleryItem.appendChild(img);
    galleryItem.appendChild(deleteIcon);
    acceuilModal.appendChild(galleryItem);
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
  resetForm();
});

// Fonction d'affichage des categories et envoie du formulaire



fetch(`${$routeApi}categories/`)
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


// Section suppresion d'image
  const deleteImage = (id) => {
    fetch(`${$routeApi}works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          recupererImage();
        } else {
          console.error('Erreur lors de la suppression de l\'image');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'image:', error);
      });
  };


  confirmDeleteBtn.addEventListener("click", () => {
    if (imageIdToDelete !== null) {
      deleteImage(imageIdToDelete);
      imageIdToDelete = null;
    }
    confirmationPopup.style.display = "none";
  });
  
  cancelDeleteBtn.addEventListener("click", () => {
    imageIdToDelete = null;
    confirmationPopup.style.display = "none";
  });
  

const newImageTitle = document.getElementById('title');
const newImageCategory = document.getElementById('selectCategory');
const newImage = document.getElementById('photo');
const titleError = document.getElementById('titleError');
const categoryError = document.getElementById('categoryError');
const photoError = document.getElementById('photoError');
const errorContainer = document.getElementById('errorContainer');

validerAjoutBtn.addEventListener('click', (event) => {
  // Reset error messages

  errorContainer.textContent = '';
  errorContainer.style.display = 'none';

  let isValid = true;
  const errors = [];

  // Valider le champ de titre
  if (!newImageTitle.value) {
    errors.push('Titre');
    isValid = false;
  }

  // Valider le champ de catégorie
  const selectedCategory = parseInt(newImageCategory.value, 10);
  if (selectedCategory < 1 || selectedCategory > 3) {
    errors.push('Catégorie');
    isValid = false;
  }

  // Valider le champ de photo
  if (!newImage.files.length) {
    errors.push('Photo');
    isValid = false;
  }

  // Afficher le message d'erreur général si des champs ne sont pas valides
  if (!isValid) {
    errorContainer.textContent = `Les champs suivants sont obligatoires : ${errors.join(', ')}`;
    errorContainer.style.display = 'block';
  }


// Empêcher la soumission du formulaire si des champs ne sont pas valides
if (!isValid) {
  event.preventDefault();
}
 
  if (isValid) {
    console.log(newImageTitle.value);
    console.log(newImageCategory.value);
    console.log(newImage.files[0]);

    const data = new FormData();
    data.append("image", newImage.files[0]);
    data.append("title", newImageTitle.value);
    data.append("category", newImageCategory.value * 1);

    fetch(`${$routeApi}works/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        // Rafraîchir les images de la galerie
        recupererImage();

        // Afficher le message de succès
        showSuccessMessage();

        resetForm();

        // Revenir à la première frame de la modal
        addPicture.style.display = "none";
        editGallery.style.display = "flex";
      } else {
        console.error('Erreur lors de l\'ajout de l\'image');
      }
    })
    .catch((error) => {
      console.error('Erreur lors de l\'ajout de l\'image:', error);
    });
  } else {
    // Prevent form submission if invalid
    event.preventDefault();
  }
});


  

  const showSuccessMessage = () => {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
  
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000); // Le message disparaît après 3 secondes
  };

  function resetForm() {
    newImageTitle.value = '';
    newImageCategory.value = '0'; // Assuming '0' is the default value for category
    newImage.files = '[0]';
  }
  
  function resetForm() {
    newImageTitle.value = '';
    newImageCategory.value = '0'; // Assuming '0' is the default value for category
    newImage.value = '';
    picture.src = './assets/icons/picture.png'; // Reset the preview image source
  }
  
  // Event listener to reset form when switching frames
  arrowBack.addEventListener('click', () => {
    resetForm();
    addPicture.style.display = "none";
    editGallery.style.display = "flex";
  });
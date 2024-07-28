//Variables des selecteur 
const openModal = document.querySelectorAll(".lienModal");

const modal = document.querySelector(".modal");

const close = document.querySelectorAll(".fa-xmark");

const editGallery = document.getElementById("modalGallery");

const addPicture = document.getElementById("addPicture");

const boutonAdd = document.getElementById("addPictureBtn");

const arrowBack = document.querySelector(".fa-arrow-left");

const modalGallery = document.querySelector(".modalDisplayGallery");

const confirmationPopup = document.getElementById("confirmationPopup");

const confirmDeleteBtn = document.getElementById("confirmDelete");

const cancelDeleteBtn = document.getElementById("cancelDelete");

const selectCategory = document.getElementById("selectCategory");

const photoInput = document.getElementById("photo");

const labelPhoto = document.getElementById("labelPhoto");

const picture = document.querySelector(".picture");

const formPictureAddBtn = document.getElementById('valider');

let imageIdToDelete = null;

// Fonctions d'ouvertures , de gestion et de navigation dans la modal

openModal.forEach((element) => {
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
  modalGallery.innerHTML = "";

  $works.forEach((i) => {
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
    modalGallery.appendChild(galleryItem);
  });
};


document.addEventListener("DOMContentLoaded", () => {
  afficherImagesModal();// attend que la page se charge totalement 
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



    fetch(`${$pathApi}categories/`)
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
    const labelTextPhoto = document.getElementById("labelTextPhoto");
    labelTextPhoto.style.display= "flex"
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        picture.src = e.target.result;
        labelTextPhoto.style.display= "none"
        picture.classList.add('new')
      };
      reader.readAsDataURL(file);
    }
  });


// Section suppresion d'image
  const deleteImage = (id) => {
    fetch(`${$pathApi}works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          getWorks();
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
const errorContainer = document.getElementById('errorContainer');

const validateForm = () => {
  let isValid = true;

  // Valider le champ de titre
  if (!newImageTitle.value) {
    isValid = false;
  }

  // Valider le champ de catégorie
  const selectedCategory = parseInt(newImageCategory.value, 10);
  if (selectedCategory < 1 || selectedCategory > 3) {
    isValid = false;
  }

  // Valider le champ de photo
  if (!newImage.files.length) {
    isValid = false;
  }

  // Ajouter ou retirer la classe "allowed"
  if (isValid) {
    formPictureAddBtn.classList.add('allowed');
  } else {
    formPictureAddBtn.classList.remove('allowed');
  }

  return isValid;
};

// Écouter les changements sur les champs du formulaire
newImageTitle.addEventListener('input', validateForm);
newImageCategory.addEventListener('change', validateForm);
newImage.addEventListener('change', validateForm);

formPictureAddBtn.addEventListener('click', (event) => {
  errorContainer.textContent = '';
  errorContainer.style.display = 'none';

  if (!validateForm()) {
    const errors = [];
    if (!newImageTitle.value) errors.push('Titre');
    const selectedCategory = parseInt(newImageCategory.value, 10);
    if (selectedCategory < 1 || selectedCategory > 3) errors.push('Catégorie');
    if (!newImage.files.length) errors.push('Photo');

    errorContainer.textContent = `Les champs suivants sont obligatoires : ${errors.join(', ')}`;
    errorContainer.style.display = 'block';
    event.preventDefault();
    return;
  }

  const data = new FormData();
  data.append("image", newImage.files[0]);
  data.append("title", newImageTitle.value);
  data.append("category", newImageCategory.value * 1);

  fetch(`${$pathApi}works/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  })
  .then((response) => {
    if (response.ok) {
      getWorks();
      showSuccessMessage();
      resetForm();
      addPicture.style.display = "none";
      editGallery.style.display = "flex";
    } else {
      console.error('Erreur lors de l\'ajout de l\'image');
    }
  })
  .catch((error) => {
    console.error('Erreur lors de l\'ajout de l\'image:', error);
  });
});


  

  const showSuccessMessage = () => {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
  
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000); // Le message disparaît après 3 secondes
  };


  
  function resetForm() {
    document.getElementById("addPictureForm").reset();
    picture.src = './assets/icons/picture.png'; // Reset the preview image source

  }
  
  arrowBack.addEventListener('click', () => {
    resetForm();
    addPicture.style.display = "none";
    editGallery.style.display = "flex";
  });
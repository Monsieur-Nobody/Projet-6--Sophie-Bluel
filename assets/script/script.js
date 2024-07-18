// Var div gallery
const $gallery = document.querySelector(".gallery");
//Var div filtres
const $filtreContainer = document.querySelector(".filtres");
// Var images
let $works = [];
// Var categories
let $category = [];
// Var route API
const $pathApi = "http://localhost:5678/api/";

const getWorks = async () => {
  try {
    const response = await fetch(`${$pathApi}works`);
    const data = await response.json();
    $works = data;
    displayWorks(0);
    if (isAdmin()) {
      afficherImagesModal();
    }
  } catch (e) {
    console.log(e);
  }
};

const getCategory = () => {
  //On recupére les categories via la route categories avec une requete HTTP
  fetch(`${$pathApi}categories`)
    // on applique un .then pour s'assurer de l'execution du code
    .then((rep) => rep.json())
    // le second then traite les données qui viennent d'etre créer dans le json et les affiche via le console.log
    .then((data) => {
      //  console.log(data)
      // Maintenant qu'on a vérifié qu'on recupere bien les informations via le console.log on les attribue a la variable $works
      $category = data;
      displayCategory();
    })
    // catch nous permet d'attraper toutes les erreurs possibles et de les afficher via console.log
    .catch((e) => console.log(e));
};

const displayWorks = (idCat) => {
  $gallery.innerHTML = "";

  $works.forEach((i) => {
    // console.log(i)
    // console.log(idCat == i.categoryId)
    if (idCat == 0) {
      $gallery.innerHTML += `  <figure>
                                <img src='${i.imageUrl}' alt='${i.title}'>
                                <figcaption>${i.title}</figcaption>
                                </figure>   `;
    } else if (idCat == i.categoryId) {
      $gallery.innerHTML += `  <figure>
                                <img src='${i.imageUrl}' alt='${i.title}'>
                                <figcaption>${i.title}</figcaption>
                                </figure>   `;
    }
  });
};

const displayCategory = () => {
  if (isAdmin()) {
    return;
  }

  const $btn0 = document.createElement("button");
  $btn0.innerHTML = `Tous`;
  $btn0.classList.add('active');
  $btn0.addEventListener("click", () => {
    displayWorks(0);
    setActiveButton($btn0);
  });
  $filtreContainer.appendChild($btn0);

  $category.forEach((cat) => {
    const $btn = document.createElement("button");
    $btn.innerHTML = `${cat.name}`;
    $btn.addEventListener("click", () => {
      displayWorks(cat.id);
      setActiveButton($btn);
    });
    $filtreContainer.appendChild($btn);
  });
};

const setActiveButton = (activeButton) => {
  const buttons = document.querySelectorAll('.filtres button');
  buttons.forEach(button => button.classList.remove('active'));
  activeButton.classList.add('active');
};

getWorks();
getCategory();

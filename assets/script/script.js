// Variable correspondants a la div HTML
const $gallery = document.querySelector(".gallery");
//Variable contenant la div filtres
const $filtreContainer = document.querySelector(".filtres");
// Variable contenant le tableau avec les images
let $images = [];
// Variable contenant le tableau des categories
let $categories = [];
// Variable contenant la route de l'API
const $routeApi = "http://localhost:5678/api/";

const recupererImage = async () => {
  try {
    const response = await fetch(`${$routeApi}works`);
    const data = await response.json();
    $images = data;
    afficherImages(0);
    if (isAdmin()) {
      afficherImagesModal();
    }
  } catch (e) {
    console.log(e);
  }
};
const recupererCategories = () => {
  //On recupére les categories via la route categories avec une requete HTTP
  fetch(`${$routeApi}categories`)
    //then nous sert a "renvoyer une promesse" et nous evite d'utiliser await, et nous assure que l'action est bien le temps de s'effectuer
    .then((rep) => rep.json())
    // le second then traite les données qui viennent d'etre créer dans le json et les affiche via le console.log
    .then((data) => {
      //  console.log(data)
      // Maintenant qu'on a vérifié qu'on recupere bien les informations via le console.log on les attribue a la variable $images
      $categories = data;
      afficherCategories();
    })
    // catch nous permet d'attraper toutes les erreurs possibles et de les afficher via console.log
    .catch((e) => console.log(e));
};

const afficherImages = (idCat) => {
  $gallery.innerHTML = "";

  $images.forEach((i) => {
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

const afficherCategories = () => {
  if (isAdmin()) {
    return;
  }

  const $btn1 = document.createElement("button");
  $btn1.innerHTML = `Tous`;
  $filtreContainer.appendChild($btn1);
  $btn1.addEventListener("click", () => {
    afficherImages(0);
  });

  $categories.forEach((cat) => {
    // console.log(c)

    const $btn = document.createElement("button");
    $btn.innerHTML = `${cat.name}`;
    $btn.addEventListener("click", () => {
      afficherImages(cat.id);
    });
    $filtreContainer.appendChild($btn);
  });
};

recupererImage();
recupererCategories();

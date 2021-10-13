// ******************************       AFFICHAGE CAMERA        *****************************************
//VARIABLES
let camera
const $cameraTitle = document.getElementById("title")
const $cameraImg = document.getElementById("image")
const $cameraDescription = document.getElementById("text")
const $cameraPrice = document.getElementById("price")
const $cameraLenses = document.getElementById("inputGroupSelect01")
const lenses = document.createElement("select")
// API
const urlApi = "http://localhost:3000/api/cameras"
const params = new URL(document.location).searchParams // Récupération paramètre de recherche
const id = params.get("id") //Récupération id
fetch(`${urlApi}/${id}`) //Promise
  .then(
    async result_ => {
      const result = await result_.json()
      camera = result
      // Boucle lentilles
      for (let i = 0; i < camera.lenses.length; i++) {
        const option = document.createElement("option") //Création de la liste
        lenses.appendChild(option) // Création du noeud (plusieurs éléments de la liste)
        option.setAttribute("value", camera.lenses[i]) //Ajout attribut/valeur
        option.innerHTML = camera.lenses[i] // Rédaction de la valeur
      }
      // Template et insertion valeurs
      $cameraTitle.innerHTML += `${camera.name}`
      $cameraImg.innerHTML += `
        <img class=
          "card-img-top col-12 col-lg-6 col-md-6 my-3 border border-1 border-light rounded"
          id="image"
          src="${camera.imageUrl}" 
          alt="Card image cap"/>`
      $cameraDescription.innerHTML += `${camera.description}`
      $cameraLenses.innerHTML += `${lenses.innerHTML}`
      let $cameraPrice = document.getElementById("camera-price")
      let quantity = document.getElementById("quantity").value
      $cameraPrice.innerHTML = `${(camera.price * quantity) / 100} €`
    } // MAJ prix total
  )
  .catch(error => {
    console.log(error)
    const msgErreur = document.getElementById("msgErreur")
    msgErreur.innerHTML = `Une erreur est survenue pendant le chargement de la page, tentez de rafraîchir !`
  })

// **************************************    LOCAL STORAGE     *****************************************
// AJOUT ONCLICK
const addProduct = () => {
  let storage = localStorage.getItem("oricamStorage") // Récupération panier
  const quantity = document.querySelector("#quantity").value
  let products = []
  // Si le panier est vide
  if (!storage) {
    storage = {
      products: [],
    }
    // Si le panier contient déjà un ou des article.s
  } else {
    storage = JSON.parse(storage) // Formatage elements format array/objets
    console.log("JSON extrait avec succès") //test
    products = storage.products
    products.forEach(function (product) {
      //Si les lentilles et les id sont identitques
      if (product.lenses === inputGroupSelect01.value && product._id === id) {
        console.log("condition égalité lentilles remplie") //test
        let position = products.indexOf(product) //Stockage de l'index de l'obj
        products.splice(position, 1)
        console.log("splice exécuté") //test
      }
    })
    // On pousse le produit dans le storage
    storage.products.push({
      name: camera.name,
      _id: camera._id,
      lenses: inputGroupSelect01.value,
      quantity: quantity,
      price: camera.price * quantity,
      priceByItems: camera.price,
    })
    console.log("produit pushé") //test
  }
  window.localStorage.setItem("oricamStorage", JSON.stringify(storage))
  console.log("localStorage", storage.products) //test
}

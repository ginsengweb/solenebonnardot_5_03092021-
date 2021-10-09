//VARIABLES
let camera
// Stockage ou Création des éléments html
const $cameraTitle = document.getElementById("title")
const $cameraImg = document.getElementById("image")
const $cameraDescription = document.getElementById("text")
const $cameraPrice = document.getElementById("price")
const $cameraLenses = document.getElementById("inputGroupSelect01")
const lenses = document.createElement("select")
// Constante de l'API
const urlApi = "http://localhost:3000/api/cameras"

//API
const params = new URL(document.location).searchParams // Récupération paramètre de recherche
const id = params.get("id") //Récupération id
fetch(`${urlApi}/${id}`)
  //Promise
  .then(
    async result_ => {
      const result = await result_.json() //Donne un nom au tableau json récupéré
      camera = result //Result deviens camera
      //Appel des fonctions
      for (let i = 0; i < camera.lenses.length; i++) {
        const option = document.createElement("option") //Création de la liste
        lenses.appendChild(option) // Création du noeud (plusieurs éléments de la liste)
        option.setAttribute("value", camera.lenses[i]) //Ajout attribut/valeur
        option.innerHTML = camera.lenses[i] // Rédaction de la valeur
      }
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
  })

//LOCALSTORAGE
// Utilisation événement onclick html
const addProduct = () => {
  let storage = localStorage.getItem("oricamStorage")
  const quantity = document.querySelector("#quantity").value
  let products = []
  if (!storage) {
    storage = {
      products: [],
    }
  } else {
    storage = JSON.parse(storage)
    console.log("JSON extrait avec succès")
    products = storage.products
    for (let i = 0; i < camera.lenses.length; i++) {
      console.log("boucle 'for camera.lenses length' lancée avec succès")
      let cameralense = camera.lenses[i]
      console.log("valeur des lentilles assignées à cameralense avec succès")
      console.log(cameralense)
      console.log(inputGroupSelect01.value)
      if (cameralense === inputGroupSelect01.value) {
        console.log("condition égalité lentilles remplie")
        let position = products.indexOf(camera)
        console.log("index trouvé avec succès")
        products.splice(position, 1)
        console.log("splice exécuté")
        break
      }
    }
  }
  storage.products.push({
    name: camera.name,
    _id: camera._id,
    lenses: inputGroupSelect01.value,
    quantity: quantity,
    price: camera.price * quantity,
    priceByItems: camera.price,
  })
  console.log("produit pushé")
  window.localStorage.setItem("oricamStorage", JSON.stringify(storage))
  console.log("localStorage", storage.products)
}

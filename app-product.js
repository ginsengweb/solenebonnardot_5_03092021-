//Page produit
//On initialise nos variables
let camera
const $cameraProduct = document.querySelector("#camera-product")
const lenses = document.createElement("select")
const urlApi = "http://localhost:3000/api/cameras"

//Appel URL
const params = new URL(document.location).searchParams
const id = params.get("id") //Obtiens l'id du produit

//Appel de notre API
fetch(`${urlApi}/${id}`) //Rappel notre api + l'id de notre produit
  .then(async result_ => {
    //Récupère le tableau json
    const result = await result_.json() //Donne un nom au tableau json récupéré
    camera = result //Result deviens camera
    //Appel de nos functions
    lenseList()
    cameraCard()
  })
  .catch(error => {
    console.log(error)
  })

//Fonction pour le tableau lenses
const lenseList = () => {
  for (let i = 0; i < camera.lenses.length; i++) {
    const option = document.createElement("option") //Créé notre liste option
    option.setAttribute("value", camera.lenses[i]) //Incrémente nos lenses à notre liste option
    option.innerHTML = camera.lenses[i]
    lenses.appendChild(option)
  }
}

//Notre template camera card
const cameraCard = () => {
  camera.price = parseFloat(camera.price) / 100 //Permet de supprimer les 0 inutiles des prix

  $cameraProduct.innerHTML += `<div id="camera-item shadow" class="card col-10 mx-auto mt-5 mb-5 shadow">
        <img class="card-img-top p-1" src="${camera.imageUrl}">
    <div class="card-body px-5 shadow">
      <h3 class="card-title">${camera.name}</h3>
      <p class="card-text">${camera.description}</p>
      <p class="card-text">${camera.price}€</p>
            <div id="camera-lense"class="input-group col-12">
                <div class="input-group-prepend col-sm-4 col-12 d-none d-sm-block">
                    <label class="input-group-text" for="inputGroupSelect01">Lentilles</label>
                </div>
                <select class="custom-select col-sm-4 col-12" id="inputGroupSelect01">
                    ${lenses.innerHTML}
                </select>
                <label class="camera-quantity-selector col-sm-4 col-12 text-center " for="camera-quantity">Quantité: 
                    <select id="quantity" onclick="addToPrice()" class="text-center mx-auto" name="camera-quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </label>
                <p id="camera-price" class="card-text col-sm-4 col-12 mx-auto mt-3"></p>
            </div>
            <div class="col-12 mt-3">
 <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn btn-dark mx-auto">Ajouter au panier</button>

<div class="alert alert-success alert-dismissible fade show" role="alert">
   <h5 class="alert-heading">Votre article a bien été ajouté à votre panier !</h5>
   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">×</span>
   </button>
               
            </div>               
        </div>   
    </div>`
}

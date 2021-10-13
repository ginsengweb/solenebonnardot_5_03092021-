let storage = JSON.parse(localStorage.getItem("oricamStorage")) //On extrait notre json
let camera
let products = []

if (!storage) {
  let response = document.getElementById("basketOrder")
  response.innerHTML = `
     <div class="row text-light">
          <h3>Votre panier est vide, allez vite dans notre boutique pour sélectionner votre article</h3>
      </div>`
} else {
  let enStock = document.getElementById("panier")
  products = storage.products
  for (let i = 0; i < products.length; i++) {
    camera = products[i]
    console.log(products)
    enStock.innerHTML += `
    <hr>
    <div class="product col-7">
      <div class="row">
        <div class="col-12">
          <h5>Nom de l'appareil</h5>
          <p class="title">${camera.name}</p>
        </div>
        <div class="col-12">
          <h4>Taille de la lentille</h4>
          <p class="lenses">${camera.lenses}</>
        </div>
      </div>
    </div>
    <div class="price col-3">
      <p>A l'unité<br><br>Quantité<br><br>Total</p>
    </div>
    <div class="price col-2">
      <div class="price">${camera.priceByItems} €</div><br>
      <div class="quantity">${camera.quantity}
      <button class="fa fa-trash mx-2"
      onclick="trash()">
      </button>
</div><br>
      <div class="total price">${camera.price} €</div>
    </div>
      <hr>`
  }
}
const clearPanier = () => {
  localStorage.clear()
  location.reload()
}
const trash = () => {
  console.log(products.indexOf(camera))
  let position = products.indexOf(camera)
  console.log("index trouvé avec succès")
  products.splice(position, 1)
  console.log("splice exécuté")
  window.localStorage.setItem("oricamStorage", JSON.stringify(storage))
  console.log("localStorage", storage.products)
  location.reload()
}

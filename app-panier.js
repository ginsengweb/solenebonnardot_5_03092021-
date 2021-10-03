let storage = window.localStorage.getItem("oricamStorage") //Créer notre stockage de panier
storage = JSON.parse(localStorage.getItem("oricamStorage")) //On extrait notre json

let enStock = document.getElementById("panier")
let products = storage.products
for (let i = 0; i < products.length; i++) {
  let camera = products[i]
  console.log(products)
  enStock.innerHTML += `
    <hr>
    <div class="product col-7">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <h5>Nom de l'appareil</h5>
          <p class="title">${camera.name}</p>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6">
          <h4>Taille de la lentille</h4>
          <p class="lenses">${camera.lenses}</>
        </div>
      </div>
    </div>
    <div class="price col-3">
      <p>A l'unité<br>Quantité<br>Total</p>
    </div>
    <div class="price col-2">
      <div class="price">${camera.priceByItems} €</div>
      <div class="quantity">${camera.quantity} </div>
      <div class="total price">${camera.price} €</div>
    </div>
      <hr>`
}

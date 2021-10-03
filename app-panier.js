let enStock = document.getElementById("panier")
let storage = localStorage.getItem("orinocoCamera")

if (!storage) {
  //On vérifie si storage existe
  //Si non
  console.log("vide")
} else {
  let products = storage.products
  for (let i = 0; i < products.length; i++) {
    let infoProduit = products[i]
    console.log(products) //Récupère pour un élément du panier ses infos sous forme d'objet
    enStock.innerHTML = `
    <hr>
    <div class="product col-7">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <h5>Nom de l'appareil</h5>
          <p class="title">hello</p>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6">
          <h4>Taille de la lentille</h4>
          <p class="lenses">${infoProduit.lenses}</>
        </div>
      </div>
    </div>
    <div class="price col-3">
      <p>A l'unité<br>Quantité<br>Total</p>
    </div>
    <div class="price col-2">
      <div class="price">${infoProduit.priceByItems} €</div>
      <div class="quantity">${infoProduit.quantity} </div>
      <div class="total price">${infoProduit.price} €</div>
    </div>
      <hr>`
  }

  console.log(infoproduit)
}

// tableRow()

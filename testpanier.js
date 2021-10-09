let camera
let totalPrice = 0
const $productsTableBody = document.querySelector("#products-tablebody")
let storage = localStorage.getItem("orinocoCamera")

if (!storage) {
  storage = {
    products: [], //Créé un tableau vide
  }
} else {
  storage = JSON.parse(storage)
  products = storage.products //Un tableau avec un index = une ligne/items
  for (let i = 0; i < products.length; i++) {
      camera = products[i] //Récupère pour un élément du panier ses infos sous forme d'objet
    }
    $productsCalcul.innerHTML = totalPrice //On fait le total de notre tableau
  }
  myButtonReduce.addEventListener("click", function (event) {
    camera = {
      //On modifie l'objet
      name: myTdName.textContent,
      _id: myTr.id,
      lenses: "",
      quantity: mySpan.textContent,
      priceByItems: mySpanPrice.id * 1, //*1 permet de faire passer la string en number
      price: mySpanPrice.textContent * 1,
    }
    //Modification de la quantité et du prix
    camera.quantity = mySpan.textContent //Prends la valeur textContent exact au click
    let quantity = --camera.quantity //Redeviens un nombre
    mySpan.textContent = quantity //la quantité décrémente à chaque click
    let price = mySpanPrice.id * quantity
    //Condition popur changer le prix en fonction de la quantité
   let pos = products.indexOf(camera) //On récupère l'index du camera ciblé
      products.splice(pos, 1) //On supprime l'ancien camera
    //Recalcul du panier total
    const $productsCalcul = document.querySelector("#sub-total")
    totalPrice -= mySpanPrice.id * 1 //fait passer myTdPrice.id d'une string à un number
    $productsCalcul.textContent = totalPrice
    camera.price = mySpanPrice.textContent * 1 //On stock la dernière valeur affiché
    //Fonction pour modifier le tableau enregistré
    const filterById = obj => {
      //Fonction pour filtrer notre products
      //obj renvoie mon élément ciblé + sa version modifié
      if (obj._id === myTr.id) {
        //On vérifie si les id sont identique, si oui
        let pos = products.indexOf(obj) //On récupère l'index du obj ciblé
        products.splice(pos, 1) //On supprime l'ancien obj
        products.push(camera) //On ajoute l'obj modifié
        return true
      }
    }
    let productsByID = products.filter(filterById) //Ne me sers à rien mais je ne sais pas comment
    console.log("Tableau filtré", productsByID) //Appeler ma fonction autrement
    window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
    event.stopPropagation()
    event.preventDefault()
  })
  console.log("mon tableau products avant click", products)

  } else if (products.length >= 1 && localStorage.order) {
    //Si on a déjà une commande affiche tableEmpty

    //Fonction pour notre panier vide
    const tableEmpty = () => {
      $productsTableBody.innerHTML += `
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td></td>
          <td class="text-center">Votre panier est vide</td>
          <td></td>
     </tr>
     `
    }
  }



//Fonction pour annuler la commande
const clearCommand = () => {
  localStorage.clear() //Vide le local storage
  alert(`Commande annulée. Vous allez être redirigé vers la page d'accueil.`)
}

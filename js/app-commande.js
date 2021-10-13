// // ************RECUPERATION DU PANIER************************************************
// //Page order
// //On initialise nos variables
// let storageCommand = localStorage.getItem("sendCommand") //On récupère notre storageCommand en json

// ************MANIPULATION DU FORMULAIRE************************************
let form = document.getElementById("orderForm")
let testRegExp
// Fonction validation pour OnlyLettersInput
const validOLI = function (input) {
  let OLIregExp = /^[^-'][a-zA-Zàâäéèêëçùûüôö'-]+[^-']$/
  testRegExp = OLIregExp.test(input.value)
  let small = input.nextElementSibling
  if (!testRegExp) {
    small.innerHTML =
      "Saisie invalide (uniquement lettre minuscules et/ou majuscules (ex: Marc)"
    return false
  } else {
    small.innerHTML = `<i class="fa fa-check" style="color:green"></i>`
    return true
  }
}
// Fonction validation pour Emails
const validEmail = function (input) {
  let emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  testRegExp = emailRegExp.test(input.value)
  let small = input.nextElementSibling
  if (!testRegExp) {
    small.innerHTML = "Adresse mail invalide (ex: 123-john_DOE@gmail.com)"
    return false
  } else {
    small.innerHTML = `<i class="fa fa-check" style="color:green"></i>`
    return true
  }
}

const validAdress = function (input) {
  let AdressRegExp = /([0-9]*) ?([a-zA-Z,\. ]*)$/
  testRegExp = AdressRegExp.test(input.value)
  let small = input.nextElementSibling
  if (!testRegExp) {
    small.innerHTML = `Saisie invalide (veuillez saisir une adresse type : "Numéro de la voie" et/ou "Nom de la voie"`
    return false
  } else {
    small.innerHTML = `<i class="fa fa-check" style="color:green"></i>`
    return true
  }
}

// Appels des fonctions
form.prenom.addEventListener("change", function () {
  validOLI(this)
})
form.nom.addEventListener("change", function () {
  validOLI(this)
})
form.email.addEventListener("change", function () {
  validEmail(this)
})
form.adresse.addEventListener("change", function () {
  validAdress(this)
})
form.ville.addEventListener("change", function () {
  validOLI(this)
})

// **********************CREATION TABLEAU ID TO SEND
let idToSend
let idStorage = JSON.parse(localStorage.getItem("idsToSend"))
for (let i = 0; i < products.length; i++) {
  camera = products[i]
  console.log(products)
  idToSend = camera._id
  console.log(idToSend)
  if (!idStorage) {
    idStorage = []
    console.log(idStorage)
  } else {
    console.log(idStorage)
  }
  idStorage.push(idToSend)
}

// ***************************POST API************
form.addEventListener("submit", send)

function send(e) {
  e.preventDefault()
  if (
    validOLI(form.prenom) &&
    validOLI(form.nom) &&
    validEmail(form.email) &&
    validAdress(form.adresse) &&
    validOLI(form.ville)
  ) {
    let order = {
      contact: {
        firstName: form.prenom.value,
        lastName: form.nom.value,
        address: form.adresse.value,
        city: form.ville.value,
        email: form.email.value,
      },
      products: idStorage,
    }
    console.log(order)
    order = JSON.stringify(order)
    console.log(order)

    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: order,
    })
      .then(async result_ => {
        const result = await result_.json() //On attend le résultat de resul_.json() pour exécuter le reste
        let response = document.getElementById("orderId")
        response.innerHTML = `
     <div class="row text-light">
          <h3>Votre OriCommande n°${result.orderId} a bien été transmise. Rendez-vous dans votre boîte mail pour suivre votre commande !</h3>
      </div>`
        localStorage.clear()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577626-sauvegardez-des-donnees-sur-le-service-web
// //   Expects request to contain:
// //  * contact: {
// //  *   firstName: string,
// //  *   lastName: string,
// //  *   address: string,
// //  *   city: string,
// //  *   email: string
// //  * }
// //  * products: [string] <-- array of product _id    juste un tableau d'id de la camréra

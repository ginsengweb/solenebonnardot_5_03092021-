// ********************************          FORMULAIRE                ************************************
//VARIABLES
let form = document.getElementById("orderForm")
let testRegExp
// REGEXP // MSG INFO // RETURN POUR VALIDATION
// export l.7-19
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
// export l.21-33
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
// export l.35-46
const validAdress = function (input) {
  let AdressRegExp = /^([0-9]*) ?([a-zA-Z,\. ]*)$/
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
// APPEL FONCTIONS ONCHANGE
// export chaque fonction
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

// ******************************         ENVOI DU FORMULAIRE         ***********************************
// ARRAY PRODUCTS ID
let idToSend
let idStorage = JSON.parse(localStorage.getItem("idsToSend"))
// export l.70-82
for (let i = 0; i < products.length; i++) {
  camera = products[i]
  console.log(products)
  idToSend = camera._id
  console.log(idToSend)
  if (!idStorage) {
    idStorage = []
    console.log(idStorage) //test
  } else {
    console.log(idStorage) //test
  }
  idStorage.push(idToSend)
}

//CONDITION //
// export l.86-132
function send(e) {
  e.preventDefault()
  if (
    validOLI(form.prenom) &&
    validOLI(form.nom) &&
    validEmail(form.email) &&
    validAdress(form.adresse) &&
    validOLI(form.ville)
  ) {
    //CREATION FORM
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
    order = JSON.stringify(order)
    console.log(order) //test
    // ENVOI API
    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: order,
    })
      // REPONSE API
      .then(async result_ => {
        const result = await result_.json()
        //TEMPLATE ORDERID ET CLEARSTORAGE
        let response = document.getElementById("result")
        response.innerHTML = `
     <div class="row text-light">
          <h3>Votre OriCommande n°${result.orderId} d'un montant total de ${finalPrice} € a bien été transmise. Rendez-vous dans votre boîte mail pour suivre votre commande !</h3>
      </div>`
        localStorage.clear()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// SUBMIT FORM ONCLICK BTN SUBMIT
form.addEventListener("submit", send)

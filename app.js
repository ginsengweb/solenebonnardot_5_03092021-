// Initialisation des variables générales pour savoir l'endroit où je me trouve
let urlLocation = document.location
const urlApi = "http://localhost:3000/api/cameras"

// Initialisation des variables
const $cameraList = document.getElementById("camera-list")
// Récupération des données de l'API
fetch(urlApi).then(async result_ => {
  //Fonction flechée asynchrone qui
  // s'exécute après résolution de la promesse
  let camera
  const result = await result_.json()
  result
    .forEach(result => {
      camera = result
      cameraCard(camera)
    })
    .catch(error => {
      console.log(error)
    })

  // mettre en place un catch si erreur de chargement oua utre...
})

// Création du template
const cameraCard = camera => {
  $cameraList.innerHTML += `<div class="camera-item card col-sm-10 col-md-6 col-lg-4 shadow p-2 my-3">
  <a href="http://127.0.0.1:5500/product.html?id=${camera._id}">
    <img class="card-img-top" src="${camera.imageUrl}">
    <div class="card-body>
      <h3 class="card-title">${camera.name}</h3>
      <p class="card-text">${camera.price}</p>

</div>
    </div>
  </a>
</div>`
}

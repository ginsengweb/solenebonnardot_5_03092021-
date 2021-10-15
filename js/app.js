// URL
let urlLocation = document.location
const urlApi = "http://localhost:3000/api/cameras"

// VARIABLES
const $cameraList = document.getElementById("camera-list")

// PROMISE ***** focntion flechee asynchrone
fetch(urlApi).then(async result_ => {
  let camera
  const result = await result_.json()
  result
    .forEach(result => {
      camera = result
      cameraCard(camera)
    })
    .catch(error => {
      console.log(error)
      $cameraList.innerHTML = `Une erreur est survenue pendant le chargement de la page, tentez de rafraîchir !`
    })
})

// TEMPLATE
const cameraCard = camera => {
  $cameraList.innerHTML += `
<div class="row col-sm-12 col-md-6 col-lg-4 p-2"
  <div class="card camera-item bg-light shadow p-5">
    <a href="html/product.html?id=${camera._id}">
      <img class="card-img-top" src="${camera.imageUrl}">
      <div class="card-body>
        <h3 class="card-title text-light">${camera.name}</h3>
        <p class="card-text">${camera.description}</p>
      </div>
    </a>
  </div>
</div>
  `
}

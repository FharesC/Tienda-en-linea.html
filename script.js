let contenido = document.querySelector("#contenidoAca");
let URL = `https://api.escuelajs.co/api/v1/products`;
let canvas = document.querySelector("#offcanvasRight");
let contenidoCanvas = document.querySelector("#contCanvas");
let datos = [];
let loader = document.querySelector("#loader");
let pago = document.querySelector("#pago");
let datosLocal = JSON.parse(localStorage.getItem("producto")) || [];
let numero = document.querySelector("#num");
let numero2 = document.querySelector("#num2");

fetch(URL)
  .then((Response) => Response.json())
  .then((data) => {
    let detalles = data.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.images[0],
      price: item.price,
    }));
    datos = detalles;
    loader.className = "d-none";
    datos.forEach((element) => {
      contenido.innerHTML += crearCard(element);
    });
  })
  .catch(() => {
    alert(
      "Lastimosamente el contenido no cargó de la manera correcta, por favor intente nuevamente"
    );
  })
  .finally(() => {
    renderizarCanvas();
  });

const crearCard = (dato) => {
  return `
    <div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-3  " id="O">
        <div class="card  " style="width: 18rem; height: 22rem; ">
          <span class=" m-2 position-absolute rounded-circle text-center d-flex align-items-center justify-content-center btn btn-light" style="height: 2rem; left: 82%;;width: 2rem; background-color: rgb(230, 230, 230); "><i class="bi bi-heart bottom-50"></i></span>
          <img src="${dato.image}"  class="card-img-top " style="height: 13.5rem;"  alt="...">
            <div class="card-body border-top-2">
                <h5 class="card-title">${dato.title}</h5>
                <h5 class="card-title fw-bold" style="color: #8741e3;">$ ${dato.price}</h5>
                <button class="btn btn-primary d-flex justify-content-center m-auto w-100" onclick="filtroCanvas(${dato.id})"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>
    </div> 
    `;
};

const filtroCanvas = (id) => {
  let filtro = datos.filter((item) => item.id == id);
  filtro.forEach((item) => {
    contenidoCanvas.innerHTML += cardCanvas(item);
  });
};

let carrito = [];
const cardCanvas = (item) => {
  numero.innerHTML = carrito.length + 1;
  numero2.innerHTML = carrito.length + 1;
  carrito.push(item);

  pago.innerHTML = parseInt(pago.textContent) + parseInt(item.price);
  localStorage.setItem("producto", JSON.stringify(carrito));
  let card = `
    <div class="card mb-3 mx-3 d-flex" style="width: 22rem; " >
        <div class="card-body p-1 ms-1 d-flex align-items-center  justify-content-start  ">   
            <div class="card-body p-1 ms-1 d-flex ">
                <img src="${item.image}" class="card-img-top ms-0  "  style="height: 7rem; width: 10rem" alt="imagen no definida">
                <div class="card-body p-1 ms-1 d-flex align-items-center  justify-content-start  flex-wrap ">
                    <h5 class="card-title m-2">${item.title}</h5>
                    <h5 class="card-text m-2">$${item.price}</h5>
                </div>
            </div>
        </div>
    </div>
    `;
  return card;
};

const renderizarCanvas = () => {
  datosLocal.forEach((item) => {
    contenidoCanvas.innerHTML += cardCanvas(item);
  });
};

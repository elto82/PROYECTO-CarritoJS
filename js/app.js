// variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  //cuando se presiona agregar al  carrito
  listaCursos.addEventListener("click", agregarCurso);
  //eliminar curso del carrito
  carrito.addEventListener("click", eliminarCurso);
  //vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//lee el contenido del Html al darle click y extrae la informacion
function leerDatosCurso(curso) {
  //console.log(curso);
  //objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //validar que el curso no este en el carrito
  const exite = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (exite) {
    // actualizar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // agregar elementos al arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carrirtoHTML();
}

//muestra el contenido del carrito en el html
function carrirtoHTML() {
  //limpiar el contenido antes de agregarlo
  limpiarHTML();

  //recorre el carrito y crea el HTML
  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${curso.imagen}" width=100></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>${curso.cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>`;

    //agrega el HTML en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//elimina el contenido del carrito
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

//eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //eliminar del arreglo
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carrirtoHTML();
  }
}

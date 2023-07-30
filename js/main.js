

// ---------------------------------INDEX.HTML---------------------------------

// Array de objetos Comidas
const ARRAY_DE_COMIDAS = []

// Función para devolver el mensaje de error de tarjetas
function devolverCardError() {
  return `<div class="problema-productos"><h2>Hubo un problema al cargar los productos ⚠️</h2>
          <h3 class ="intentelo">Lamentamos los inconvenientes técnicos</h3></div>`
}

const CONTAINER = document.querySelector(`.contenedor`);

// Función para crear una tarjeta de producto
function crearCard(comida) {
  return `<div class="card">
  <div class="content">
  <div class="title">${comida.nombre}</div>
  <div class="price">$${comida.precio}</div>
  <div class="description">${comida.imagen}</div>
  </div>
  <span>ID: ${comida.id}</span>
  <button class="button" id="${comida.id}">Agregar al carrito</button>
          </div>`
}

// Función para cargar los productos en el contenedor
function cargarProductos(array) {
  CONTAINER.innerHTML = ``;
  array.length > 0 ? array.forEach((comida) => CONTAINER.innerHTML += crearCard(comida))
    : CONTAINER.innerHTML += devolverCardError();
}

// Función para activar Click en botones de tarjetas de producto ("Agregar al carrito")
function activarClickEnBotones() {
  const BOTONES = document.querySelectorAll(`button.button`);
  const CARRITO_CANTIDAD_ELEMENT = document.querySelector('#carritoCantidad');

  BOTONES.forEach((boton) => {
    boton.addEventListener(`click`, () => {
      let producto = ARRAY_DE_COMIDAS.find((comida) => {
        return comida.id === parseInt(boton.id);
      });
      CARRITO.push(producto);
      localStorage.setItem(`CarritoPrendas`, JSON.stringify(CARRITO));

      if (CARRITO.length > 0) {
        CARRITO_CANTIDAD_ELEMENT.textContent = CARRITO.length.toString();
        CARRITO_CANTIDAD_ELEMENT.style.display = 'block';
      } else {
        CARRITO_CANTIDAD_ELEMENT.style.display = 'none';
      }

      mostrarMensajeProductoAgregado(producto.nombre, producto.imagen);
    });
  });
}

// Cargar productos en el contenedor (buscandolos en comidas.json) y activar los eventos de click en los botones
if (CONTAINER) {
  fetch('js/comidas.json')
    .then((response) => response.json())
    .then((data) => {
      ARRAY_DE_COMIDAS.push(...data);
      cargarProductos(ARRAY_DE_COMIDAS);
      activarClickEnBotones();
    })
    .catch((error) => {
      CONTAINER.innerHTML = devolverCardError(); // Mostramos el mensaje de error en el contenedor
    });
}

// Evento para actualizar el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const CARRITO_CANTIDAD_ELEMENT = document.querySelector('#carritoCantidad');
  CARRITO_CANTIDAD_ELEMENT.textContent = CARRITO.length.toString();
  if (CARRITO.length > 0) {
    CARRITO_CANTIDAD_ELEMENT.style.display = 'block';
  } else {
    CARRITO_CANTIDAD_ELEMENT.style.display = 'none';
  }
});

// Función para mostrar mensaje en la esquina inferior derecha "✅ producto agregado"
function mostrarMensajeProductoAgregado(nombreProducto, imagenProducto) {
  const MENSAJE_ELEMENT = document.createElement('div');
  MENSAJE_ELEMENT.classList.add('producto-agregado-mensaje');
  MENSAJE_ELEMENT.textContent = `✅ Producto "${nombreProducto}" ${imagenProducto} agregado al carrito`;
  document.body.appendChild(MENSAJE_ELEMENT);

  setTimeout(() => {
    MENSAJE_ELEMENT.remove();
  }, 2000);
}

// Función para recuperar carrito desde el localStorage
function recuperarCarrito() {
  JSON.parse(localStorage.getItem(`CarritoPrendas`))
  if (localStorage.getItem(`CarritoPrendas`) !== null) {
    return JSON.parse(localStorage.getItem(`CarritoPrendas`))
  } else {
    return []
  }
}

let CARRITO = recuperarCarrito();






// ---------------------------------CARRITO.HTML---------------------------------

// Constantes que representan elementos HTML

const TABLE_BODY = document.querySelector(`tbody`);

const TABLE = document.querySelector(`table`);

const DIV_ERROR = document.querySelector(`.cont-msj-error`)

// Función para listar los productos en la tabla
function listarProductosEnCarritoHTML(comida) {
  const esProductoConDescuento = ["Hamburguesa", "Taco", "Pizza"].includes(comida.nombre);
  let precioConDescuento = comida.precio;
  if (esProductoConDescuento) {
    precioConDescuento *= 0.8;
  }
  return `
    <tr>
      <td>${comida.imagen}</td>
      <td>${comida.nombre}</td>
      <td>
        ${esProductoConDescuento ? `<b>20% off</b><br><br><del>$${comida.precio.toLocaleString()}</del> $${precioConDescuento.toLocaleString()}` : `$${comida.precio.toLocaleString()}`}
      </td>
      <td>
        <span class="remover-producto" data-id="${comida.id}">❌</span>
      </td>
    </tr>
  `;
}


// Función para remover un producto del carrito (se crea un nuevo carrito excluyendo el producto que fue clickeado)
function removerProducto(identificacion) {
  CARRITO = CARRITO.filter((producto) => producto.id !== identificacion);
  localStorage.setItem('CarritoPrendas', JSON.stringify(CARRITO));
  armarCarrito();
}

// Funcion para agregar evento masivo de remover producto
function agregarEventosRemoverProducto() {
  const REMOVER_PRODUCTO_SPANS = document.querySelectorAll('.remover-producto');
  REMOVER_PRODUCTO_SPANS.forEach((span) => {
    span.addEventListener('click', (event) => {
      const ID = parseInt(event.target.dataset.id);
      removerProducto(ID);
    });
  });
}

// Evento que ejecuta agregarEventosRemoverProducto() cuando el DOM es cargado
document.addEventListener('DOMContentLoaded', () => {
  agregarEventosRemoverProducto();
});

// Funcion para agregar botón HTML para vaciar el carrito y boton para comprar
function agregarBotonVaciarCarritoYComprar() {
  return `
  <div class="cont-comprar-vaciar">
  <span class="comprar" id="comprar">Comprar</span>
  <span class="vaciar-carrito" id="vaciarCarrito">Vaciar carrito</span>
  </div>
  `;
}

// Función para mostrar mensaje de carrito vacío
function MostrarMsjCarritoVacio() {
  return `<h2 class="carrito-vacio">El carrito está vacío ⛔</h2>`
}

// Funcion para construir el contenido del carrito
function armarCarrito() {
  TABLE_BODY.innerHTML = ``;
  DIV_ERROR.innerHTML = ``;
  if (CARRITO.length > 0) {
    CARRITO.forEach((comida) => {
      TABLE_BODY.innerHTML += listarProductosEnCarritoHTML(comida);
    });
    // Calcular el total de la compra
    const totalCompra = CARRITO.reduce((total, comida) => total + (comida.precio * (["Hamburguesa", "Taco", "Pizza"].includes(comida.nombre) ? 0.8 : 1)), 0);
    // Agregar la fila con el total al final de la tabla
    TABLE_BODY.innerHTML += `
      <tr class="total">
        <td colspan="2"><strong>Total:</strong></td>
        <td>$${totalCompra.toLocaleString()}</td>
        <td></td>
      </tr>
    `;
    // Verificar si el botón "Vaciar Carrito" no existe para agregar el boton de vaciar carrito y el boton de comprar
    const VACIAR_CARRITO_BTN = document.querySelector('#vaciarCarrito');
    if (!VACIAR_CARRITO_BTN) {
      TABLE.insertAdjacentHTML('afterend', `${agregarBotonVaciarCarritoYComprar()}`);
      document.querySelector('#vaciarCarrito').addEventListener('click', vaciarCarrito);
    }
    document.querySelector('table').style.display = 'block';
    agregarEventosRemoverProducto();
  } else {
    DIV_ERROR.innerHTML += MostrarMsjCarritoVacio();
    const VACIAR_CARRITO_BTN = document.querySelector('#vaciarCarrito');
    if (VACIAR_CARRITO_BTN) {
      VACIAR_CARRITO_BTN.remove();
      BOTON_COMPRAR.remove();
    }
    document.querySelector('table').style.display = 'none';
  }
}

// Mostrar el contenido inicial del carrito
armarCarrito();

// Funcion para vaciar el carrito
function vaciarCarrito() {
  CARRITO = [];
  localStorage.removeItem('CarritoPrendas');
  armarCarrito();
  const VACIAR_CARRITO_BTN = document.querySelector('#vaciarCarrito');
  const COMPRAR_BTN = document.querySelector('#comprar');
  COMPRAR_BTN.parentNode.removeChild(COMPRAR_BTN);
  VACIAR_CARRITO_BTN.parentNode.removeChild(VACIAR_CARRITO_BTN);
}

const BOTON_COMPRAR = document.querySelector("#comprar");
  BOTON_COMPRAR.addEventListener("click", () => {
    Swal.fire(
      '<span class="sweet">Compra realizada</span>',
      '<span class="sweet">¡Muchas gracias, vuelva pronto!</span>',
      'success'
    )
  })

// ---------------------------------INDEX.HTML---------------------------------

// Clase constructora de comidas
class Comidas {
  constructor(imagen, nombre, precio, categoria) {
    this.identificacion = this.crearID();
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }
  crearID() {
    let numero = parseInt(Math.random() * 10_000);
    return numero;
  }
}

// Array de objetos Comidas
const ARRAY_DE_COMIDAS = [
  new Comidas(`🍚`, `Arroz`, 500, `Cereales`),
  new Comidas(`🍖`, `Carne`, 1600, `Carnes`),
  new Comidas(`🥓`, `Bacon`, 1000, `Carnes`),
  new Comidas(`🍜`, `Fideos`, 450, `Cereales`),
  new Comidas(`🥛`, `Leche`, 600, `Lacteos`),
  new Comidas(`🧀`, `Queso`, 1700, `Lacteos`),
  new Comidas(`🍔`, `Hamburguesa`, 1200, `Fast Food`),
  new Comidas(`🍕`, `Pizza`, 1500, `Fast Food`),
  new Comidas(`🥗`, `Ensalada`, 800, `Vegetales`),
  new Comidas(`🍓`, `Fresas`, 300, `Frutas`),
  new Comidas(`🍗`, `Pollo`, 1200, `Carnes`),
  new Comidas(`🥩`, `Bistec`, 1800, `Carnes`),
  new Comidas(`🍟`, `Papas Fritas`, 700, `Acompañamientos`),
  new Comidas(`🥪`, `Sandwich`, 900, `Bocadillos`),
  new Comidas(`🥙`, `Kebab`, 1500, `Fast Food`),
  new Comidas(`🌮`, `Taco`, 1000, `Fast Food`),
  new Comidas(`🥟`, `Empanada`, 600, `Fast Food`),
  new Comidas(`🍣`, `Sushi`, 2000, `Fast Food`),
  new Comidas(`🍨`, `Helado`, 400, `Postres`),
  new Comidas(`🍞`, `Pan`, 700, `Cereales`),
  new Comidas(`🍰`, `Pastel de Chocolate`, 1200, `Postres`),
  new Comidas(`🍪`, `Galletas`, 500, `Postres`),
  new Comidas(`🍦`, `Helado de Vainilla`, 700, `Postres`),
  new Comidas(`🍩`, `Donas`, 600, `Postres`)
];

// Función para devolver el mensaje de error de tarjetas
function devolverCardError() {
  return `<div class="problema-productos"><h2>Hubo un problema al cargar los productos ⚠️</h2>
          <h3 class ="intentelo">Lamentamos los inconvenientes técnicos</h3></div>`
}

// Función para crear una tarjeta de producto
const CONTAINER = document.querySelector(`.contenedor`);

function crearCard(comida) {
  return `<div class="card">
  <div class="content">
  <div class="title">${comida.nombre}</div>
  <div class="price">$${comida.precio}</div>
  <div class="description">${comida.imagen}</div>
  </div>
  <span>ID: ${comida.identificacion}</span>
  <button class="button" id="${comida.identificacion}">Agregar al carrito</button>
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
        return comida.identificacion === parseInt(boton.id);
      });
      CARRITO.push(producto);
      localStorage.setItem(`CarritoPrendas`, JSON.stringify(CARRITO));
      console.table(CARRITO);

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

function aplicarDescuento() {

}

// Cargar productos en el contenedor y activar los eventos de click en los botones
if (CONTAINER) {
  cargarProductos(ARRAY_DE_COMIDAS);
  activarClickEnBotones();
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

// Función para mostrar mensaje en la esquina inferior derecha "producto agregado"
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
  // Verificar si el producto es una hamburguesa, taco o pizza
  const esProductoConDescuento = ["Hamburguesa", "Taco", "Pizza"].includes(comida.nombre);

  // Calcular el precio con descuento si aplica
  let precioConDescuento = comida.precio;
  if (esProductoConDescuento) {
    precioConDescuento *= 0.8; // 20% de descuento
  }

  // Crear la fila de la tabla con el precio tachado y el precio con descuento
  return `
    <tr>
      <td>${comida.imagen}</td>
      <td>${comida.nombre}</td>
      <td>
        ${esProductoConDescuento ? `<b>20% off</b><br><br><del>$${comida.precio.toLocaleString()}</del> $${precioConDescuento.toLocaleString()}` : `$${comida.precio.toLocaleString()}`}
      </td>
      <td>
        <span class="remover-producto" data-id="${comida.identificacion}">❌</span>
      </td>
    </tr>
  `;
}

// Función para remover un producto del carrito
function removerProducto(identificacion) {
  CARRITO = CARRITO.filter((producto) => producto.identificacion !== identificacion);
  localStorage.setItem('CarritoPrendas', JSON.stringify(CARRITO));
  armarCarrito();
}

// Funcion para agregar eventos de remover producto
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

// Funcion para agregar botón para vaciar el carrito y comprar
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

    // Calcular el total de la compra usando .reduce
    const totalCompra = CARRITO.reduce((total, comida) => total + comida.precio, 0);

    // Agregar la fila con el total al final de la tabla
    TABLE_BODY.innerHTML += `
          <tr class="total">
            <td colspan="2"><strong>Total:</strong></td>
            <td>$${totalCompra.toLocaleString()}</td>
            <td></td>
          </tr>
        `;

    // Verificar si el botón "Vaciar Carrito" ya existe
    const VACIAR_CARRITO_BTN = document.querySelector('#vaciarCarrito');
    if (!VACIAR_CARRITO_BTN) {
      TABLE.insertAdjacentHTML('afterend', `${agregarBotonVaciarCarritoYComprar()}`);
      document.querySelector('#vaciarCarrito').addEventListener('click', vaciarCarrito);
    }

    document.querySelector('table').style.display = 'block';

    // Agregar eventos a los botones de remover producto
    agregarEventosRemoverProducto();
  } else {
    DIV_ERROR.innerHTML += MostrarMsjCarritoVacio();

    // Verificar si el botón "Vaciar Carrito" ya existe
    const VACIAR_CARRITO_BTN = document.querySelector('#vaciarCarrito');
    if (VACIAR_CARRITO_BTN) {
      VACIAR_CARRITO_BTN.remove();
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



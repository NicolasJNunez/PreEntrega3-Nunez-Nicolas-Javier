// Buscador (search input)

const BUSCADOR = document.querySelector(`input#buscador`);

function filtrarProductos() {
  const VALOR_BUSQUEDA = BUSCADOR.value.toLowerCase().trim();

  const RESULTADO = ARRAY_DE_COMIDAS.filter((comida) => {
    return comida.nombre.toLowerCase().includes(VALOR_BUSQUEDA);
  });

  cargarProductos(RESULTADO);
  activarClickEnBotones();
}

BUSCADOR.addEventListener(`input`, filtrarProductos);
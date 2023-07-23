// Popup 20% descuento Hamburguesas, tacos y pizzas

document.addEventListener('DOMContentLoaded', () => {
  const MOSTRAR_POPUP = sessionStorage.getItem('popupShown');

  if (!MOSTRAR_POPUP) {
    setTimeout(() => {
      mostrarPopup();
      sessionStorage.setItem('popupShown', 'true');
    }, 3000);
  }
});

function mostrarPopup() {
  const CONTENEDOR_POPUP = document.getElementById('popup-container');
  const BOTON_CERRAR = document.getElementById('close-button');

  CONTENEDOR_POPUP.style.display = 'block';

  BOTON_CERRAR.addEventListener('click', () => {
    CONTENEDOR_POPUP.style.display = 'none';
  });
}
// Función para actualizar el contador del carrito
export function updateCartCounter() {
    const contadorCarrito = document.getElementById("contador-carrito");
    const totalProductos = parseInt(localStorage.getItem("productsTotal"), 10) || 0;  // Obtener el total de productos
    if (contadorCarrito) {
      contadorCarrito.textContent = `(${totalProductos})`;  // Actualizar el contador
    }
  }
  
  // Asegurarse de que el contador se actualice al cargar la página
  document.addEventListener("DOMContentLoaded", updateCartCounter);
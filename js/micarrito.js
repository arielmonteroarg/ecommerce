import { createElement } from './funcionesExtras.js';
// Renderizar productos en el carrito
function renderCartItems() {
  cartState.init(); // Inicializar desde localStorage

  const cartContainer = document.getElementById("cart-container");
  const cartTotalElement = document.getElementById("cart-total");

  // Limpiar contenedor antes de renderizar
  cartContainer.innerHTML = "";

  // Si no hay productos en el carrito
  if (cartState.items.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    cartTotalElement.textContent = "0.00";
    return;
  }

  // Renderizar productos del carrito
  cartState.items.forEach((item) => {


    const cartItem = createElement("div", { className: "cart-item" });

    // Estructura de cada producto
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="decrease-quantity">-</button>
          <input type="text" value="${item.quantity}" class="quantity-input" />
          <button class="increase-quantity">+</button>
        </div>
        <p class="cart-item-subtotal">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
      </div><button class="remove-item">Eliminar</button>
    `;

    // Botón para eliminar el producto
    const removeButton = cartItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => {
      cartState.removeFromCart(item.id);
      renderCartItems(); // Re-renderizar después de eliminar
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Se Elimino Un item",
        showConfirmButton: false,
        timer: 1000
      });
    });

    // Botones para aumentar/disminuir cantidad
    const decreaseButton = cartItem.querySelector(".decrease-quantity");
    const increaseButton = cartItem.querySelector(".increase-quantity");
    const quantityInput = cartItem.querySelector(".quantity-input");

    // Disminuir cantidad
    decreaseButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        cartState.updateItem(item.id, item.quantity);
        renderCartItems();
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Se Desconto Un item",
          showConfirmButton: false,
          timer: 500
        });
      }
    });

    // Aumentar cantidad
    increaseButton.addEventListener("click", () => {
      item.quantity++;
      cartState.updateItem(item.id, item.quantity);
      renderCartItems();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se Agrego Un item",
        showConfirmButton: false,
        timer: 500
      });
    });

    // Cambiar cantidad manualmente
    quantityInput.addEventListener("change", (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        item.quantity = newQuantity;
        cartState.updateItem(item.id, item.quantity);
        renderCartItems();
      } else {
        event.target.value = item.quantity; // Restaurar el valor anterior
      }
    });
    cartContainer.appendChild(cartItem);
  });

  // Mostrar el total
  cartTotalElement.textContent = cartState.total.toFixed(2);
}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cartState.init(); // Inicializa el carrito al cargar
  renderCartItems(); // Renderiza los productos
});

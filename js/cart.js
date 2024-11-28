import { updateCartCounter } from './cartCounter.js'; 
// Estado del carrito usando localStorage
export const cartState = {
    items: [],
    total: 0,
    counterProducts: 0,
  
    init() {
      const storedItems = JSON.parse(localStorage.getItem('cartItems'));
      const storedTotal = parseFloat(localStorage.getItem('cartTotal'));
      const storedProducts = parseInt(localStorage.getItem('productsTotal'), 10); // Asegurar que es entero
      this.items = storedItems || [];
      this.total = storedTotal || 0;
      this.counterProducts = storedProducts || 0; // Si no hay valor, iniciar en 0
    },
  
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
      localStorage.setItem('cartTotal', this.total.toFixed(2));
      localStorage.setItem('productsTotal', this.counterProducts);
    },

/*     updateCartCounter() {
      const contadorCarrito = document.getElementById('contador-carrito');
      if (contadorCarrito) {
        const storedProducts = parseInt(localStorage.getItem('productsTotal'), 10) || 0;
        contadorCarrito.textContent = `(${storedProducts})`;
      }
    }, */
    
    addToCart(product= '') {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.total += product.price;
      this.counterProducts += 1;
      this.saveToLocalStorage();
      updateCartCounter();
    },
    


      // Actualizar un producto específico en el carrito
  updateItem(id = '', quantity = '') {
    const item = this.items.find((product) => product.id === id); // Buscar el producto por ID
    if (item) {
      const previousQuantity = item.quantity; // Guardar la cantidad previa
    //  console.log(`Cantidad previa: ${previousQuantity}, Nueva cantidad: ${quantity}`);
  
      // Actualizar la cantidad del producto
      item.quantity = quantity;
  
      // Recalcular el total de productos sumando las cantidades de todos los productos
      this.counterProducts = this.items.reduce((total, product) => total + product.quantity, 0);
  
    //  console.log(`Cantidad total de productos en el carrito: ${this.counterProducts}`);
  
      // Guardar en localStorage
      localStorage.setItem('productsTotal', this.counterProducts.toString());
      this.updateTotal(); // Recalcular el total
      this.saveToLocalStorage(); // Guardar el estado del carrito en localStorage
      updateCartCounter();
    }
  },

  // Calcular el total del carrito
  updateTotal() {
    this.total = this.items.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  },
  
    removeFromCart(productId) {
        const itemIndex = this.items.findIndex((item) => item.id === productId);
      
        if (itemIndex !== -1) {
          const item = this.items[itemIndex];
          this.total -= item.price * item.quantity;
          this.items.splice(itemIndex, 1); // Elimina el producto del carrito
          this.counterProducts = this.items.reduce((sum, item) => sum + item.quantity, 0);
          this.saveToLocalStorage(); // Actualiza localStorage
          updateCartCounter();
        }
      }      

  };
  // Inicializar el estado al cargar la página
  cartState.init();
    
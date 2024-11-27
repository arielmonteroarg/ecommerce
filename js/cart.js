// Estado del carrito usando localStorage
const cartState = {
    items: [],
    total: 0,
    counterProducts: 0,
  
    init() {
      const storedItems = JSON.parse(localStorage.getItem('cartItems'));
      const storedTotal = parseFloat(localStorage.getItem('cartTotal'));
      const storeProductos = parseInt(localStorage.getItem('productsTotal'));
      this.items = storedItems || [];
      this.total = storedTotal || 0;
      this.counterProducts = storeProductos || 0;
    },
  
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
      localStorage.setItem('cartTotal', this.total.toFixed(2));
      localStorage.setItem('productsTotal', this.counterProducts);
    },
  
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

    },

      // Actualizar un producto específico en el carrito
  updateItem(id = '', quantity = '') {
    const item = this.items.find((product) => product.id === id); // Buscar el producto por ID
    if (item) {
      const previousQuantity = item.quantity; // Guardar la cantidad previa
      console.log(`mi previousQuantity ${previousQuantity}`);
      item.quantity = quantity; // Actualizar la cantidad

      const difference = quantity - previousQuantity; // Diferencia entre la nueva cantidad y la anterior
     counterProducts = difference; // Actualizar el contador
console.log(`mi contador ${counterProducts}`);
      this.updateTotal(); // Recalcular el total
      this.saveToLocalStorage(); // Guardar el estado del carrito en localStorage
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
          this.counterProducts -= 1;
          this.saveToLocalStorage(); // Actualiza localStorage
        }
      }
  };
  // Inicializar el estado al cargar la página
  cartState.init();
  
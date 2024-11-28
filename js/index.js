
import { createElement } from './funcionesExtras.js';
import { cartState } from './cart.js';
const products = [
    {
      id: 1,
      name: "Luminous Glow Serum",
      description: "Advanced brightening serum with vitamin C and hyaluronic acid",
      price: 49.99,
      category: "Skincare",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      name: "Rose Gold Palette",
      description: "12 stunning eyeshadow shades in matte and shimmer finishes",
      price: 39.99,
      category: "Makeup",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      name: "Hydrating Face Cream",
      description: "Rich moisturizer with natural ingredients for 24-hour hydration",
      price: 45.99,
      category: "Skincare",
      image: "https://via.placeholder.com/300x200"
    }
  ];
  
  // Renderizar productos en index.html
  const container = document.getElementById("product-container");
  
if (container) {
  products.forEach(product => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
} else {
  console.error("El contenedor de productos no se encontró.");
}
  
  function createProductCard(product = ' ' ) {

  
    const card = createElement("div", { className: "product-card" });
  
    const img = createElement("img", {
      attributes: { src: product.image, alt: product.name }
    });
  
  
    const priceTag = createElement("div", {
      className: "price",
      textContent: `$${product.price.toFixed(2)}`
    });
  
    const details = createElement("div", { className: "details" });

    const title = createElement("h3", { textContent: product.name });
  
    const description = createElement("p", { textContent: product.description });
  
    const category = createElement("span", {
      className: "category",
      textContent: product.category
    });
  
    const addToCartButton = createElement("button", {
      className: "add-to-cart",
      textContent: "Agregar al Carrito"
    });

    addToCartButton.addEventListener("click", () => {
      cartState.addToCart(product);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Se Agrego ${product.name} al carrito.`,
        showConfirmButton: false,
        timer: 1500
      });
    });


  
    details.append(title, description, category, addToCartButton);
    card.append(img, priceTag, details);
  
    return card;
  }

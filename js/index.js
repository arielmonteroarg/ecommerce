
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

  
    const card = document.createElement("div");
    card.className = "product-card";
  
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
  
    const priceTag = document.createElement("div");
    priceTag.className = "price";
    priceTag.textContent = `$${product.price.toFixed(2)}`;
  
    const details = document.createElement("div");
    details.className = "details";
  
    const title = document.createElement("h3");
    title.textContent = product.name;
  
    const description = document.createElement("p");
    description.textContent = product.description;
  
    const category = document.createElement("span");
    category.className = "category";
    category.textContent = product.category;
  
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "add-to-cart";
    addToCartButton.textContent = "Agregar al Carrito";
    addToCartButton.addEventListener("click", () => {
      cartState.addToCart(product);
//llamar a funcion 
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

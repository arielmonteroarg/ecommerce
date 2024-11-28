
//exportamos funcion para crear elementos html de manera generica 
export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
  
    // Asignar clases si se pasan
    if (options.className) {
      element.className = options.className;
    }
  
    // Asignar contenido de texto si se pasa
    if (options.textContent) {
      element.textContent = options.textContent;
    }
  
    // Asignar atributos (como src, alt, id, etc.)
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
  
    return element;
  }

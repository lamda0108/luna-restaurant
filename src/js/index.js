import { Products } from "./classes/Products.js";
import { UI } from "./classes/UI.js";
import { Storage } from "./classes/LocalStorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();
  ui.setupApp();
  products
    .getProducts()
    .then((products) => {
      ui.productsDiv(products);
      Storage.saveProducts(products);
      console.log(JSON.parse(localStorage.getItem("products")));
    })
    .then(() => {
      ui.getCartButtons();
      ui.cartLogic();
    });
});

import { Storage } from "./LocalStorage.js";

const menuDOM = document.querySelector(".menu-box");
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

let cart = [];
let buttonsDOM = [];

export class UI {
  productsDiv(products) {
    let menu = "";
    products.forEach((product) => {
      menu += `
          <div class="menu-card">
          <div class="card-overlay">
            <h2>${product.title}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus, temporibus!
            </p>
            <h3>${product.price}</h3>
            <button class="menu-cart" data-id=${product.id}>add to cart</button>
          </div>
          <img src=${product.image} alt="menu" />
          
        </div>
          `;
    });
    menuDOM.innerHTML = menu;
  }

  getCartButtons() {
    const buttons = [...document.querySelectorAll(".menu-cart")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        let product = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, product];
        Storage.saveCart(cart);
        this.addCartItem(product);
        this.updateCartValue(cart);
        this.showCart();
      });
    });
  }

  updateCartValue(cart) {
    let quan = 0;
    let total = 0;
    cart.forEach((item) => {
      quan += item.amount;
      total += item.price * item.amount;
    });
    cartTotal.innerText = parseFloat(total.toFixed(2));
    cartItems.innerText = quan;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src=${item.image} alt="product1" />
      <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>
      `;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupApp() {
    cart = Storage.getCart();
    this.updateCartValue(cart);
    cart.forEach((item) => this.addCartItem(item));
    closeCartBtn.addEventListener("click", this.hideCart);
    cartBtn.addEventListener("click", this.showCart);
  }

  getSingleBtn(id) {
    return buttonsDOM.find((btn) => btn.dataset.id === id);
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeProduct(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }

  removeProduct(id) {
    cart = cart.filter((item) => item.id !== id);
    Storage.saveCart(cart);
    this.updateCartValue(cart);
    let btn = this.getSingleBtn(id);
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  cartLogic() {
    // clear cart btn
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });

    // cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeProduct(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount += 1;
        Storage.saveCart(cart);

        this.updateCartValue(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount -= 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.updateCartValue(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeProduct(id);
        }
      }
    });
  }
}

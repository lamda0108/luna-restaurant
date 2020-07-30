/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/classes/LocalStorage.js":
/*!****************************************!*\
  !*** ./src/js/classes/LocalStorage.js ***!
  \****************************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Storage\", function() { return Storage; });\nclass Storage {\n  static saveProducts(products) {\n    localStorage.setItem(\"products\", JSON.stringify(products));\n  }\n\n  static getProduct(id) {\n    const products = JSON.parse(localStorage.getItem(\"products\"));\n    return products.find((product) => product.id === id);\n  }\n\n  static saveCart(cart) {\n    localStorage.setItem(\"cart\", JSON.stringify(cart));\n  }\n\n  static getCart() {\n    return localStorage.getItem(\"cart\")\n      ? JSON.parse(localStorage.getItem(\"cart\"))\n      : [];\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/classes/LocalStorage.js?");

/***/ }),

/***/ "./src/js/classes/Products.js":
/*!************************************!*\
  !*** ./src/js/classes/Products.js ***!
  \************************************/
/*! exports provided: Products */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Products\", function() { return Products; });\nclass Products {\n  async getProducts() {\n    let result = await fetch(\"./js/products.json\");\n    let data = await result.json();\n    let products = data.items;\n    products = products.map((item) => {\n      const { title, price } = item.fields;\n      const { id } = item.sys;\n      const image = item.fields.image.fields.file.url;\n      return { title, price, id, image };\n    });\n    return products;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/classes/Products.js?");

/***/ }),

/***/ "./src/js/classes/UI.js":
/*!******************************!*\
  !*** ./src/js/classes/UI.js ***!
  \******************************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UI\", function() { return UI; });\n/* harmony import */ var _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocalStorage.js */ \"./src/js/classes/LocalStorage.js\");\n\n\nconst menuDOM = document.querySelector(\".menu-box\");\nconst cartBtn = document.querySelector(\".cart-btn\");\nconst closeCartBtn = document.querySelector(\".close-cart\");\nconst clearCartBtn = document.querySelector(\".clear-cart\");\nconst cartDOM = document.querySelector(\".cart\");\nconst cartOverlay = document.querySelector(\".cart-overlay\");\nconst cartItems = document.querySelector(\".cart-items\");\nconst cartTotal = document.querySelector(\".cart-total\");\nconst cartContent = document.querySelector(\".cart-content\");\n\nlet cart = [];\nlet buttonsDOM = [];\n\nclass UI {\n  productsDiv(products) {\n    let menu = \"\";\n    products.forEach((product) => {\n      menu += `\n          <div class=\"menu-card\">\n          <div class=\"card-overlay\">\n            <h2>${product.title}</h2>\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n              Doloribus, temporibus!\n            </p>\n            <h3>${product.price}</h3>\n            <button class=\"menu-cart\" data-id=${product.id}>add to cart</button>\n          </div>\n          <img src=${product.image} alt=\"menu\" />\n          \n        </div>\n          `;\n    });\n    menuDOM.innerHTML = menu;\n  }\n\n  getCartButtons() {\n    const buttons = [...document.querySelectorAll(\".menu-cart\")];\n    buttonsDOM = buttons;\n    buttons.forEach((button) => {\n      let id = button.dataset.id;\n      let inCart = cart.find((item) => item.id === id);\n      if (inCart) {\n        button.innerText = \"In Cart\";\n        button.disabled = true;\n      }\n      button.addEventListener(\"click\", (e) => {\n        e.target.innerText = \"In Cart\";\n        e.target.disabled = true;\n        let product = { ..._LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].getProduct(id), amount: 1 };\n        cart = [...cart, product];\n        _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].saveCart(cart);\n        this.addCartItem(product);\n        this.updateCartValue(cart);\n        this.showCart();\n      });\n    });\n  }\n\n  updateCartValue(cart) {\n    let quan = 0;\n    let total = 0;\n    cart.forEach((item) => {\n      quan += item.amount;\n      total += item.price * item.amount;\n    });\n    cartTotal.innerText = parseFloat(total.toFixed(2));\n    cartItems.innerText = quan;\n  }\n\n  addCartItem(item) {\n    const div = document.createElement(\"div\");\n    div.classList.add(\"cart-item\");\n    div.innerHTML = `\n      <img src=${item.image} alt=\"product1\" />\n      <div>\n        <h4>${item.title}</h4>\n        <h5>$${item.price}</h5>\n        <span class=\"remove-item\" data-id=${item.id}>remove</span>\n      </div>\n      <div>\n        <i class=\"fas fa-chevron-up\" data-id=${item.id}></i>\n        <p class=\"item-amount\">${item.amount}</p>\n        <i class=\"fas fa-chevron-down\" data-id=${item.id}></i>\n      </div>\n      `;\n    cartContent.appendChild(div);\n  }\n\n  showCart() {\n    cartOverlay.classList.add(\"transparentBcg\");\n    cartDOM.classList.add(\"showCart\");\n  }\n\n  hideCart() {\n    cartOverlay.classList.remove(\"transparentBcg\");\n    cartDOM.classList.remove(\"showCart\");\n  }\n\n  setupApp() {\n    cart = _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].getCart();\n    this.updateCartValue(cart);\n    cart.forEach((item) => this.addCartItem(item));\n    closeCartBtn.addEventListener(\"click\", this.hideCart);\n    cartBtn.addEventListener(\"click\", this.showCart);\n  }\n\n  getSingleBtn(id) {\n    return buttonsDOM.find((btn) => btn.dataset.id === id);\n  }\n\n  clearCart() {\n    let cartItems = cart.map((item) => item.id);\n    cartItems.forEach((id) => this.removeProduct(id));\n    while (cartContent.children.length > 0) {\n      cartContent.removeChild(cartContent.children[0]);\n    }\n    this.hideCart();\n  }\n\n  removeProduct(id) {\n    cart = cart.filter((item) => item.id !== id);\n    _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].saveCart(cart);\n    this.updateCartValue(cart);\n    let btn = this.getSingleBtn(id);\n    btn.disabled = false;\n    btn.innerHTML = `<i class=\"fas fa-shopping-cart\"></i>add to cart`;\n  }\n\n  cartLogic() {\n    // clear cart btn\n    clearCartBtn.addEventListener(\"click\", () => {\n      this.clearCart();\n    });\n\n    // cart functionality\n    cartContent.addEventListener(\"click\", (event) => {\n      if (event.target.classList.contains(\"remove-item\")) {\n        let removeItem = event.target;\n        let id = removeItem.dataset.id;\n        cartContent.removeChild(removeItem.parentElement.parentElement);\n        this.removeProduct(id);\n      } else if (event.target.classList.contains(\"fa-chevron-up\")) {\n        let addAmount = event.target;\n        let id = addAmount.dataset.id;\n        let tempItem = cart.find((item) => item.id === id);\n        tempItem.amount += 1;\n        _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].saveCart(cart);\n\n        this.updateCartValue(cart);\n        addAmount.nextElementSibling.innerText = tempItem.amount;\n      } else if (event.target.classList.contains(\"fa-chevron-down\")) {\n        let lowerAmount = event.target;\n        let id = lowerAmount.dataset.id;\n        let tempItem = cart.find((item) => item.id === id);\n        tempItem.amount -= 1;\n        if (tempItem.amount > 0) {\n          _LocalStorage_js__WEBPACK_IMPORTED_MODULE_0__[\"Storage\"].saveCart(cart);\n          this.updateCartValue(cart);\n          lowerAmount.previousElementSibling.innerText = tempItem.amount;\n        } else {\n          cartContent.removeChild(lowerAmount.parentElement.parentElement);\n          this.removeProduct(id);\n        }\n      }\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/classes/UI.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Products_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Products.js */ \"./src/js/classes/Products.js\");\n/* harmony import */ var _classes_UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/UI.js */ \"./src/js/classes/UI.js\");\n/* harmony import */ var _classes_LocalStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/LocalStorage.js */ \"./src/js/classes/LocalStorage.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const products = new _classes_Products_js__WEBPACK_IMPORTED_MODULE_0__[\"Products\"]();\n  const ui = new _classes_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"UI\"]();\n  ui.setupApp();\n  products\n    .getProducts()\n    .then((products) => {\n      ui.productsDiv(products);\n      _classes_LocalStorage_js__WEBPACK_IMPORTED_MODULE_2__[\"Storage\"].saveProducts(products);\n      console.log(JSON.parse(localStorage.getItem(\"products\")));\n    })\n    .then(() => {\n      ui.getCartButtons();\n      ui.cartLogic();\n    });\n});\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });
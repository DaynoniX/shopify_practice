'use strict';

const selectors = {
  productId: '[name="id"]',
  productJSON: '[data-product-json]',
  productPrice: '.product__price',
  addToCart: '.product__atc',
  addToCartText: '.product__atc span',
  form: 'form',
  quantity: '.quantity__input',
  var_select: '#product-select'
};
const cart_options = {
  items:[
    {
      id: '',
      quantity: 1
    }
  ]
};
const cart_indicator = document.querySelector('#external_indicator');

class MainProduct extends HTMLElement {
  constructor() {
    super();
    this.variantSelect = this.querySelector(selectors.productId);
    const productJSONHTML = this.querySelector(selectors.productJSON);
    this.productJSON = productJSONHTML ? JSON.parse(productJSONHTML.innerHTML) : null;
    this.form = this.querySelector(selectors.form);

    if (this.productJSON) {
      const currentVariant = this.querySelector(selectors.var_select).value;
      this.onVariantChange(currentVariant);
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.variantSelect) {
      this.variantSelect.addEventListener('change', (event) => {
        const currentVariant = this.productJSON.variants.find((variant) => variant.id === +event.target.value);
        this.onVariantChange(currentVariant);
      });
    }
    this.form.addEventListener('submit', (event)=>{
      event.preventDefault();
      cart_options.items[0].quantity = this.querySelector(selectors.quantity).value;
      this.addToCart(cart_options);
    })
  }

  onVariantChange(currentVariant) {
    if (!this.productJSON || !currentVariant) {
      return;
    }

    const $productPrice = this.querySelector(selectors.productPrice);
    const $addToCart = this.querySelector(selectors.addToCart);
    const $addToCartText = this.querySelector(selectors.addToCartText);

    if (currentVariant) {
      window.history.replaceState({}, '', `${location.origin}${location.pathname}?variant=${currentVariant.id}`);
      cart_options.items[0].id = currentVariant.id;
      $productPrice.innerHTML = formatMoney(currentVariant.price);

    }

    if (currentVariant && currentVariant.available) {
      $addToCart.removeAttribute('disabled');
      $addToCartText.innerHTML = Shopify.variantStrings.addToCart;
    } else {
      $addToCart.setAttribute('disabled', 'disabled');
      $addToCartText.innerHTML = Shopify.variantStrings.soldOut; // Not availability
    }
  }

  addToCart(cart_options){
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart_options)
    }
    fetch('/cart/add.js', options)
      .then(response =>response.json())
      .then(()=> cart_indicator ? cart_indicator.dataset.changed = '1' : console.log('item added to cart'))
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

customElements.define('main-product', MainProduct);

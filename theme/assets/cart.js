class CustomCart extends HTMLElement {
  constructor(){
    super();
    this.template = this.querySelector('template');
    this.body = this.querySelector('.cart-popup_body');
    this.popup = this.querySelector('.popup');
    this.icon = this.querySelector('.cart-icon');

    this.icon.addEventListener('click', ()=>this.open());
    this.popup.addEventListener('click', (e)=>this.close(e))

  }
  open(){
      this.popup.classList.add('open');
      this.getCart();
  }
  close(e){
    if (e.target === this.popup){
      this.popup.classList.remove('open')
    }
  }
  getCart(){
    fetch('/cart.js')
      .then((response) => response.json())
      .then(data => {
        console.log(data.items)
        data.items.forEach(item => this.addItem(item));
      })
  }
  addItem(data){
    const item = this.template.content.cloneNode(true);
    item.querySelector('.title').innerHTML = data.title;
    this.body.appendChild(item)
  }
  update(){};
  clean(){};
  appendItem(){
    this.body.appendChild(this.template.cloneNode(true))
  }
}
customElements.define('custom-cart', CustomCart);

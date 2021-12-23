class CustomCart extends HTMLElement {
  constructor(){
    super();
    this.template = this.querySelector('template');
    this.body = this.querySelector('.cart-popup_body');
    this.popup = this.querySelector('.popup');
    this.icon = this.querySelector('.cart-icon');
    this.external_indicator = this.querySelector('#external_indicator');

    this.icon.addEventListener('click', ()=>this.open());
    this.popup.addEventListener('click', (e)=>this.close(e));
    document.addEventListener('DOMContentLoaded', ()=> this.getCart());

    // Observer to catch new entries in cart
    const config = {
      attributes: true
    };
    const observer = new MutationObserver(()=>{
      this.getCart();
      this.showNotification();
      observer.disconnect();
      this.external_indicator.dataset.changed = '0';
      observer.observe(this.external_indicator, config);
    });
    observer.observe(this.external_indicator, config);
  }
  open(){
      this.popup.classList.add('open');
  }
  close(e){
    if (e.target === this.popup){
      this.popup.classList.remove('open')
    }
  }
  getCart(){
    const options = {
      method: 'GET',
      dataType: 'json',
    }
    fetch('/cart.js', options)
      .then((response) => response.json())
      .then(data => {
        data.items.forEach((item, index) => this.addItem(item, index));
        this.querySelector('.cart-popup_head .counter').innerHTML = data.item_count;
        if (this.icon.dataset.count !== data.item_count && this.icon.dataset.count !== null){
          this.icon.dataset.count = data.item_count;
        }
      })
      .then(()=> {
        this.quantity = this.querySelectorAll(".quantity input.quantity__input");
        this.quantity.forEach((input)=>{
          if (!input.hasAttribute('indexed')) {
            input.setAttribute('indexed','');
            input.addEventListener("change", (e) => {
              this.update(e.target.dataset.index, e.target.value);
            });
          }
        });
      })
      .catch(err => console.log(err))
  }
  addItem(data, index){
    const item = this.template.content.cloneNode(true);

    if (!this.querySelector('#id_'+(data.id).toString())){
      item.querySelector('.cart-item').id = 'id_'+(data.id).toString();
      item.querySelector('.title').innerHTML = data.title;

      item.querySelector('input.quantity__input').value = data.quantity;
      item.querySelector('input.quantity__input').dataset.index = data.id;
      item.querySelector('input.quantity__input').id += data.id;
      item.querySelector('input.quantity__input').setAttribute('name', 'quantity_' + index);

      item.querySelector('.cart-item_img').style.background = "url(" + data.image + ") no-repeat top/cover";
      item.querySelector('input.item_id').setAttribute('name', 'id_' + index);

      this.body.appendChild(item);
    }
  }
  deleteItem(index){
    this.update(index, 0)
  }
  update(index, quantity){
    const xhr = new XMLHttpRequest();
    let body = JSON.stringify({ updates: {[index]: quantity }, section: 'cart-item' });
    this.body.classList.add('loading');

    xhr.open('POST', '/cart/update.js', true );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
    xhr.onload = () =>{
      this.getCart();
      this.body.classList.remove('loading');
    }
  }
  clean(){
    fetch('/cart/clear.js')
      .then(response => response.json())
      .then(()=> this.getCart())
  }
  showNotification(){
    console.log('new item added')
  }
}
customElements.define('custom-cart', CustomCart);

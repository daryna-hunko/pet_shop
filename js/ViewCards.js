export default class View {
  initListeners(contr) {
    document.querySelector('.filter').addEventListener("click", e=>{
      document.querySelector('.shopping-cart-inner').classList.remove("visible");
      document.querySelector('.prompt').value = null;
      contr.filter()
    });
    document.querySelector('.lang-menu').addEventListener("click", e=>{
      document.querySelector('.shopping-cart-inner').classList.remove("visible");
      document.querySelector('.prompt').value = null;
      contr.transtateCards(e)
    });
    document.querySelector('.search').addEventListener("keydown", e=>{
      document.querySelector('.shopping-cart-inner').classList.remove("visible");
      if(event.key==="Enter"){
        contr.searchCards();
      }
    });
    document.querySelector('.shopping-cart').addEventListener("click", e=>{
      document.querySelector('.shopping-cart-inner').classList.toggle("visible");
      contr.buldCart();
    });
    document.querySelector('.enter-shop').addEventListener("click", e=>{
      document.querySelector('.enter-shop').classList.add("hidden");
      document.querySelector('.shop').classList.remove("hidden");
    });
  }
  create(el, contr) {
    const rowCards = document.querySelector('.products-container');
    let parentDiv = document.createElement('div'),
        uniqueCartClass = 'card-' + el.id,
        description = '',
        content = '';
    el.link = parentDiv;

    description = '<div class=\"descr\">';
    for(let part in el){
      if (part !== 'title' && part !== 'prod_url' && part !== 'id' && part !== 'type' && part !== 'quantity' && part !== 'link') {
        content += '<p>' + this.transtate(part)  + ": " + this.transtate(el[part]) + '</p>';
      }
    }
    description += content + '</div>';

    parentDiv.classList.add('ui', 'card', uniqueCartClass);
    if (el.quantity == 0) {
      parentDiv.classList.add('no-products');
    }
    parentDiv.innerHTML = `<div class="image">
            <img src="${el.prod_url}">
          </div>
          <div class="content">
            <a class="header">${el.title}</a>
            <!-- <div class="available">Available at the moment: ${el.quantity}</div> -->
            </br>
            ${description}
            <div class="ui buttons">
              <button class="ui negative button"><i class="minus icon"></i></button>
              <div class="or"></div>
              <button class="ui positive button"><i class="plus icon"></i></button>
            </div>
          </div>`;

    parentDiv.querySelector('.button.negative').addEventListener('click', contr.removePoints.bind(contr, el));
    parentDiv.querySelector('.button.positive').addEventListener('click', contr.addPoints.bind(contr, el));

    
    parentDiv.querySelector('.button.negative').addEventListener("click", e=>{
      document.querySelector('.shopping-cart-inner').classList.remove("visible");
      contr.buldCart();
    });
    parentDiv.querySelector('.button.positive').addEventListener("click", e=>{
      document.querySelector('.shopping-cart-inner').classList.remove("visible");
      contr.buldCart();
    });

    rowCards.appendChild(parentDiv);
  }

  delete() {
    const rowCards = document.querySelector('.products-container');
    while(rowCards.hasChildNodes()){
        rowCards.removeChild(rowCards.firstChild);
    }
  }

  render(data, contr) {
    this.delete();
    data.forEach((el)=>{
      this.create(el, contr);
    });
  }

  reCheckActiveLang(e) {
    let chEll = document.getElementsByClassName('active');
    if (chEll.length !== 0) {
      for (let i = 0; i < chEll.length; i++) {
        chEll[i].classList.remove("active");
        break;
      }
    }
    let elem = e.target;
    if(elem.classList.contains("item")) elem.classList.toggle("active");
  }
  
  transtate(a){
    let result = a;
    let translations = JSON.parse(localStorage.getItem("translations"));
    for (let pos in translations[0]) {
      if (a == pos) {
        (isNaN(1 * a)) ? result = translations[0][a][0][window.lang] : result = a;
      }
      if (a == true) {
        result = translations[0]['true'][0][window.lang];
      }
      if (a == false) {
        result = translations[0]['false'][0][window.lang];
      }
    }
    return result;
  }

  resetFilters() {
    let checkBoxCat = document.querySelector('.checkbox-cat'),
    checkBoxDog = document.querySelector('.checkbox-dog'),
    checkBoxBird = document.querySelector('.checkbox-bird'),
    checkBoxFish = document.querySelector('.checkbox-fish'),
    checkBoxAll = document.querySelector('.checkbox-all');

    checkBoxCat.checked = false;
    checkBoxDog.checked = false;
    checkBoxBird.checked = false;
    checkBoxFish.checked = false;
    checkBoxAll.checked = true;
  }

  createCartContent(contr) {
    this.deleteCart();

    const currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart !== null && currentCart.length != 0) {
      currentCart.forEach((el)=>{
        this.createCart(el);
      });
      const rowCards = document.querySelector('.shopping-cart-inner');
      let pDiv = document.createElement('div');
      pDiv.classList.add('order'); 
      pDiv.innerHTML = `<i class="barcode icon large"></i>`;
      rowCards.appendChild(pDiv);
    } else {
      const rowCards = document.querySelector('.shopping-cart-inner');
      let parentDiv = document.createElement('div');
      parentDiv.classList.add('shopping-cart-cont');
      parentDiv.innerHTML = `<div class="shopping-cart-empty ">
        <img src="https://www.sunsurgical.com/customer/sususu/images/EmptyShoppingCart.png"/>
      </div>`;
      rowCards.appendChild(parentDiv);
    }
  }
  createCart (el) {
      //document.querySelector('.shopping-cart-empty').classList.add("hidden");
      const rowCards = document.querySelector('.shopping-cart-inner');
      let parentDiv = document.createElement('div');
      parentDiv.classList.add('shopping-cart-cont');
      parentDiv.innerHTML = `<div class="row">
              <div class="col">${el[2]}</div>
              <div class="col">${el[1]}</div>
          </div>`;
      rowCards.appendChild(parentDiv);
    
  }
  deleteCart() {
    const rowCards = document.querySelector('.shopping-cart-inner');
    if (rowCards != undefined) {
      
      while(rowCards.hasChildNodes()){
          rowCards.removeChild(rowCards.firstChild);
      }
    }
  }
}


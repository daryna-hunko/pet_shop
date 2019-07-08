import Card from "./ViewCards.js";

export default class Builder {
  loadJSON(contr) {
    if (localStorage.getItem("productsArr") == null) {
      const url = "data/data.json";
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Work with JSON data here - pull this to localStorage
        //window.productsStorage = data;
        localStorage.setItem("productsArr", JSON.stringify(data));
        contr.showView(data);
      })
    } else {
      let data = JSON.parse(localStorage.getItem("productsArr"));
      contr.showView(data);
    }
    /*
    var returnObj = JSON.parse(localStorage.getItem("productsArr"));
    console.log(returnObj)*/
  }
  loadTranslations() {
    if (localStorage.getItem("translations") == null) {
      const url = "data/translations.json";
    
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Work with JSON data here 
        localStorage.setItem("translations", JSON.stringify(data));
      })
    }
  }


  products(data) {
    const result = [];

    data.forEach(element => {
      switch (element.type) {
        case 'cat':
          result.push(new Cat(element));
          break;
        case 'dog':
          result.push(new Dog(element));
          break;
        case 'fish':
          result.push(new Fish(element));
          break;
        case 'bird':
          result.push(new Bird(element));
          break;
      }
    });

    return result;
  }

  changLang(contr) {
    let activeLang = document.querySelector('.lang-menu .active');
    window.lang = activeLang.outerText;
    this.filterContent(contr);
  }

  filterContent(contr, temparr) {
    temparr = temparr || JSON.parse(localStorage.getItem("productsArr"));
    let filteredArray = [],
        checkBoxCat = document.querySelector('.checkbox-cat'),
        checkBoxDog = document.querySelector('.checkbox-dog'),
        checkBoxBird = document.querySelector('.checkbox-bird'),
        checkBoxFish = document.querySelector('.checkbox-fish'),
        checkBoxAll = document.querySelector('.checkbox-all');
        
    if (checkBoxCat.checked == true) {
      filteredArray = temparr.filter(el => el.type == 'cat');
      contr.showView(filteredArray);
    } else if (checkBoxDog.checked == true) {
      filteredArray = temparr.filter(el => el.type == 'dog');
      contr.showView(filteredArray);
    } else if (checkBoxBird.checked == true) {
      filteredArray = temparr.filter(el => el.type == 'bird');
      contr.showView(filteredArray);
    } else if (checkBoxFish.checked == true) {
      filteredArray = temparr.filter(el => el.type == 'fish');
      contr.showView(filteredArray);
    } else if (checkBoxAll.checked == true) {
      contr.showView(this.products(temparr));
    }
    //document.querySelector('.prompt').value = null;
  }

  search(contr) {
    let temparr = JSON.parse(localStorage.getItem("productsArr")),
        searchTitle = document.querySelector('.prompt').value.toLowerCase(),
        searchArr = [],
        tempTitle;
      temparr.forEach(function(el) {
        tempTitle = el.title.toLowerCase();
        if (tempTitle.includes(searchTitle)) {
          searchArr.push(el);
        }
      });
    this.filterContent(contr, searchArr);
  }

  handlePoints(el, dir){
    const value  = (dir == 1)? 1: -1;
    const data = JSON.parse(localStorage.getItem('productsArr'));
    let currentCart = JSON.parse(localStorage.getItem('cart')),
        quantity = 1,
        id = el.id;    
    
    //const limitQuantity = el.quantity;
    currentCart === null ? currentCart=[] : currentCart;
    data.forEach(element => {
      if (element.id === el.id){
        if (element.quantity > 0) {
          if (value == 1) {
            element.quantity -= value;
            currentCart.push(new Array(id, quantity));
          } 
          if (value == -1) {
            for (let currentCartEl in currentCart) {
              if (currentCart[currentCartEl][0] == id ) {
                element.quantity -= value;
                currentCart.splice(currentCartEl, 1);
                break;
              }
            }
          }
        }
        if (element.quantity == 0) {
          document.querySelector(`.card-${el.id}`).classList.add("no-products");
          if (value == -1) {
            for (let currentCartEl in currentCart) {
              if (currentCart[currentCartEl][0] == id ) {
                element.quantity -= value;
                currentCart.splice(currentCartEl, 1);
                document.querySelector(`.card-${el.id}`).classList.remove("no-products");
                break;
              }
            }
          }
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(currentCart));
    localStorage.setItem('productsArr', JSON.stringify(data));
    return data;
  }

  cartData() {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const productsArr = JSON.parse(localStorage.getItem('productsArr'));
    if (currentCart !== null) {
      currentCart.forEach(el => {
        for (let arrEl in productsArr) {
          if (productsArr[arrEl].id == el[0]) {
            el.push(productsArr[arrEl].title);
            el.length = 3;
            break;
          }
        }
      });
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }
  }
}




// Component
// all animal classes
class Animal {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.type = data.type;
    this.gender = data.gender;
    this.quantity = data.quantity;
    this.prod_url = data.prod_url;
    this.price = data.price;
    this.age = data.age;
    this.weight = data.weight;
    this.life_length = data.life_length;
    this.color = data.color;
    this.rapacity = data.rapacity;
  }
}
class Dog extends Animal {
  constructor(data) {
    super(data);
    this.fur = data.fur;
    this.short_tail = data.short_tail;
    this.short_legs = data.short_legs;
    this.pedigree = data.pedigree;
    this.speciality = data.speciality;
  }
}
class Cat extends Animal {
  constructor(data) {
    super(data);
    this.fur = data.fur;
    this.short_tail = data.short_tail;
    this.short_legs = data.short_legs;
    this.pedigree = data.pedigree;
    this.straight_ears = data.straight_ears;
  }
}
class Bird extends Animal {
  constructor(data) {
    super(data);
    this.can_fly = data.can_fly;
    this.can_speak = data.can_speak;
    this.can_sing = data.can_sing;
  }
}
class Fish extends Animal {
  constructor(data) {
    super(data);
    this.need_solted_water = data.need_solted_water;
    this.area = data.area;
  }
}


import Builder from "./ModelCards.js";
import View from "./ViewCards.js";

export default class ControllerCards
{
    constructor(){
        this.model = new Builder();
        this.view = new View();
        this.init();
    }

    init(){
      this.model.loadTranslations(this);
      this.model.loadJSON(this);
      this.view.initListeners(this);
    }

    showView(data){
      let dataModified = this.model.products(data);
      this.view.render(data, this);
    }

    transtateCards(e) {
      this.view.reCheckActiveLang(e);
      this.model.changLang(this);
    }
    filter() {
      this.model.filterContent(this);
    }

    searchCards() {
      this.view.resetFilters();
      this.model.search(this);
    }

    addPoints(el){
      this.model.handlePoints(el, 1);
    }
    removePoints(el){
      this.model.handlePoints(el, -1);
    }

    buldCart() {
      this.model.cartData();
      this.view.createCartContent(this);
    }
}
function bind(func, fixThis) { // using custom bind for simplicity
    return function() {
        return func.apply(fixThis, arguments)
    }
}

class Excalibur {
    static Bind(rootViewModel, selector = '#exContainer') {
        var $jq = $(selector);
        $jq.empty()
        $jq.append(Excalibur.RenderViewModel(rootViewModel, $jq));
    }


 
    static RenderViewModel(viewModel, $jq) {
        var $template  = $(ViewLocator.Instance().getViewFor(viewModel).getHtml());
   
        for (let key of Object.getOwnPropertyNames(viewModel.__proto__)) {
            if(key == 'constructor')
                continue;
          
            let val = viewModel[key];
            console.log(key);
          
            if(viewModel[key] instanceof Array){
                var elements = $('');
                var items = viewModel[key].map(vm => Excalibur.RenderViewModel(vm));
                items.forEach(f => $template.find('#' + key).before(f));

                $template.find('#' + key).remove();
            }          
            else if(viewModel[key] instanceof Function){
                $template.find('#' + key)[0].onclick = bind(viewModel[key], viewModel);
                console.log('function');
            }  
            else{
                $template.find('#' + key).text(viewModel[key]);
                $template.find('#' + key + ':input').text(viewModel[key]);
            }
        }
        viewModel.bind($template);
        return $template;
    }
    static RenderArray() {
   
    }    
}

class View {
    getHtml () {
        return '';
    }
}

class ViewModel {
    bind($template){
        this._template = $template;
    }
    notifyOfPropertyChange(propertyName){
        console.log(`${propertyName} has been changed`);
        this._template.find('#' + propertyName).text(this[propertyName]);
        this._template.find('#' + propertyName + ':input').val(this[propertyName]);
    }
}

class LinkView extends View {
    constructor(){
        super();
    }

    getHtml () {
        return '<div  class="list-group-item"> <h3 class="list-group-item-heading">   <span class="glyphicon glyphicon-plus-sign  pull-right" id="inrementRating"/><span id="link"/></h3><div> <h4 class="list-group-item-text"><span class="badge pull-right" id="rating"></span><span id="author"></span></h4>  </div>';
    }
}

class LinkViewModel extends ViewModel {
    constructor(link, author) {
      super();
    
        this._link = link;
        this._author = author;
        this._rating = 0;
    }
  
    get link(){
        return this._link;
    } 
  
    get author(){
        return this._author;
    }
  
    get rating(){
        return this._rating;
    }
  
    inrementRating(){
        this._rating++;
        super.notifyOfPropertyChange('rating')
    }
  
}

class LinksListView extends View {
    constructor(){
        super();
    }

    getHtml () {
        return '<div><h1 id="header"/> <ul class="list-group"><foreach id="linksList"></ul></foreach> </div>';
    }
}

class ViewLocator {
    constructor(){
        this.LinksListView = new LinksListView();
        this.LinkView = new LinkView();
    }

    getViewFor(viewModel){
        var viewModelName = viewModel.constructor.name;

        var viewName = viewModelName.toString().replace('Model', '');

        return this[viewName];
    }

    static Instance(){
        return new ViewLocator();
    }
}

class LinksListViewModel extends ViewModel {
    constructor(){
        super();
        this._linksList = [ new LinkViewModel('link1','author1'), new LinkViewModel('link2','author2') ];
    }
  
    get header(){
        return 'Najlepsze linki tygodnia'
    }
  
    get linksList(){
        return this._linksList;
    }
  
    //getSth(){
    //    return 'ddd';
    //}
}

$(document).ready(function() {
    Excalibur.Bind(new LinksListViewModel());
});
class Excalibur {
    static Bind(rootViewModel, selector = '#exContainer') {
        var $jq = $(selector);
        $jq.empty()
        $jq.append(Excalibur.RenderViewModel(rootViewModel, $jq));
    }
 
    static RenderViewModel(viewModel, $jq) {
        var template  = ViewLocator.Instance().getViewFor(viewModel).getHtml();
   
        for (let key of Object.getOwnPropertyNames(viewModel.__proto__)) {
            if(key == 'constructor')
                continue;
          
            let val = viewModel[key];
            console.log(key);
          
            if(viewModel[key] instanceof Array){
                console.log('array');
                continue;
            }
        
          
            if(viewModel[key] instanceof Function){
                console.log('function');
                continue;
            }  
        }
        return template;
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
    notifyOfPropertyChange(propertyName){
        console.log(`${propertyName} has been changed`);
    }
}

class LinkView extends View {
    constructor(){
        super();
    }

    getHtml () {
        return '<div>item</div>';
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
        return '<div>test</div>';
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
        this._linksList = [ new LinkViewModel(), new LinkViewModel() ];
    }
  
    get header(){
        return 'Najlepsze linki tygodnia'
    }
  
    get linksList(){
        return this._linksList;
    }
  
    getSth(){
        return 'ddd';
    }
}

var link = new LinkViewModel('link','author');
link.inrementRating();

$(document).ready(function() {
    Excalibur.Bind(new LinksListViewModel());
});
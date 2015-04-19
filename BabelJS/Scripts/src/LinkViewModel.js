import * as ViewModelModule from 'ViewModel'

export class LinkViewModel extends ViewModelModule.ViewModel {
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
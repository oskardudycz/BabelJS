import * as ViewModelModule from 'ViewModel'

export class LinksListViewModel extends ViewModelModule.ViewModel {
    constructor(links){
        super();
        this._linksList = links;
    }
  
    get header(){
        return 'Najlepsze linki tygodnia'
    }
  
    get linksList(){
        return this._linksList;
    }
}
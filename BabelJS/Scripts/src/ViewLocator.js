class ViewLocator {
    constructor(){
    }

    getViewFor(viewModel){
        var viewModelName = viewModel.constructor.name;

        var viewName = viewModelName.toString().replace('Model', '');

        if(!this[viewName])
            this[viewName] = new window[viewName]; 

        return this[viewName];
    }

    static Instance(){
        return new ViewLocator();
    }
}

export var Instance = ViewLocator.Instance();
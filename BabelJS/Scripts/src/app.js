class View {
    constructor(options) {
        this.model = options.model;
        this.template = options.template;

        console.log('test');
    }

    render() {
        return _.template(this.template, this.model.toObject());
    }
}
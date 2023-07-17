class taskFactory {
    constructor(name, completion, date, project) {
        this.name = name;
        this.completion = completion;
        this.date = date;
        this.project = project;
    }

    get name() {
        return this._name;
    }
    get completion() {
        return this._completion;
    }
    get date() {
        return this._date;
    }
    get project() {
        return this._project;
    }

    set name(value){
        this._name = value;
    }
    set completion(value){
        this._completion = value;
    }
    set date(value){
        this._date = value;
    }
    set project(value){
        this._project = value;
    }
}

export default taskFactory;
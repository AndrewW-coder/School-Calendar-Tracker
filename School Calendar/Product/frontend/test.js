class Item{
    constructor(date, title) {
        this.date = date;
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getD() {
        return this.date;
    }
}

export class test extends Item {
    constructor(date, title) {
        super(date, title);
    }
}
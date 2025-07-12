export class Item {
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
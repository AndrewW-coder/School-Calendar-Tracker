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
export class homework extends Item {
    constructor(date, title, progress) {
        super(date, title);
        this.progress = progress;
    }
}
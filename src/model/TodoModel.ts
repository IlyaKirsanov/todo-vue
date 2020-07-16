export default class TodoModel {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    createDate: Date;

    constructor(title: string, description: string) {
        this.id = Math.floor(Math.random() * 100000000);
        this.title = title;
        this.description = description;
        this.isDone = false;
        this.createDate = new Date();
    }
}

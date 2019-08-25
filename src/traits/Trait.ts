export class Trait {
    private NAME: any;
    private tasks: any[];

    constructor(name) {
        this.NAME = name;

        this.tasks = [];
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task) {
        this.tasks.push(task);
    }

    collides(us, them) {
    }

    obstruct(entity, side, match) {
    }

    update(entity, deltaTime, level) {
    }
}

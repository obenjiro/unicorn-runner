import {Trait} from "./Trait";

export class Run extends Trait {
    private speed: number;
    private distance: number;

    constructor() {
        super('run');

        this.speed = 13000;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * deltaTime;
        this.distance += Math.abs(entity.vel.x) * deltaTime;
    }
}

import {Trait} from "./Trait";

export class Killable extends Trait {
    private dead: boolean;
    private deadTime: number;
    private removeAfter: number;

    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 0.3;
    }

    kill() {
        this.queue(() => (this.dead = true));
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, deltaTime, level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                });
            }
        }
    }
}

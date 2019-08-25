import {Trait} from "./Trait";

export class BehaviorEnemyBug extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        them.killable.kill();
    }
}

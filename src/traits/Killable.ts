import {Trait} from "./Trait";
import { Entity } from 'src/Entity';

export class Killable extends Trait {
    dead: boolean;
    private deadTime: number;
    removeAfter: number;
    deathAnim: any;

    constructor(removeAfter: number = 0.3, deathAnim: any = null) {
        super('killable');
        this.deathAnim = deathAnim;
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = removeAfter;
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

    getName(entity: Entity): string {
      if (this.dead) {
        return this.deathAnim(entity.lifetime);
      }
    }
}

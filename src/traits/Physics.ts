import {Entity} from "src/Entity";
import {Level} from "src/Level";
import {Trait} from "src/traits/Trait";

export class Physics extends Trait {
    constructor() {
        super('physics');
    }

    update(entity: Entity, deltaTime: number, level: Level): void {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.vel.y += level.gravity * deltaTime;
    }
}

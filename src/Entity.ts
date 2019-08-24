import {Vec2} from "./math";
import {ClipBox} from "./CLipBox";

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
};

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

export class Entity {
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    offset: Vec2;
    bounds: ClipBox;
    private lifetime: number;
    private traits: any[];
    killable: any;
    picker: any;
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new ClipBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    obstruct(side, match) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }

    draw(conext) {}

    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }

    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });

        this.lifetime += deltaTime;
    }
}

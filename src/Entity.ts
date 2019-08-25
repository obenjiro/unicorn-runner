import { Vec2 } from './math';
import { ClipBox } from './CLipBox';
import { Killable } from 'src/traits/Killable';
import { Jump } from 'src/traits/Jump';
import { Run } from 'src/traits/Run';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  bounds: ClipBox;
  lifetime: number;
  private traits: any[];
  killable: Killable;
  picker: any;
  jump: Jump;
  run: Run;

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

  draw(conext) {
  }

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

  getName() {
    if (this.killable.dead) {
      return this.killable.deathAnim(this.lifetime);
    }

    if (this.jump.falling) {
      return 'jump'
    }

    if (this.run.distance > 0) {
      return this.run.runAnim(this.run.distance)
    }
    return 'idle';
  }
}

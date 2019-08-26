import { Vec2 } from './math';
import { ClipBox } from './ClipBox';
import { SpriteSheet } from './SpriteSheet';

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  bounds: ClipBox;
  lifetime: number;
  private readonly traits: any[];
  picker: any;
  private sprite: SpriteSheet;

  constructor(sprite?: SpriteSheet) {
    this.sprite = sprite;
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

  draw(context) {
    this.sprite.draw(this.getName(), context, 0, 0);
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
    for (let i = 0; i < this.traits.length; i++) {
      const trait = this.traits[i];
      const name = trait.getName(this);
      if (name && name !== 'idle') {
        return name;
      }
    }
    return 'idle';
  }

  revive() {
    for (let i = 0; i < this.traits.length; i++) {
      const trait = this.traits[i];
      if (trait.revive) trait.revive();
    }
  }
}

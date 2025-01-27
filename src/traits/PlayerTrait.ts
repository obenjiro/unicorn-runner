import { Vec2 } from '../math';
import { Entity } from '../Entity';
import { Trait } from './Trait';

export class PlayerTrait extends Trait {
  checkpoint: Vec2;
  private score: number;
  private scoreSelector: HTMLElement;
  private player: Entity;
  done: () => {} = null;

  constructor(done) {
    super('playerController');
    this.checkpoint = new Vec2(0, 0);
    this.player = null;
    this.score = 0;
    this.done = done;
    this.scoreSelector = document.getElementById('unicorn-score');
  }

  setPlayer(entity: Entity) {
    this.player = entity;

    this.player.picker.onPick = () => {
      this.score += 50;

      if (this.score > 400) {
        this.done();
      }

      setTimeout(() => {
        this.scoreSelector.innerHTML = String(this.score);
      }, 0);
    };
  }

  update(entity, deltaTime, level) {
    if (
      !level.entities.has(this.player) ||
      this.player.pos.y > 1200 ||
      this.player.pos.x > 11400
    ) {
      this.player.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}

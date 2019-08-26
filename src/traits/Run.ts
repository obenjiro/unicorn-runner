import { Trait } from './Trait';
import { Entity } from '../Entity';

export class Run extends Trait {
  private speed: number;
  distance: number;
  runAnim: any;

  constructor(runAnim: any) {
    super('run');
    this.runAnim = runAnim;

    this.speed = 13000;
    this.distance = 0;
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed * deltaTime;
    this.distance += Math.abs(entity.vel.x) * deltaTime;
  }

  getName(entity: Entity) {
    if (this.distance > 0) {
      return this.runAnim(this.distance);
    }
  }
}

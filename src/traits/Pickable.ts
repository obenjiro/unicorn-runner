import { Trait } from './Trait';

export class Pickable extends Trait {
  private picked: boolean;
  private pickTime: number;
  private readonly removeAfter: number;

  constructor() {
    super('pickable');
    this.picked = false;
    this.pickTime = 0;
    this.removeAfter = 0.3;
  }

  pick() {
    this.queue(() => (this.picked = true));
  }

  update(entity, deltaTime, level) {
    if (this.picked) {
      this.pickTime += deltaTime;
      if (this.pickTime > this.removeAfter) {
        this.queue(() => {
          level.entities.delete(entity);
        });
      }
    }
  }
}

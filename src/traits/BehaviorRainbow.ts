import { Trait } from './Trait';

export class BehaviorRainbow extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us, them) {
    if (us.pickable.picked) {
      return;
    }

    us.pickable.pick();
    us.vel.set(30, -400);
    us.solid.obstructs = false;
  }
}

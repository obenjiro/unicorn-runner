import { Vec2 } from './math';

export class Camera {
  pos: Vec2;
  size: Vec2;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(840, 660);
  }
}

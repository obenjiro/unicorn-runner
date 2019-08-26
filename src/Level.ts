import { Compositor } from './Compositor';
import { EntityCollider } from './EntityCollider';
import { TileCollider } from './TileCreation';

export class Level {
  private entityCollider: EntityCollider;
  private totalTime: number;

  gravity: number;
  comp: Compositor;
  entities: Set<any>;
  tileCollider: TileCollider;
  alive: boolean = true;

  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;

    this.comp = new Compositor();
    this.entities = new Set();

    this.entityCollider = new EntityCollider(this.entities);
    this.tileCollider = null;
  }

  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime) {
    if (this.alive) {
      this.entities.forEach(entity => {
        entity.update(deltaTime, this);
      });

      this.entities.forEach(entity => {
        this.entityCollider.check(entity);
      });

      this.entities.forEach(entity => {
        entity.finalize();
      });

      this.totalTime += deltaTime;
    }
  }

  stop() {
    this.alive = false;
  }
}

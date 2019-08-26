import { Trait } from './Trait';
import { Entity } from '../Entity';

export class Anim extends Trait {
  private readonly anim: any;

  constructor(anim: any) {
    super('Anim');
    this.anim = anim;
  }

  getName(entity: Entity): string {
    return this.anim(entity.lifetime);
  }
}

import { Entity } from './Entity';

export class EntityCollider {
  private entities: Entity[];
  constructor(entities) {
    this.entities = entities;
  }

  check(subject) {
    this.entities.forEach(candidate => {
      if (subject === candidate) {
        return;
      }

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate);
        candidate.collides(subject);
      }
    });
  }
}

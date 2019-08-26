import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Killable } from '../traits/Killable';
import { BehaviorEnemyBug } from '../traits/BehaviorEnemyBug';
import { SpriteSheet } from '../SpriteSheet';
import { Anim } from '../traits/Anim';

const ENEMY_BUG = require('../data/enemy_bug.json');

export function loadEnemyBug() {
  return loadSpriteSheet(ENEMY_BUG).then(createEnemyBugFactory);
}

export function createEnemyBugFactory(sprite: SpriteSheet) {
  const standAnim = sprite.animations.get('anim');

  return function createEnemyBug() {
    const enemyBug = new Entity(sprite);
    enemyBug.size.set(58, 45);
    enemyBug.offset.y = 20;

    enemyBug.addTrait(new Physics());
    enemyBug.addTrait(new Solid());
    enemyBug.addTrait(new BehaviorEnemyBug());
    enemyBug.addTrait(new Killable(1));
    enemyBug.addTrait(new Anim(standAnim));

    return enemyBug;
  };
}

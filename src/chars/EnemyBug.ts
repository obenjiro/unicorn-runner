import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Killable } from '../traits/Killable';
import { BehaviorEnemyBug } from '../traits/BehaviorEnemyBug';
import { SpriteSheet } from '../SpriteSheet';
import { Anim } from 'src/traits/Anim';

const ENEMY_BUG = {
  imageURL: 'img/bug_line.png',
  frames: [
    {
      name: 'frame-1',
      rect: [0, 0, 58, 65],
    },
    {
      name: 'frame-2',
      rect: [58, 0, 58, 65],
    },
    {
      name: 'frame-3',
      rect: [116, 0, 58, 65],
    },
    {
      name: 'frame-4',
      rect: [174, 0, 58, 65],
    },
    {
      name: 'frame-5',
      rect: [232, 0, 58, 65],
    },
  ],
  animations: [
    {
      name: 'anim',
      frameLen: 0.2,
      frames: ['frame-1', 'frame-2', 'frame-3', 'frame-4', 'frame-5'],
    },
  ],
};

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

import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Pickable } from '../traits/Pickable';
import { SpriteSheet } from '../SpriteSheet';
import { BehaviorRainbow } from '../traits/BehaviorRainbow';
import { Anim } from 'src/traits/Anim';

const RAINBOW = {
  imageURL: 'img/rainbow_line.png',
  frames: [
    {
      name: 'spark-1',
      rect: [0, 0, 83, 93],
    },
    {
      name: 'spark-2',
      rect: [83, 0, 83, 93],
    },
    {
      name: 'spark-3',
      rect: [166, 0, 83, 93],
    },
    {
      name: 'spark-4',
      rect: [249, 0, 83, 93],
    },
    {
      name: 'spark-5',
      rect: [332, 0, 83, 93],
    },
    {
      name: 'spark-6',
      rect: [415, 0, 83, 93],
    },
  ],
  animations: [
    {
      name: 'spark',
      frameLen: 0.2,
      frames: [
        'spark-1',
        'spark-2',
        'spark-3',
        'spark-4',
        'spark-5',
        'spark-6',
      ],
    },
  ],
};

export function loadRainbow() {
  return loadSpriteSheet(RAINBOW).then(createRainbowFactory);
}

export function createRainbowFactory(sprite: SpriteSheet) {
  const sparkAnim = sprite.animations.get('spark');

  return function createRainbow() {
    const rainbow = new Entity(sprite);
    rainbow.size.set(83, 93);

    rainbow.addTrait(new Physics());
    rainbow.addTrait(new Solid());
    rainbow.addTrait(new Pickable());
    rainbow.addTrait(new BehaviorRainbow());
    rainbow.addTrait(new Anim(sparkAnim));

    return rainbow;
  };
}

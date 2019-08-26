import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Pickable } from '../traits/Pickable';
import { SpriteSheet } from '../SpriteSheet';
import { BehaviorRainbow } from '../traits/BehaviorRainbow';
import { Anim } from '../traits/Anim';

const RAINBOW = require('../data/rainbow.json');

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
    rainbow.addTrait(new Anim(sparkAnim));
    rainbow.addTrait(new Pickable());
    rainbow.addTrait(new BehaviorRainbow());

    return rainbow;
  };
}

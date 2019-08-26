import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Run } from '../traits/Run';
import { Jump } from '../traits/Jump';
import { Killable } from '../traits/Killable';
import { Picker } from '../traits/Picker';
import { SpriteSheet } from '../SpriteSheet';

const UNICORN = require('../data/unicorn.json');

export function loadUnicorn() {
  return loadSpriteSheet(UNICORN).then(createUnicornFactory);
}

export function createUnicornFactory(sprite: SpriteSheet) {
  const runAnim = sprite.animations.get('run');
  const deathAnim = sprite.animations.get('death');

  return function createUnicorn() {
    const unicorn = new Entity(sprite);
    unicorn.size.set(120, 119);
    unicorn.offset.x = 20;

    unicorn.addTrait(new Physics());
    unicorn.addTrait(new Solid());
    unicorn.addTrait(new Jump());
    unicorn.addTrait(new Run(runAnim));
    unicorn.addTrait(new Picker());
    unicorn.addTrait(new Killable(1, deathAnim));

    return unicorn;
  };
}

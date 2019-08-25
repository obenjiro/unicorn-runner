import { loadSpriteSheet } from '../loaders';
import { Entity } from '../Entity';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Run } from '../traits/Run';
import { Jump } from '../traits/Jump';
import { Killable } from '../traits/Killable';
import { Picker } from '../traits/Picker';
import { SpriteSheet } from 'src/SpriteSheet';

const UNICORN = {
    imageURL: 'img/unicorn_full.png',
    frames: [
        {
            name: 'idle',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'run-1',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'run-2',
            rect: [173, 0, 172, 119]
        },
        {
            name: 'run-3',
            rect: [344, 0, 172, 119]
        },
        {
            name: 'run-4',
            rect: [517, 0, 172, 119]
        },
        {
            name: 'break',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'jump',
            rect: [690, 0, 172, 119]
        },
        {
            name: 'death-1',
            rect: [0, 120, 172, 119]
        },
        {
            name: 'death-2',
            rect: [173, 120, 172, 119]
        },
        {
            name: 'death-3',
            rect: [344, 120, 172, 119]
        },
        {
            name: 'death-4',
            rect: [517, 120, 172, 119]
        },
        {
            name: 'death-5',
            rect: [690, 120, 172, 119]
        },
        {
            name: 'death-6',
            rect: [863, 120, 172, 119]
        },
        {
            name: 'death-7',
            rect: [1036, 120, 172, 119]
        },
        {
            name: 'death-8',
            rect: [1209, 120, 172, 119]
        },
        {
            name: 'death-9',
            rect: [1382, 120, 172, 119]
        }
    ],

    animations: [
        {
            name: 'run',
            frameLen: 20,
            frames: [
                'run-1',
                'run-2',
                'run-3',
                'run-4'
            ]
        },
        {
            name: 'death',
            frameLen: 0.2,
            frames: [
                'death-5',
                'death-6',
                'death-7',
                'death-8',
                'death-9'
            ]
        }
    ]
};

export function loadUnicorn() {
    return loadSpriteSheet(UNICORN)
    .then(createUnicornFactory);
}

export function createUnicornFactory(sprite: SpriteSheet) {
    const runAnim = sprite.animations.get('run');
    const deathAnim = sprite.animations.get('death');

    return function createUnicorn() {
        const unicorn = new Entity();
        unicorn.size.set(120, 119);
        unicorn.offset.x = 20;

        unicorn.addTrait(new Physics());
        unicorn.addTrait(new Solid());
        unicorn.addTrait(new Jump());
        unicorn.addTrait(new Run(runAnim));
        unicorn.addTrait(new Picker());
        unicorn.addTrait(new Killable(1, deathAnim));

        unicorn.draw = function (context) {
            sprite.draw(unicorn.getName(), context, 0, 0);
        };

        return unicorn;
    }
}

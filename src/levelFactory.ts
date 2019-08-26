import { loadUnicorn } from './chars/Unicorn';
import { loadEnemyBug } from './chars/EnemyBug';
import { loadRainbow } from './chars/Rainbow';
import { createLevelLoader } from './loadLevel';
import { Camera } from './Camera';
import { createPlayer } from './chars/Player';
import { Timer } from './Timer';

export async function createLevel(levelData, done) {
  const charsFactory = await Promise.all([
    loadUnicorn(),
    loadEnemyBug(),
    loadRainbow(),
  ]).then(entityFactories => {
    entityFactories['unicorn'] = entityFactories[0];
    entityFactories['enemyBug'] = entityFactories[1];
    entityFactories['rainbow'] = entityFactories[2];
    return entityFactories;
  });

  const loadLevel = await createLevelLoader(charsFactory);
  const level = await loadLevel(levelData);
  const camera = new Camera();
  const unicorn = charsFactory['unicorn']();
  const playerEnv = createPlayer(unicorn, () => {
    level.stop();
    done();
  });

  level.entities.add(playerEnv);

  const canvas = document.getElementById('screen') as HTMLCanvasElement;
  const context = canvas.getContext('2d');

  ['keydown', 'keyup'].forEach(eventName => {
    window.addEventListener(eventName, (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const keyState = event.type === 'keydown' ? 1 : 0;

        if (keyState > 0) {
          unicorn.jump.start();
        } else {
          unicorn.jump.cancel();
        }
      } else {
        unicorn.jump.cancel();
      }
    });
  });

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    camera.pos.x = Math.max(0, unicorn.pos.x - 100);
    level.comp.draw(context, camera);
  };

  setTimeout(() => {
    timer.start();
  }, 100);
}


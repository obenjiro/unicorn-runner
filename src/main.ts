import { Timer } from './Timer';
import { createFirstLevel } from './levels/fistLevel';
import { createSecondLevel } from './levels/secondLevel';

async function main() {
  await createFirstLevel(() => {
    createSecondLevel();
  });

  console.log('page_loaded');
}
main();


export function setupListeners(unicorn, level, camera) {
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

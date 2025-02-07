import { SpriteSheet } from './SpriteSheet';

export function createAnim(frames, frameLen) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLen) % frames.length;
    return frames[frameIndex];
  };
}

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadSpriteSheet(name) {
  return new Promise(resolve => {
    resolve(name);
  })
    .then((sheetSpec: any) =>
      Promise.all([sheetSpec, loadImage(sheetSpec.imageURL)])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

      if (sheetSpec.frames) {
        sheetSpec.frames.forEach((frameSpec: any) => {
          sprites.define(
            frameSpec.name,
            frameSpec.rect[0],
            frameSpec.rect[1],
            frameSpec.rect[2],
            frameSpec.rect[3]
          );
        });
      }

      if (sheetSpec.animations) {
        sheetSpec.animations.forEach(animSpec => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprites.defineAnim(animSpec.name, animation);
        });
      }

      return sprites;
    });
}

import { Entity } from '../Entity';
import { PlayerTrait } from '../traits/PlayerTrait';

export function createPlayer(playerEntity) {
  const playerEnv = new Entity();

  const playerTrait = new PlayerTrait();
  playerTrait.checkpoint.set(64, 64);
  playerTrait.setPlayer(playerEntity);

  playerEnv.addTrait(playerTrait);

  return playerEnv;
}

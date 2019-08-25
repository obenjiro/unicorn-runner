import {Entity} from "../Entity";
import {PlayerTrait} from "../traits/PlayerTrait";

export function createPlayer(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerTrait();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

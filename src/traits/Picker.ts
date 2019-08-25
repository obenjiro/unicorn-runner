import {Trait} from "./Trait";

export class Picker extends Trait {
    private onPick: (us, them) => void;

    constructor() {
        super('picker');
        this.onPick = function (us, them) {
        };
    }

    collides(us, them) {
        if (!them.pickable || them.pickable.picked) {
            return;
        }

        this.onPick(us, them);
    }
}

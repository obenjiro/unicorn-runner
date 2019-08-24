export class Compositor {
    private layers: any[];
    constructor() {
        this.layers = [];
    }

    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}

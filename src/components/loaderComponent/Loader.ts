import * as PIXI from 'pixi.js';

export default class Loader {
    public loader: PIXI.Loader;

    constructor(app: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = app.loader;
        this.loadAssets();
        this.loader.load(() => {
            onAssetsLoaded();
        });
    }

    private loadAssets() {
        this.loader.add('assets', './assets/assets.json');
    }
}

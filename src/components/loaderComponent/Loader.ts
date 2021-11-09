import * as PIXI from 'pixi.js';

export default class Loader {
    public loader: PIXI.Loader;
    private loadingScreen: PIXI.Text;

    //this is the loader, constructor passes the PIXI app created on the Game.ts file 
    constructor(app: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = app.loader;
        this.loadAssets();
        this.loader.load(() => {
            onAssetsLoaded();
        });
        app.stage.addChild(this.loadingScreen);
    }

    //this basically adds any new assets to the loader, remember to always add assets here when adding any new sprites to the game
    private loadAssets() {
        this.loader.add('assets', './assets/assets.json');
    }
}

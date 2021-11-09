import * as PIXI from 'pixi.js';
//this is the background of the reels, 
export default class Background {
    public readonly sprite: PIXI.Container;
    private readonly texture: PIXI.Texture;

    constructor(loader: PIXI.Loader) {
        //texture used was loaded on the loader
        this.texture = loader.resources!.assets.textures!['BG.png'];
        //New PIXI sprite is created from the texture
        this.sprite = new PIXI.Sprite(this.texture);
    }
}

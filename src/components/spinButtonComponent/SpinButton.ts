import * as PIXI from 'pixi.js';

// this is a very simple and standard SpinButton component
// this is created on load and called whenever the button is pressed
export default class SpinButton {
    public readonly sprite: PIXI.Sprite;
    private readonly onClick: () => void;
    private readonly activeTexture: PIXI.Texture;
    private readonly disabledTexture: PIXI.Texture;

    constructor(app: PIXI.Application, onClick: () => void) {
        this.onClick = onClick;
        //this is the buttonSprite
        this.activeTexture = app.loader.resources.assets!.textures![5], 
        this.disabledTexture = app.loader.resources.assets!.textures![5], 
        this.sprite = new PIXI.Sprite(this.activeTexture);
        this.init(app.screen.width, app.screen.height);
    }

    //the button is enabled if reels are not spinning
    setEnabled() {
        this.sprite.texture = this.activeTexture;
        this.sprite.interactive = true;
        this.sprite.alpha = 1;
    }

    //disable button interaction when reels are spinning
    setDisabled() {
        this.sprite.texture = this.disabledTexture;
        this.sprite.interactive = false;
        this.sprite.alpha = 0.3; //since I only have one sprite, I disable and changed the alpha to show user that its not clickable
    }

    private init(appWidth: number, appHeight: number) {
        this.sprite.x = appWidth - (this.sprite.width + 20);
        this.sprite.y = (appHeight - this.sprite.height) / 2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.addListener('pointerdown', this.onClick);
    }
}

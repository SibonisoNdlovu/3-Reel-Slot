import * as PIXI from 'pixi.js';

export default class Reel {
    public readonly container: PIXI.Container;
    public readonly textures: Array<PIXI.Texture>;
    public readonly reel1: Array<PIXI.Texture>;
    public readonly reel2: Array<PIXI.Texture>;
    public readonly reel3: Array<PIXI.Texture>;
    public sprites: Array<PIXI.Sprite> = [];
    private readonly appHeight: number;
    private readonly ticker: PIXI.Ticker;

    constructor(app: PIXI.Application, position: number) {
        this.appHeight = app.screen.height;
        this.ticker = app.ticker;
        this.container = new PIXI.Container();
        this.reel1 = [
            app.loader.resources.assets!.textures![0], //A
            app.loader.resources.assets!.textures![3], //K
            app.loader.resources.assets!.textures![4], //Q
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![2], //J  
            app.loader.resources.assets!.textures![2], //J  
            app.loader.resources.assets!.textures![6], //T  
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![4], //Q 
            app.loader.resources.assets!.textures![6], //T  
            app.loader.resources.assets!.textures![0], //A   
            app.loader.resources.assets!.textures![2], //J    
        ];

        this.reel2 = [ 
            app.loader.resources.assets!.textures![2], //J   
            app.loader.resources.assets!.textures![6], //T 
            app.loader.resources.assets!.textures![4], //Q
            app.loader.resources.assets!.textures![3], //K  
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![2], //J  
            app.loader.resources.assets!.textures![6], //T  
            app.loader.resources.assets!.textures![6], //T  
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![3], //K  
            app.loader.resources.assets!.textures![4], //Q  
            app.loader.resources.assets!.textures![4], //Q     
        ];        
        
        this.reel3 = [
            app.loader.resources.assets!.textures![0], //A   
            app.loader.resources.assets!.textures![6], //T 
            app.loader.resources.assets!.textures![3], //K
            app.loader.resources.assets!.textures![2], //J  
            app.loader.resources.assets!.textures![4], //Q  
            app.loader.resources.assets!.textures![4], //Q  
            app.loader.resources.assets!.textures![6], //T  
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![3], //K  
            app.loader.resources.assets!.textures![2], //J  
            app.loader.resources.assets!.textures![0], //A  
            app.loader.resources.assets!.textures![6], //T 
        ];

        //assign textures for the reels, 1 by 1
        if(position ===1){
            this.textures = this.reel1;
        } else if (position ===2){
            this.textures = this.reel2;
        } else {
            this.textures = this.reel3;
        }

        this.generate(position);
    }

    private generate(position: number) {
        const REEL_WIDTH = 230;
        const REEL_OFFSET_BETWEEN = 10;
        const NUMBER_OF_ROWS = 3;
        this.container.x = position * REEL_WIDTH;

        //this shuffles what the reels display on the rows
        //since we have 3 rows it divides the space by 3 symbols so they fit
        for (let i = 0; i < NUMBER_OF_ROWS + 1; i++) {
            // const symbol = new PIXI.Sprite(this.textures[Math.floor(Math.random() * this.textures.length)]);
            var val = Math.random() * this.textures.length;
            const symbol = new PIXI.Sprite(this.textures[Math.floor(val)]);

            symbol.scale.set(0.8);
            const widthDiff = REEL_WIDTH - symbol.width;
            symbol.x = position * REEL_OFFSET_BETWEEN + widthDiff/2;
            const yOffset = (this.appHeight - symbol.height * 3) / 3;
            const cellHeight = symbol.height + yOffset;
            const paddingTop = yOffset / 2;
            symbol.y = (i - 1) * cellHeight + paddingTop;
            this.sprites.push(symbol);
            this.container.addChild(symbol);
        }
    }

    //how many times the reels rotate
    //how fast the reels rotate, whether all assets in the reels rotate per second or not etc.
    spinOneTime() {
        let speed = 50;
        let doneRunning = false;
        let yOffset = (this.appHeight - this.sprites[0].height * 3) / 3 / 2;

        return new Promise<void>(resolve => {
            const tick = () => {
                //loops over sprites and moves each sprites position 
                for (let i = this.sprites.length - 1; i >= 0; i--) {
                    const symbol = this.sprites[i];

                    if (symbol.y + speed > this.appHeight + yOffset) {
                        doneRunning = true;
                        speed = this.appHeight - symbol.y + yOffset;
                        symbol.y = -(symbol.height + yOffset);
                    } else {
                        symbol.y += speed;
                    }

                    if (i === 0 && doneRunning) {
                        let t = this.sprites.pop();
                        if (t) this.sprites.unshift(t);
                        this.ticker.remove(tick);
                        resolve();
                    }
                }
            }

            this.ticker.add(tick);
        });
    }
}

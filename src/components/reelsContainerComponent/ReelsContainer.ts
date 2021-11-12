import * as PIXI from 'pixi.js';
import Reel from '../reelComponent/Reel';

export default class ReelsContainer {
    public readonly reels: Array<Reel> = [];
    public readonly container: PIXI.Container;

    constructor(app: PIXI.Application) {
        const REEL_OFFSET_LEFT = 70;
        const NUMBER_OF_REELS = 3;
        this.container = new PIXI.Container();

        this.createReels(NUMBER_OF_REELS, app);

        this.container.x = REEL_OFFSET_LEFT;
    }

    private createReels(NUMBER_OF_REELS: number, app: PIXI.Application) {
        for (let i = 0; i < NUMBER_OF_REELS; i++) {
            const reel = new Reel(app, i);
            this.reels.push(reel);
            this.container.addChild(reel.container);
        }
    }

    async spin() {
        const shiftingDelay = 250;
        const start = Date.now();
        const reelsToSpin = [...this.reels];
        
        for await (let value of this.infiniteSpinning(reelsToSpin)) {
            const shiftingWaitTime = (this.reels.length - reelsToSpin.length + 1) * shiftingDelay;
            
            if (Date.now() >= start + shiftingWaitTime) {
                reelsToSpin.shift();
            }

            if (!reelsToSpin.length) break;
        }

        return this.checkForWin(this.reels.map(reel => reel.sprites[2]));
    }

    private async* infiniteSpinning(reelsToSpin: Array<Reel>) {
        while (true) {
            const spinningPromises = reelsToSpin.map(reel => reel.spinOneTime());
            await Promise.all(spinningPromises);
            this.reshuffle();
            yield;
        }
    }

    private checkForWin(symbols: Array<PIXI.Sprite>): boolean {
        const combination: Array<string> = new Array<string>()
        symbols.forEach(symbol => combination.push(symbol.texture.textureCacheIds[0]));
        return this.checkIfWinningCombination(combination);
    }

    private checkIfWinningCombination(combination: Array<string>): boolean {
            var valuesSoFar = Object.create(null);
            for (var i = 0; i < combination.length; ++i) {
                var value = combination[i];
                if (value in valuesSoFar) {
                    return true;
                }
                valuesSoFar[value] = true;
            }
            return false;
    }

    private reshuffle() {
        this.reels.forEach(reel => {
            reel.sprites[0].texture = reel.textures[Math.floor(Math.random() * reel.textures.length)];
        });
    }
}

import * as PIXI from 'pixi.js';
import Loader from './loaderComponent/Loader';
import SpinButton from './spinButtonComponent/SpinButton';
import Background from './backgroundComponent/Background';
import ReelsContainer from './reelsContainerComponent/ReelsContainer';
import Results from './resultsComponent/Results';

export default class Game {
    public app: PIXI.Application;
    private playBtn: SpinButton;
    private reelsContainer: ReelsContainer;
    private Results: Results;

    constructor() {
        this.app = new PIXI.Application({ width: 960, height: 536 });
        window.document.body.appendChild(this.app.view);
        new Loader(this.app, this.init.bind(this));
    }

    private init() {
        this.createScene();
        this.createSpinButton();
        this.createReels();
        this.createResults();
    }

    private createScene() {
        const bg = new Background(this.app.loader);
        this.app.stage.addChild(bg.sprite);
    }

    private createSpinButton() {
        this.playBtn = new SpinButton(this.app, this.handleStart.bind(this));
        this.app.stage.addChild(this.playBtn.sprite);
    }

    private createReels() {
        this.reelsContainer = new ReelsContainer(this.app);
        this.app.stage.addChild(this.reelsContainer.container);
    }

    private createResults() {
        this.Results = new Results(this.app);
        this.app.stage.addChild(this.Results.container);
    }

    handleStart() {
        this.playBtn.setDisabled();
        this.reelsContainer.spin()
            .then(this.processSpinResult.bind(this));
    }

    private processSpinResult(isWin: boolean) {
        if (isWin) {
            this.Results.show();
        }
        this.playBtn.setEnabled();
    }
}

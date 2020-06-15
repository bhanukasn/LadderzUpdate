// playGame scene
class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: "ScoreScene", active: false });
    }

    // preloading assets
    preload() {
        this.load.image("background", "assets/img/LaddersHighScore.png");
    }

    // method to be executed once, when the scene has been created
    create() {

        //
        this.events.on('transitionstart', function (fromScene, duration) {
            this.cameras.main.setZoom(0.001);
        }, this);

        this.events.on('transitioncomplete', function (fromScene, duration) {
            // this.cameras.main.zoomTo(1, 300);
            this.cameras.main.zoomTo(1, 300);
        }, this);

        // this.events.on('transitioncomplete', function (fromScene) {

        // });

        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //

        //kaiads
        getKaiAd({
            publisher: 'ca24f2d0-de89-4c1a-80c4-51e14d317000',
            app: 'Knife shooter',
            slot: 'knife shooter',
            onerror: err => console.error('Custom catch:', err),
            onready: ad => {
                // Ad is ready to be displayed
                // calling 'display' will display the ad
                ad.call('display')
            }
        })

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight" || e.key == "Backspace") {
                //console.log("soft right key");
                this.goBackScene()

            }
        }, this);

        var HighScore = localStorage.getItem('LG Best Score') || 0;
        var ScondHighScore = localStorage.getItem('LG Second Best Score') || 0;
        var ThirdHighScore = localStorage.getItem('LG Third Best Score') || 0;

        //console.log(HighScore +"  "+ScondHighScore+"  "+ThirdHighScore);

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'background');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;
        //this.gameOver = this.add.text(game.config.width / 5, 50, 'BEST SCORE', { fontSize: '80px', fill: '#FFF' });

        if (HighScore === "null") {
            this.BEST = this.add.text(game.config.width / 2.1, game.config.height / 4 * 1.77, '0', { fontSize: '40px', fill: '#FFF' });
            //console.log(HighScore);
        } else {
            this.BEST = this.add.text(game.config.width / 2.1, game.config.height / 4 * 1.77, HighScore, { fontSize: '40px', fill: '#FFF' });
        }

        if (ScondHighScore === "null") {
            this.SECOND = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.35, '0', { fontSize: '40px', fill: '#FFF' });
            //console.log(ScondHighScore);
        } else {
            this.SECOND = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.35, ScondHighScore, { fontSize: '40px', fill: '#FFF' });
        }

        if (ThirdHighScore === "null") {
            this.THIRD = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.9, '0', { fontSize: '40px', fill: '#FFF' });
        } else {
            this.THIRD = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.9, ThirdHighScore, { fontSize: '40px', fill: '#FFF' });
        }
        this.about = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);
        // this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    // method to be called at each frame
    update() {
       
    }

    goBackScene() {
        //console.log("clicked")
        this.scene.transition({
            target: 'Menu',
            moveAbove: true,
            duration: 300,
        })
        // this.scene.start("Menu");
    }
};

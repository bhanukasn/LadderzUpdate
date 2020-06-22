class GameComplete extends Phaser.Scene {
    constructor() {

        super({ key: 'GameComplete', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;

    }



    preload() {
        this.load.image("bggamepassed", "assets/img/GameCompleted.png");

        this.load.image("btn_mainmanu", "assets/img/MainMenubtn.png");


    }

    create() {

        //
        this.events.on('transitionstart', function (fromScene, duration) {
            this.cameras.main.setZoom(0.001);
        }, this);

        this.events.on('transitioncomplete', function (fromScene, duration) {
            // this.cameras.main.zoomTo(1, 300);
            this.cameras.main.zoomTo(1, 300);
        }, this);



        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //

        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bggamepassed');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        if (score > localStorage.getItem('LG Best Score')) {
            localStorage.setItem('LG Third Best Score', localStorage.getItem('LG Second Best Score'));
            localStorage.setItem('LG Second Best Score', localStorage.getItem('LG Best Score'));
            localStorage.setItem('LG Best Score', score);
            this.bestScore.setText(localStorage.getItem('LG Best Score'));
        } else if ((localStorage.getItem('LG Best Score') > score && score >= localStorage.getItem('LG Second Best Score')) || localStorage.getItem('LG Second Best Score') == 'null') {
            localStorage.setItem('LG Third Best Score', localStorage.getItem('LG Second Best Score'));
            localStorage.setItem('LG Second Best Score', score);
        } else if ((localStorage.getItem('LG Second Best Score') > score && score >= localStorage.getItem('LG Third Best Score')) || localStorage.getItem('LG Third Best Score') == 'null') {
            localStorage.setItem('LG Third Best Score', score);
        }


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
            if (e.key == "Enter") {
                //console.log("Enter key");
                this.scene.transition({
                    target: 'Menu',
                    moveAbove: true,
                    duration: 300,
                })
            }
        }, this);

        // Button Option
        this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5.2, 'btn_mainmanu', 0).setInteractive();
        this.btn_exit.displayHeight = game.config.height / 8.9;
        this.btn_exit.displayWidth = game.config.width / 2.3;

    }


    update() {

    }




}

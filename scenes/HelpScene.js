class HelpScene extends Phaser.Scene {

    constructor() {
        super({ key: "HelpScene", active: false });
    }

    preload() {
        this.load.image("lgGameIns", "assets/img/LaddersInstructions.png");
        this.load.image("lgGameControls", "assets/img/LaddersGameControls.png");
        this.load.image("lgGameObs", "assets/img/LaddersAvoidObstacles.png");
        this.load.image("lgGamePoints", "assets/img/LaddersEarnPoints.png");
        this.load.image("lgGameLevels", "assets/img/LaddersUnlockLevels.png");
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

        // this.events.on('transitioncomplete', function (fromScene) {

        // });

        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight" || e.key == "Backspace") {
                //console.log("soft right key");
                //this.goToContactScene();
                this.goBackScene()

            }
        }, this);

        this.selected_screen = 'instruction';

        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameIns');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        this.left_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

        this.goBack = this.add.text(game.config.width - game.config.width * 8 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);

        // this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        this.left_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_arrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //touchable
        this.goBack.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.transition({
                target: "Menu",
                moveAbove: true,
                duration: 300,
            })
        });

        this.input.on("pointerdown", (pointer) => {
            if (pointer.x < game.config.width/2) {
                this.changeSlidesLeft()
            } else {
                this.changeSlidesRight()
            }
        }, this);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.left_arrow)) {
            //console.log("left CLICK");
            this.changeSlidesLeft();
        }

        if (Phaser.Input.Keyboard.JustDown(this.right_arrow)) {
            //console.log("right CLICK");
            // this.changeSlides();
            this.changeSlidesRight();

        }

        // if (Phaser.Input.Keyboard.JustDown(this.back_space)) {
        //     //console.log("back CLICK");
        //     this.goBackScene();
        // }

    }

    changeSlidesRight() {
        switch (this.selected_screen) {
            case "instruction":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameObs');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameObs";
                break;
            case "GameObs":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGamePoints');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GamePoints";
                break;
            case "GamePoints":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameControls');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameControls";
                break;
            case "GameControls":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameLevels');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameLevels";
                break;
            case "GameLevels":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameIns');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "instruction";
                break;
        }
        //this.skip = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Skip").setFontSize(50).setFontFamily("Arial").setOrigin(0.5);
        this.goBack = this.add.text(game.config.width - game.config.width * 8 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);
    }

    changeSlidesLeft() {
        switch (this.selected_screen) {
            case "GameLevels":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameControls');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameControls";
                break;
            case "GameControls":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGamePoints');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GamePoints";
                break;
            case "GamePoints":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameObs');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameObs";
                break;
            case "GameObs":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameIns');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "instruction";
                break;
            case "instruction":
                this.image.destroy();
                this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'lgGameLevels');
                this.image.displayHeight = game.config.height;
                this.image.displayWidth = game.config.width;
                this.selected_screen = "GameLevels";
                break;
        }
        // this.skip = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Skip").setFontSize(50).setFontFamily("Arial").setOrigin(0.5);
        this.goBackbtn = this.add.text(game.config.width - game.config.width * 8 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);
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


}
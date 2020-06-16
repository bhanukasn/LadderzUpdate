class SelectLevel extends Phaser.Scene {
    constructor() {

        super({ key: 'SelectLevel', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
    }


    preload() {
        // this.load.image("bgselectLevel", "assets/img/Map.png");
        // this.load.image("notcompleted", "assets/img/notcompleted.png");
        // this.load.image("completed", "assets/img/completed.png");

        this.load.image("btn_Leve2", "assets/img/Level2.png");
        this.load.image("btn_Level3", "assets/img/Level3.png");
        this.load.image("btn_Level4", "assets/img/Level4.png");

        this.load.image("bgSL", "assets/img/LevelsBackground.png");
        this.load.image("btn_Level1", "assets/img/Level1.png");

        this.load.image('L2Locked', 'assets/img/Level2Locked.png');
        this.load.image('L3Locked', 'assets/img/Level3Locked.png');
        this.load.image('L4Locked', 'assets/img/Level4Locked.png');
    }

    create(){
        // this.background = this.add.image(0,0,"background");
        this.background = this.add.tileSprite(0, 0, gameConfig.width, gameConfig.height, "background")
        this.background.setOrigin(0,0);
        // this.background.setScrollFactor(0);

        // this.ship1 = this.add.image(gameConfig.width/2 - 50,gameConfig.height/2,"ship");
        // this.ship2 = this.add.image(gameConfig.width/2,gameConfig.height/2,"ship2");
        // this.ship3 = this.add.image(gameConfig.width/2 + 50, gameConfig.height/2,"ship3");
        this.ship1 = this.add.sprite(gameConfig.width/2 - 50,gameConfig.height/2,"ship");
        this.ship2 = this.add.sprite(gameConfig.width/2,gameConfig.height/2,"ship2");
        this.ship3 = this.add.sprite(gameConfig.width/2 + 50, gameConfig.height/2,"ship3");

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16,16,"power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0,0,game.config.width, game.config.height);

            if (Math.random() > 0.5){
                powerUp.play("red");
            }else {
                powerUp.play("gray");
            }

            powerUp.setVelocity(100,100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        //Add the player to the physics
        this.player = this.physics.add.sprite(gameConfig.width/2 - 8, gameConfig.height - 64, "player");
        this.player.play("thrust");

        //create cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //Dont let the player to leave the screen
        this.player.setCollideWorldBounds(true);

        //camera follows the player
        // this.cameras.main.startFollow(this.player);

        //fire button define
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        // this.add.text(20,20,"Playing game", {
        //     font: "25px Arial",
        //     fill: "yellow"
        // });

        //graphic object to the score
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(gameConfig.width, 0);
        graphics.lineTo(gameConfig.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);


        //collision between beams and power ups
        this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerup) {
            projectile.destroy();
        });

        //overlap player and powerup
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

        //player hit enemy
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

        //beam hit enemy
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
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

        // //kaiads
        // getKaiAd({
        //     publisher: 'ca24f2d0-de89-4c1a-80c4-51e14d317000',
        //     app: 'Bouncy',
        //     slot: 'Bouncy',
        //     onerror: err => console.error('Custom catch:', err),
        //     onready: ad => {
        //         // Ad is ready to be displayed
        //         // calling 'display' will display the ad
        //         ad.call('display')
        //     }
        // })

        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bgSL');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        // this.logo = this.add.image(game.config.width / 2, this.CONFIG.centerY / 2.5, 'logo');
        // this.logo.displayHeight = game.config.height / 4;
        // this.logo.displayWidth = game.config.width / 3;


        this.selected_button = 'Play';

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_home = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);


        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight" || e.key == "Backspace") {
                //console.log("soft right key");
                this.goToMenu();

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                //console.log("soft left key");
                this.callMenuButton();
            }
        }, this);

        // Game title

        //this.text_title = this.add.text(this.CONFIG.centerX / 3, this.CONFIG.centerY - 600, 'Color Jump');
        //this.text_title.setColor('#FFF');
        //this.text_title.setFontSize('80px');


        // Click to play text
        // this.text_click_to_play = this.add.text(this.CONFIG.centerX/4, this.CONFIG.centerY+80, 'Click to Play');
        // this.text_click_to_play.setColor('#FFF');
        // this.text_click_to_play.setFontSize('80px');

        // Button PLay
        this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
        this.btn_play.displayHeight = game.config.height / 7;
        this.btn_play.displayWidth = game.config.width / 2;

        // Button Score
        if (localStorage.getItem('L1') == "C") {
            this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
            this.btn_score.displayHeight = game.config.height / 8;
            this.btn_score.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L1') == null) {
            this.btn_score = this.add.sprite(game.config.width / 1.85, (game.config.height / 9) * 3.7, 'L2Locked', 0).setInteractive();
            this.btn_score.displayHeight = game.config.height / 8;
            this.btn_score.displayWidth = game.config.width / 1.9;
        }

        //Button Help
        if (localStorage.getItem('L2') == "C") {
            this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
            this.btn_help.displayHeight = game.config.height / 8;
            this.btn_help.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L2') == null) {
            this.btn_help = this.add.sprite(game.config.width / 1.85, (game.config.height / 7.9) * 4.7, 'L3Locked', 0).setInteractive();
            this.btn_help.displayHeight = game.config.height / 8;
            this.btn_help.displayWidth = game.config.width / 1.9;
        }

        // Button exit
        if (localStorage.getItem('L3') == "C") {
            this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
            this.btn_leve4.displayHeight = game.config.height / 8;
            this.btn_leve4.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L3') == null) {
            this.btn_leve4 = this.add.sprite(game.config.width / 1.85, (game.config.height / 6.45) * 5, 'L4Locked', 0).setInteractive();
            this.btn_leve4.displayHeight = game.config.height / 8;
            this.btn_leve4.displayWidth = game.config.width / 1.9;
        }

        this.back = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);


        //touchable
        this.back.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.transition({
                target: "Menu",
                moveAbove: true,
                duration: 300,
            })
        });

        //touchable
        this.btn_play.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.transition({
                target: "Level2",
                moveAbove: true,
                duration: 300,
            })
        });

        if (localStorage.getItem('L1') == "C") {
            this.btn_score.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
                this.scene.transition({
                    target: "Level5",
                    moveAbove: true,
                    duration: 300,
                })
            });
        }

        if (localStorage.getItem('L2') == "C") {
            this.btn_help.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
                this.scene.transition({
                    target: "Level3",
                    moveAbove: true,
                    duration: 300,
                })
            });
        }

        if (localStorage.getItem('L3') == "C") {
            this.btn_leve4.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
                this.scene.transition({
                    target: "Level4",
                    moveAbove: true,
                    duration: 300,
                })
            });
        }
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.upArrow)) {
            // console.log("UP CLICK");
            this.changeMenuButtonWithArrowUp();
        }

        if (Phaser.Input.Keyboard.JustDown(this.downArrow)) {
            // console.log("DOWN CLICK");
            this.changeMenuButtonWithArrowDown();
        }
        // if (Phaser.Input.Keyboard.JustDown(this.key_home)) {
        //     console.log("home CLICK");
        //      this.goToOptionScene();
        // }

    }

    goToMenu() {
        this.scene.transition({
            target: "Menu",
            moveAbove: true,
            duration: 300,
        })
        // this.scene.start('Menu');
    }

    changeMenuButtonWithArrowDown() {

        switch (this.selected_button) {
            case "Play":
                if (localStorage.getItem('L1') == "C") {
                    this.btn_play.destroy();
                    //hover level1
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 8;
                    this.btn_play.displayWidth = game.config.width / 2.1;

                    this.btn_score.destroy();
                    //leve2 hover
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 7;
                    this.btn_score.displayWidth = game.config.width / 2;

                    this.selected_button = "ScoreScene"
                }

                break;
            case "ScoreScene":
                if (localStorage.getItem('L2') == "C") {
                    this.btn_score.destroy();
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 8;
                    this.btn_score.displayWidth = game.config.width / 2.1;

                    this.btn_help.destroy();
                    //leve3 hover
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 7;
                    this.btn_help.displayWidth = game.config.width / 2;

                    this.selected_button = "Help"
                }
                break;
            case "Help":
                if (localStorage.getItem('L3') == "C") {
                    this.btn_help.destroy();
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 8;
                    this.btn_help.displayWidth = game.config.width / 2.1;

                    this.btn_leve4.destroy();
                    //level 4 hover
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 7;
                    this.btn_leve4.displayWidth = game.config.width / 2;
                    // this.btn_exit.destroy();
                    // this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit_hover', 0).setInteractive();
                    // this.btn_exit.displayHeight = game.config.height / 9;
                    // this.btn_exit.displayWidth = game.config.width / 2;

                    this.selected_button = "Level4"
                }
                break;
            case "Level4":

                this.btn_leve4.destroy();
                this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                this.btn_leve4.displayHeight = game.config.height / 8;
                this.btn_leve4.displayWidth = game.config.width / 2.1;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 7;
                this.btn_play.displayWidth = game.config.width / 2;

                this.selected_button = "Play"
                break;
            default:

        }
    }

    changeMenuButtonWithArrowUp() {

        switch (this.selected_button) {
            case "Play":
                if (localStorage.getItem('L3') == "C") {
                    this.btn_play.destroy();
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 8;
                    this.btn_play.displayWidth = game.config.width / 2.1;

                    this.btn_leve4.destroy();
                    //level 4 hover
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 7;
                    this.btn_leve4.displayWidth = game.config.width / 2;

                    this.selected_button = "Level4"
                }
                break;
            case "Level4":
                if (localStorage.getItem('L2') == "C") {
                    this.btn_leve4.destroy();
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 8;
                    this.btn_leve4.displayWidth = game.config.width / 2.1;

                    this.btn_help.destroy();
                    //level3 hover
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 7;
                    this.btn_help.displayWidth = game.config.width / 2;

                    this.selected_button = "Help"
                }
                break;
            case "ScoreScene":
                if (localStorage.getItem('L1') == "C") {
                    this.btn_score.destroy();
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 8;
                    this.btn_score.displayWidth = game.config.width / 2.1;

                    this.btn_play.destroy();
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 7;
                    this.btn_play.displayWidth = game.config.width / 2;

                    this.selected_button = "Play"
                }
                break;
            case "Help":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8;
                this.btn_help.displayWidth = game.config.width / 2.1;

                this.btn_score.destroy();
                //leve2 hover
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 7;
                this.btn_score.displayWidth = game.config.width / 2;
                // this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score_hover', 0).setInteractive();
                // this.btn_score.displayHeight = game.config.height / 8.9;
                // this.btn_score.displayWidth = game.config.width / 2.8;

                this.selected_button = "ScoreScene"
                break;
            // case "Exit":
            //     this.btn_exit.destroy();
            //     this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit', 0).setInteractive();
            //     this.btn_exit.displayHeight = game.config.height / 9;
            //     this.btn_exit.displayWidth = game.config.width / 2;
            //
            //     this.btn_help.destroy();
            //     this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.2, 'btn_help_hover', 0).setInteractive();
            //     this.btn_help.displayHeight = game.config.height / 9;
            //     this.btn_help.displayWidth = game.config.width / 2;
            //     this.selected_button = "Help"
            //     break;
            // default:

        }
    }

/*
    callMenuButton() {
        switch (this.selectedLevel) {
            case 0:
                // console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level1',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level1")
                break;
            case 1:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level2',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level2")
                break;
            case 2:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level3',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level3")
                break;
            case 3:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level4',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level4")
                break;
            case 4:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level5',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level5")
                break;
            case 5:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level6',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level6")
                break;
            case 6:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level7',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level7")
                break;
            case 7:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level8',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level8")
                break;
            case 8:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level9',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level9")
                break;
            case 9:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level10',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
            case 10:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level11',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
            case 11:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level12',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
            case 12:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level13',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
            case 13:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level14',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
            case 14:
                //console.log("Play SELECT");
                this.scene.transition({
                    target: 'Level15',
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level10")
                break;
        }
    }

    */
}
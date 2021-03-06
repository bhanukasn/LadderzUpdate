// PlayGame scene
class Level1 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level1");
    }

    // method to be executed when the scene preloads
    preload() {
        this.load.image("floor", "assets/img/floor.png");
        // this.load.image("hero", "assets/img/hero.png");
        this.load.image("playBG", "assets/img/Background.png");
        this.load.image("score", "assets/img/Score.png")
        this.load.spritesheet("hero", "assets/img/hero2.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("heroRunLeft", "assets/img/heroleft.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("hepo", "assets/img/hepo.png", { frameWidth: 60, frameHeight: 38 });
        this.load.image("ladder", "assets/img/ladder2.png");
        this.load.image("hole", "assets/img/hole.png");
        this.load.image("diamond", "assets/img/Diamond.png");
        this.load.image("diamondparticle", "assets/img/diamondparticle.png");
        this.load.image("CoinBox", "assets/img/CoinBox.png");
        this.load.image("Trophy", "assets/img/Trophy.png");
        this.load.image("spike", "assets/img/spike.png");
        this.load.image("cloud", "assets/img/cloud.png");
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");

    }

    // method to be executed once the scene has been created
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
        this.score = score;
        this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? { score: 0 } : JSON.parse(localStorage.getItem(gameOptions.localStorageName));
        this.gameOver = false;
        this.reachedFloor = 0;
        this.collectedDiamonds = 0;
        this.canJump = true;
        this.isClimbing = false;
        this.floorCount = 0;
        this.ladderToClimb = 0;

        //store game level
        this.currentLevel = localStorage.getItem(gameOptions.currentLevel) == null ? 0 : localStorage.getItem(gameOptions.currentLevel);

        this.defineGroups();

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'playBG');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        this.drawLevel();
        // this.defineTweens();
        this.handleTap();

        //score button
        // this.score_btn = this.add.image(game.config.width / 5, game.config.height / 14 + 5, 'score');
        // this.score_btn.displayHeight = game.config.height / 10;
        // this.score_btn.displayWidth = game.config.width / 2.6;
        this.scoreText = this.add.text(game.config.width / 16, game.config.height / 19, "SCORE:" + this.score, { fontSize: '35px', fill: '#FFF' });
        // this.score_btn.setDepth(1);
        this.scoreText.setDepth(1);
    }

    defineGroups() {
        this.gameGroup = new Array();
        this.floorGroup = this.physics.add.group();
        this.diamondGroup = this.physics.add.group();
        this.ladderGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
        this.holeGroup = this.physics.add.group();
        this.gameGroup.push(this.floorGroup);
        this.gameGroup.push(this.diamondGroup);
        this.gameGroup.push(this.ladderGroup);
        this.gameGroup.push(this.spikeGroup);
        this.gameGroup.push(this.holeGroup);
    }

    drawLevel() {
        this.currentFloor = 0;
        this.highestFloorY = game.config.height * gameOptions.floorStart;
        this.floorsBeforeDisappear = Math.ceil((game.config.height - game.config.height * (gameOptions.floorStart)) / gameOptions.floorGap) + 1;
        this.floorPool = [];
        this.ladderPool = [];
        this.diamondPool = [];
        this.spikePool = [];
        this.holePool = [];

        while (this.highestFloorY > - 2 * gameOptions.floorGap) {
            //add floor
            this.addFloor(this.highestFloorY);
            if (this.currentFloor > 0) {
                this.addLadder(this.highestFloorY);
                if (gameLevels.arr[this.currentLevel].levelNumber != 'LEVEL:1') {
                    this.addSpike(this.highestFloorY);
                }
                if (gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:4' || gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:5') {
                    this.addDiamond(this.highestFloorY);
                }
            }
            this.highestFloorY -= gameOptions.floorGap;
            this.currentFloor++;

        }
        // this.highestFloorY += gameOptions.floorGap;
        this.currentFloor = 0;
        this.addHero();
    }

    //add floor
    addFloor(highestFloorY) {
        this.floorCount++;
        var floor = this.physics.add.sprite(game.config.width / 2, highestFloorY, "floor");
        this.floorGroup.add(floor);
        floor.displayWidth = game.config.width;
        floor.displayHeight = 35;
        floor.body.immovable = true;
        floor.body.checkCollision.down = false;

        // adding holes
        if (this.currentLevel > 0 && this.floorCount % 2 == 0) {
            // this.addHoles(highestFloorY);
            // var holeXPosition = Phaser.Math.Between(0, game.config.width);
            //
            // var hole = this.physics.add.sprite(holeXPosition, highestFloorY, "hole");
            // hole.displayHeight = 50;
            // hole.displayWidth = 25;
            // this.holeGroup.add(hole);
        }

    }

    //add Holes
    addHoles(highestFloorY) {
        var holeXPosition = Phaser.Math.Between(0, game.config.width);

        var hole = this.physics.add.sprite(holeXPosition, highestFloorY, "hole");
        hole.displayHeight = 30;
        hole.displayWidth = 25;
        this.holeGroup.add(hole);
    }

    //add Ladder
    addLadder(highestFloorY) {
        var ladderXPosition = Phaser.Math.Between(50, game.config.width - 50);
        var ladder = this.physics.add.sprite(ladderXPosition, highestFloorY + 50, "ladder");
        this.ladderGroup.add(ladder);
        ladder.setSize(ladder.displayWidth, ladder.displayHeight - 10, true)
        this.safeZone = [];
        this.safeZone.length = 0;
        this.safeZone.push({
            start: ladderXPosition - gameOptions.safeRadius,
            end: ladderXPosition + gameOptions.safeRadius
        });
    }

    //add Diamond
    addDiamond(highestFloorY) {
        if (Phaser.Math.Between(0, gameOptions.diamondRatio) != 0) {
            var diamondX = Phaser.Math.Between(50, game.config.width - 50);

            if (gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:4') {
                var diamond = this.physics.add.sprite(diamondX, highestFloorY - gameOptions.floorGap / 2, "diamond");
            } else if (gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:5') {
                var diamond = this.physics.add.sprite(diamondX, highestFloorY - gameOptions.floorGap / 2, "CoinBox");
            }
            diamond.displayWidth = 30;
            diamond.displayHeight = 30;
            diamond.body.immovable = true;
            this.diamondGroup.add(diamond);
        }
    }

    //add spick
    addSpike(highestFloorY) {
        var spick = 1;
        if (Phaser.Math.Between(0, gameOptions.doubleSpikeRatio) == 0) {
            spick = 1;
        }
        for (var i = 1; i <= spick; i++) {
            var spikeXPosition = this.findSpikePosition();
            if (spikeXPosition) {
                if (gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:2') {
                    var spike = this.physics.add.sprite(spikeXPosition, highestFloorY - 10, "hole");
                } else if (gameLevels.arr[this.currentLevel].levelNumber == 'LEVEL:3') {
                    var spike = this.physics.add.sprite(spikeXPosition, highestFloorY - 10, 'hepo');
                    this.anims.create({
                        key: 'heporun',
                        repeat: -1,
                        frameRate: 20,
                        frames: this.anims.generateFrameNames('hepo', { start: 1, end: 24 })
                    });

                    spike.play('heporun');
                } else {
                    var spike = this.physics.add.sprite(spikeXPosition, highestFloorY - 10, 'hepo');
                    this.anims.create({
                        key: 'heporun',
                        repeat: -1,
                        frameRate: 20,
                        frames: this.anims.generateFrameNames('hepo', { start: 1, end: 24 })
                    });

                    spike.play('heporun');
                    var tween = this.tweens.add({
                        targets: spike,
                        x: 500,
                        ease: 'Power1',
                        duration: 6000,
                        flipX: true,
                        yoyo: true,
                        repeat: -1
                    });
                }
                spike.setSize(10, 20, true);
                this.spikeGroup.add(spike);
            }
        }
    }

    //find spike position
    findSpikePosition() {
        var attempts = 0;
        do {
            attempts++;
            var posX = Phaser.Math.Between(150, game.config.width - 150)
        } while (this.isSafe(posX)) {
            this.safeZone.push({
                start: posX - gameOptions.safeRadius,
                end: posX + gameOptions.safeRadius
            })
            return posX;
        }
        return false;
    }

    //isSafe position
    isSafe(n) {
        for (var i = 0; i < this.safeZone.length; i++) {
            if (n > this.safeZone[i].start && n < this.safeZone[i].end) {
                return false;
            }
        }
        return true
    }

    //add Hero
    addHero() {
        this.hero = this.physics.add.sprite(game.config.width / 2, game.config.height * gameOptions.floorStart - 80, 'hero');
        // this.heroRunLeft = this.physics.add.sprite(game.config.width / 2, game.config.height * gameOptions.floorStart - 80, 'heroRunLeft');
        // this.hero2  .body.isSensor = true;
        // enimy
        this.anims.create({
            key: 'hero22',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('hero', { start: 1, end: 6 })
        });

        this.anims.create({
            key: 'heroLeft',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('heroRunLeft', { start: 1, end: 6 })
        });


        this.hero.play('hero22');
        this.hero.setSize(20, 60, true);
        this.gameGroup.push(this.hero);
        this.hero.body.setCollideWorldBounds();
        this.hero.body.gravity.y = gameOptions.playerGravity;
        this.hero.body.velocity.x = gameLevels.arr[this.currentLevel].playerSpeed;
        this.hero.setDepth(1)
    }

    //tween
    _scrollStart() {
        this.tweensToGo = 0;

        this.floorGroup.getChildren().map(function (c) { c.body.velocity.y = 200 })
        this.ladderGroup.getChildren().map(function (c) { c.body.velocity.y = 200 })
        this.spikeGroup.getChildren().map(function (c) { c.body.velocity.y = 200 })
        this.diamondGroup.getChildren().map(function (c) { c.body.velocity.y = 200 })
        this.holeGroup.getChildren().map(function (c) { c.body.velocity.y = 200 })
        this.hero.body.velocity.y = 2000
        setTimeout(() => {
            this._scrollStop();
        }, 1200);
    }

    _scrollStop() {
        this.floorGroup.getChildren().map(function (c) { c.body.velocity.y = 0 })
        this.ladderGroup.getChildren().map(function (c) { c.body.velocity.y = 0 })
        this.spikeGroup.getChildren().map(function (c) { c.body.velocity.y = 0 })
        this.diamondGroup.getChildren().map(function (c) { c.body.velocity.y = 0 })
        this.holeGroup.getChildren().map(function (c) { c.body.velocity.y = 0 })
        this.hero.body.velocity.y = 0

        var floorState = [];
        var ladderState = [];
        var spikeState = [];
        var diamondState = [];
        var holeState = [];

        this.floorGroup.getChildren().map((floor, index) => {
            floorState.push(floor.y);
            if (floor.y > game.config.height) {
                this.killFloor(floor);
            }
        }, this);

        this.ladderGroup.getChildren().map((ladder, index) => {
            ladderState.push(ladder.y);
            if (ladder.y > game.config.height) {
                this.killLadder(ladder);
            }
        }, this);

        this.spikeGroup.getChildren().map((spike, index) => {
            spikeState.push(spike.y);
            if (spike.y > game.config.height) {
                this.killSpike(spike);
            }
        }, this);

        this.diamondGroup.getChildren().map((diamond, index) => {
            diamondState.push(diamond.y);
            if (diamond.y > game.config.height) {
                this.killDiamond(diamond);
            }
        }, this);

        this.holeGroup.getChildren().map((hole, index) => {
            holeState.push(hole.y);
            if (hole.y > game.config.height) {
                this.killHole(hole);
            }
        }, this);

        this.addFloor(floorState[this.floorGroup.getChildren().length - 1] - gameOptions.floorGap)
        this.addLadder(ladderState[this.ladderGroup.getChildren().length - 1] - (gameOptions.floorGap + 50));
        if (gameLevels.arr[this.currentLevel].levelNumber != 'LEVEL:1') {
            this.addSpike(spikeState[this.spikeGroup.getChildren().length - 1] - (gameOptions.floorGap - 10));
            this.addDiamond(diamondState[this.diamondGroup.getChildren().length - 1] - (gameOptions.floorGap / 2));
        }
    }

    //game objects
    killFloor(floor) {
        floor.destroy();
        this.floorPool.push(floor);
    }
    killLadder(ladder) {
        ladder.destroy();
        this.ladderPool.push(ladder);
    }
    killDiamond(diamond) {
        diamond.destroy();
        this.diamondPool.push(diamond);
    }
    killSpike(spike) {
        spike.destroy();
        this.spikePool.push(spike);
    }
    killHole(hole) {
        hole.destroy();
        this.holePool.push(hole);
    }

    //handle hero jump
    handleTap() {
        this.input.keyboard.on('keyup', function (e) {
            if (this.canJump && !this.isClimbing && !this.gameOver) {
                this.hero.body.velocity.y = -gameOptions.playerJump;
                this.canJump = false;
            }
        }, this);
    }

    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {
        if (!this.gameOver) {
            //check floor hero collision
            this.checkFloorCollision();
            this._heroRun();
            this.checkLadderCollision();
            this.checkHoleCollision();
            this.checkSpikeCollision();
            this.checkDiamondCollision();
        }
    }

    checkFloorCollision() {
        var isCollider = this.physics.add.collider(this.hero, this.floorGroup, () => {
            this.canJump = true;
        }, null, this);
    }

    _heroRun() {
        if (this.hero.x >= game.config.width - 30) {
            this.hero.body.velocity.x = -gameLevels.arr[this.currentLevel].playerSpeed;
            this.hero.play('heroLeft');
            // this.hero.scaleX = -1;

        } else if (this.hero.x <= 40) {
            this.hero.body.velocity.x = gameLevels.arr[this.currentLevel].playerSpeed;
            this.hero.play('hero22');
            // this.hero.scaleX = 1;
        }
    }

    checkLadderCollision() {
        var isCollided = false;
        if (!this.isClimbing) {
            this.isCollided = this.physics.overlap(this.hero, this.ladderGroup, () => {
                this.ladderGroup.getChildren().forEach(ladder => {
                    if (Math.abs(this.hero.x - ladder.x) < 10) {
                        if (ladder.y >= 0) {
                            this.ladderToClimb = ladder.y;
                        }
                        console.log(ladder.y)
                        this.hero.body.velocity.x = 0;
                        this.hero.body.velocity.y = - gameOptions.climbSpeed;
                        this.hero.body.gravity.y = 0;
                        this.isClimbing = true;
                    }
                });
            }, null, this);
        } else if (this.hero.y < (this.ladderToClimb - 90) && this.isClimbing == true) {
            console.log('he he')
            this.hero.body.gravity.y = gameOptions.playerGravity;
            this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scaleX;
            if (this.hero.body.velocity.x < 0) {
                this.hero.play('heroLeft');
            } else {
                this.hero.play('hero22');
            }
            this.hero.body.velocity.y = 0;
            this.updateScore(ladderScore);
            this.isClimbing = false;
            setTimeout(() => {
                this._scrollStart();
                if (this.score >= gameLevels.arr[this.currentLevel].winingScore) {
                    this.checkGameWin();
                }
            }, 500);
        }
    }

    //check whether user hit a hole
    checkHoleCollision() {
        this.physics.overlap(this.hero, this.holeGroup, () => {
            this.gameOver = true;
            this.hero.body.velocity.x = Phaser.Math.Between(-20, 20);
            this.hero.body.velocity.y = -gameOptions.playerJump;
            this.hero.body.gravity.y = gameOptions.playerGravity * this.hero.body.scaleX;
            this.currentLevel = 0;
            localStorage.setItem(gameOptions.currentLevel, 0);
            setTimeout(() => { this.scene.start("GameOver"); }, 500);
        }, null, this);
    }

    checkSpikeCollision() {
        this.physics.overlap(this.hero, this.spikeGroup, () => {
            this.gameOver = true;
            this.hero.body.velocity.x = Phaser.Math.Between(-20, 20);
            this.hero.body.velocity.y = -gameOptions.playerJump;
            this.hero.body.gravity.y = gameOptions.playerGravity;
            setTimeout(() => { this.scene.start("GameOver"); }, 500);
        }, null, this);
    }

    checkDiamondCollision() {
        this.physics.overlap(this.hero, this.diamondGroup, () => {
            this.updateScore(10);
            var particles = this.add.particles('diamondparticle');

        }, null, this);
    }

    //update the score
    updateScore(inc) {
        this.score += inc;
        // this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        this.scoreText.setText('SCORE:' + this.score);
    }

    //check level scores
    checkGameWin() {
        score = this.score;
        localStorage.setItem(gameLevels.arr[this.currentLevel].levelNumber, "C");
        this.currentLevel++;

        localStorage.setItem(gameOptions.currentLevel, this.currentLevel);
        // this.scene.stop();
        this.scene.start('LevelCompleted');
        // if (this.currentLevel == 2) {
        //     this.scene.start('Level3');
        // } else {
        //     localStorage.setItem(gameOptions.currentLevel, this.currentLevel);
        //     this.scene.restart("Level1");
        // }
    }


}

//Object for game level attributes
gameLevels = {
    arr: [
        {
            score: 0,
            levelNumber: 'LEVEL:1',
            playerSpeed: 150,
            holeRatio: 0,
            diamondRatio: 0,
            turtleRatio: 0,
            turtleSpeed: 0,
            winingScore: 120
        },
        {
            score: 0,
            levelNumber: 'LEVEL:2',
            playerSpeed: 200,
            holeRatio: 1,
            diamondRatio: 0,
            turtleRatio: 0,
            turtleSpeed: 0,
            winingScore: 200
        },
        {
            score: 0,
            levelNumber: 'LEVEL:3',
            playerSpeed: 200,
            holeRatio: 0,
            diamondRatio: 0,
            turtleRatio: 1,
            turtleSpeed: 0,
            winingScore: 150
        },
        {
            score: 0,
            levelNumber: 'LEVEL:4',
            playerSpeed: 200,
            holeRatio: 0,
            diamondRatio: 2,
            turtleRatio: 1,
            turtleSpeed: 50,
            winingScore: 200
        },
        {
            score: 0,
            levelNumber: 'LEVEL:5',
            playerSpeed: 200,
            holeRatio: 1,
            diamondRatio: 2,
            turtleRatio: 1,
            turtleSpeed: 50,
            winingScore: 250
        }
    ],

};

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

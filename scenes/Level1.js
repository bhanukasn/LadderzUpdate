// PlayGame scene
class Level1 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level1");
    }

    // method to be executed when the scene preloads
    preload() {
        this.load.image("floor", "assets/img/floor.png");
        this.load.image("hero", "assets/img/hero.png");
        this.load.image("ladder", "assets/img/ladder2.png");
        this.load.image("diamond", "assets/img/diamond.png");
        this.load.image("diamondparticle", "assets/img/diamondparticle.png");
        this.load.image("spike", "assets/img/spike.png");
        this.load.image("cloud", "assets/img/cloud.png");
        this.load.image("tap", "assets/img/tap.png");
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
    }

    // method to be executed once the scene has been created
    create() {
        this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? { score: 0 } : JSON.parse(localStorage.getItem(gameOptions.localStorageName));
        this.gameOver = false;
        this.reachedFloor = 0;
        this.collectedDiamonds = 0;
        this.canJump = true;
        this.isClimbing = false;
        this.defineGroups();

        this.drawLevel();
        // this.defineTweens();
        this.handleTap();

    }

    defineGroups() {
        this.gameGroup = new Array();;
        this.floorGroup = this.physics.add.group();
        this.diamondGroup = this.physics.add.group();
        this.ladderGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
        this.gameGroup.push(this.floorGroup);
        this.gameGroup.push(this.diamondGroup);
        this.gameGroup.push(this.ladderGroup);
        this.gameGroup.push(this.spikeGroup)
    }

    drawLevel() {
        this.currentFloor = 0;
        this.highestFloorY = game.config.height * gameOptions.floorStart;
        this.floorsBeforeDisappear = Math.ceil((game.config.height - game.config.height * (gameOptions.floorStart)) / gameOptions.floorGap) + 1;
        this.floorPool = [];
        this.ladderPool = [];
        this.diamondPool = [];
        this.spikePool = [];
        while (this.highestFloorY > - 2 * gameOptions.floorGap) {
            //add floor
            this.addFloor(this.highestFloorY);
            if (this.currentFloor > 0) {
                this.addLadder(this.highestFloorY);
                this.addDiamond(this.highestFloorY);
                this.addSpike(this.highestFloorY);
            }
            this.highestFloorY -= gameOptions.floorGap;
            this.currentFloor++;
        }
        this.highestFloorY += gameOptions.floorGap;
        this.currentFloor = 0;
        this.addHero();
    }

    //add floor
    addFloor(highestFloorY) {
        var floor = this.physics.add.sprite(game.config.width / 2, highestFloorY, "floor");
        this.floorGroup.add(floor);
        floor.displayWidth = game.config.width;
        floor.displayHeight = 25;
        floor.body.immovable = true;
        floor.body.checkCollision.down = false;
    }

    //add Ladder
    addLadder(highestFloorY) {
         console.log( highestFloorY + 10+"======>") 
        var ladderXPosition = Phaser.Math.Between(50, game.config.width - 50);
        var ladder = this.physics.add.sprite(ladderXPosition, highestFloorY + 50, "ladder");
        // ladder.displayHeight = 120;
        this.ladderGroup.add(ladder);

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

            var diamond = this.physics.add.sprite(diamondX, highestFloorY - gameOptions.floorGap / 2, "diamond")
            diamond.body.immovable = true;
            this.diamondGroup.add(diamond);
        }
    }

    //add spick
    addSpike(highestFloorY) {
        var spick = 1;
        if (Phaser.Math.Between(0, gameOptions.doubleSpikeRatio) == 0) {
            spick = 2;
        }
        for (var i = 1; i <= spick; i++) {
            var spikeXPosition = this.findSpikePosition();
            if (spikeXPosition) {
                var spike = this.physics.add.sprite(spikeXPosition, highestFloorY - 20, "spike");
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
        this.hero = this.physics.add.sprite(game.config.width / 2, game.config.height * gameOptions.floorStart - 40, "hero");
        this.gameGroup.push(this.hero)
        this.hero.body.setCollideWorldBounds();
        this.hero.body.gravity.y = gameOptions.playerGravity;
        this.hero.body.velocity.x = gameOptions.playerSpeed;
    }

    //tween
    _scrollStart() {
        console.log(this.gameGroup)
        this.tweensToGo = 0;

        this.floorGroup.getChildren().map(function (c) {c.body.velocity.y = 2000 })
        this.ladderGroup.getChildren().map(function (c) {c.body.velocity.y = 2000 })
        this.spikeGroup.getChildren().map(function (c) {c.body.velocity.y = 2000 })
        this.diamondGroup.getChildren().map(function (c) {c.body.velocity.y = 2000 })
    }

    _scrollStop(){
        this.floorGroup.getChildren().map(function (c) {c.body.velocity.y = 0 })
        this.ladderGroup.getChildren().map(function (c) {c.body.velocity.y = 0 })
        this.spikeGroup.getChildren().map(function (c) {c.body.velocity.y = 0 })
        this.diamondGroup.getChildren().map(function (c) {c.body.velocity.y = 0 })

         var floorState = [];
         var ladderState = [];
         var spikeState = [];
         var diamondState = [];

            this.floorGroup.getChildren().map((floor,index) => {
                console.log(floor.y)
                floorState.push(floor.y);
                if(floor.y > game.config.height){
                    this.killFloor(floor);
                }
            },this);
            
            this.ladderGroup.getChildren().map((ladder,index) => {
                ladderState.push(ladder.y);
                if(ladder.y > game.config.height){
                    this.killFloor(ladder);
                }
            },this);

            this.spikeGroup.getChildren().map((spike,index) => {
                spikeState.push(spike.y);
                if(spike.y > game.config.height){
                    this.killFloor(spike);
                }
            },this);

            this.diamondGroup.getChildren().map((diamond,index) => {
                diamondState.push(diamond.y);
                if(diamond.y > game.config.height){
                    this.killFloor(diamond);
                }
            },this);
        this.addFloor(floorState[this.floorGroup.getChildren().length-1] - gameOptions.floorGap)
        this.addLadder(ladderState[this.ladderGroup.getChildren().length-1] - ( gameOptions.floorGap + 50));
        this.addSpike(spikeState[this.spikeGroup.getChildren().length-1] -( gameOptions.floorGap - 20));
        this.addDiamond(diamondState[this.diamondGroup.getChildren().length-1] -(gameOptions.floorGap / 2));
    }

    //game objects
    killFloor(floor){
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
        }
    }

    checkFloorCollision () {
        this.physics.add.collider(this.hero, this.floorGroup, () => {
            this.canJump = true;
        }, null, this);
    }

    _heroRun() {
        if (this.hero.x === game.config.width - 10) {
            this.hero.body.velocity.x = -gameOptions.playerSpeed;
            this.hero.scaleX = -1;
            //  console.log(this.hero.scaleX)

        } else if (this.hero.x <= 10) {
            this.hero.body.velocity.x = gameOptions.playerSpeed;
            this.hero.scaleX = 1;
        }
    }

    checkLadderCollision() {
        if (!this.isClimbing) {
            var isCollided = this.physics.overlap(this.hero, this.ladderGroup, () => {
                this.ladderGroup.getChildren().forEach(ladder => {
                    if (Math.abs(this.hero.x - ladder.x) < 10) {
                        this.ladderToClimb = ladder;
                        this.hero.body.velocity.x = 0;
                        this.hero.body.velocity.y = - gameOptions.climbSpeed;
                        this.hero.body.gravity.y = 0;
                        this.isClimbing = true;
                        this._scrollStart();
                    }
                });
            }, null, this);
        } else {
            if (this.hero.y < this.ladderToClimb.y - 80) {
                this.hero.body.gravity.y = gameOptions.playerGravity;
                this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scaleX;
                this.hero.body.velocity.y = 0;
                this.isClimbing = false;
                this._scrollStop();
            }
        }
    }
}

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

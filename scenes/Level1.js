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
        this.load.image("ladder", "assets/img/ladder.png");
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

    }

    defineGroups() {
        this.floorGroup = this.physics.add.group();
        this.ladderGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
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
            this.addFloor();
            if (this.currentFloor > 0) {
                this.addLadder();
                this.addDiamond();
                this.addSpike();
            }
            this.highestFloorY -= gameOptions.floorGap;
            this.currentFloor++;
        }
        this.highestFloorY += gameOptions.floorGap;
        this.currentFloor = 0;
        this.addHero();
    }

    //add floor
    addFloor() {
        var floor = this.physics.add.sprite(game.config.width / 2, this.highestFloorY, "floor");
        this.floorGroup.add(floor);
        floor.displayWidth = game.config.width;
        floor.displayHeight = 25;
        floor.body.immovable = true;
    }

    //add Ladder
    addLadder() {
        var ladderXPosition = Phaser.Math.Between(50, game.config.width - 50);
        var ladder = this.physics.add.sprite(ladderXPosition, this.highestFloorY + 60, "ladder");
        ladder.displayHeight = 120;

        this.safeZone = [];
        this.safeZone.length = 0;
        this.safeZone.push({
            start: ladderXPosition - gameOptions.safeRadius,
            end: ladderXPosition + gameOptions.safeRadius
        });
    }

    //add Diamond
    addDiamond() {
        if (Phaser.Math.Between(0, gameOptions.diamondRatio) != 0) {
            var diamondX = Phaser.Math.Between(50, game.config.width - 50);

            var diamond = this.physics.add.sprite(diamondX, this.highestFloorY - gameOptions.floorGap / 2, "diamond")
        }
    }

    //add spick
    addSpike() {
        var spick = 1;
        if (Phaser.Math.Between(0, gameOptions.doubleSpikeRatio) == 0) {
            spick = 2;
        }
        for (var i = 1; i <= spick; i++) {
            var spikeXPosition = this.findSpikePosition();
            if (spikeXPosition) {
                var spike = this.physics.add.sprite(spikeXPosition, this.highestFloorY - 20, "spike");
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
        this.hero.body.setCollideWorldBounds();
        this.hero.body.gravity.y = gameOptions.playerGravity;
        this.hero.body.velocity.x = gameOptions.playerSpeed;
       
    }

    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {
        if (!this.gameOver) {
            //check floor hero collision
            this.checkFloorCollision();
        }
    }

    checkFloorCollision = () => {
        this.physics.add.collider(this.hero, this.floorGroup, () => {
            this.canJump = true;
        }, null, this);
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

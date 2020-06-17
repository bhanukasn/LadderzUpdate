// the game itself
var game;



// global game options
var gameOptions = {
    gameWidth: 800,
    floorStart: 0.9375, // = 600/640 for lowerst floor and 40 high floor
    floorGap: 200,
    playerGravity: 10000,
    playerSpeed: 150,
    climbSpeed: 450,
    playerJump: 1700,
    diamondRatio: 2,
    doubleSpikeRatio: 2,
    skyColor: 0xaaeaff,
    safeRadius: 100,
    localStorageName: "climbgame",
    versionNumber: "1.0"
}

// constants used to pass "LEFT" and "RIGHT" as arguments rather than "0" and "1"
const LEFT = 0;
const RIGHT = 1;
var score = 0;
var scoreText;
var isLevelAchieved = false;
var levelText;
var level = 1;
var ladderScore = 10;

// function to be executed when the windows has loaded
window.onload = function () {

    // object containing configuration options
    var gameConfig = {

        // render type: let the game decide if CANVAS of WEBGL
        type: Phaser.AUTO,

        // width of the game, in pixels
        width: 480,

        // height of the game, in pixels
        height: 640,

        // background color (black)
        backgroundColor: 0xffffff,


        // scene to play
        // scene: playGame,

        // physics settings
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
                gravity: {
                    y: 0 //the game gravity
                }
            }
        },
        url: '',
        pixelArt: true,

        scene: [Boot,
            ScoreScene,
            Preloader,
            Options,
            Level1,
            Menu,
            GameOver,
            LevelCompleted,
            HelpScene,
            ContactScene,
            CountDown,
            SelectLevel,
            GameComplete,
            IntroductionScene]
    }

    // game creation
    game = new Phaser.Game(gameConfig);

    game.URL = '';

    game.CONFIG = {
        width: gameConfig.width,
        height: gameConfig.height,
        centerX: Math.round(0.5 * gameConfig.width),
        centerY: Math.round(0.5 * gameConfig.height)
    };


    game.globals = {
        model: new Model(),
        bgMusic: null,
        score: null,
        gameDiffculty: null,
        level: 1,
        ballXposition: game.config.width / 4,
        ballYposition: game.config.height / 2,
    }

    // giving focus to the frame (if any) where the game is running in
    window.focus();

    // pure javascript to scale the canvas
    resize();
    window.addEventListener("resize", resize, false);
}


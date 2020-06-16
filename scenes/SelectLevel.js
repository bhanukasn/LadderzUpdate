class SelectLevel extends Phaser.Scene {
    constructor() {

        super({ key: 'SelectLevel', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
    }


    preload() {alert('call');
        this.load.image("bgselectLevel", "assets/img/LaddersLevelsLocked.png");
        this.load.image("notcompleted", "assets/img/notcompleted.png");
        this.load.image("completed", "assets/img/completed.png");
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

        //variables
        this.roundlist = new Array();
        this.selectedLevel = parseInt(localStorage.getItem('Completed Level'));
        if (localStorage.getItem('Completed Level') == null) {
            this.selectedLevel = 0;
        }

        //background img
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bgselectLevel');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_home = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);

        //not completed round img
        //level 1
        this.not_comple_round1 = this.add.sprite(game.config.width / 6, game.config.height / 1.30, 'completed');
        this.not_comple_round1.displayHeight = 35;
        this.not_comple_round1.displayWidth = 35;
        this.not_comple_round1.isLocked = false;
        this.roundlist.push(this.not_comple_round1);
        if (this.selectedLevel == 0) {
            this.not_comple_round1.setTint(0x00FF00);
        }

        var Leve1 = this.add.text(game.config.width / 6.45, game.config.height / 1.34, '1', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff', fontWeight: 'bold' });
        //level 2
        this.not_comple_round2 = this.add.sprite(game.config.width / 6.5, game.config.height / 1.55, 'notcompleted');
        this.not_comple_round2.displayHeight = 35;
        this.not_comple_round2.displayWidth = 35;
        this.not_comple_round2.setTint(0xFF0000);
        this.not_comple_round2.isLocked = true;
        this.roundlist.push(this.not_comple_round2)


        var Leve2 = this.add.text(game.config.width / 7.2, game.config.height / 1.61, '2', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });


        //level 3
        this.not_comple_round3 = this.add.sprite(game.config.width / 3.2, game.config.height / 1.565, 'notcompleted');
        this.not_comple_round3.displayHeight = 35;
        this.not_comple_round3.displayWidth = 35;
        this.not_comple_round3.setTint(0xFF0000);
        this.not_comple_round3.isLocked = true;
        this.roundlist.push(this.not_comple_round3)


        var Leve3 = this.add.text(game.config.width / 3.34, game.config.height / 1.63, '3', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 4
        this.not_comple_round4 = this.add.sprite(game.config.width / 2.85, game.config.height / 1.241, 'notcompleted');
        this.not_comple_round4.displayHeight = 35;
        this.not_comple_round4.displayWidth = 35;
        this.not_comple_round4.setTint(0xFF0000);
        this.not_comple_round4.isLocked = true;
        this.roundlist.push(this.not_comple_round4)


        var Leve4 = this.add.text(game.config.width / 2.98, game.config.height / 1.281, '4', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 5
        this.not_comple_round5 = this.add.sprite(game.config.width / 1.85, game.config.height / 1.26, 'notcompleted');
        this.not_comple_round5.displayHeight = 35;
        this.not_comple_round5.displayWidth = 35;
        this.not_comple_round5.setTint(0xFF0000);
        this.not_comple_round5.isLocked = true;
        this.roundlist.push(this.not_comple_round5)

        var Leve5 = this.add.text(game.config.width / 1.9, game.config.height / 1.295, '5', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 6
        this.not_comple_round6 = this.add.sprite(game.config.width / 2.31, game.config.height / 1.605, 'notcompleted');
        this.not_comple_round6.displayHeight = 35;
        this.not_comple_round6.displayWidth = 35;
        this.not_comple_round6.setTint(0xFF0000);
        this.not_comple_round6.isLocked = true;
        this.roundlist.push(this.not_comple_round6)

        var Leve6 = this.add.text(game.config.width / 2.4, game.config.height / 1.66, '6', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 7
        this.not_comple_round7 = this.add.sprite(game.config.width / 1.58, game.config.height / 1.64, 'notcompleted');
        this.not_comple_round7.displayHeight = 35;
        this.not_comple_round7.displayWidth = 35;
        this.not_comple_round7.setTint(0xFF0000);
        this.not_comple_round7.isLocked = true;
        this.roundlist.push(this.not_comple_round7)

        var Leve7 = this.add.text(game.config.width / 1.61, game.config.height / 1.69, '7', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 8
        this.not_comple_round8 = this.add.sprite(game.config.width / 2.15, game.config.height / 1.84, 'notcompleted');
        this.not_comple_round8.displayHeight = 35;
        this.not_comple_round8.displayWidth = 35;
        this.not_comple_round8.setTint(0xFF0000);
        this.not_comple_round8.isLocked = true;
        this.roundlist.push(this.not_comple_round8)

        var Leve8 = this.add.text(game.config.width / 2.21, game.config.height / 1.92, '8', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 9
        this.not_comple_round9 = this.add.sprite(game.config.width / 2.3, game.config.height / 2.19, 'notcompleted');
        this.not_comple_round9.displayHeight = 35;
        this.not_comple_round9.displayWidth = 35;
        this.not_comple_round9.setTint(0xFF0000);
        this.not_comple_round9.isLocked = true;
        this.roundlist.push(this.not_comple_round9)

        var Leve9 = this.add.text(game.config.width / 2.38, game.config.height / 2.29, '9', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 10  
        this.not_comple_round10 = this.add.sprite(game.config.width / 1.7, game.config.height / 1.99, 'notcompleted');
        this.not_comple_round10.displayHeight = 35;
        this.not_comple_round10.displayWidth = 35;
        this.not_comple_round10.setTint(0xFF0000);
        this.not_comple_round10.isLocked = true;
        this.roundlist.push(this.not_comple_round10)

        var Leve10 = this.add.text(game.config.width / 1.79, game.config.height / 2.09, '10', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 11  
        this.not_comple_round11 = this.add.sprite(game.config.width / 1.43, game.config.height / 2.15, 'notcompleted');
        this.not_comple_round11.displayHeight = 35;
        this.not_comple_round11.displayWidth = 35;
        this.not_comple_round11.setTint(0xFF0000);
        this.not_comple_round11.isLocked = true;
        this.roundlist.push(this.not_comple_round11)

        var Leve11 = this.add.text(game.config.width / 1.49, game.config.height / 2.26, '11', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 12
        this.not_comple_round12 = this.add.sprite(game.config.width / 1.9, game.config.height / 2.79, 'notcompleted');
        this.not_comple_round12.displayHeight = 35;
        this.not_comple_round12.displayWidth = 35;
        this.not_comple_round12.setTint(0xFF0000);
        this.not_comple_round12.isLocked = true;
        this.roundlist.push(this.not_comple_round12)

        var Leve12 = this.add.text(game.config.width / 2.02, game.config.height / 2.99, '12', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 13
        this.not_comple_round13 = this.add.sprite(game.config.width / 1.47, game.config.height / 2.67, 'notcompleted');
        this.not_comple_round13.displayHeight = 35;
        this.not_comple_round13.displayWidth = 35;
        this.not_comple_round13.setTint(0xFF0000);
        this.not_comple_round13.isLocked = true;
        this.roundlist.push(this.not_comple_round13)

        var Leve13 = this.add.text(game.config.width / 1.54, game.config.height / 2.83, '13', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 14
        this.not_comple_round14 = this.add.sprite(game.config.width / 1.26, game.config.height / 2.67, 'notcompleted');
        this.not_comple_round14.displayHeight = 35;
        this.not_comple_round14.displayWidth = 35;
        this.not_comple_round14.setTint(0xFF0000);
        this.not_comple_round14.isLocked = true;
        this.roundlist.push(this.not_comple_round14)

        var Leve14 = this.add.text(game.config.width / 1.32, game.config.height / 2.83, '14', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        //level 15
        this.not_comple_round15 = this.add.sprite(game.config.width / 1.2, game.config.height / 3.56, 'notcompleted');
        this.not_comple_round15.displayHeight = 35;
        this.not_comple_round15.displayWidth = 35;
        this.not_comple_round15.setTint(0xFF0000);
        this.not_comple_round15.isLocked = true;
        this.roundlist.push(this.not_comple_round15)

        var Leve15 = this.add.text(game.config.width / 1.25, game.config.height / 3.89, '15', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' });

        ///////
        this.back = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);

        ///////
        console.log(localStorage.getItem('Completed Level'));
        for (var i = 0; i <= parseInt(localStorage.getItem('Completed Level')); i++) {
            if (i == 0) {
                continue;
            }
            this.roundlist[i].setTint(0xffa500);
            this.roundlist[i].isLocked = false;
            if (i == parseInt(localStorage.getItem('Completed Level'))) {
                console.log(i)
                this.roundlist[i].setTint(0x00FF00);
            }
            console.log(this.roundlist[i])
        };

        //////
        this.input.keyboard.on('keyup', function (e) {
            console.log(e)
            if (e.key == "Enter") {
                //console.log("soft left key");
                this.callMenuButton();
            }
            if (e.key == "SoftRight" || e.key == "Backspace") {
                this.scene.transition({
                    target: 'Menu',
                    moveAbove: true,
                    duration: 300,
                })
            }
        }, this);
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
    }

    changeMenuButtonWithArrowUp() {
        console.log(this.selectedLevel)
        switch (this.selectedLevel) {
            case 0:
                console.log(this.not_comple_round2.isTinted)
                !this.not_comple_round2.isLocked ? [this.not_comple_round1.clearTint(), this.not_comple_round2.setTint(0x00FF00), this.selectedLevel = 1] : console.log('locked');
                break;
            case 1:
                !this.not_comple_round3.isLocked ? [this.not_comple_round2.clearTint(), this.not_comple_round2.setTint(0xffa500), this.not_comple_round3.setTint(0x00FF00), this.selectedLevel = 2] : console.log('locked');
                break;
            case 2:
                !this.not_comple_round4.isLocked ? [this.not_comple_round3.clearTint(), this.not_comple_round3.setTint(0xffa500), this.not_comple_round4.setTint(0x00FF00), this.selectedLevel = 3] : console.log('locked');
                break;
            case 3:
                !this.not_comple_round5.isLocked ? [this.not_comple_round4.clearTint(), this.not_comple_round4.setTint(0xffa500), this.not_comple_round5.setTint(0x00FF00), this.selectedLevel = 4] : console.log('locked');
                break;
            case 4:
                !this.not_comple_round6.isLocked ? [this.not_comple_round5.clearTint(), this.not_comple_round5.setTint(0xffa500), this.not_comple_round6.setTint(0x00FF00), this.selectedLevel = 5] : console.log('locked');
                break;
            case 5:
                !this.not_comple_round7.isLocked ? [this.not_comple_round6.clearTint(), this.not_comple_round6.setTint(0xffa500), this.not_comple_round7.setTint(0x00FF00), this.selectedLevel = 6] : console.log('locked');
                break;
            case 6:
                !this.not_comple_round8.isLocked ? [this.not_comple_round7.clearTint(), this.not_comple_round7.setTint(0xffa500), this.not_comple_round8.setTint(0x00FF00), this.selectedLevel = 7] : console.log('locked');
                break;
            case 7:
                !this.not_comple_round9.isLocked ? [this.not_comple_round8.clearTint(), this.not_comple_round8.setTint(0xffa500), this.not_comple_round9.setTint(0x00FF00), this.selectedLevel = 8] : console.log('locked');
                break;
            case 8:
                !this.not_comple_round10.isLocked ? [this.not_comple_round9.clearTint(), this.not_comple_round9.setTint(0xffa500), this.not_comple_round10.setTint(0x00FF00), this.selectedLevel = 9] : console.log('locked');
                break;
            case 9:
                !this.not_comple_round11.isLocked ? [this.not_comple_round10.clearTint(), this.not_comple_round10.setTint(0xffa500), this.not_comple_round11.setTint(0x00FF00), this.selectedLevel = 10] : console.log('locked');
                break;
            case 10:
                !this.not_comple_round12.isLocked ? [this.not_comple_round11.clearTint(), this.not_comple_round11.setTint(0xffa500), this.not_comple_round12.setTint(0x00FF00), this.selectedLevel = 11] : console.log('locked');
                break;
            case 11:
                !this.not_comple_round13.isLocked ? [this.not_comple_round12.clearTint(), this.not_comple_round12.setTint(0xffa500), this.not_comple_round13.setTint(0x00FF00), this.selectedLevel = 12] : console.log('locked');
                break;
            case 12:
                !this.not_comple_round14.isLocked ? [this.not_comple_round13.clearTint(), this.not_comple_round13.setTint(0xffa500), this.not_comple_round14.setTint(0x00FF00), this.selectedLevel = 13] : console.log('locked');
                break;
            case 13:
                !this.not_comple_round15.isLocked ? [this.not_comple_round14.clearTint(), this.not_comple_round14.setTint(0xffa500), this.not_comple_round15.setTint(0x00FF00), this.selectedLevel = 14] : console.log('locked');
                break;
        }
    }

    changeMenuButtonWithArrowDown() {
        switch (this.selectedLevel) {
            case 14:
                !this.not_comple_round14.isLocked ? [this.not_comple_round15.clearTint(), this.not_comple_round15.setTint(0xffa500), this.not_comple_round14.setTint(0x00FF00), this.selectedLevel = 13] : console.log('locked');
                break;
            case 13:
                !this.not_comple_round13.isLocked ? [this.not_comple_round14.clearTint(), this.not_comple_round14.setTint(0xffa500), this.not_comple_round13.setTint(0x00FF00), this.selectedLevel = 12] : console.log('locked');
                break;
            case 12:
                !this.not_comple_round12.isLocked ? [this.not_comple_round13.clearTint(), this.not_comple_round13.setTint(0xffa500), this.not_comple_round12.setTint(0x00FF00), this.selectedLevel = 11] : console.log('locked');
                break;
            case 11:
                !this.not_comple_round11.isLocked ? [this.not_comple_round12.clearTint(), this.not_comple_round12.setTint(0xffa500), this.not_comple_round11.setTint(0x00FF00), this.selectedLevel = 10] : console.log('locked');
                break;
            case 10:
                !this.not_comple_round10.isLocked ? [this.not_comple_round11.clearTint(), this.not_comple_round11.setTint(0xffa500), this.not_comple_round10.setTint(0x00FF00), this.selectedLevel = 9] : console.log('locked');
                break;
            case 9:
                !this.not_comple_round9.isLocked ? [this.not_comple_round10.clearTint(), this.not_comple_round10.setTint(0xffa500), this.not_comple_round9.setTint(0x00FF00), this.selectedLevel = 8] : console.log('locked');
                break;
            case 8:
                !this.not_comple_round8.isLocked ? [this.not_comple_round9.clearTint(), this.not_comple_round9.setTint(0xffa500), this.not_comple_round8.setTint(0x00FF00), this.selectedLevel = 7] : console.log('locked');
                break;
            case 7:
                !this.not_comple_round7.isLocked ? [this.not_comple_round8.clearTint(), this.not_comple_round8.setTint(0xffa500), this.not_comple_round7.setTint(0x00FF00), this.selectedLevel = 6] : console.log('locked');
                break;
            case 6:
                !this.not_comple_round6.isLocked ? [this.not_comple_round7.clearTint(), this.not_comple_round7.setTint(0xffa500), this.not_comple_round6.setTint(0x00FF00), this.selectedLevel = 5] : console.log('locked');
                break;
            case 5:
                !this.not_comple_round5.isLocked ? [this.not_comple_round6.clearTint(), this.not_comple_round6.setTint(0xffa500), this.not_comple_round5.setTint(0x00FF00), this.selectedLevel = 4] : console.log('locked');
                break;
            case 4:
                !this.not_comple_round4.isLocked ? [this.not_comple_round5.clearTint(), this.not_comple_round5.setTint(0xffa500), this.not_comple_round4.setTint(0x00FF00), this.selectedLevel = 3] : console.log('locked');
                break;
            case 3:
                !this.not_comple_round3.isLocked ? [this.not_comple_round4.clearTint(), this.not_comple_round4.setTint(0xffa500), this.not_comple_round3.setTint(0x00FF00), this.selectedLevel = 2] : console.log('locked');
                break;
            case 2:
                !this.not_comple_round2.isLocked ? [this.not_comple_round3.clearTint(), this.not_comple_round3.setTint(0xffa500), this.not_comple_round2.setTint(0x00FF00), this.selectedLevel = 1] : console.log('locked');
                break;
            case 1:
                !this.not_comple_round1.isLocked ? [this.not_comple_round2.clearTint(), this.not_comple_round2.setTint(0xffa500), this.not_comple_round1.setTint(0x00FF00), this.selectedLevel = 0] : console.log('locked');
                break;
        }
    }

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
}

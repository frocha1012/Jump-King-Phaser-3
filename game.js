const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 } //550 default
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);



function preload() {

    //SOUNDS
    this.load.audio('jumpSound', 'assets/jump.mp3');
    this.load.audio('clown', 'assets/clown.mp3');


    //MUNDO 1
    this.load.image('backgroundForest', 'assets/ArtForest.png');
    this.load.image('floorForest', 'assets/FloorArtForest.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('verdePequeno', 'assets/resize3/verde1.png');
    this.load.image('verdeMedio', 'assets/resize3/verde2.png');
    this.load.image('verdeGrande', 'assets/resize3/verde3.png');
    this.load.image('verdeParede', 'assets/resize3/verdeP.png');
    this.load.image('verdeSalto', 'assets/resize3/verdeSJ.png');
    this.load.image('message3', 'assets/message3.png');
    this.load.image('message4', 'assets/message4.png');

    //PLAYER
    this.load.spritesheet('BlueWalk', 'assets/BlueWalk.png', {
        frameWidth: 512,
        frameHeight: 512
    });
    this.load.spritesheet('BlueJump', 'assets/BlueJump.png', {
        frameWidth: 512,
        frameHeight: 512
    });

    //PORTAL
    this.load.spritesheet('portal', 'assets/Portal.png', {
        frameWidth: 295,
        frameHeight: 570
    });


    //MUNDO 2
    this.load.image('backgroundClouds', 'assets/Clouds2.png');
    this.load.image('CloudsF2', 'assets/back1.png');
    this.load.image('CloudsF1', 'assets/back2.png');
    this.load.spritesheet('crow', 'assets/crowS.png', {
        frameWidth: 128,
        frameHeight: 147
    });
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('akatsuki', 'assets/akatsuki.png');
    this.load.image('rainbow', 'assets/rainbow.png');
    this.load.image('message', 'assets/message.png');

    //MUNDO 3
    this.load.image('backgroundDungeon', 'assets/finalboss3.png');
    this.load.image('brick', 'assets/brick.png');
    this.load.image('lava', 'assets/lavaS.png');
    this.load.image('cthulhu', 'assets/cthulhu.png');
    this.load.image('message5', 'assets/message5.png');
    this.load.image('lavaSafe', 'assets/lavaS.png');


    //MUNDO 4
    this.load.image('princesa', 'assets/princesa.png');
    this.load.image('message2', 'assets/message2.png');

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function create() {

    this.input.keyboard.on('keydown-U', restartGame, this);
    this.input.keyboard.on('keydown-I', switchToLevel2, this);
    this.input.keyboard.on('keydown-O', switchToLevel3, this);
    this.input.keyboard.on('keydown-P', switchToEnd, this);
    setupLevel1.call(this);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setupLevel1() {

    this.platforms = this.physics.add.staticGroup();

    //BACKGROUND
    this.add.image(400, 300, 'backgroundForest').setOrigin(0.5, 0.5);

    //CHAO
    this.platforms.create(400, 700, 'platform').setScale(2).refreshBody(); //FLOOR porque a outra nao quer funcionar como chao probably devido ao png usado, mas era bonito 😅

    this.platforms.create(400, 305, 'floorForest');

    //PLATAFORMAS

    this.platforms.create(780, 580, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(630, 550, 'verdeMedio').setScale(0.7).setSize(80, 5).setOffset(50, 20);
    this.platforms.create(500, 510, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(370, 500, 'verdeMedio').setScale(0.7).setSize(80, 5).setOffset(50, 20);
    this.platforms.create(210, 470, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(100, 470, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(50, 430, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(180, 370, 'verdeMedio').setScale(0.7).setSize(80, 5).setOffset(50, 20);
    this.platforms.create(350, 350, 'verdeParede').setSize(5, 1).setOffset(10, 0);
    this.platforms.create(550, 280, 'verdeSalto').setScale(0.8).setSize(1, 1).setOffset(10, 15);
    this.platforms.create(700, 200, 'verdeMedio').setScale(0.7).setSize(80, 5).setOffset(50, 20);
    this.platforms.create(450, 130, 'verdeMedio').setScale(0.7).setSize(80, 5).setOffset(50, 20);
    this.platforms.create(200, 150, 'verdeGrande').setScale(0.8).setSize(150, 5);

    //MESSAGE
    this.add.image(400, 50, 'message3').setOrigin(0.5, 0.5).setScale(0.6).setSize(10, 10);
    this.add.image(400, 680, 'message4').setOrigin(0.5, 0.5).setScale(0.4).setSize(10, 10);

    //PLAYER
    this.player = this.physics.add.sprite(180, 600, 'BlueWalk'); //700 600
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.player.body.setSize(360, 380); // hitbox default era 512 big rip
    this.player.body.setOffset(0, 0); // set hitbox offset to match player sprite

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('BlueWalk', { start: 0, end: 19 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('BlueJump', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, this.platforms);

        // FUNCAO PORTAL
        this.portal = this.physics.add.staticSprite(180, 100, 'portal', 1).setScale(0.1).refreshBody();
        this.portal.body.setSize(20, 20); // Set the size of the body to match the scaled size
        this.portal.setImmovable();
        this.physics.add.collider(this.player, this.portal, switchToLevel2, null, this);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function switchToLevel2() {

    this.portal.destroy();
    this.platforms.clear(true);

    setupLevel2.call(this);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setupLevel2() {

    this.platforms = this.physics.add.staticGroup();

    this.add.image(400, 300, 'backgroundClouds').setOrigin(0.5, 0.5);

    //CHAO
    this.platforms.create(400, 700, 'platform').setScale(2).refreshBody(); //FLOOR porque a outra nao quer funcionar como chao probably devido ao png usado, mas era bonito 😅
    this.platforms.create(0, 650, 'akatsuki').setSize(800, 10).setOffset(10, 10);

    this.platforms.create(400, 355, 'CloudsF2');
    this.platforms.create(400, 245, 'CloudsF1');

    //MESSAGE
    this.add.image(400, 50, 'message').setOrigin(0.5, 0.5).setScale(0.5).setSize(10, 10);

    //plataformas, estao por ordem que o jogador tem de seguir pra subir
    this.platforms.create(400, 600, 'cloud').setSize(15, 5).setOffset(10, 10); //start
    this.platforms.create(300, 530, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(120, 530, 'akatsuki').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(60, 450, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(450, 480, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(570, 480, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(690, 420, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(610, 320, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(480, 320, 'akatsuki').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(370, 320, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(210, 400, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(220, 270, 'akatsuki').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(60, 305, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(220, 210, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(420, 160, 'cloud').setSize(15, 5).setOffset(10, 10);
    this.platforms.create(580, 160, 'akatsuki').setSize(15, 5).setOffset(10, 10);



    this.platforms.create(770, 100, 'rainbow').setSize(5, 5);
    let platform = this.platforms.create(770, 135, 'platform');
    platform.setVisible(false); // invisivel pra andar 


    //PLAYER
    this.player = this.physics.add.sprite(400, 550, 'BlueWalk');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.player.body.setSize(360, 380); // hitbox default era 512 big rip
    this.player.body.setOffset(0, 0);

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('BlueWalk', { start: 0, end: 19 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('BlueJump', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    //se tocar nas vermelhas recomeça
    this.physics.add.collider(this.player, this.platforms, function (player, platform) {
        if (platform.texture.key === 'akatsuki') {
            this.scene.restart();
        }
    }, null, this);

    // FUNCAO PORTAL
    this.portal = this.physics.add.staticSprite(700, 100, 'portal', 2).setScale(0.1).refreshBody();
    this.portal.body.setSize(20, 20); // Set the size of the body to match the scaled size
    this.portal.setImmovable();
    this.physics.add.collider(this.player, this.portal, switchToLevel3, null, this);

    this.physics.add.collider(this.player, this.platforms);

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function switchToLevel3() {

    this.portal.destroy();
    this.platforms.clear(true);
    setupLevel3.call(this);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setupLevel3() {

    this.platforms = this.physics.add.staticGroup();

    //background
    this.add.image(400, 300, 'backgroundDungeon').setOrigin(0.5, 0.5);
    let platform = this.platforms.create(400, 630, 'platform').setScale(2).refreshBody();
    platform.setVisible(false); // invisivel pra andar 

    //lava
    this.platforms.create(400, 580, 'lava').setScale(1.2).setSize(100, 20); 
    this.platforms.create(600, 580, 'lavaSafe').setScale(1.2).setSize(10, 10).setOffset(0,0);   

    //cthulhu
    this.platforms.create(60, 205, 'cthulhu').setScale(0.5);

    //walls
    //esquerda pra direita
    //layer 1
    this.platforms.create(29, 570, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(97, 570, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(300, 570, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(498, 570, 'brick').setSize(25, 20).setOffset(-2, 0);
    //this.platforms.create(695, 570, 'brick').setSize(25,20).setOffset(-2, 0);
    //invisivel passagem pra ganhar

    //layer 2
    this.platforms.create(150, 520, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(300, 520, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(498, 520, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(695, 520, 'brick').setSize(25, 20).setOffset(-2, 0);

    //layer3
    this.platforms.create(203, 470, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(240, 470, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(300, 470, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(498, 470, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(695, 470, 'brick').setSize(25, 20).setOffset(-2, 0);

    //layer4
    this.platforms.create(300, 420, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(498, 420, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(695, 420, 'brick').setSize(25, 20).setOffset(-2, 0);

    //layer5
    this.platforms.create(560, 370, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(695, 370, 'brick').setSize(25, 20).setOffset(-2, 0);

    //layer6
    this.platforms.create(695, 320, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(763, 320, 'brick').setSize(25, 20).setOffset(-2, 0);

    //layer7
    this.platforms.create(695, 270, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(627, 270, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(559, 270, 'brick').setSize(25, 20).setOffset(-2, 0);

    //TOP RIGHT
    this.platforms.create(559, 170, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(559, 120, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(559, 70, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(559, 20, 'brick').setSize(25, 20).setOffset(-2, 0);

    //TOP LEFT
    this.platforms.create(300, 270, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(232, 270, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(232, 220, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(232, 170, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(232, 120, 'brick').setSize(25, 20).setOffset(-2, 0);

    this.platforms.create(164, 70, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(96, 20, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(28, -30, 'brick').setSize(25, 20).setOffset(-2, 0);

    this.platforms.create(164, 320, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(96, 370, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(28, 420, 'brick').setSize(25, 20).setOffset(-2, 0);
    this.platforms.create(28, 370, 'brick').setSize(25, 20).setOffset(-2, 0);

    //MESSAGE
    this.add.image(330, 30, 'message5').setOrigin(0.5, 0.5).setScale(0.5).setSize(10, 10);

    

    //PLAYER
    this.player = this.physics.add.sprite(50, 500, 'BlueWalk'); //700 600
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.player.body.setSize(360, 380); // hitbox default era 512 big rip
    this.player.body.setOffset(0, 0); // set hitbox offset to match player sprite

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('BlueWalk', { start: 0, end: 19 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('BlueJump', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(this.player, this.platforms);

    //LAVA GOES POOF
    this.physics.add.collider(this.player, this.platforms, function (player, platform) {
        if (platform.texture.key === 'lava') {
            this.scene.restart();
        }
    }, null, this);


    // FUNCAO PORTAL
    this.portal = this.physics.add.staticSprite(760, 570, 'portal', 3).setScale(0.1).refreshBody();
    this.portal.body.setSize(20, 20); // Set the size of the body to match the scaled size
    this.portal.setImmovable();
    this.physics.add.collider(this.player, this.portal, switchToEnd, null, this);

    this.physics.add.collider(this.player, this.platforms);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function switchToEnd() {

    this.portal.destroy();
    this.platforms.clear(true);

    setupCredits.call(this);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setupCredits() {

    //background
    this.add.image(400, 300, 'backgroundDungeon').setOrigin(0.5, 0.5);
    let platform = this.platforms.create(400, 630, 'platform').setScale(2).refreshBody();
    platform.setVisible(false); // invisivel pra andar 

    //player
    this.player = this.physics.add.sprite(50, 500, 'BlueWalk'); //700 600
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.player.body.setSize(360, 380); // hitbox default era 512 big rip
    this.player.body.setOffset(0, 0); // set hitbox offset to match player sprite

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('BlueWalk', { start: 0, end: 19 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('BlueJump', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, this.platforms);

    //PRINCESA
    this.platforms.create(770, 570, 'princesa');

    //MESSAGE
    this.add.image(400, 200, 'message2').setOrigin(0.5, 0.5).setScale(1).setSize(10, 10);
    
    //MUSICA PALHACO
    const music = this.sound.add('clown');
    music.play();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function restartGame() {
    // Restart the current scene
    this.scene.restart();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update() {

    //moveCrowHorizontally(crow, 5);

    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.flipX = true;
        this.player.anims.play('walk', true);
    }
    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.flipX = false;
        this.player.anims.play('walk', true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
        this.player.anims.play('jump', true);
        this.sound.play('jumpSound');
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CORVO QUE NAO APRENDEU A VOAR

/*
function moveCrowHorizontally(crow, speed) {
    // move the crow sprite horizontally
    crow.x += speed;
  
    // wrap the crow around the screen if it goes off-screen
    if (crow.x > game.config.width + crow.width / 2) {
      crow.x = -crow.width / 2;
    } else if (crow.x < -crow.width / 2) {
      crow.x = game.config.width + crow.width / 2;
    }
  }
*/

/*
            //CROW
        // create crow sprite
        crow = this.physics.add.sprite(0, 300, 'crow');

        // set crow velocity and gravity
        crow.setVelocityX(100);
        crow.setGravityY(100);

        // create crow animation
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('crow', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        */
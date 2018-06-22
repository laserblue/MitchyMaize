var tileSize = 64;
var dRows = 10;
var dCols = 12;
var dialogue;
var spaceKey;

var Game = {
  w: tileSize*dCols,
  h: tileSize*dRows,
  camera: {x:0, y:0}
};

var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu', 'states/gameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameOver', 'states/gameOver.js');
    game.load.script('Credits', 'states/credits.js');
    game.load.script('options', 'states/options.js');
  },
   
  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },
  
  // various freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
    game.load.image('credits-bg', 'assets/images/combine.jpg');
    game.load.image('title', 'assets/images/title.png');
		  game.load.image('instructions', 'assets/images/instructions.png');  
    // this.game.load.spritesheet('player','assets/images/hero_x64.png', 64, 64, 12);
    game.load.spritesheet('player','assets/images/rpg_sprite_walk.png', 24, 32, 32);//removed this prefix
    
     
    game.load.spritesheet('tiles','assets/images/tiles2.png', tileSize, tileSize, 19); //removed this prefix
    game.load.tilemap('test', 'assets/atlas/test.json',null,Phaser.Tilemap.TILED_JSON); //removed this prefix
    game.load.tilemap('test2', 'assets/atlas/test2.json',null,Phaser.Tilemap.TILED_JSON); //removed this prefix


 
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
   var stars = game.add.sprite(0, 0, 'stars');
    //stars.scale.setTo(0.75, 0.75);
    game.add.existing(this.logo).scale.setTo(0.4);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
   
  
  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Options",Options);
    game.state.add("Credits",Credits);
  },
  
  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = false;
    music.stop();
  },
   
   /*   initDeviceRatio: function () {
      if (this.game.device.desktop)
      {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      }
      else {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.setMinMax(480, 260, 800, 600);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      }
    
  } 
  */
  create: function () {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();
   // this.initDeviceRatio();
     
    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};

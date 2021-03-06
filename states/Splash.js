var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu', 'states/gamemenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover', 'states/gameover.js');
    game.load.script('Credits', 'states/credits.js');
    game.load.script('Options', 'states/options.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Truth of the Legend.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/800px-Corn_Field.JPG');
    game.load.image('options-bg', 'assets/images/800px-Maize_diversity_in_Vavilovs_office_(3421259242).jpg');
    game.load.image('gameover-bg', 'assets/images/800px-Maisstoppelveld_in_de_sneeuw.JPG');
    game.load.image('credits-bg', 'assets/images/800px-Épône_-_récolte_du_maïs01.jpg');
    /*   
    game.load.image('tiles', 'assets/images/FieldSoil.png');  
  
    game.load.spritesheet('player', 'assets/images/rpg_sprite_walk.png', 24, 32, 32); 
  
    // Add loadGameMaps 
    game.load.tilemap('map', 'assets/images/fieldmarked.csv', null, Phaser.Tilemap.CSV); 
  */
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
    game.add.sprite(0, 0, 'splashScreen');
    game.add.existing(this.logo).scale.setTo(0.5);
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
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function () {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 100);
  }
};

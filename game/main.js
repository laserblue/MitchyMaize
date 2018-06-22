// Global Variables
// (width, height)
var game = new Phaser.Game(768, 640, Phaser.CANVAS, 'game'), 
//var game = new Phaser.Game(Game.w, Game.h, Phaser.CANVAS, 'game'), 
 
  Main = function () {},
   gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;
  

  Main.prototype = {

  preload: function () {
    game.load.image('stars', 'assets/images/NRCS.jpg');
    game.load.image('loading', 'assets/images/loading.png');
    game.load.image('brand', 'assets/images/logo.png');
    game.load.script('polyfill', 'lib/polyfill.js');
    game.load.script('utils', 'lib/utils.js');
    game.load.script('Splash', 'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');

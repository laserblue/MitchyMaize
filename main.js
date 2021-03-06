// Global Variables
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;




Main.prototype = {

  preload: function () {
    game.load.image('splashScreen', 'assets/images/lossy-page1-800px-NRCSOH07012_-_Ohio_(717402)(NRCS_Photo_Gallery).tif.jpg'); 
    game.load.image('stars', 'assets/Images/ExteriorBldg2.png');
    game.load.image('loading', 'assets/images/loading.png');
    game.load.image('brand', 'assets/images/Envelope_astroid.svg.png');
    game.load.script('polyfill', 'lib/polyfill.js');
    game.load.script('utils', 'lib/utils.js');
    game.load.script('splash', 'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');

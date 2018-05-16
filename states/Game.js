var Game = function(game) {};

Game.prototype = {

  preload: function() {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  
var map;
var layer;
var cursors; 
  
  create: function() {
    this.stage.disableVisibilityChange = false;
    map = game.add.tilemap('map', 32, 32); 
    map.addTilesetImage('tiles');
    layer = map.createLayer(0); 
    layer.resizeWorld(); 
  
  // game.add.sprite(0, 0, 'stars');
  
    this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });
  }
};

var Game = function(game) {};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'Blue', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 400, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(255,0,0,0)";
    txt.strokeThickness = 4;
    var onOver = function(target) {
      target.fill = "#FF0000";
      target.stroke = "rgba(200,0,50,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function(target) {
      target.fill = "green";
      target.stroke = "rgba(0,0,255,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function () {
    this.stage.disableVisibilityChange = false;
   // game.add.sprite(0, 0, 'title');
  
    title = this.game.add.sprite(400, 200,'title');
        title.anchor.setTo(0.5,0.5);

    instructions = game.add.sprite(600, 200,'instructions');
        instructions.scale.x = 0.5;
        instructions.scale.y = 0.5;
/*
        // Start Message

        var clickText = this.game.add.bitmapText(Game.w/2, Game.h/2+50, 'minecraftia', '~click to start~', 24).anchor.setTo(0.5); 

    },
    */
    this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });
  }
};
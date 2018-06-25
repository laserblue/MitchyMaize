var Credits = function(game) {};

Credits.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Credits", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
 
    //var authorStyle = { font: '20pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,200,0)', strokeThickness: 4};
  //  var taskStyle = { font: '10pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(200,0,0,0)', strokeThickness: 4};
  //  var authorText = game.add.text(game.world.centerX, 300, author, authorStyle);
  //  var taskText = game.add.text(game.world.centerX, 350, task, taskStyle);
  //  authorText.anchor.setTo(0.5);
  //  authorText.stroke = "rgba(0,200,0,0)";
  //  authorText.strokeThickness = 4;
  //  taskText.anchor.setTo(0.5);
  //  taskText.stroke = "rgba(125,60,0,0)";
  //  taskText.strokeThickness = 4;
   // game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
  //  game.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
   // this.creditCount ++;
 
 
 
 
 
  },
  create: function () {
    
    /*
    this.addCredit('Music', 'Kevin Macleod');
    this.addCredit('Developer', 'Matt McFarland');
    this.addCredit('Lorem Ipsum', 'Mipsem Dempsum');
    this.addCredit('Caveats', 'Keyboard Cat');
    this.addCredit('for playing', 'Thank you');
    this.addCredit('Phaser.io', 'Powered By');
    */
    
        

    game.add.sprite(0, 0, 'credits-bg');
    game.add.existing(this.titleText);
    //this.addMenuOption('Music ----Kevin Macleod');
    
  /*  this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function(target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      musicPlayer.volume = playMusic ? 1 : 0;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    });
    
   */ 
    
    this.addMenuOption('<- Back', function (e) {
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Credits.prototype, mixins);

/*
var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },
  
  addCredit: function (task, author) {
    var authorStyle = { font: '20pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,200,0)', strokeThickness: 4};
    var taskStyle = { font: '10pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(200,0,0,0)', strokeThickness: 4};
    var authorText = game.add.text(game.world.centerX, 300, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 350, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,200,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(125,60,0,0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
   
  },

  addMenuOption: function (text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(10, (this.optionCount*80)+450, text, optionStyle);

    txt.stroke = "rgba(20,50,100,0)";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,255,0,0)";
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
      if (gameOptions.playMusic) {
        musicPlayer.stop();
        musicPlayer = game.add.audio('exit');
        musicPlayer.play();
   
    }
    
    var bg = game.add.sprite(0, 0, 'gameover-bg');
   
    this.addCredit('Music', 'Kevin Macleod');
    this.addCredit('Developer', 'Matt McFarland');
    this.addCredit('Lorem Ipsum', 'Mipsem Dempsum');
    this.addCredit('Caveats', 'Keyboard Cat');
    this.addCredit('for playing', 'Thank you');
    this.addCredit('Phaser.io', 'Powered By');
   
    
    this.addMenuOption('<- Back', function () {
      game.state.start("GameMenu");
    });
     // this.game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
  }

};
*/


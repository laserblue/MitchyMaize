var GameMenu = function () {};
GameMenu.prototype = {

  menuConfig: {
    startY: 240,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 50, "Mitchy's Maize", {
      font: 'bold 50pt TheMinion',
      fill: '#FFD700',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {
    
  
    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function (e) {
      game.state.start("Game");
    });
    this.addMenuOption('Options', function (e) {
      game.state.start("Options");
    });
    this.addMenuOption('Credits', function (e) {
      game.state.start("Credits");
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);

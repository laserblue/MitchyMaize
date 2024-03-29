/* global Phaser, BootScene, MenuScene, OptionsScene, SceneMain, GameScene, FSMScene, SecondFloor, CastleBanquet, FantasyOverworld, VillageFestival, CastleStefan, SecretGarden, GameOverScene, CreditsScene */


//NOTE: Chromebook window hides last line with STATUS, LOGS,TERMINAL,TOOLS and PREVIEW. Reduce window size to see last line.


/// Current Task: load a Tiled json map (hoping to use json files from other than TILED) 
// Task: pass player sprite data from building exterior doorway scene to interior scene and spawn player in interior scene
/// looks like I can emulate the multiple layer format from multiple-layers.json maybe even with base64 data from blury tilemap editor (but blury editor json file format is very different) https://labs.phaser.io/assets/tilemaps/maps/simple-map.json  https://labs.phaser.io/assets/tilemaps/maps/multi-layer-multi-tileset.json https://labs.phaser.io/assets/tilemaps/maps/multiple-layers.json
// https://blurymind.github.io/tilemap-editor/
// I almost need to create my own tilemap editor since Tile2map is not available on GooglePlay anymore and don't have desktop computer to download TILED onto and admin restrictions on Chromebookdiasables access to Chrome Webstore. Maybe to Linux in Termux???? Looking at Phaser editor on Gitpod but does not seem good for tilemap editing, more for scene composition.
// DONE: add a second layer to the tile map for row stakes (use createStaticLayer() or createDynamicLayer())
// Task: scroll map world with keyboard keys
// Task: scroll map with mobile touchscreen swipes
//Task: camera follows player
// Task: Load a CSV map instead of an image in the Game scene - can't get my csv maps to load - problem was keyword needs to be createStaticLayer or createDynamicLayer rather than createLayer (change made in a version after v. 16???)
// getting closer to displaying a tilemap- can load a map based on an array (problem was that a keyword was changed (createLayer () to createStaticLayer()) so official examples and pro examples using old keyword createLayer() didn't work BUT apparently changed back to createLayer() for Phaser 3.55.2)

// import SwipePlugin from 'phaser3-swipe-plugin'

// TASK: Get Babel 7 and ES6 working for this project.
// Backburner Task: Get an external scene file loading using filenames in index.html head (note use of //global scenename.js for linter lines at top of files in calm-potassium)
// e.g at top of game.js which defines config,  /* global Phaser, splashScene, loaderScene, LayScene, hatchScene */
//
// Until external scenes files running, a new scene class name must be included in the top line for the linter and in the scenes array of config
// How to kill the game after credits roll once or twice - 
//
//Done: task: get vertical scroller working in Credits scene (uses bitmap text)* this bitmap text may be copyrighted and arrangements may need to be made to use it in production version or replaced. This is educational use at the moment.
// still minor formatting problems with vertical scroller to work out for production credits such as centering, font size, and line length.

// The following code might be for ES6 and might not work without Babel transpiling. Babel has not been installed for this project and according to the package.json, node v. 8.x is being used. Upgrade to node 10.x
// import {SceneMain} from './js/SceneMain.js';
// let sceneMain = new SceneMain();
// this.game.scene.add('SceneMain', sceneMain);
// TASK: Get Phaser 3.55.2

/* Problem

   I have 8+ scenes defined in client.js that run ok.
   BootScene, MenuScene, OptionsScene, SceneMain, GameScene, FSMScene, GameOverScene, CreditsScene
   I want to eventually run all of them as separate external files from a scenes folder
   I am trying to get the external file js/SceneMain.js to replace SceneMain in client.js
   I don't have Babel installed for transpiling es6 to es5 (but Chrome Browser seems to work with ES6)
   
   Fixing this with ES5 involves:
       commenting out the SceneMain scene defined in this file (client.js) 
       
       putting <script src="js/SceneMain.js" </script> in the head of index.html // is the PATH correct? e.g. "./js/SceneMain.js"
       
       making sure the Express routing is correct in server.js 
       
   
   
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/  
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/  
https://phaser.io/phaser3/devlog/119
https://phaser.io/phaser3/devlog/121
http://labs.phaser.io/index.html?dir=scenes/&q=
https://medium.com/@jerra.haynes/a-real-persons-guide-to-phaser-3-or-how-i-learned-to-stop-worrying-and-love-the-gun-part-1-9cc6361f377c
*/
// NO ES6 so need to put file names in header of index.html
//import {TitleScene} from './js/TitleScene'; // result is white screen
//import TitleScene from './js/TitleScene'; // result is white screen
//var titleScene = new TitleScene();// result is white screen
//let titleScene = new TitleScene();// result is white screen
//this.game.scene.add('TitleScene', titleScene);// titleScene not defined


// Mark Kelly's fsm code has been put into its own scene (FSMScene) but the StateMachine class and State class are defined here at the start of the code
// The StateMachine class is for the sprite animations not game states. Game states are done using scenes
class StateMachine {
  constructor(initialState, possibleStates, stateArgs=[]) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this;
    }
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state === null) {
      this.state = this.initialState;
      this.possibleStates[this.state].enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs);
  }

  transition(newState, ...enterArgs) {
    this.state = newState;
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
  }
}
// */
// /*
class State {
  enter() {

  }

  execute() {

  }
}
// */


// Each scene class is defined in this one file but I want to eventually make each scene a separate external file in the js folder
// The scenes are BootScene, MenuScene, OptionsScene, GameScene, FSMScene, GameOverScene, CreditsScene
// FSMScene is an example of a scene that would be called by GameScene in the finished product

//class BootScene extends Phaser.Scene {
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function BootScene ()
    {
      Phaser.Scene.call(this, { key: 'bootScene', active: false });
    },
    
    preload ()
    {
        var progress = this.add.graphics();

        
        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });

        this.load.on('complete', function () {

            progress.destroy();

        });    
      
       
      this.load.image('splashScreen', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Flossy-page1-800px-NRCSOH07012_-_Ohio_(717402)(NRCS_Photo_Gallery).tif.jpg?v=1574372053041');
           //  It's essential that the key given here is the exact class name used in the JS file. It's case-sensitive.
        //  See the SceneB.js file and documentation for details.
//    this.load.sceneFile('ExternalScene', '/js/sceneMain.js'); //
    },
  
    create ()
    {
                  
        this.splashScreen = this.add.sprite(400, 300, 'splashScreen').setScale(1.0, 1.2).setOrigin(0.5, 0.5);
    // set.Origin(0.5);
      
 
        
      //      var image = this.add.image(400, 300, 'splashScreen').setScale(1);
  
    //  Default text with no style settings
        var text10 = this.add.text(150, 0, 'Phaser 3', { fontFamily: 'Arial', fontSize: 128, color: '#00ff00' }).setAlpha(0.6);
        text10.setStroke('#000000', 6);

    //  Pass in a basic style object with the constructor
        this.add.text(200, 210, 'Splash Screen', { fontFamily: 'Arial', fontSize: 64, color: '#0000ff' });

    //  Or chain calls like this:
        this.add.text(30, 380, 'Phaser').setFontFamily('Arial').setFontSize(64).setColor('#00ff00').setBackgroundColor('#ffff00').setPadding(16).setAlpha(0.5);
      
        this.add.text(100, 560, 'Click or tap on the words directly above to see a new scene',  {fontFamily: 'Arial', fontSize: 24, color: '#00ffff' }).setStroke('#000000', 4);
      
        var nextScene = this.add.text(200, 500, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
        nextScene.setInteractive().on('pointerdown', function() {
          console.log('From BootScene to MenuScene');  
          this.scene.scene.start('menuScene');
        });      
      }
});

var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function MenuScene () // function MenuScene (config)
    {
      Phaser.Scene.call(this, { key: 'menuScene', active: false });
    },

    preload: function ()
    {
        this.load.image('fieldpic', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F800px-Corn_Field.JPG?v=1574372099635');
   //     this.load.sceneFile('sceneMain', 'js/SceneMain.js');
    }, // this comma seems to be needed for the code to work but does not appear in the Phaser 3 examples

  
    create: function () 
    {
    //    this.fieldpic = this.add.image(400, 300, 'fieldpic');
        this.fieldpic = this.add.sprite(400, 300, 'fieldpic').setOrigin(0.5, 0.5)
        this.add.text(150, 0, 'Mitchy\'s Maize', { fontFamily: 'Arial', fontSize: 84, color: '#ffff00' }).setStroke('0x0000ff', 4);
        var txt1 = this.add.text(300, 280, 'Start Game', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 4);
        var txt2 = this.add.text(300, 340, 'Options', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 4);
        var txt3 = this.add.text(300, 400, 'Level Selection (under construction)', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 4);
        var txt4 = this.add.text(300, 460, 'Credits', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 4);
        var txt5 = this.add.text(300, 520, 'Exit', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 4);

// Make interactive text (bad example of DRY!!)
        txt1.setInteractive().on('pointerdown', function() {
            //Let's start another scene with start
            this.scene.scene.start('gameScene');
        });
      
        txt2.setInteractive().on('pointerdown', function() {
            //Let's start another scene with start
            this.scene.scene.start('optionsScene');
        });
      
        txt4.setInteractive().on('pointerdown', function() {
            //Let's start another scene with start
            this.scene.scene.start('creditsScene');
        });
      
        txt5.setInteractive().on('pointerdown', function() {
            //destroy game object https://phaser.io/examples/v3/view/game-config/game-destroy-with-multi-scenes
            this.scene.sys.game.destroy(true); // seems to work, https://newdocs.phaser.io/docs/3.55.2/Phaser.Game#destroy
        });     
    }
});


// I want to load this scene class and eventually all the others as an external file  
var OptionsScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function OptionsScene ()
    {
      Phaser.Scene.call(this, { key: 'optionsScene', active: false });
    },
    preload ()
    {
        this.load.image('vavilov', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F800px-Maize_diversity_in_Vavilovs_office_(3421259242).jpg?v=1574372062843');
            
    },

    create ()
    {
//        this.optionsScene = this.add.image(400, 300, 'optionsscene');
        this.optionsScene = this.add.sprite(400, 300, 'vavilov').setOrigin(0.5, 0.5);   
      
        this.add.text(310, 10, 'Options', { fontFamily: 'Arial', fontSize: 72, color: '#ffff00' });

        this.add.text(300, 100, 'toggle music', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 6).setAlpha(0.3);
        this.add.text(300, 190, 'toggle sound', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 6).setAlpha(0.3);
          
      /* inoperational toggling - working on it
      function(fn)
    {
        first.once('stop', function (sound)
        {
            text.setText('Stopped');
            this.time.addEvent({
                delay: 1500,
                callback: fn,
                callbackScope: this
            });
        }, this);
 
        first.stop();
    },
 */
 /* // Currently music stops when scene changes.
 // work is being done to learn how to add a class with global state variables based on a GameDev Academy Tutorial (https://phasertutorials.com/creating-a-phaser-3-template-part-3/)
 var music = this.sound.add('key');
music.on('stop', listener);
music.play();
music.stop();
      */
      /*
       this.sound.on('stopall', listener).
      */
      
                      
        var txt30 = this.add.text(300, 440, 'Main Menu', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }).setStroke('0x0000ff', 6);
        txt30.setInteractive().on('pointerdown', function () { 
            this.scene.start('menuScene');
        }, this);// ??? differs from this.scene.scene.start('menuScene'); });
      
/*      var txt40 = this.add.text(300, 500, 'Next >>', { fontFamily: 'Arial', fontSize: 64, color: '#ffff00' }).setStroke('0x0000ff', 8);
        txt40.setInteractive().on('pointerdown', function () { 
            this.scene.start('sceneMain');
        }, this);// ??? differs from this.scene.scene.start('menuScene'); });
*/      
/*      Click on image to see new scene and experimenting with escaping new line
        this.add.text(100, 200, 'toggle music\ntoggle sound\nreturn to menu', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
        this.input.once('pointerdown', function () {
            console.log('From Options Scene to GameScene');
            this.scene.start('sceneMain');
        }, this);// note the addition of 'this'
*/
    }
});

var SceneMain = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function SceneMain ()
    {
      Phaser.Scene.call(this, { key: 'sceneMain', active: false });
    },
    
  
    preload()
    {
//      this.load.tilemapCSV("map", "https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Ffieldtilled.csv?v=1583797600994"); // tilled field 
//      this.load.image("tiles", "https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Fplowed_soil.png?v=1574373407043"); // plowed soil       

       this.load.image("exterior", "https://cdn.glitch.global/dad6f70b-d7f8-4b6b-812a-427943582a20/flatRoof4.png?v=1646414164914");
/*
       // load TILED json map
       this.load.image('fieldTileset', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FFieldSoil.png?v=1574372043813');// tileset
       this.load.tilemapTiledJSON('map', 'https://cdn.glitch.global/dad6f70b-d7f8-4b6b-812a-427943582a20/tilemap-editor%20(10).json?v=1647205447966'); // tilemap
*/
/* building exterior
    https://cdn.glitch.global/dad6f70b-d7f8-4b6b-812a-427943582a20/colonialTileset.png?v=1647543905050 // colonial tileset
    https://cdn.glitch.global/dad6f70b-d7f8-4b6b-812a-427943582a20/tilemap-editor%20(5).json?v=1647544214386 // flatRoof

*/
      
      
      
      
      
      
    },   // this comma seems to be needed for the code to work but does not appear in the Phaser 3 examples

    create()
    { 
       this.exterior = this.add.sprite(400, 300, 'exterior').setScale(0.37, 0.37).setOrigin(0.5, 0.5); // comment out to see array tilemap in upper left corner and tileset image at center

/*
// add code for tilemap here
       var map = this.make.tilemap({ key: 'map' });
       var tiles = map.addTilesetImage('fieldTileset');

       var bottom = map.createStaticLayer('Bottom Layer', tiles, 0, 0);
       var middle = map.createStaticLayer('Middle Layer', tiles, 0, 0);
       var top = map.createStaticLayer('Top Layer', tiles, 0, 0);
*/
      
    // When you create a layer, that becomes the currently 'selected' layer within the map. That
    // means any tile operation on the map right now will be operating on 'Top Layer'.

    // Let's change that:
//       selectLayer(top);

   /*
       //  To use multiple tilesets in a single layer, pass them in an array like this:
    map.createLayer('Tile Layer 1', [ groundTiles, itemTiles, platformTiles ]);

    // map.createLayer('Tile Layer 1', [ groundTiles, itemTiles, platformTiles ]);

    //  Or you can pass an array of strings, where they = the Tileset name
    // map.createLayer('Tile Layer 1', [ 'kenny_ground_64x64', 'kenny_items_64x64', 'kenny_platformer_64x64' ]);
    
    */


      
      ///*    // implement text wrapping for 2 and 6, if possible
        this.add.text(90, 15, 'External Scene (Scene Main)', { fontFamily: 'Arial', fontSize: 48, color: '#ffff00' });
        this.add.text(90, 70, 'Goal: Create tile maps', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.add.text(120, 110, '7. Intro Gravel Road Walking early morning sunsight cutscene', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 130, '1. Research station building exterior (initially, no parked employee cars)', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 150, '2. Empty field', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 170, '3. Marked field with stakes and lines plus animated marking with tractor and marking', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(140, 190, 'implement sprite', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 210, '4. Unplanted marked ranges plus tractor and 4-row maize planter animated sprite', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 230, '5. Planted and growing ranges', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(120, 250, '6. Large world (+120 rows, +18 ranges plus gravel roads, laneway, main site', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        this.add.text(140, 270, '16.1 hectares/40 acres)', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
        
        var nextScene = this.add.text(200, 500, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
        nextScene.setInteractive().on('pointerdown', function() {
          console.log('From SceneMain to FSMScene');  
            this.scene.scene.start('fsmScene');
        });    // */         
    }
});

//class GameScene extends Phaser.Scene {
var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameScene()
    {
      Phaser.Scene.call(this, { key: 'gameScene', active: false });
    },
    preload()
    {

// Music and Sound Effects from Freesound https://freesound.org/ and Incompetech: Royalty-Free Music https://incompetech.com/music/
// https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FTruth_of_the_Legend.ogg?v=1574372196389  // intended opening/intro music for cutscene (https://www.youtube.com/watch?v=oRJa-h9JvoQ) - You MUST contact the artist if you wish to use the music on any kind of project outside of YouTube.
// https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FCool_Rock.ogg?v=1574372248623 // for working scene 
// https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F18976__bebeto__loop005-alternative.wav?v=1574372376532      
// https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F24046__bebeto__loop029.wav?v=1574372389873 // stamping music
// https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Firon_man.ogg?v=1574372265355  // iron man
// goldrunner remix for 'pause game' scene (https://www.remix64.com/track/scyphe/goldrunner-maccie-pimp-me-up-remix/) Human Race #4 - following tractor and planter on a gravel road on a rainy night, windshield wipers running, hazards lights flashing, stadium drummer ghost on back of planter
// https://youtu.be/QEdPe1SxitI      
// The Banting and Best Swede Pea Orchestra Intermission https://phaser.io/examples/v3/view/audio/web-audio/play-audio-from-child-scene
      
/*
 Licenses/Royalties required
 The Rose - Bette Midler
https://youtu.be/zxSTzSEiZ2c


Just the two of us (slowed)
White rose graphic
https://youtu.be/7J-f8XPsHxE

Just the two of us
Grover Washington Jr.
Winelight
https://youtu.be/Njwasr1OOuc

Mylene Farmer - Dessine-Moi un Mouton 
https://youtu.be/n7BImFx2N3g

Now we are free
https://youtu.be/ppXYF-CURVw
https://youtu.be/Owg-NaUoHHo

      */
     // Music - want to make musicOn a global variable possibly within a class see GameDev Academy Tutorial (https://phasertutorials.com/creating-a-phaser-3-template-part-3/)
      // Music - Currently stops when scene ends. (If music.stop(); removed, music starts up anytime scene starts and does not stop when scene changed so can have multiple versions running at same time all out of sync)
       this.load.audio('theme', [
        'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Firon_man.ogg?v=1574372265355'
       ]);
       this.load.image('gamescene', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F566px-Relief_with_Maize_Goddess_(Chicomec%C3%B3atl).jpg?v=1597938902355');//Maize Goddess Chicomecoatl 
       this.load.image('quest', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FScreenshot%202019-06-03%20at%2011.32.58%20AM.png?v=1574375060643');

      // Images that could be used for a timed slide show using alpha and timer loop     
//        this.load.image('greeting', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FChildrenTextBox.png?v=1574374247749'); //Aranix and Midori in a path/aisle of the cornfield
//       this.load.image('greeting', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FExteriorBldg2.png?v=1574373863351'); //building exterior with cars, Midori and Aranix 
//       this.load.image('greeting', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FTwoRanges.png?v=1574373854848'); // two ranges, comment out to see array tilemap 
//       this.load.image('greeting', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FWorkCounter.PNG?v=1574373316758'); //workroom (scale problems)

     },

    create()
    {
        var music = this.sound.add('theme');
        music.play();
  
      // this.gameScene = this.add.image(400, 300, 'gamescene');
       // this.gamescene.setScale(0.3,0.4);
        this.gameScene = this.add.sprite(400, 300, 'gamescene').setScale(1.1, 1.1).setOrigin(0.5, 0.5);
        this.quest = this.add.sprite(400, 400, 'quest').setScale(0.8, 0.8).setOrigin(0.5, 0.5).setAlpha(0.5);
        this.add.text(10, 15, 'Introduction and Early Morning Walk Cutscene Scene', { fontFamily: 'Arial', fontSize: 24, color: '#ffff00' });
 
        var nextScene = this.add.text(200, 500, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
        nextScene.setInteractive().on('pointerdown', function() {
          music.stop();
          console.log('From GameScene to SceneMain');  
          this.scene.scene.start('sceneMain');
        });  
    } // might need a comma if update is active
/*
    update(time, delta)
    {
      controls.update(delta);
    }
*/
});

 // /*
var FSMScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function FSMScene ()
    {
       Phaser.Scene.call(this, { key: 'fsmScene', active: false });
    },

 // */
// /*
     init() // Is this webfont actually loading ?????
     {
         //  Inject our CSS
         var element = document.createElement('style');

         document.head.appendChild(element);

         var sheet = element.sheet;

         var styles = '@font-face { font-family: "troika"; src: url("assets/fonts/ttf/troika.otf") format("opentype"); }\n';

         sheet.insertRule(styles, 0);

         styles = '@font-face { font-family: "Caroni"; src: url("assets/fonts/ttf/caroni.otf") format("opentype"); }';

         sheet.insertRule(styles, 0);
      
     },     
   // */
   
    preload() 
    {
      // I want to figure out how to first show nameplates above or below sprites using a container and then change to syncing text and sprites
      // I would prefer not to use webfonts so need to also learn how to use bitmap, retro or css text
      // load webfont for nameplate text -- find other ways to get/use text like bitmap text, retro, css etc. 
//          this.load.image("bg", "https://cdn.glitch.me/dad6f70b-d7f8-4b6b-812a-427943582a20/Overworld.png?v=1640024874959"); // shack image overworld 

      /*         this.load.tilemapCSV('map', "https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Ffield.csv?v=1583797586940"); // field.csv 
         this.load.image('tiles', "https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Fplowed_soil.png?v=1574373407043"); // plowed soil       
*/
            
          this.load.spritesheet('author', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Frpg_sprite_walk.png?v=1574371146332', {
            frameWidth: 24,
            frameHeight: 32,
          });
          this.load.spritesheet('hero', 'https://cdn.glitch.com/59aa1c5f-c16d-41a1-bfd2-09072e84a538%2Fhero.png?1551136698770', {
            frameWidth: 32,
            frameHeight: 32
          });
//         this.load.image('bg', 'https://cdn.glitch.com/59aa1c5f-c16d-41a1-bfd2-09072e84a538%2Fbg.png?1551136995353');
         this.load.image('bg', 'https://cdn.glitch.me/dad6f70b-d7f8-4b6b-812a-427943582a20%2FInteriorBldg.png'); //  
       // https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FTwoRanges.png?v=1574373854848'
      // add ball from Phaser 3 example Container/Sprite with text
      // https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/demoscene/ball.png
         this.load.image('ball', 'https://cdn.glitch.com/0b1bad74-37f5-487d-b0f1-7d6bac92f07f%2Fball.png?v=1575235181076'); // from github Phaser 3 public/assets folder

      // Web Font Loader script (using Plugin???)
         this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    
  
  
    create()
    {

      // Custom Webfont - Phaser 3 example: http://labs.phaser.io/edit.html?src=src/game%20objects%5Ctext%5Cstatic%5Ccustom%20webfont.js  
          var add = this.add;
          var input = this.input;
          var test1;
          var text2;
          var text3;
          var text4;
          var text5;
          var text6;
          var text7;
          var text8;
 //     var test2;
//      this.impact.world.setBounds();
/*   
      //   Code to show csv map (not working)
//        console.log(this.cache.tilemap.entries)
//        var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
          var tileset = map.addTilesetImage('tiles');
          var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
*/      
         
          this.keys = this.input.keyboard.createCursorKeys();
        
 //       this.physics.world.bounds.width = map.widthInPixels;
  //      this.physics.world.bounds.height = map.heightInPixels;
 //       this.player.setCollideWorldBounds(true);
      
      // Static background (replace with a csv map with an interactive NEXT button and a red kill scene square for sprites to collide with to call gameover scene)
          this.add.image(0, 0, 'bg').setOrigin(0); 
/*
     // Load a map from a 2D array of the plowed soil tile indices
          var bglevel = [
            [ 6, 7, 7, 7, 7, 7, 7, 7, 8],
            [ 9, 15, 15, 15, 15, 15, 15, 15, 11],
            [ 9, 15, 15, 15, 15, 15, 15, 15, 11],
            [ 9, 15, 15, 15, 15, 15, 15, 15, 11],
            [ 9, 15, 15, 15, 15, 15, 15, 15, 11],
            [ 12, 13, 13, 13, 13, 13, 13, 13, 14]
          ];

  // When loading from an array, make sure to specify the tileWidth and tileHeight
          var bgmap = this.make.tilemap({ data: bglevel, tileWidth: 16, tileHeight: 16 });
          var bgtiles = bgmap.addTilesetImage("bgtiles");
          var bglayer = bgmap.createStaticLayer("bglayer", bgtiles, 0, 0);
  */    
      // create a container for ball with nameplate to be applied later to author sprites      
          var container0 = this.add.container(150, 100);

          var ball = this.add.image(0, 0, 'ball');
//      ball.alpha = 0.8;
          var text = this.add.text(0, 0, 'Use Arrow keys to move').setFontFamily('Comic Sans MS').setColor('#ffff00').setFontSize(20);
          text.setOrigin(0.5, 0.5);
//      text.alpha = 0.5;
          container0.add(ball);
          container0.add(text);
          container0.setScale(1);
 
// tween container0 with ball horizontallyfrom start position to x + 500 and yoyo
          this.tweens.add({
            targets: container0,
            x: container0.x + 500,
            ease: 'Power1',
            duration: 10000,
            delay: 500,
            yoyo: true,
            repeat: -1
          });
      

    
     // Animation definition for Shull sprite in container1 - works in this program location and sequence, but try to move to anim states list asap
          this.anims.create({
            key: 'Shulldown',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', {start: 0, end: 3}),
          });  
  

      // The hero character (Shull - red shirt)
          var container1 = this.add.container(125, 160);
//      this.hero = this.physics.add.sprite(200, 150, 'hero', 0);
          var hero = this.add.sprite(0, 0, 'hero').play('Shulldown');
          var text = this.add.text(0, 0, 'Shull');
          text.font = "Arial";
          text.setColor('#0000ff');
          text.setFontSize(16); 
          text.setOrigin(0.5, -0.7); // over head name plate (0.5), 1.5) (under foot name plate (0.5, -0.4) 
          container1.add(hero);
          container1.add(text);
          container1.setScale(1);   
     
 // /*     
   // moves container 1 but does not change animation inside
          container1.setSize(32, 64);
          this.physics.world.enable(container1);
          container1.body.setVelocity(0, 50).setBounce(1, 1).setCollideWorldBounds(true);
 // */
 // /* 
   // animation of McClintock sprite in container2 
          this.anims.create({
            key: 'McClintockdown',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('author', {start: 0, end: 7})
//          flipX: true // This probably won't work but need to figure out how to run conditions on nested sprite in container
          }); 
     
         // there is a large margin on the left. Find out what the cause is ?!?!?!
          test1 = this.add.text(100, 10, 'Phaser 3.21.0', { fontSize: 24, color: '#ff0000' }).setOrigin(0.5);
          text2 = this.add.text(180, 40, 'Research Station Building Interior', { fontSize: 16, color: '#ffff00' }).setOrigin(0.5);         
          text3 = this.add.text(450, 250, '<-- You can move this sprite with arrow keys', { fontSize: 18, color: '#ff0000' }).setOrigin(0.5);
          text4 = this.add.text(250, 180, 'I want easy to sweep and clean floors, NOT wooden floorboards!\n Linoleum? Epoxy? Vinyl? Resin? Concrete??', { fontSize: 12, color: '#ffffff' }).setOrigin(0.5);
          //text5 = this.add.text(170, 190, 'Linoleum? Epoxy? Vinyl? Resin? Concrete??', { fontSize: 12, color: '#ffffff' }).setOrigin(0.5);
          text6 = this.add.text(650, 320, 'SEED STORAGE AREA (locked)', { fontSize: 12, color: '#ffffff' }).setOrigin(0.5);
          text7 = this.add.text(680, 500, 'Stairs to second floor', { fontSize: 12, color: '#ffffff' }).setOrigin(0.5);
          this.make.text({
              x: 640,
              y: 50,
              text: 'Seed storage area on first floor is locked.\nCompletion of \'Quest for the Rose\' required to open.\n\nGarage area on first floor is locked.',
              origin: { x: 0.5, y: 0.5 },
              style: {
                  font: 'bold 8px Arial',
                  fill: 'white',
                  wordWrap: { width: 300 }
              }
          }); 
            
          this.make.text({
              x: 270,
              y: 300,
              text: 'Goal: Create and Load a Multilayer Tile Map',
 //             text: 'DONE - Goal: load finite state machine starter code as a named game scene with text-labeled containers',(not fully encapsulated yet as the classes are defined outside of the FSM Scene)
              origin: { x: 0.5, y: 0.5 },
              style: {
                  font: 'bold 25px Arial',
                  fill: 'white',
                  wordWrap: { width: 800 }
              }
          });
            
          this.make.text({
              x: 350,
              y: 350,
              text: 'Goal: add code to change scene to second floor when sprite climbs stairs\nGoal: Figure out how to control sprites in labeled containers\nGoal: Add elderly, balding male NPC\nGoal: Add number stamping station for NPC and Player\nGoal: add NPC dialogue with Player re: Waxy Ears',
              origin: { x: 0.8, y: 0.5 },
              style: {
                  font: 'bold 12px Arial',
                  fill: 'white',
                  wordWrap: { width: 800 }
              }
          });
      
          this.make.text({
              x: 260,
              y: 500,
              text: 'Sprite animations based on very slight modifications to Mark Kelly\'s phaser-fsm-example\nproject on Glitch (https://www.mkelly.me/blog/phaser-finite-state-machine/)',
  //     ',
              origin: { x: 0.5, y: 0.5 },
              style: {
                  font: 'bold 12px Times',
                  fill: 'white',
                  wordWrap: { width: 800 }
              }
          });
      
  //      test2 = this.add.text(250, 220, 'Phaser 3.21.0', { fontSize: 12, color: '#000000' }).setOrigin(0.5);
      // or chain calls 
      // this.add.text(100, 400, 'Phaser').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');
      
          var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('secondFloor');
           });         
      // Create a nameplate for a sprite
          var container2 = this.add.container(370, 200);
          var genericBreederSprite = this.add.sprite(0, 0, 'author').play('McClintockdown');
          var text = this.add.text(0, -15, 'McClintock');
          text.font = "Arial";
          text.setColor('#000000');
          text.setFontSize(16);
          text.setOrigin(0.5, -1.7);
          container2.add(genericBreederSprite);
          container2.add(text);
          container2.setScale(1.0); 
 
      
      // moves container 2 but does not change animation inside
          container2.setSize(32, 64);
          this.physics.world.enable(container2);
          container2.body.setVelocity(0, 20).setBounce(1, 1).setCollideWorldBounds(true);
  /*    
          this.input.once('pointerdown', function () {
              console.log('From fsmScene to GameOverScene');
              this.scene.start('gameOverScene');
          }, this);
  */
 /////////////////////////////////////////////////////////////////////////////////////////     
// This code was used in the-great-conversation-bots project which is why reference is made to Melville and author. Trying to change author to player has been problematic and involved changing the code in many lines but it didn't work.      
      // Player controllable clone of 'author' sprite to the left of McClintock container (on McClintock's right). 
          this.author = this.physics.add.sprite(200, 250, 'author', 0).setCollideWorldBounds(true); // PLAYER
      // add collision boundaries on background image for trees,hedges, cliffs, etc.
      // control this sprite as player if this.hero and no other this.hero assignment
// this.hero makes 'unnamed-author-clone' at (300,200) the player
// this.author removes player control from unnamed-author-clone
      
  //      this.hero.direction = 'left'; //
//      this.author.direction = 'up'; // changes image of player sprite 'author' to hero sprite

      // no name NPC clone with author image (on McClintock's left) (east of McClintock (NESW clockwise) or on screen right side)
          this.hero = this.physics.add.sprite(460, 330, 'author', 0); // 
// player control is granted to whichever sprite is this.hero with no other sprite as this.hero.
// this.hero transfers player control to no name sprite 
  // animation for 'dash' and sword-swings uses 'hero' spritesheet since I don't have equivalents for author/RPG-walk-sprite
      
      
//      this.impact.add.image(100, 100, 'ball').setActiveCollision().setVelocity(300, 200).setBounce(1);    
//      this.author.setBounce(1,1)
//      this.author.setCollideWorldBounds(true);
      
 //   sets direction of player sprite (connected to arrow keys)
          this.author.direction = 'down' // sets player (controlled with arrow keys) sprite with image (author) to 'down' image
 // if change above to this.hero.direction = 'down' player idle image is hero image 'down'
    
  // I need to fully understand the FSM code
//     this.hero = this.container2.body; // I want to make container 2 the player.
//    },
    
// });     
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // The state machine managing the player sprite with arrow key control
        this.stateMachine = new StateMachine('idle', {
          idle: new IdleState(),
          move: new MoveState(),
          swing: new SwingState(), 
          dash: new DashState(),
        }, [this, this.author]);// changing to }, [this, this.container2]); results in black screen
      // changing to this.hero gives player control to sprite to Melville's left (right side of screen)
      // this, this.container2.body might work - screen ok but no player control either no name author sprite
      
// the FSM was set up to use 'hero' as variable name
// }, [this, this.hero]) // gives player control to unnamed cloned sprite in upper left.
//  }, [this, this.author]); // gives player control to unnamed author sprite to left of McClintock named sprite
// Challenge 1 : transfer player control to container2 that contains McClintock named sprite
// Challenge 2: sync frames of sprite in container to input. e.g. if 'left' key down, move container left AND run left move frames in container
      
      
//  I changed player image from 'hero' to 'author' image/sprite (this is causing a lot of confusion because named object? same as key of 'hero' image)
//       
 // changing line above to }, [this, this.author]); transfer player controls to unnamed author clone sprite and changes former player sprite image to hero image     
 // need to give container2 a body ?? and physics ??? 
// only 1 sprite will be a player sprite - the author-agent sprites will be NPCs
      
      // Animation definitions
        this.anims.create({
          key: 'walk-down',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('author', {start: 0, end: 7}),
        });
        this.anims.create({
          key: 'walk-right',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('author', {start: 24, end: 31}),
        });
        this.anims.create({
          key: 'walk-up',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('author', {start: 8, end: 15}),
        });
        this.anims.create({
          key: 'walk-left',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('author', {start: 16, end: 23}),
        });
      
      // NOTE: Sword animations for red shirted 'hero' spritesheet do not repeat
        this.anims.create({
          key: 'swing-down',
          frameRate: 8,
          repeat: 0,
          frames: this.anims.generateFrameNumbers('hero', {start: 16, end: 19}),
        });
        this.anims.create({
          key: 'swing-up',
          frameRate: 8,
          repeat: 0,
          frames: this.anims.generateFrameNumbers('hero', {start: 20, end: 23}),
        });
        this.anims.create({
          key: 'swing-right',
          frameRate: 8,
          repeat: 0,
          frames: this.anims.generateFrameNumbers('hero', {start: 24, end: 27}),
        });
        this.anims.create({
          key: 'swing-left',
          frameRate: 8,
          repeat: 0,
          frames: this.anims.generateFrameNumbers('hero', {start: 28, end: 31}),
        });
    },   
    update() 
    {
        this.stateMachine.step();
//      this.physics.world.wrap(this.author);
      // use this stairs to second floor change scene coordinates (540,  ) temporarily and change to collide with tile
        if(((this.author.x > 520 && this.author.x < 560) && (this.author.y > 480 && this.author.y < 560))){
           this.scene.start('secondFloor');
        }
    }
});
// should these states be placed below config, within the FSM scene, or super or sub classed ????? 
class IdleState extends State {
  enter(scene, author) {
    author.setVelocity(0);
    author.anims.play(`walk-${author.direction}`);
    author.anims.stop();
  }
  
  execute(scene, author) {
    const {left, right, up, down, space, shift} = scene.keys;
    
    // Transition to swing if pressing space (eventually change this to a numbering machine stamping animation)
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }
    
    // Transition to dash if pressing shift (eventually delete as not to be used for this game)
    if (shift.isDown) {
      this.stateMachine.transition('dash');
      return;
    }
    
    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}

class MoveState extends State {
  execute(scene, author) {   //changed from author to container 2
    const {left, right, up, down, space, shift} = scene.keys;
    
    // Transition to swing if pressing space
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }
    
    // Transition to dash if pressing shift
    if (shift.isDown) {
      this.stateMachine.transition('dash');
      return;
    }
    
    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }
    
    author.body.setVelocity(0);
    if (up.isDown) {
      author.setVelocityY(-100);
      author.direction = 'up';
    } else if (down.isDown) {
      author.setVelocityY(100); // set to author.setVelocityY(100) to move player sprite down
//      author.setVelocityY(100);
  // I changed this to container.setVelocityY(100) to control movement of a container
      author.direction = 'down';
    }
    if (left.isDown) {
      author.setVelocityX(-100);
      author.direction = 'left';
    } else if (right.isDown) {
      author.setVelocityX(100);
      author.direction = 'right';
    }
    
    author.anims.play(`walk-${author.direction}`, true);
  }
}

class SwingState extends State {
  enter(scene, hero) {    
    hero.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    hero.once('animationcomplete', () => {
      this.stateMachine.transition('idle');
    });
  }
}

class DashState extends State {
  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    switch (hero.direction) {
      case 'up':
        hero.setVelocityY(-300);
        break;
      case 'down':
        hero.setVelocityY(300);
        break;
      case 'left':
        hero.setVelocityX(-300);
        break;
      case 'right':
        hero.setVelocityX(300);
        break;
    }
    
    // Wait a third of a second and then go back to idle
    scene.time.delayedCall(300, () => {
      this.stateMachine.transition('idle');
    });
  }
}
var SecondFloor = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function SecondFloor ()
    {
      Phaser.Scene.call(this, { key: 'secondFloor', active: false });
    },
    preload()
    {
      this.load.image('floorplan', 'https://cdn.glitch.global/dad6f70b-d7f8-4b6b-812a-427943582a20/secretFloorplan6.png?v=1646417211569');
//      this.load.image('quest', '');
    },

    create ()
    { 
      var titleline;
      
      this.secondFloor = this.add.sprite(400, 300, 'floorplan').setScale(0.3).setOrigin(0.5, 0.5);  
      titleline = this.add.text(350, 40, 'Building Interior - Second Floor', { fontSize: 16, color: '#ffffff' }).setOrigin(0.5); 
      this.add.text(10, 350, 'La COCINA (Spanish)\nKitchen (Inglés)', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.add.text(10, 400, '- Katrin Becker\'s Gene Rummy pack on table\n(http://minkhollow.ca/gene-rummy/),\n How to Play Gene Rummy - The Novice Version\n(https://www.youtube.com/watch?v=RbkA7SeqSjY)\nbottle of water and vegan roast beef sandwich in refrigerator.', { fontFamily: 'Arial', fontSize: 12, color: '#ffff00' });
      this.add.text(330, 350, 'Men\'s Washroom\n(unlocked)', { fontFamily: 'Arial', fontSize: 12, color: '#000000' }); 
      this.add.text(330, 570, 'Women\'s Washroom(unlocked)', { fontFamily: 'Arial', fontSize: 12, color: '#ffffff' }); 
      this.add.text(280, 80, 'Linux Terminal Server Project\nServer Room\(locked).', { fontFamily: 'Arial', fontSize: 18, color: '#000000' }); 
      this.add.text(10, 80, 'Secretary/Admin Assistant\nRoom\n(locked)', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.add.text(10, 500, 'Door to garage area\nand stairs on east side\nof kitchen\n(locked)', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.add.text(600, 350, 'Conference Room', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.add.text(550, 400, 'Mentor Connections\n(live, delayed and automated)\nCorporate ExTRA(TM) System\nMMO SOLE Session Link\nImmersive Language Training\n(Chilean, Argentinian, Mexican)\nSupervised Courseroom', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
      this.add.text(450, 400, 'STAIRS', { fontFamily: 'Arial', fontSize: 18, color: '#ff0000' });
      this.make.text({
              x: 670,
              y: 70,
              text:'Research station manager\'s office\n(locked)\nPlant Breeder\'s office with poster of LINK on door is locked.\nEntrance to secret lab is locked. (Door at north end of N-S hallway - SHOWER)',
              origin: { x: 0.5, y: 0.5 },
              style: {
                  font: 'bold 12px Times',
                  fill: 'black',
                  wordWrap: { width: 200 }
              }
          });
              
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('castleBanquet');
           });
    }        
});

var CastleBanquet = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function CastleBanquet ()
    {
      Phaser.Scene.call(this, { key: 'castleBanquet', active: false });
    },
    preload()
    {
      this.load.image('reciprocalCrosses', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FCrossesR1multicolour.png?v=1574373372848');
    },

    create ()
    { 
      var titleline;
      
      this.castleBanquet = this.add.sprite(400, 300, 'reciprocalCrosses').setScale(.5).setOrigin(0.5, 0.5);  
      titleline = this.add.text(350, 40, 'Level 1 Fantasy Sequence - Scene 1: Castle Banquet', { fontSize: 16, color: '#000000' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('fantasyOverworld');
           });
    }        
});
var FantasyOverworld = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function FantasyOverworld ()
    {
      Phaser.Scene.call(this, { key: 'fantasyOverworld', active: false });
    },
    preload()
    {
      this.load.image('ranges', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FAnnotatedInbreeding.png?v=1574374257475');
    },

    create ()
    { 
      var titleline;
      
      this.fantasyOverworld = this.add.sprite(400, 300, 'ranges').setScale(.5).setOrigin(0.5, 0.5);  
      titleline = this.add.text(380, 40, 'Level 1 Fantasy Sequence - Scene 2: Fantasy Overworld', { fontSize: 16, color: '#000000' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('villageFestival');
           });
    }        
});
var VillageFestival = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function VillageFestival ()
    {
      Phaser.Scene.call(this, { key: 'villageFestival', active: false });
    },
    preload()
    {
      this.load.image('measuring', 'https://cdn.glitch.me/dad6f70b-d7f8-4b6b-812a-427943582a20%2FRangeTwoMeasured.png');
    },

    create ()
    { 
      var titleline;
      
      this.villageFestival = this.add.sprite(400, 300, 'measuring').setScale(.5).setOrigin(0.5, 0.5);  
      titleline = this.add.text(380, 40, 'Level 1 Fantasy Sequence - Scene 3: Village Festival', { fontSize: 16, color: '#000000' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('castleStefan');
           });
    }        
});
var CastleStefan = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function CastleStefan ()
    {
      Phaser.Scene.call(this, { key: 'castleStefan', active: false });
    },
    preload()
    {
      this.load.image('nursery', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FInbreedingNurseryAll.png?v=1574374234675');
    },

    create ()
    { 
      var titleline;
      
      this.castleStefan = this.add.sprite(400, 300, 'nursery').setScale(.5).setOrigin(0.5, 0.5);  
      titleline = this.add.text(380, 40, 'Level 1 Fantasy Sequence - Scene 4: Castle Stefan', { fontSize: 16, color: '#000000' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('secretGarden');
           });
    }        
});
var SecretGarden = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function SecretGarden ()
    {
      Phaser.Scene.call(this, { key: 'secretGarden', active: false });
    },
    preload()
    {
      this.load.image('garden', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FTwoRanges.png?v=1574373854848');
    },
//https://www.feelguide.com/2019/07/24/leonardo-da-vincis-french-castle-dna-staircase-the-secret-tunnel-to-the-chateau-where-he-died/
// walled kitchen garden  https://www.saltwoodcastle.com/gallery 
// https://audaxdesign.org/category/blickling-hall-rebirth-of-the-walled-garden/
  
    create ()
    { 
      var titleline;
      
      this.secretGarden = this.add.sprite(400, 300, 'garden').setOrigin(0.5, 0.5);  
      titleline = this.add.text(380, 40, 'Level 1 Fantasy Sequence - Scene 5: Secret Garden', { fontSize: 16, color: '#ffff00' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('gameOverScene');
           });
    }        
});
/*
var SecretLab = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function SecretLab ()
    {
      Phaser.Scene.call(this, { key: 'secretLab', active: false });
    },
    preload()
    {
      this.load.image('garden', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2FTwoRanges.png?v=1574373854848');
    },

// // https://www.labster.com/

// https://concord.org/teaching-genetics/dragons/

// https://amino.bio/
// https://amino.bio/pages/vbioengineer_canvas
// https://amino.bio/pages/what-is-dna
// https://vbioekit2020.s3-us-west-2.amazonaws.com/Vbioengineer_2020_2.1.html
// 
// https://store.steampowered.com/app/1286810/Mission_Biotech/
// https://biomanbio.com/HTML5GamesandLabs/LifeChemgames/bioagenthtml5page.html
// https://biomanbio.com/HTML5GamesandLabs/Genegames/genetics.html

// https://learn.genetics.utah.edu/content/labs/

// https://www.labxchange.org/
// https://www.labxchange.org/library

https://virtuallabs.merlot.org/vl_biology.html

// http://star.mit.edu/genetics/
// https://www.frontiersin.org/articles/10.3389/fgene.2019.01392/full

// http://www.dnaftb.org/##

https://dnalc.cshl.edu/

// https://www.maizegdb.org/
// https://ensembl.gramene.org/Zea_mays/Info/Index

// https://www.emeraldcloudlab.com/
// https://www.emeraldcloudlab.com/virtualtour/

    create ()
    { 
      var titleline;
      
      this.secretLab = this.add.sprite(400, 300, 'garden').setOrigin(0.5, 0.5);  
      titleline = this.add.text(380, 40, 'Secret Lab', { fontSize: 16, color: '#ffff00' }).setOrigin(0.5); 
      var nextScene = this.add.text(200, 520, 'NEXT SCENE >>>', {fontFamily: 'Arial', fontSize: 48, color: '#0000ff'}).setStroke ('0x0000ff',4);
          nextScene.setInteractive().on('pointerdown', function () {
            this.scene.scene.start('gameOverScene');
           });
    }        
});
*/

var GameOverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function GameOverScene ()
    {
      Phaser.Scene.call(this, { key: 'gameOverScene', active: false });
    },
    preload ()
    {
        this.load.image('gameover', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F800px-Maisstoppelveld_in_de_sneeuw.JPG?v=1574372070995');
            
    },

    create ()
    {                
        this.GameOverScene = this.add.sprite(400, 300, 'gameover').setOrigin(0.5, 0.5);
        this.add.text(20, 20, 'Game Over Scene', { fontFamily: 'Arial', fontSize: 64, color: '#ffff00' });
  
        var playAgainText = this.add.text(200, 160, 'Play Again', {fontFamily: 'Arial', fontSize: 64, color: '#0000ff'}).setStroke ('0x0000ff', 4);
      // this code is not working. very puzzling ?? I put a bracket after pointer down!!!! 
        playAgainText.setInteractive().on('pointerdown', function() { 
            this.scene.scene.start('gameScene');
        });
    
        
        var mainMenuText = this.add.text(200, 320, 'Main Menu', {fontFamily: 'Arial', fontSize: 64, color: '#0000ff'}).setStroke ('0x0000ff', 4);
        mainMenuText.setInteractive().on('pointerdown', function () {
          this.scene.scene.start('menuScene');
        });
                                      
    
        var exitText = this.add.text(200, 460, 'Roll Credits and Exit', {fontFamily: 'Arial', fontSize: 64, color: '#0000ff'}).setStroke ('0x0000ff',4);
        exitText.setInteractive().on('pointerdown', function () {
          this.scene.scene.start('creditsScene');
        });
    }        
});
var CreditsScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    function CreditsScene ()
    {
       Phaser.Scene.call(this, { key: 'creditsScene', active: false });
    },

    preload ()
    {
        this.load.image('credits', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2F800px-%C3%89p%C3%B4ne_-_r%C3%A9colte_du_ma%C3%AFs01.jpg?v=1574372081770');
        this.load.bitmapFont('desyrel', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Fdesyrel.png?v=1587662275121', 'https://cdn.glitch.com/dad6f70b-d7f8-4b6b-812a-427943582a20%2Fdesyrel.xml?v=1587662868526');

    },
    
    create ()
    {
       this.creditsbackground = this.add.sprite(400, 300, 'credits').setOrigin(0.5, 0.5);

  //      this.add.bitmapText(200,200, 'desyrel', 'bitmap text\n on the screen');    

        var text1 = this.add.text(40, 10, 'Scrolling Credits Screen', { fontFamily: 'Arial', fontSize: 64, color: '#ffff00' });
        text1.setStroke('#00ff00', 16);
        text1.setShadow(2, 2, "#333333", 2, true, true);

     
        var txt10 = this.add.text(80, 100, 'click these words to return to Splash screen', { fontFamily: 'Arial', fontSize: 32, color: 'LawnGreen'}).setStroke('0x0000ff', 4);
        txt10.setInteractive().on('pointerdown', function() {
            //Let's start another scene with start
            this.scene.scene.start('bootScene');
        });
  
 /*       
       // this.add.text(30, 450, 'click to change screen to Splash screen scene', "Shadow Both", { fontFamily: 'Arial', fontSize: 32, color: '#000000'});
      //  this.text.setStroke('#de77ae', 32);
       
   //     var text3 = this.add.text(20, 410, "Click image to change screen to Splash screen scene", { fontFamily: "Arial Black", fontSize: 28, color: "#c51b7d" });
   //     text3.setStroke('#de77ae', 16);
        //  Apply the shadow to the Stroke and the Fill (this is the default)
   //     text3.setShadow(2, 2, "#333333", 2, true, true);
*/      
        var txt20 = this.make.text({ x: 300, y: 500, text: 'Main Menu',
            origin: { x: 0.5, y: 0.5 },
            style: { 
                font: 'bold 32px Helvetica',
                strokeThickness: 6,
                fill: 'blue',
                wordWrap: { width: 500 }
            }
        });      
                  
        txt20.setInteractive().on('pointerdown', function () { 
            this.scene.start('menuScene'); // as menu option, will be programmed to return to menu screen
        }, this);
      // The ending scene of the script of "Field of Dreams" is used here for educational purposes to test the scrolling text
        var content = ["", 
                       "", 
                       "", 
                       "", 
                       "CATCHER",
          "Hi, I just wanted to thank you",
          "folks for putting up the field",
          "and letting us play here.",
          "I'm John Kinsella.", 
          "They shake his hand.",
          "",             
                         "RAY",
          "I'm Ray. My wife Annie. And this",
          "is my daughter, Karin.",
          "",
                         "(TO KARIN)",
          "Karin, this is...",
          "He almost says 'My father.'",
          "",
                         "RAY",
           "",
                         "KARIN",
           "",
                         "JOHN",
          "Ray and Annie are beaming.",
          "Annie takes Karin's hand.",
          "",
                         "ANNIE",
          "We're going to let you two talk.",
          "I have to go look after our guests.",
          "Someone's gotta start collecting",
          "admission if we're going to keep",
          "this place.",
          "(to the Catcher)",
          "Very nice meeting you.",
          "",
                         "JOHN",
          "M' am.",
           "",
                        "ANNIE",
          "hoists Karin up and totes her", 
          "toward the tourists waiting",
          "in front of the house.",
           "",
              "RAY AND JOHN",
         "watch them for a while, then",
         "start to stroll across the field.",
         "",  
         "",  
         "",
         "",
         "Mitchy's Maize",
         "Production Coordinator",
         "Quasar Xeltentat", 
         "Second Life Avatar",
         "",
         "Background Images",
          "Webpage Background Image",
          "https://commons.m.wikimedia.org",
          "/wiki/File:Maize_Maze_at_Metton_",
          "-_geograph.org.uk_-_24223.jpg",
          "Author: Nick Pounder", 
          "Maize Maze at Metton",
          "CC BY-SA 2.0",
                       "",
          "Splash Screen",
          "File:NRCSOH07012 - Ohio (717402)",
          "(NRCS Photo Gallery).jpg",
          "Photo by Scott Bauer",
          "Photo courtesy of USDA Natural Resources Conservation Service. / Public Domain",
          "",
          "Main Menu Screen",
          "https://commons.m.wikimedia.org/wiki/File:Corn_Field.JPG",
          "Chandipur, Sundorganj, Gaibandha",
          "Author: Khairuzzaman",                      
        "",
        "Options Menu Screen",
        "https://commons.m.wikimedia.org/wiki/File:Maize_diversity_in_Vavilovs_office_(3421259242).jpg",
        "Author: Luigi Guarino from Suva, Fiji",
        "",
        "Game Over Screen",
        "https://commons.m.wikimedia.org/wiki/File:Maisstoppelveld_in_de_sneeuw.JPG",
         "",
        "Credits Screen",
        "https://commons.m.wikimedia.org/wiki/File:%C3%89p%C3%B4ne_-_r%C3%A9colte_du_ma%C3%AFs01.jpg",     
         "Author: Spedona",
         "GNU Free Documentation License, Version 1.2",
         "Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
         "",              "",
        "Music",
        "Truth of the Legend by Kevin MacLeod (incompetech.com)",
        "Licensed under Creative Commons: By Attribution 4.0 License",
        "http://creativecommons.org/licenses/by/4.0/",         
        "",
         "",              
        "Sound Effects",
          "",             
         "Tilesets",
          "Soil and Corn tileset(very slightly",
          "modified) - creator Daniel Eddeland.",
           "https://opengameart.org/content/lpc-farming-tilesets-magic-animations-and-ui-elements",
         "",
         "Sprites",
          "",
          "",
         "Tile Maps",
         "",
         "Lead Programmer",
         "",
         "Coders",
         "Paul C. Gowan",
         "",
         "", 
         "",
         "",
         "",                                    
                       "RAY",
          "You catch a good game.",
"",
                         "JOHN",
          "Thank you. It's so beautiful here.",
          "Its like - well for me, it's like",
          "a dream come true.",
          "Ray cannot speak. He nods.",
"",
                         "JOHN",
          "Can I ask you something?",
          "Again, Ray nods.",
"",
                         "JOHN",
          "Is this heaven?",
          "Ray smiles and shakes his head",
          "no.",
"",
                         "RAY",
          "It's Iowa.",
          "",
                         "JOHN",
          "Iowa. I could've sworn this was",
          "heaven.",
          "",
                          "RAY",           
          "stops and looks intently at John.",
          "He asks this question as if he",
          "were asking the secret of life.",
          "Maybe he is.",
          "",
                         "RAY",
          "Is there a heaven?",
"",
                         "JOHN",             
          "takes time to answer that.",
          "He looks up at the night sky",
          "and searches it.",
"",
                         "JOHN",
          "Oh, yeah...",
          "Then he looks square into Ray's",
          "eyes.",
"",
                         "JOHN",
          "Heaven's where dreams come true.",
             "",        
                        "RAY",
          "looks toward the house and sees",
          "his wife and daughter on the",
          "veranda, a moon bright as butter",
          "silvering the night above them.",
          "He smiles.",
          "He finally understands.",
          "He turns back to John and nods.",
"",
                         "RAY",
          "Then maybe this is heaven.",
"",
                         "JOHN",
          "smiles wisely in return.",
"",
                         "JOHN",
          "Well...good night, Ray.",
"",
                         "RAY",
          "Good night.",
"",
                         "MASTER",
"",
          "John starts to walk off toward",
          "the door in the outfield fence.",
"",
                         "RAY",
          "Hey!",
          "John turns back. Ray is holding",
          "a ball.",
"",
                         "RAY",
          "You wanna have a catch?",
          "John closes his eyes for a second,",
          "and when he opens them; there is",
          "the hint of moisture. Does he",
          "know Ray is his son?",
"",
                         "JOHN",
          "I'd like that.",
"",
          "Ray tosses him the ball, picks up",
          "a glove lying there, and puts it",
          "on.",
"",
          "They throw the ball back and",
          "forth.",
"",
          "And as we pull up higher and",
          "higher we see a father and son",
          "bathed by white floodlights and",
          "car headlights... on the silent,",
          "satiny green of a baseball",
          "diamond at the edge of a",
          "cornfield.",
"",
                         "FADE OUT",
"",
                         "THE END",
"",
"",
"",
    "Field of Dreams",
"",
"Writers : Phil Alden Robinson",
"Genres :  Drama  Family  Fantasy",
"",
                       "",
                       "",
                       "",
                       "",
                       ""
        ];
   //     this.add.image(400, 300, 'credits').setOrigin(0.5, 0.5);
    
        scroller = this.add.dynamicBitmapText(20, 100, 'desyrel', content, 48);

        scroller.setSize(800, 1024);
     
    },
    
    update (time, delta) 
    {
      // speed of scroll * delta (0.8 is quite fast, 0.08 a little too slow, this also might be device specific)
            scroller.scrollY += 0.2 * delta;
      // scroller.scrollY > length of scroll or alotted time to scroll
            if (scroller.scrollY > 21000)
            {
                scroller.scrollY = 0;
            } // else {
 //           this.sys.game.destroy(true);
//            } */
    }

});

// mobile SG3, w:1024, height: 768
let config = {
  type: Phaser.CANVAS,
  backgroundColor: '#00ff00', // variation: backgroundColor: 0xffff00,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'gameArea', // div tag id
    width: 800,
    height: 600
  },
  pixelArt: true,
  zoom: 1,
  physics: {
    default: 'arcade'
  }, 
  audio: {
      disableWebAudio: true
  },
  /*
  plugins: {
    global: [
      {
        key: 'RandomNamePlugin',
        plugin: SwipePlugin,
        start: true,
        data: {
          // you can give your value for min offset
          offset: 123
        }
      }
    ]
  },
  */
  scene: [ BootScene, MenuScene, OptionsScene, SceneMain, GameScene, FSMScene, SecondFloor, CastleBanquet, FantasyOverworld, VillageFestival, CastleStefan, SecretGarden, GameOverScene, CreditsScene ] // adding Titlescene or SceneMain (the external scene file) to the list gives a SceneMain not defined error
};

var content = null;
var scroller;
var game = new Phaser.Game(config);// client-side js 



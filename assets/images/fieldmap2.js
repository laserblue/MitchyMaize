/*This file contains three protype illustrations of a field.
Note that the original code disables the spacebar and numbered one, two, and three keys

fieldmap2.js - shows untilled field, marking stakes and marks made by marking implement in soil

note also that Playbook file paths to images must be removed and assets uploaded

the coding is very bad and sloppy. Loops could be added to replace tile by tile placement.

I still need to replace the cursor key scrolling with touch input and replace the tile selection strip with the correct tiles.
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png'); 
  game.load.image('soil', 'assets/tilemaps/tiles/FieldSoil.png');  
}

var map;
var layer1;
var layer2;
var layer3;

var marker;
var currentTile = 0;
var currentLayer;

var cursors;
var showLayersKey;
var layer1Key;
var layer2Key;
var layer3Key;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage('soil');

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 30x25 tiles in size and the tiles are 32x32 pixels in size.
    layer1 = map.create('level1', 30, 25, 32, 32);
    layer1.scrollFactorX = 0.5;
    layer1.scrollFactorY = 0.5;
  
  for (var y = 1; y < 2; y++)
      { 
      for (var x = 0; x < 22; x++)
        {    map.putTile(38, x, y, layer1); 
          
        } 
  }

  for (var y = 2; y < 3; y++)
    {  map.putTile(38, 0, y, layer1); 
        map.putTile(0, 1, y, layer1); 
        for (var x = 2; x < 20; x++)
        {    map.putTile(23, x, y, layer1); 
          
        }
          map.putTile(2, x, y, layer1); 
          map.putTile(38, x+1, y, layer1); 
  } 
  
  for (var y = 3; y < 14; y++)
    {    map.putTile(38, 0, y, layer1); 
        map.putTile(21, 1, y, layer1); 
        for (var x = 2; x < 20; x++)
        {    map.putTile(20, x, y, layer1); 
          
        }
          map.putTile(22, x, y, layer1); 
          map.putTile(38, x+1, y, layer1); 
  } 

  for (var y = 14; y < 15; y++)
    {  map.putTile(38, 0, y, layer1); 
        map.putTile(6, 1, y, layer1); 
        for (var x = 2; x < 20; x++)
        {    map.putTile(24, x, y, layer1); 
          
        }
          map.putTile(8, x, y, layer1); 
          map.putTile(38, x+1, y, layer1); 
  } 

  for (var y = 15; y < 16; y++)
      { 
      for (var x = 0; x < 22; x++)
        {    map.putTile(38, x, y, layer1); 
          
        } 
  }


//  Resize the world
    layer1.resizeWorld();

    layer2 = map.createBlankLayer('level2', 30, 25, 32, 32);
    layer2.scrollFactorX = 0.8;
    layer2.scrollFactorY = 0.8;
  
  for (var y = 5; y < 6; y++)
      { 
      for (var x = 3; x < 19; x++)
        {    map.putTile(26, x, y, layer2); 
            map.putTile(25, x, y+1, layer2); 
        } 
  }

  for (var y = 11; y < 12; y++)
      { 
      for (var x = 3; x < 19; x++)
        {    map.putTile(26, x, y, layer2); 
            map.putTile(25, x, y+1, layer2); 
        } 
  } 



    layer2.resizeWorld(); 


    layer3 = map.createBlankLayer('level3', 30, 25, 32, 32);

    map.putTile(41, 4, 5, layer3); 
    map.putTile(41, 18, 5, layer3); 
    map.putTile(41, 4, 11, layer3); 
    map.putTile(41, 18, 11, layer3); 

layer3.resizeWorld(); 

    currentLayer = layer1;

    //  Create our tile selector at the top of the screen
    createTileSelector();

    game.input.addMoveCallback(updateMarker, this);

    cursors = game.input.keyboard.createCursorKeys();

    showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    layer1Key = game.input.keyboard.addKey(Phaser.Keyboard.F4);
    layer2Key = game.input.keyboard.addKey(Phaser.Keyboard.F5);
    layer3Key = game.input.keyboard.addKey(Phaser.Keyboard.F6);

    showLayersKey.onDown.add(changeLayer, this);
    layer1Key.onDown.add(changeLayer, this);
    layer2Key.onDown.add(changeLayer, this);
    layer3Key.onDown.add(changeLayer, this);

    console.log(layer1.index);
    console.log(layer2.index);
    console.log(layer3.index);

}

function changeLayer(key) {

    switch (key.keyCode)
    {
        case Phaser.Keyboard.ALT:
            layer1.alpha = 1;
            layer2.alpha = 1;
            layer3.alpha = 1;
            break;

        case Phaser.Keyboard.F4:
            currentLayer = layer1;
            layer1.alpha = 1;
            layer2.alpha = 0.2;
            layer3.alpha = 0.2;
            break;

        case Phaser.Keyboard.F5:
            currentLayer = layer2;
            layer1.alpha = 0.2;
            layer2.alpha = 1;
            layer3.alpha = 0.2;
            break;

        case Phaser.Keyboard.F6:
            currentLayer = layer3;
            layer1.alpha = 0.2;
            layer2.alpha = 0.2;
            layer3.alpha = 1;
            break;
    }

}

function pickTile(sprite, pointer) {

    currentTile = game.math.snapToFloor(pointer.x, 32) / 32;

}

function updateMarker() {

    marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.activePointer.isDown)
    {
        map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
    }

}

function update() {

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

}

function render() {

    game.debug.text('Current Layer: ' + currentLayer.name, 16, 550);
    game.debug.text('F4-F6 Switch Layers. Alt = Show All. Cursors = Move Camera', 16, 570);

}

function createTileSelector() {

    //  Our tile selection window
    var tileSelector = game.add.group();

    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 34);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);
    // var tileStrip = tileSelector.create(1, 1, 'soil'); 
    var tileStrip = tileSelector.create(1, 1, 'ground_1x1'); 
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(pickTile, this);

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

}



import Player from '../entities/player';

class Play extends Phaser.State {
  create() {
    this.loadMap();

    // Player
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX + 300,
      y: this.game.world.height - 100,
      asset: 'player'
    });

    // Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Stop the player from falling through tiles if they are going too fast
    this.game.physics.arcade.TILE_BIAS = 32;

    // Camera
    this.camera.follow(this.player);

    // Capture controls to prevent unwanted scrolling
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR,
    ]);
  }

  loadMap() {
    // Map
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');

    // Map Layer
    this.layer = this.map.createLayer(0);
    this.layer.setScale(3);
    this.layer.resizeWorld();

    this.map.setCollisionByExclusion([]);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.layer);
  }
}

export default Play;

class Preload extends Phaser.State {
  create() {
    this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onFileComplete.add(this.fileComplete, this);
    this.game.load.onLoadComplete.add(this.loadComplete, this);

    this.loadingText = this.game.add.text(32, 32, 'Loading...', {fill: '#fff'});

    // Load your assets here
    this.game.load.spritesheet('player', './assets/player.png', 16, 24);
    this.game.load.spritesheet('tiles', './assets/tiles.png', 16, 16);
    this.game.load.tilemap('map', './assets/map.json', null,
      Phaser.Tilemap.TILED_JSON);

    this.game.load.start();
  }

  loadStart() {
    this.loadingText.setText('Loading...');
  }

  fileComplete(progress) {
    this.loadingText.setText('Loading: ' + progress + '%');
  }

  loadComplete() {
    this.loadingText.setText('Load Complete');
    this.game.state.start('play');
  }
}

export default Preload;

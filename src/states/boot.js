class Boot extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#526f86';
    this.game.state.start('preload');
  }
}

export default Boot;

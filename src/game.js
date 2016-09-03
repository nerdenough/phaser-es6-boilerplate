import Boot from './states/boot';
import Preload from './states/preload';
import Play from './states/play';

class Game extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, 'game', null, false, false);

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('play', Play);

    this.state.start('boot');
  }
}

new Game();

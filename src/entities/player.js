class Player extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
    this.game = game;
    this.velX = 600;

    // Sprite
    this.animations.add('idle', [0, 1], true);
    this.animations.add('run', [5, 6, 7, 8, 9], true);
    this.animations.add('jump', [2, 3], true);
    this.anchor.setTo(0.5);
    this.scale.setTo(3);

    // Physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 2600;
    this.body.collideWorldBounds = true;

    this.game.add.existing(this);
  }

  update() {
    let moveLeft = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
      || this.game.input.keyboard.isDown(Phaser.Keyboard.A);
    let moveRight = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
      || this.game.input.keyboard.isDown(Phaser.Keyboard.D);
    let jump = this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
      || this.game.input.keyboard.isDown(Phaser.Keyboard.W)
      || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

    this.body.velocity.x = 0;

    if (moveLeft) {
      this.body.velocity.x = -this.velX;
      this.scale.x = -3;
    } else if (moveRight) {
      this.body.velocity.x = this.velX;
      this.scale.x = 3;
    }

    if (jump) {
      this.jump();
    }

    this.render();
  }

  render() {
    let velX = this.body.velocity.x;
    let velY = this.body.velocity.y;

    if (velX !== 0 && velY === 0) {
      this.animations.play('run', 15, true);
    } else if (velY !== 0) {
      this.animations.play('jump', 5, true);
    } else {
      this.animations.play('idle', 2, true);
    }
  }

  jump() {
    if (this.body.touching.down || this.body.onFloor()) {
      this.body.velocity.y = -1200;
    }
  }
}

export default Player;

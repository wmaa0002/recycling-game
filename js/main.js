
// var game = new Phaser.Game(1080, 960 ,Phaser.CANVAS, 'game');
var game = new Phaser.Game(800, 600 ,Phaser.CANVAS, 'game');
game.States = {};

// boot场景
game.States.boot = function() {
  this.preload = BootScene.preload;
  this.create = BootScene.create;
}

// 预加载场景，用于加载资源
game.States.preload = function() {
  this.preload = PreloadScene.preload;
  this.create = PreloadScene.create;
}

game.States.game = function() {
  this.create = GameScence.create.bind(GameScence);
  this.update = GameScence.update.bind(GameScence);
  // this.additems = GameScence.additems.bind(GameScence);
}

game.States.gameover = function() {
  this.create = GameOverScence.create.bind(GameOverScence);
  this.update = GameOverScence.update.bind(GameOverScence);
}

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
// game.state.add('main', game.States.main);
game.state.add('game', game.States.game);
game.state.add('gameover', game.States.gameover);


game.state.start('boot');
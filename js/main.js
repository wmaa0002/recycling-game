
// var game = new Phaser.Game(1080, 960 ,Phaser.CANVAS, 'game');
// var game = new Phaser.Game(800, 600 ,Phaser.CANVAS, 'game');
var game = new Phaser.Game(window.innerWidth, window.innerHeight,Phaser.CANVAS, 'game');


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
// menu 
game.States.menu = function() {
  this.create = MainScene.create.bind(MainScene);
  // this.update = MainScene.update.bind(MainScene);
}
// the main game
game.States.play = function() {
  this.create = GameScence.create.bind(GameScence);
  this.update = GameScence.update.bind(GameScence);
  // this.additems = GameScence.additems.bind(GameScence);
}
// the game over 
game.States.gameover = function() {
  this.create = GameOverScence.create.bind(GameOverScence);
  this.update = GameOverScence.update.bind(GameOverScence);
}
//the 
// game.States.Congratulations = function() {
//   this.create = GameOverScence.create.bind(CongratulationsScence);
//   this.update = GameOverScence.update.bind(CongratulationsScence);
// }

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
// game.state.add('congratulations',game.States.Congratulations);
// game.state.add('menu', game.States.menu);
game.state.add('play', game.States.play);
game.state.add('gameover', game.States.gameover);


game.state.start('boot');
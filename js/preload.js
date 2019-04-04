// 加载其他资源的场景
var PreloadScene = {
  // 加载其他所有资源
  preload: function() {
    var progressText;//百分比文字
    var preloadSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'loading');
    // game.load.setPreloadSprite(preloadSprite);
    preloadSprite.anchor.set(0.5, 0.5);
    progressText = game.add.text(game.world.centerX -50, game.world.centerY + 70,'0%',{fill:'#fff',fontSize:'16px'});
    progressText.font = 'Arilas';
    game.load.image('background', 'assets/background1.png');
    game.load.image('candy-red', 'assets/candy-red.png');
    game.load.image('red-bin', 'assets/redbin.jpg');
    game.load.image('green-bin', 'assets/bin-icon.png');

    game.load.image('apple', 'assets/apple-icon.png');   
    game.load.image('water-bottle', 'assets/bottle-icon.png');
    game.load.image('coke', 'assets/coke-can.png');
    game.load.image('milk-box', 'assets/milk-can.png');
    game.load.image('pizza', 'assets/pizza.png');

    game.load.image('right-sign', 'assets/right.png');
    game.load.image('gameover', 'assets/game-over.png')

    for(let i =0 ; i < 200; i++){
      game.load.spritesheet('mosnster' + i, 'assets/monster-idle',{
        frameHeight:32,
        frameWidth:32
      }); 
    }

    game.load.onFileComplete.add(function(progress) {
    progressText.text ='loading' + progress + '%...';
    if(progress == 100) {
      game.state.start('game');
      }
    });
  } 
  // 跳转到开始界面
  // create: function() {
  //   // if(this.progress == 100) {
  //   //   game.state.start('game');
  //     }
  // }
};
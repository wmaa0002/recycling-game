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
    game.load.image('background', 'assets/background3.png');
    game.load.image('gameoverBackground','assets/space3.jpeg');
    game.load.image('earth','assets/earth.png');
    game.load.image('tips1','assets/2222.png');
    game.load.image('tips2','assets/3333.png');

    game.load.image('menuBackground', 'assets/background2.png');
    game.load.image('btn','assets/pause-button.png');
    game.load.image('conbtn','assets/contuine.png');
    game.load.image('restartbtn','assets/1112.png');
    // game.load.spritesheet('restartbtn', 'assets/button-restart.png',399,141,3);
    game.load.spritesheet('startbtn', 'assets/button-start.png',399,141,3);
    game.load.image('tipsbtn','assets/idea.png');
    game.load.image('congratulations','assets/congrations.png');

    
    game.load.image('red-bin', 'assets/recycle-bin.png');
    game.load.image('general-bin', 'assets/general-bin.png');


    game.load.image('candy-red', 'assets/candy-red.png');
    game.load.image('apple', 'assets/apple-icon.png');   
    // game.load.image('bread', 'assets/bread.png');
    game.load.image('pizza', 'assets/pizza1.png');
    game.load.image('potato', 'assets/patato1.png');
    game.load.image('egg', 'assets/egg1.png');
    game.load.image('fishbone', 'assets/fishbone1.png');
    game.load.image('banana', 'assets/banana1.png');
    // game.load.image('laptop', 'assets/laptop1.png');
    // game.load.image('banana', 'assets/banana1.png');
    game.load.image('ball','assets/ball.png');
    game.load.image('clothes','assets/clothes.png');
    game.load.image('light','assets/light.png');
    game.load.image('mirror','assets/mirror.png');
    game.load.image('nappies','assets/nappies.png');
    game.load.image('over','assets/over.png');
    game.load.image('pant','assets/pant.png');
    game.load.image('plasticPaper','assets/plastic paper.png');
    game.load.image('rocking-horse','assets/rocking-horse.png');
    game.load.image('rubiks-cube','assets/rubiks-cube.png');
    game.load.image('shoes','assets/shoes.png');
    game.load.image('watermelon','assets/watermelon.png');




    game.load.image('water-bottle', 'assets/bottledwater.png');
    // game.load.image('coke-can', 'assets/Trash_SodaCans_1.png');
    // game.load.image('coke-can', 'assets/soda1.png');
    game.load.image('milk-box', 'assets/long life milk container.png');
    game.load.image('glass', 'assets/glass-1.png');
    game.load.image('plastic-bag', 'assets/plastic-bag.png');
    // game.load.image('can', 'assets/can-1.png');
    // game.load.image('can1', 'assets/can1-1.png');
    game.load.image('can2', 'assets/Trash_SodaCans.png');
    game.load.image('tunaCan', 'assets/tuna2.png');
    game.load.image('milk-bottle','assets/milk1.png');

    game.load.image('trays','assets/aluminium foil baking trays.png');
    game.load.image('babyformula','assets/baby formula container.png');
    game.load.image('cereal', 'assets/cereal box.png');
    game.load.image('conditioner', 'assets/conditioner.png');
    game.load.image('juice', 'assets/juice bottle.png');
    game.load.image('juiceBox', 'assets/juice box.png');
    game.load.image('mail', 'assets/junk mail.png');
    game.load.image('newspaper', 'assets/newspaper.png');
    game.load.image('notebook', 'assets/notebook.png');
    game.load.image('paper', 'assets/paper.png');
    game.load.image('petfood', 'assets/pet food can.png');
    game.load.image('pizzabox', 'assets/pizza box.png');
    game.load.image('punnet', 'assets/punnet.png');
    game.load.image('spray', 'assets/spray bottle.png');
    game.load.image('yoghurt', 'assets/yoghurt container.png');

    // game.load.image('plastic-box','assets/plastic box.png');




    game.load.image('right-sign', 'assets/right.png');


    for(let i =0 ; i < 100; i++){
      game.load.spritesheet('mosnster' + i, 'assets/monster-idle',{
        frameHeight:32,
        frameWidth:32
      }); 
    }

    game.load.onFileComplete.add(function(progress) {
    progressText.text ='loading' + progress + '%...';
    if(progress == 100) {
      // game.state.start('menu');
      game.state.start('play');
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
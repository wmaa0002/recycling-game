var GameScence = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        CANDY = game.add.group(); 
        APPLE = game.add.group();
        BOTTLE = game.add.group();
        COKE =  game.add.group();

        game.add.sprite(0, 0, 'background');  

        recyclingBin = game.add.sprite(300, 400, 'green-bin');
        recyclingBin.anchor.set(0.5);
        // 使用tween.from，它会从上面运用到中间
        // game.add.tween(recyclingBin).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.physics.enable(recyclingBin, Phaser.Physics.ARCADE);


        candyRed = game.add.sprite(game.world.randomX, game.world.randomY, 'candy-red');
        candyRed.inputEnabled = true;
        candyRed.input.enableDrag( true);

        apple = game.add.sprite(100, 200, 'apple');
        apple.inputEnabled = true;
        apple.input.enableDrag(true);

        waterBottle = game.add.sprite(game.world.randomX, game.world.randomY, 'water-bottle');
        waterBottle.inputEnabled = true;
        waterBottle.input.enableDrag(true);

        coke = game.add.sprite(300, 100, 'coke');
        // 启动输入系统600
        coke.inputEnabled = true;
        // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        coke.input.enableDrag(true);
  
  
        milkBox = game.add.sprite(400, 200, 'milk-box');
  // 启动输入系统600
        milkBox.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        milkBox.input.enableDrag(true);
  

        pizza = game.add.sprite(300, 200, 'pizza');
  // 启动输入系统600
        pizza.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        pizza.input.enableDrag(true);
  
  //屏幕适配
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        text = game.add.text(16, 16, 'drag the item', { fill: '#ffffff' });

    },
    
    update: function () {
        if (this.checkOverlap(recyclingBin, waterBottle)) {
            waterBottle.kill();
            this.showRightSign();
        } 

        if (this.checkOverlap(recyclingBin, milkBox )) {
            milkBox.kill();
            this.showRightSign();
        }

        if (this.checkOverlap(recyclingBin, coke )) {
            coke.kill();
            this.showRightSign();
        }

        if (this.checkOverlap(recyclingBin, candyRed )) {
            candyRed.kill();
            game.state.start('gameover');
        }

        if (this.checkOverlap(recyclingBin, apple )) {
            apple.kill();
            game.state.start('gameover');
        }

        if (this.checkOverlap(recyclingBin, pizza )) {
            pizza.kill();
            game.state.start('gameover');  
        }
    },   
    showRightSign: function () {
        rightSign = game.add.sprite(250, 260, 'right-sign');
        game.time.events.add(1000, function(){game.add.tween(rightSign).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);}, this);
    },

    fadePicture: function () {
        game.add.tween(rightSign).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        // rightSign.kill();
    },

    checkOverlap: function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
   
};
 
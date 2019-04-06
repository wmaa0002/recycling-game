var GameScence = {
    create: function () {
        score = 0;
        var scoreStyle = { font: "bold 20px Arial", fill: "#FFFFFF", boundsAlignH: "center" };
        var scoreSprite = game.add.sprite(10, 10);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        // CANDY = game.add.group(); 
        // APPLE = game.add.group();
        // BOTTLE = game.add.group();
        // COKE =  game.add.group();

        game.add.sprite(0, 0, 'background');  

        recyclingBin = game.add.sprite(0, 0, 'red-bin');
        recyclingBin.anchor.set(0.5)
        recyclingBin.x = recyclingBin.width;
        recyclingBin.y = game.height - recyclingBin.height / 2;
        // recyclingBin.anchor.set(0.5);
        // 使用tween.from，它会从上面运用到中间
        // game.add.tween(recyclingBin).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.physics.enable(recyclingBin, Phaser.Physics.ARCADE);


        candyRed = game.add.sprite(game.world.randomX, game.world.randomY, 'candy-red');
        candyRed.inputEnabled = true;
        candyRed.input.enableDrag( true);

        apple = game.add.sprite(100, 200, 'apple');
        apple.inputEnabled = true;
        apple.input.enableDrag(true);

        egg = game.add.sprite(game.world.randomX, game.world.randomY, 'egg');
  // 启动输入系统600
        egg.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        egg.input.enableDrag(true);

        pizza = game.add.sprite(game.world.randomX, game.world.randomY, 'pizza');
  // 启动输入系统600
        pizza.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        pizza.input.enableDrag(true);

        fishBone = game.add.sprite(game.world.randomX, game.world.randomY, 'fishbone');
  // 启动输入系统600
        fishBone.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        fishBone.input.enableDrag(true);

        banana = game.add.sprite(game.world.randomX, game.world.randomY, 'banana');
        banana.width = 100;
        banana.height = 100;
  // 启动输入系统600
        banana.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        banana.input.enableDrag(true);

        waterBottle = game.add.sprite(game.world.randomX, game.world.randomY, 'water-bottle');
        waterBottle.inputEnabled = true;
        waterBottle.input.enableDrag(true);

        plasticBag = game.add.sprite(game.world.randomX, game.world.randomY, 'plastic-bag');
        plasticBag.inputEnabled = true;
        plasticBag.input.enableDrag(true);

        can = game.add.sprite(game.world.randomX, game.world.randomY, 'can');
        can.width = 50;
        can.height = 50;
        can.inputEnabled = true;
        can.input.enableDrag(true);

        canOne = game.add.sprite(game.world.randomX, game.world.randomY, 'can1');
        canOne.inputEnabled = true;
        canOne.input.enableDrag(true);

        glass = game.add.sprite(game.world.randomX, game.world.randomY, 'glass');
        glass.inputEnabled = true;
        glass.input.enableDrag(true);

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

        rightSign = game.add.sprite(250, 260, 'right-sign');
        // rightSign.alpha = 1;
        rightSign.visible = false;
  

  
  //屏幕适配
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // scoreText = game.add.text(0, 20, this.score, scoreStyle);
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        // text = game.add.text(16, 16, 'drag the item', { fill: '#ffffff' });

    },
    
    update: function () {
        if (this.checkOverlap(recyclingBin, waterBottle)) {
            waterBottle.kill();
            this.scoreUp();
            // this.showRightSign();
        } 

        if (this.checkOverlap(recyclingBin, milkBox )) {
            milkBox.kill();
            this.scoreUp();
            // this.showRightSign();
        }

        if (this.checkOverlap(recyclingBin, coke )) {
            coke.kill();
            this.scoreUp();
            // this.showRightSign();
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

    scoreUp: function() {
        score ++;
        scoreText.text = 'Score: ' + score;
        if(score > 1){
            score = 1;
        }
    },

    // showRightSign: function () {
    //     // var rightSign = game.add.sprite(250, 260, 'right-sign');
    //     // rightSign.alpha = 1;
    //     game.time.events.add(1000, this.fadePicture, this);
    // },

    // fadePicture: function () {
    //     var fade = game.add.tween(this.rightSign).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    //     fade.start();
    // },

    checkOverlap: function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
   
};
 
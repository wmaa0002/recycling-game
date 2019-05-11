var GameScence = {
    create: function () {
        spawnItemTimer = 0;
        score = 0;
        var scoreStyle = { font: "bold 20px Arial", fill: "#FFFFFF", boundsAlignH: "center" };
        var scoreSprite = game.add.sprite(10, 10);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        background = game.add.sprite(0, 0, 'background');
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        // background.width = 1080;
        // background.height = 960;
        // background.width = 800;
        // background.height = 600;

        // sheep = game.add.sprite(600, 500, 'sheep');
        // sheep.width = 150;
        // sheep.height = 65;
        // sheep.anchor.set(0.6);

        // kangaroo = game.add.sprite(400, 500,'kangaroo');
        // kangaroo.width = 65;
        // kangaroo.height =84;
        // kangaroo.anchor.set(0.9);
        // the pause button
        pauseBtn = game.add.button(10, 70, 'btn',this.managePause,this);
        // the continue button
        // continueButtn =  game.add.button(300, 200, 'conbtn', function(){
        //     game.paused = false;

        // });
        // // continueButtn.visible = false;
        // //the restart button
        // restartButton = game.add.button(300, 400, 'restartbtn', function(){

        //     game.paused = false;
        //     // restartButton.kill();
        //     game.state.start('gameover');
        // });
        // // restartButton.visible = false;
        // // game.input.onDown.add(this.unpause(), this);

        recyclable = game.add.group();//可回收的
        recyclable.enableBody = true; // 可触碰
        recyclable.physicsBodyType = Phaser.Physics.ARCADE; 

        unrecyclable = game.add.group();//不可回收的
        unrecyclable.enableBody = true; // 可触碰 
        unrecyclable.physicsBodyType = Phaser.Physics.ARCADE; 

        recyclingBin = game.add.sprite(0, 0, 'red-bin');
        recyclingBin.anchor.setTo(0.5,0.5);
        recyclingBin.width = 130;
        recyclingBin.height = 198;
        recyclingBin.physicsBodyType = Phaser.Physics.ARCADE; 
        recyclingBin.x = recyclingBin.width;
        recyclingBin.y = game.height - recyclingBin.height / 2;

        generalBin = game.add.sprite(0, 0, 'general-bin');
        generalBin.anchor.setTo(0.5,0.5);
        generalBin.width = 130;
        generalBin.height = 198;
        generalBin.physicsBodyType = Phaser.Physics.ARCADE; 
        generalBin.x = generalBin.width+300;
        generalBin.y = game.height - generalBin.height / 2;
        // recyclingBin.anchor.set(0.5);
        // 使用tween.from，它会从上面运用到中间
        // game.add.tween(recyclingBin).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.physics.enable(recyclingBin, Phaser.Physics.ARCADE);


        candyRed = game.add.sprite(0, 0, 'candy-red');
        candyRed.inputEnabled = true;
        candyRed.input.enableDrag( true);

        potato = game.add.sprite(0,0,'potato');
        potato.inputEnabled = true;
        potato.input.enableDrag( true);

        apple = game.add.sprite(0, 0, 'apple');
        apple.inputEnabled = true;
        apple.input.enableDrag(true);

        egg = game.add.sprite(0, 0, 'egg');
        // egg.width = 80;
        // egg.height = 80;
  // 启动输入系统600
        egg.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        egg.input.enableDrag(true);

        pizza = game.add.sprite(0, 0, 'pizza');
        // pizza.width = 100;
        // pizza.hei1 = 99;
  // 启动输入系统600
        pizza.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        pizza.input.enableDrag(true);

        fishBone = game.add.sprite(0, 0, 'fishbone');
  // 启动输入系统600
        fishBone.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        fishBone.input.enableDrag(true);

        banana = game.add.sprite(0, 0, 'banana');
  // 启动输入系统600
        banana.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        banana.input.enableDrag(true);

        plasticBag = game.add.sprite(0, 0, 'plastic-bag');
        plasticBag.inputEnabled = true;
        plasticBag.input.enableDrag(true);

        laptop = game.add.sprite(0, 0, 'laptop');
        laptop.inputEnabled = true;
        laptop.input.enableDrag(true);

        apple.visible = egg.visible = pizza.visible = fishBone.visible = banana.visible = candyRed.visible = plasticBag.visible = laptop.visible = false;//默认不可见的
        apple.alive = egg.alive = pizza.alive = fishBone.alive = banana.alive =  candyRed.alive =  plasticBag.alive = laptop.alive = false;//默认状态是dead
        unrecyclable.add(apple);
        unrecyclable.add(egg);
        unrecyclable.add(pizza);
        unrecyclable.add(fishBone);
        unrecyclable.add(banana);
        unrecyclable.add(candyRed);
        unrecyclable.add(plasticBag);
        unrecyclable.add(laptop);


        tunaCan = game.add.sprite(0, 0, 'tunaCan');
        tunaCan.inputEnabled = true;
        tunaCan.input.enableDrag(true);

        waterBottle = game.add.sprite(0, 0, 'water-bottle');
        waterBottle.inputEnabled = true;
        waterBottle.input.enableDrag(true);

        can = game.add.sprite(0, 0, 'can');
        can.inputEnabled = true;
        can.input.enableDrag(true);

        canOne = game.add.sprite(0, 0, 'can1');
        canOne.inputEnabled = true;
        canOne.input.enableDrag(true);

        canTwo = game.add.sprite(0,0, 'can2');
        canTwo.inputEnabled = true;
        canTwo.input.enableDrag(true);

        glass = game.add.sprite(0, 0, 'glass');
        glass.inputEnabled = true;
        glass.input.enableDrag(true);

        coke = game.add.sprite(0, 0, 'coke-can');
        // coke.width = 100;
        // coke.height = 100;
        // coke.scale.setTo(1,1);
        // 启动输入系统600
        coke.inputEnabled = true;
        // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        coke.input.enableDrag(true);
  
  
        milkBox = game.add.sprite(0, 0, 'milk-box');
        // milkBox.width = 120;
        // milkBox.height = 120;
  // 启动输入系统600
        milkBox.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        milkBox.input.enableDrag(true);
        
        waterBottle.visible = can.visible = canOne.visible = glass.visible = coke.visible = milkBox.visible = tunaCan.visible = canTwo.visible = false;//默认不可见的
        waterBottle.alive = can.alive = canOne.alive = glass.alive = coke.alive = milkBox.alive = tunaCan.alive = canTwo.alive = false;//默认状态是dead

        recyclable.add(waterBottle);

        recyclable.add(can);
        recyclable.add(canOne);
        recyclable.add(canTwo);
        recyclable.add(glass);
        recyclable.add(coke);
        recyclable.add(milkBox);
        recyclable.add(tunaCan);

        var recyclableItems;

        var unrecyclableItems; 
  
  //屏幕适配
        // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // scoreText = game.add.text(0, 20, this.score, scoreStyle);
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        CongratulationsText = game.add.text(game.width/2, game.height/2, '', { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" });
        fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        // stateText = game.add.text(game.width/2, game.height/2-100, ' ', { font: "65px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 5, align: "center" });
        // stateText.visible = false;
        // stateText.text = " Oops, it seems like \n the non-recyclable item was \n put into the bin!";

        // CongratulationText.visible = false;
        // text = game.add.text(16, 16, 'drag the item', { fill: '#ffffff' });

    },
    
    update: function () {
        spawnItemTimer += game.time.elapsed;
        // if spawn timer reach one second (1000 miliseconds)
        if(spawnItemTimer > 1500) {
            // reset it
            spawnItemTimer = 0;
            // and spawn new candy
            this.spawnItem();
        }

        // this.unpause();

        
        this.successGame();
    },   

    spawnItem: function(){
    // calculate drop position (from 0 to game width) on the x axis
    var position = Math.floor(Math.random()*(game.width-50));
    // define the offset for every item
    var dropOffset = [27,36,50,38,48, 56];
    // randomize item type
    var itemType = Math.floor(Math.random()*7);
    // channingbreeze says: use object pool
    var item = recyclable.getRandom();
    var item1 = unrecyclable.getRandom();
    if(item.alive == true) { // 本身是dead的，现在如果是活得
      // recyclable.forEachAlive(function(){this.kill();},this);
      if (item1.alive == false){
        item1.reset(position, dropOffset[itemType]);
        // item1.reset(position);
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,recyclingBin,function(){item1.kill();game.state.start('gameover');},null,this);}, this);
    } else {
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,recyclingBin,function(){item1.kill();game.state.start('gameover');},null,this);}, this);
    }
    
    } else {
        item.reset(position, dropOffset[itemType]);
        // item.reset(position);
        // item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,recyclingBin,this.scoreUp,null,this);}, this);
        item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,recyclingBin,function(){item.kill();score += 1;
        scoreText.text = 'Score: ' + score;},null,this);}, this);
    }
    },
    // when the score higher than 40, stop the game and appear the text.
    successGame: function(){
        if (score >= 40 ){
            CongratulationsText.text = "Congratulations!!! \n You have successfully \n sorted all recyclable \n Click to restart";
            CongratulationsText.anchor.setTo(0.5, 0.5);
            CongratulationsText.visible = true;
            game.input.onTap.addOnce(function () {
            game.state.start('play');});
             }
    },
    // randomNum: function(Min,Max){
    //         var Range = Max - Min;
    //         var Rand = Math.random();   
    //         var num = Min + Math.round(Rand * Range);
    //         return num;
    // },

    pause: function(){
        
        pauseBtn.visible = false;
        // game.stage.backgroundColor = '#337799';

    },
    managePause: function(){
    // pause the game
    game.paused = true;
    // add proper informational text
    var pausedText = game.add.text(game.width/2, game.height/2, "Game paused.\nTap anywhere to continue.", fontStyle);
    pausedText.anchor.setTo(0.5, 0.5);

    // set event listener for the user's click/tap the screen
    // channingbreeze says: this is a bug for origin source, if use add, every time you click will run this function
    //this.input.onDown.add(function(){
    game.input.onDown.addOnce(function(){
      // remove the pause text
      pausedText.destroy();
      // unpause the game
      game.paused = false;
    }, this);
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

    // checkOverlap: function (spriteA, spriteB) {
    //     var boundsA = spriteA.getBounds();
    //     var boundsB = spriteB.getBounds();
    //     return Phaser.Rectangle.intersects(boundsA, boundsB);
    // }
   
};
 
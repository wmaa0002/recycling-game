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

        restartBtn = game.add.button(game.width/2+50, game.height/2+220,'restartbtn',this.Restart,this)
        restartBtn.scale.setTo(0.2);
        restartBtn.visible = false;

        tipsBtn = game.add.button(game.width/2-200, game.height/2+200,'tipsbtn',this.Tips,this)
        tipsBtn.scale.setTo(1);
        tipsBtn.visible = false;
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
        game.physics.enable(generalBin, Phaser.Physics.ARCADE);


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

        ball = game.add.sprite(0, 0, 'ball');
        ball.inputEnabled = true;
        ball.input.enableDrag(true);

        clothes = game.add.sprite(0, 0, 'clothes');
        clothes.inputEnabled = true;
        clothes.input.enableDrag(true);

        light = game.add.sprite(0, 0, 'light');
        light.inputEnabled = true;
        light.input.enableDrag(true);

        mirror = game.add.sprite(0, 0, 'mirror');
        mirror.inputEnabled = true;
        mirror.input.enableDrag(true);

        nappies = game.add.sprite(0, 0, 'nappies');
        nappies.inputEnabled = true;
        nappies.input.enableDrag(true);

        over = game.add.sprite(0, 0, 'over');
        over.inputEnabled = true;
        over.input.enableDrag(true);

        pant = game.add.sprite(0, 0, 'pant');
        pant.inputEnabled = true;
        pant.input.enableDrag(true);

        plasticPaper = game.add.sprite(0, 0, 'plasticPaper');
        plasticPaper.inputEnabled = true;
        plasticPaper.input.enableDrag(true);

        rockingHorse = game.add.sprite(0, 0, 'rocking-horse');
        rockingHorse.inputEnabled = true;
        rockingHorse.input.enableDrag(true);

        rubiksCube = game.add.sprite(0, 0, 'rubiks-cube');
        rubiksCube.inputEnabled = true;
        rubiksCube.input.enableDrag(true);

        shoes = game.add.sprite(0, 0, 'shoes');
        shoes.inputEnabled = true;
        shoes.input.enableDrag(true);

        watermelon = game.add.sprite(0, 0, 'watermelon');
        watermelon.inputEnabled = true;
        watermelon.input.enableDrag(true);
        // laptop = game.add.sprite(0, 0, 'laptop');
        // laptop.inputEnabled = true;
        // laptop.input.enableDrag(true);

        apple.visible = egg.visible = pizza.visible = fishBone.visible = banana.visible = candyRed.visible = plasticBag.visible = potato.visible = false;//默认不可见的
        apple.alive = egg.alive = pizza.alive = fishBone.alive = banana.alive =  candyRed.alive =  plasticBag.alive =  potato.alive= false;//默认状态是dead
        
        ball.visible = clothes.visible = light.visible = mirror.visible = nappies.visible = over.visible = pant.visible = false;
        ball.alive = clothes.alive = light.alive = mirror.alive = nappies.alive = over.alive = pant.alive=false;

        plasticPaper.visible = rockingHorse.visible = rubiksCube.visible =shoes.visible = watermelon.visible =false;
        plasticPaper.alive = rockingHorse.alive = rubiksCube.alive = shoes.alive = watermelon.alive =false;

        unrecyclable.add(apple);
        unrecyclable.add(egg);
        unrecyclable.add(pizza);
        unrecyclable.add(fishBone);
        unrecyclable.add(banana);
        unrecyclable.add(candyRed);
        unrecyclable.add(plasticBag);
        // unrecyclable.add(laptop);
        unrecyclable.add(potato);
        unrecyclable.add(ball);
        unrecyclable.add(clothes);
        unrecyclable.add(light);
        unrecyclable.add(mirror);
        unrecyclable.add(nappies);
        unrecyclable.add(over);
        unrecyclable.add(pant);
        unrecyclable.add(plasticPaper);
        unrecyclable.add(rockingHorse);
        unrecyclable.add(rubiksCube);
        unrecyclable.add(shoes);
        unrecyclable.add(watermelon);

        tunaCan = game.add.sprite(0, 0, 'tunaCan');
        tunaCan.inputEnabled = true;
        tunaCan.input.enableDrag(true);

        milkBottle = game.add.sprite(0, 0, 'milk-bottle');
        milkBottle.inputEnabled = true;
        milkBottle.input.enableDrag(true);

        waterBottle = game.add.sprite(0, 0, 'water-bottle');
        waterBottle.inputEnabled = true;
        waterBottle.input.enableDrag(true);

        // can = game.add.sprite(0, 0, 'can');
        // can.inputEnabled = true;
        // can.input.enableDrag(true);

        // canOne = game.add.sprite(0, 0, 'can1');
        // canOne.inputEnabled = true;
        // canOne.input.enableDrag(true);

        canTwo = game.add.sprite(0,0, 'can2');
        canTwo.inputEnabled = true;
        canTwo.input.enableDrag(true);

        glass = game.add.sprite(0, 0, 'glass');
        glass.inputEnabled = true;
        glass.input.enableDrag(true);

        // coke = game.add.sprite(0, 0, 'coke-can');
        // // coke.width = 100;
        // // coke.height = 100;
        // // coke.scale.setTo(1,1);
        // // 启动输入系统600
        // coke.inputEnabled = true;
        // // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        // coke.input.enableDrag(true);
  
  
        milkBox = game.add.sprite(0, 0, 'milk-box');
        // milkBox.width = 120;
        // milkBox.height = 120;
  // 启动输入系统600
        milkBox.inputEnabled = true;
  // 允许拖拽，第一个参数true代表拖拽的时候鼠标位于精灵中心
        milkBox.input.enableDrag(true);

        trays = game.add.sprite(0, 0, 'trays');
        trays.inputEnabled = true;
        trays.input.enableDrag(true);

        babyformula = game.add.sprite(0, 0, 'babyformula');
        babyformula.inputEnabled = true;
        babyformula.input.enableDrag(true);

        cereal = game.add.sprite(0, 0, 'cereal');
        cereal.inputEnabled = true;
        cereal.input.enableDrag(true);

        conditioner = game.add.sprite(0, 0, 'conditioner');
        conditioner.inputEnabled = true;
        conditioner.input.enableDrag(true);
        
        juice = game.add.sprite(0, 0, 'juice');
        juice.inputEnabled = true;
        juice.input.enableDrag(true);

        juiceBox = game.add.sprite(0, 0, 'juiceBox');
        juiceBox.inputEnabled = true;
        juiceBox.input.enableDrag(true);

        mail = game.add.sprite(0, 0, 'mail');
        mail.inputEnabled = true;
        mail.input.enableDrag(true);

        newspaper = game.add.sprite(0, 0, 'newspaper');
        newspaper.inputEnabled = true;
        newspaper.input.enableDrag(true);

        notebook = game.add.sprite(0, 0, 'notebook');
        notebook.inputEnabled = true;
        notebook.input.enableDrag(true);

        paper = game.add.sprite(0, 0, 'paper');
        paper.inputEnabled = true;
        paper.input.enableDrag(true);

        petfood = game.add.sprite(0, 0, 'petfood');
        petfood.inputEnabled = true;
        petfood.input.enableDrag(true);

        pizzabox = game.add.sprite(0, 0, 'pizzabox');
        pizzabox.inputEnabled = true;
        pizzabox.input.enableDrag(true);

        punnet = game.add.sprite(0, 0, 'punnet');
        punnet.inputEnabled = true;
        punnet.input.enableDrag(true);

        spray = game.add.sprite(0, 0, 'spray');
        spray.inputEnabled = true;
        spray.input.enableDrag(true);

        yoghurt = game.add.sprite(0, 0, 'yoghurt');
        yoghurt.inputEnabled = true;
        yoghurt.input.enableDrag(true);

        waterBottle.visible = glass.visible = milkBox.visible = tunaCan.visible = canTwo.visible = milkBottle.visible = false;//默认不可见的
        waterBottle.alive = glass.alive = milkBox.alive = tunaCan.alive = canTwo.alive =  milkBottle.alive = false;//默认状态是dead

        trays.visible = babyformula.visible = cereal.visible = conditioner.visible = juice.visible = juiceBox.visible =false;
        trays.alive = babyformula.alive = cereal.alive =  conditioner.alive = juice.alive = juiceBox.alive = false;

        mail.visible = newspaper.visible = notebook.visible = paper.visible = petfood.visible = pizzabox.visible = punnet.visible = false;
        mail.alive = newspaper.alive = notebook.alive = paper.alive = petfood.alive = pizzabox.alive = punnet.alive = false;

        spray.visible = yoghurt.visible = false;
        spray.alive = yoghurt.alive = false;
        // placticBox.visible = false;
        // placticBox.alive = false;

        recyclable.add(waterBottle);
        recyclable.add(canTwo);
        recyclable.add(glass);
        recyclable.add(milkBox);
        recyclable.add(tunaCan);
        recyclable.add(trays);
        recyclable.add(milkBottle);
        recyclable.add(babyformula);
        recyclable.add(cereal);
        recyclable.add(conditioner);
        recyclable.add(juice);
        recyclable.add(juiceBox);
        recyclable.add(mail);
        recyclable.add(newspaper);
        recyclable.add(notebook);
        recyclable.add(paper);
        recyclable.add(petfood);
        recyclable.add(pizzabox);
        // recyclable.add(punnet);
        recyclable.add(spray);
        recyclable.add(yoghurt);


        var recyclableItems;

        var unrecyclableItems; 
  
  //屏幕适配
        // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // scoreText = game.add.text(0, 20, this.score, scoreStyle);
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        CongratulationsText = game.add.text(game.width/2, game.height/2+150, '', { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" });
        fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        // stateText = game.add.text(game.width/2, game.height/2-100, ' ', { font: "65px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 5, align: "center" });
        // stateText.visible = false;
        // stateText.text = " Oops, it seems like \n the non-recyclable item was \n put into the bin!";
        congratulations = game.add.sprite(game.width/2, game.height/2-60, 'congratulations');
        congratulations.anchor.setTo(0.5, 0.5);
        congratulations.visible = false;
        // CongratulationText.visible = false;
        // text = game.add.text(16, 16, 'drag the item', { fill: '#ffffff' });
        tips = game.add.sprite(game.width/2, game.height/2-100,'tips');
        tips.anchor.setTo(0.5, 0.5);
        tips.visible = false;

    },
    
    update: function () {
        spawnItemTimer += game.time.elapsed;
        // if spawn timer reach one second (1000 miliseconds)
        if(spawnItemTimer > 2500) {
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
      //如果可回收的进了general的话，就游戏结束。
      // item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,generalBin,function(){item.kill();game.state.start('gameover');},null,this);}, this);
      if (item1.alive == false){
        item1.reset(position, dropOffset[itemType]);
        // item1.reset(position);
        //如果不可回收的item进了recycle bin就kill他们，并结束游戏。
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,recyclingBin,function(){item1.kill();game.state.start('gameover');},null,this);}, this);
        //如果不可回收的item进了general bin就加分。
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,generalBin,function(){item1.kill();score += 1;
        scoreText.text = 'Score: ' + score;},null,this);}, this);
        } else {
        //如果不可回收的item进了recycle bin就kill他们，并结束游戏。
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,recyclingBin,function(){item1.kill();game.state.start('gameover');},null,this);}, this);
         //如果不可回收的item进了general bin就加分。
        item1.events.onDragStop.add(function(){game.physics.arcade.overlap(item1,generalBin,function(){item1.kill();score += 1;
        scoreText.text = 'Score: ' + score;},null,this);}, this);
        }  
    } else {
        item.reset(position, dropOffset[itemType]);
        // item.reset(position);
        // item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,recyclingBin,this.scoreUp,null,this);}, this);
        item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,recyclingBin,function(){item.kill();score += 1;
        scoreText.text = 'Score: ' + score;},null,this);}, this);
        //如果可回收的进了general的话，就游戏结束。
        item.events.onDragStop.add(function(){game.physics.arcade.overlap(item,generalBin,function(){item.kill();game.state.start('gameover');},null,this);}, this);
    }
    },
    // when the score higher than 40, stop the game and appear the text.
    successGame: function(){
        if (score >= 60 ){
            game.paused = true;
            // restartBtn.visible = true;
        
            congratulations.visible = true;
            // CongratulationsText.text = "Congratulations!!! \n You have successfully \n sorted all recyclable \n Click to restart";
            CongratulationsText.text = "You finish the game \n Click to restart";
            CongratulationsText.anchor.setTo(0.5, 0.5);
            CongratulationsText.visible = true;
            game.input.onTap.addOnce(function () {
            game.paused = false;
            game.state.start('play');},this);
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
 
var GameOverScence = {
    create: function () {
        // game.stage.backgroundColor = '#6688ee'
        background = game.add.sprite(0, 0, 'gameoverBackground');
        // earth = game.add.sprite(game.width/2, game.height/2, 'earth');
        // earth.anchor.setTo(0.5, 0.5);
        earth = game.add.sprite(game.width/2+350, game.height/2-50, 'earth');
        
        tips1 = game.add.sprite(game.width/2, game.height/2-100,'tips1');
        tips1.anchor.setTo(0.5, 0.5);
        tips1.scale.setTo(0.7);
        tips1.visible = false;

        tips2 = game.add.sprite(game.width/2, game.height/2-100,'tips2');
        tips2.anchor.setTo(0.5, 0.5);
        tips2.scale.setTo(0.7);
        tips2.visible = false;


        // var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#F2F2F2'});
        var gameoverLabel = stateText = game.add.text(game.width/2, game.height/2-100, ' ', { font: "65px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 5, align: "center" });
        stateText.addColor('#ffff00', 26);
        stateText.addColor('#ffffff', 42);

        // stateText.addColor('#ff00ff', 28);
        // stateText.addColor('#ffffff', 32);

        stateText.anchor.setTo(0.5, 0.5);
        recycleBtn = game.add.button(game.width/2-270, game.height/2+200,'red-bin',this.RecycleTips,this)
        recycleBtn.scale.setTo(0.4);

        restartBtn = game.add.button(game.width/2-70, game.height/2+220,'restartbtn',this.Restart,this)
        restartBtn.scale.setTo(0.2);

        generalBtn = game.add.button(game.width/2+120, game.height/2+200,'general-bin',this.GeneralTips,this)
        generalBtn.scale.setTo(0.4);
    },

    update: function () {
        stateText.text = " Oops, it seems like \n the incorrect item \n was put into the \n recycle/general bin! \n Try again or see tips";
        stateText.visible = true;

        // //the "click to restart" handler
        // game.input.onTap.addOnce(function () {
        // game.state.start('play');});

    },

    RecycleTips: function(){
        game.paused = true;
        // tips1.visible = true;
        tips2.visible = true;
        stateText.visible = false;
        game.input.onDown.addOnce(function(){
        // remove the pause text
        // tips1.kill();
        tips2.kill();
        // unpause the game
        game.paused = false;
        }, this);
    },


    GeneralTips: function(){
        game.paused = true;
        tips1.visible = true;
        // tips2.visible = true;
        stateText.visible = false;
        game.input.onDown.addOnce(function(){
        // remove the pause text
        tips1.kill();
        // tips2.kill();
        // unpause the game
        game.paused = false;
        }, this);
    },


    Restart: function(){
        game.state.start('play');
    },

};
 
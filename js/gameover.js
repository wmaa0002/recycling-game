var GameOverScence = {
    create: function () {
        // game.stage.backgroundColor = '#6688ee'
        background = game.add.sprite(0, 0, 'gameoverBackground');
        // earth = game.add.sprite(game.width/2, game.height/2, 'earth');
        // earth.anchor.setTo(0.5, 0.5);
        earth = game.add.sprite(game.width/2+350, game.height/2-50, 'earth');
        
        tips = game.add.sprite(game.width/2, game.height/2-100,'tips');
        tips.anchor.setTo(0.5, 0.5);
        tips.visible = false;
        // var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#F2F2F2'});
        var gameoverLabel = stateText = game.add.text(game.width/2, game.height/2-100, ' ', { font: "65px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 5, align: "center" });
        stateText.addColor('#ffff00', 26);
        stateText.addColor('#ffffff', 45);

        // stateText.addColor('#ff00ff', 28);
        // stateText.addColor('#ffffff', 32);

        stateText.anchor.setTo(0.5, 0.5);
        tipsBtn = game.add.button(game.width/2-200, game.height/2+200,'tipsbtn',this.Tips,this)
        tipsBtn.scale.setTo(1);
        restartBtn = game.add.button(game.width/2+50, game.height/2+220,'restartbtn',this.Restart,this)
        restartBtn.scale.setTo(0.2);
    },

    update: function () {
        stateText.text = " Oops, it seems like \n the non-recyclable item was \n put into the bin! \n Try again or see tips";
        stateText.visible = true;

        // //the "click to restart" handler
        // game.input.onTap.addOnce(function () {
        // game.state.start('play');});

    },

    Tips: function(){
        game.paused = true;
        tips.visible = true;
        stateText.visible = false;
        game.input.onDown.addOnce(function(){
        // remove the pause text
        tips.kill();
        // unpause the game
        game.paused = false;
        }, this);
    },

    Restart: function(){
        game.state.start('play');
    },

};
 
var GameOverScence = {
    create: function () {

        var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#F2F2F2'});
        stateText.anchor.setTo(1.1, 0.2);

    },

    update: function () {
        stateText.text = " GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(function () {
        game.state.start('game');});
        }
};
 
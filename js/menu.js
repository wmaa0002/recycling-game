game.States.menu = function(){
    this.create = function(){
        game.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(-10,0); //背景图
        game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //地板
        var titleGroup = game.add.group(); //创建存放标题的组
        titleGroup.create(0,0,'title'); //标题
        var bird = titleGroup.create(190, 10, 'bird'); //添加bird到组里
        bird.animations.add('fly'); //添加动画
        bird.animations.play('fly',12,true); //播放动画
        titleGroup.x = 35;
        titleGroup.y = 100;
        game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //标题的补间动画
        var btn = game.add.button(game.width/2,game.height/2,'btn',function(){//按钮
            game.state.start('play');
        });
        btn.anchor.setTo(0.5,0.5);
    }
}
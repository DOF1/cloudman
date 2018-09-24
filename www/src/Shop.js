Ball.Shop = function(game) {
};
Ball.Shop.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		this.startButton = this.add.button(Ball._WIDTH*0.8, 460, 'button-start', this.exitGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.scale.setTo(1.1);
		this.startButton.input.useHandCursor = true;
		highscore = localStorage.highscore;
		if(!highscore){
			highscore = "0";
		}
		text2 = this.add.bitmapText(228, 5, 'myfont', highscore, 40);
	},
	exitGame: function() {
		this.game.state.start('MainMenu');
	}
};
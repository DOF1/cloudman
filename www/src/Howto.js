Ball.Howto = function(game) {
};
Ball.Howto.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-howtoplay');
		this.startButton = this.add.button(Ball._WIDTH*0.8, 460, 'button-start', this.exitGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.scale.setTo(1.1);
		this.startButton.input.useHandCursor = true;
	},
	exitGame: function() {
		this.game.state.start('MainMenu');
	}
};
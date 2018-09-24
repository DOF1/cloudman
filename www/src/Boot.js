var Ball = {
	_WIDTH: 320,
	_HEIGHT: 534
};
Ball.Boot = function(game) {};
Ball.Boot.prototype = {
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = false;
		this.game.state.start('Preloader');
		this.game.stage.backgroundColor = "##2F8CCD";
	}
};
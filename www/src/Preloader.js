Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.load.spritesheet('player', 'img/playersheet.png', 16, 16,72);
		this.load.image('particle','img/particle.png')
		this.load.image('particle2','img/particle2.png')
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('screen-shop', 'img/screen-shop.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('platform', 'img/plat.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		
		this.load.spritesheet('coin', 'img/coin.png',16,16);
		this.load.spritesheet('selec', 'img/selection.png', 100, 100);
		this.load.spritesheet('button-start', 'img/button-start.png', 100, 51);
		this.load.spritesheet('button-shop', 'img/button-shop.png', 100, 51);
		this.load.spritesheet('button-settings', 'img/button-settings.png', 100, 51);
		this.load.spritesheet('button-exit', 'img/button-exit.png', 100, 51);

	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
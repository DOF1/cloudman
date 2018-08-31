Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((Ball._WIDTH-297)*0.5, (Ball._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((Ball._WIDTH-158)*0.5, (Ball._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.spritesheet('player', 'img/playersheet.png', 16, 24,13);
		this.load.image('coin', 'img/coin.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');
		this.load.image('platform', 'img/plat.png');
		this.load.bitmapFont('myfont', 'font/font.png', 'font/font.fnt');

		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
		this.load.spritesheet('button-shop', 'img/button-shop.png', 146, 51);
		this.load.spritesheet('button-settings', 'img/button-settings.png', 146, 51);
		this.load.spritesheet('button-exit', 'img/button-exit.png', 146, 51);

		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
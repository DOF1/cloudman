Ball.MainMenu = function(game) {};
Ball.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.gameTitle = this.add.sprite(Ball._WIDTH*0.5, 20, 'title');
		this.gameTitle.anchor.set(0.5,0);
		this.gameTitle.scale.setTo(1.5);
		this.startButton = this.add.button(Ball._WIDTH*0.5, 180, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.scale.setTo(1.1);
		this.shopButton = this.add.button(Ball._WIDTH*0.5,320 , 'button-shop', this.shop, this, 2, 0, 1);
		this.shopButton.anchor.set(0.5,0);
		this.shopButton.scale.setTo(1.1);
		this.settingsButton = this.add.button(Ball._WIDTH*0.5,390, 'button-settings', this.settings, this, 2, 0, 1);
		this.settingsButton.anchor.set(0.5,0);
		this.settingsButton.scale.setTo(1.1);
		this.howToButton = this.add.button(Ball._WIDTH*0.5,250 , 'button-exit', this.howTo, this, 2, 0, 1);
		this.howToButton.anchor.set(0.5,0);
		this.howToButton.scale.setTo(1.1);
		this.startButton.input.useHandCursor = true;
		this.shopButton.input.useHandCursor = true;
		this.settingsButton.input.useHandCursor = true;
		this.howToButton.input.useHandCursor = true;
		highscore = localStorage.highscore;
		skin = localStorage.skin;
		if(!highscore){
			highscore = "0";
		}
		if(!skin){
			skin = 1;
		}
		text2 = this.add.bitmapText(228, 475, 'myfont', highscore, 40);

		this.physics.startSystem(Phaser.Physics.ARCADE);
		player = this.add.sprite(0, 450, 'player');
		player.smoothed = false;
		this.physics.arcade.enable(player);
		player.scale.setTo(1.5);
		player.body.allowGravity = false;
		player.body.immovable = true;
		player.body.velocity.x = 200;
		player.body.bounce.set(1);
		player.body.collideWorldBounds = true;
		mult = (skin-1)*12;
		right = player.animations.add('right', [0+mult,1+mult,2+mult,3+mult,4+mult,5+mult], 13, true);
		left = player.animations.add('left', [6+mult,7+mult,8+mult,9+mult,10+mult,11+mult], 13, true);
		player.play('right');
		//var banner = Cocoon.Ad.AdMob.createBanner("ca-app-pub-3940256099942544/6300978111");
	},
	startGame: function() {
		this.game.state.start('Game');
	},
	shop: function() {
		this.game.state.start('Shop');
	},
	howTo: function() {
		this.game.state.start('Howto');
	},
	settings: function() {
		localStorage.clear();
		this.game.state.start('Settings');
	},
	update: function() {
		if (player.body.blocked.right === true)
		{
			player.play('left');
		}
		else if (player.body.blocked.left === true)
		{
			player.play('right');
		}
	}
};
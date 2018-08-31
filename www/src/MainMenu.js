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
		this.shopButton = this.add.button(Ball._WIDTH*0.5, 250, 'button-shop', this.WIP, this, 2, 0, 1);
		this.shopButton.anchor.set(0.5,0);
		this.shopButton.scale.setTo(1.1);
		this.settingsButton = this.add.button(Ball._WIDTH*0.5,320, 'button-settings', this.settings, this, 2, 0, 1);
		this.settingsButton.anchor.set(0.5,0);
		this.settingsButton.scale.setTo(1.1);
		this.exitButton = this.add.button(Ball._WIDTH*0.5, 390, 'button-exit', this.exitGame, this, 2, 0, 1);
		this.exitButton.anchor.set(0.5,0);
		this.exitButton.scale.setTo(1.1);
		this.startButton.input.useHandCursor = true;
		this.shopButton.input.useHandCursor = true;
		this.settingsButton.input.useHandCursor = true;
		this.exitButton.input.useHandCursor = true;

		// button to "read the article"
	},
	startGame: function() {
		this.game.state.start('Howto');
	},
	WIP: function() {
		alert('WIP');
	},
	exitGame: function() {
		if (confirm("Exit Cloud Man?")){
			if (navigator.app) {
				navigator.app.exitApp();
			}
			else if (navigator.device) {
				navigator.device.exitApp();
			}
			else {
				window.close();
			}
		}
	},
	settings: function() {
		alert('WIP');
	}
};
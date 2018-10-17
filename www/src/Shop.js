Ball.Shop = function(game) {
};
Ball.Shop.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-shop');
		this.startButton = this.add.button(Ball._WIDTH*0.8, 460, 'button-start', this.exitGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.scale.setTo(1.1);
		this.startButton.input.useHandCursor = true;
		pieces = localStorage.pieces;
		skin = localStorage.skin;
		if(!pieces){
			pieces = "0";
		}
		if(!skin){
			skin = 1;
		}
		text2 = this.add.bitmapText(228, 5, 'myfont', pieces, 40);
		boutton = this.add.group();
		
		this.skin1 = this.add.button(40, 60, 'selec', this.selection, this, 2, 0, 1);
		player1 = this.add.sprite(70, 80, 'player');
		player1.scale.setTo(2.5);
		player1.smoothed = false;
		text1 = this.add.bitmapText(80, 129, 'myfont', "0", 30);
		player1.animations.add('right', [0,1,2,3,4,5], 13, true);
		player1.play('right');
		boutton.add(this.skin1);

		text2 = this.add.bitmapText(215, 129, 'myfont', "50", 30);
		if(pieces>=50){
			this.skin2 = this.add.button(180, 60, 'selec', this.selection, this, 2, 0, 1);
			player2 = this.add.sprite(210, 80, 'player');
			player2.scale.setTo(2.5);
			player2.smoothed = false;
			player2.animations.add('right', [12,13,14,15,16,17], 13, true);
			player2.play('right');
			boutton.add(this.skin2);
		}
		
		text3 = this.add.bitmapText(65, 269, 'myfont', "100", 30);
		if(pieces>=100){
			this.skin3 = this.add.button(40, 200, 'selec', this.selection, this, 2, 0, 1);
			player3 = this.add.sprite(70, 220, 'player');
			player3.scale.setTo(2.5);
			player3.smoothed = false;
			player3.animations.add('right', [24,25,26,27,28,29], 13, true);
			player3.play('right');
			boutton.add(this.skin3);
		}
		
		text4 = this.add.bitmapText(205, 269, 'myfont', "150", 30);
		if(pieces>=150){		
			this.skin4 = this.add.button(180, 200, 'selec', this.selection, this, 2, 0, 1);
			player4 = this.add.sprite(210, 220, 'player');
			player4.scale.setTo(2.5);
			player4.smoothed = false;
			player4.animations.add('right', [36,37,38,39,40,41], 13, true);
			player4.play('right');
			boutton.add(this.skin4);
		}
		
		text5 = this.add.bitmapText(65, 409, 'myfont', "200", 30);
		if(pieces>=200){		
			this.skin5 = this.add.button(40, 340, 'selec', this.selection, this, 2, 0, 1);
			player5 = this.add.sprite(70, 360, 'player');
			player5.scale.setTo(2.5);
			player5.smoothed = false;
			player5.animations.add('right', [48,49,50,51,52,53], 13, true);
			player5.play('right');
			boutton.add(this.skin5);
		}
		
		text6 = this.add.bitmapText(205, 409, 'myfont', "250", 30);
		if(pieces>=250){		
			this.skin6 = this.add.button(180, 340, 'selec', this.selection, this, 2, 0, 1);
			player6 = this.add.sprite(210, 360, 'player');
			player6.scale.setTo(2.5);
			player6.smoothed = false;
			player6.animations.add('right', [60,61,62,63,64,65], 13, true);
			player6.play('right');
			boutton.add(this.skin6);
		}
		boutton.children[skin-1].tint = 0x308cce;
	},
	exitGame: function() {
		this.game.state.start('MainMenu');
	},
	selection: function(bout) {
		boutton.setAll('tint', 0xffffff);
		bout.tint = 0x308cce;
		localStorage.skin = bout.z;
	}
};
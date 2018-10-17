Ball.Game = function(game) {};
Ball.Game.prototype = {
	preload: function() {
		this.load.image('screen-bg', 'img/screen-bg.png');
	},
	create: function() {
		//this.add.sprite(0, 0, 'screen-bg');
		background = this.add.tileSprite(0, 0, 320, 534, "screen-bg");
		pan = this.add.sprite(0, 0, 'panel');
		this.physics.arcade.enable(pan);
		pan.body.allowGravity = false;
		pan.body.immovable = true;
		this.game.time.advancedTiming = true;
		vel=250;
		dir = true;
		score = 0;
		lock = 1;
		lock22 = 1;
		lock21 = 0;
		coin1x = 10+this.getRandomInt(148);
		coin1y = 70+this.getRandomInt(200);
		coin2x = 158+this.getRandomInt(148);
		coin2y = 70+this.getRandomInt(200);
		rec1 = this.game.add.graphics(0,0);
		rec1.beginFill(0xffffff);
		rec1.drawRect(0, 0, 160, 534);
		rec1.alpha = 0;
		rec2 = this.game.add.graphics(0,0);
		rec2.beginFill(0xffffff);
		rec2.drawRect(160, 0, 160, 534);
		rec2.alpha = 0.1;
		//localStorage.clear();
		highscore = localStorage.highscore;
		skin = localStorage.skin;
		pieces = parseInt(localStorage.pieces);
		if(!highscore){
			highscore = "0";
		}
		if(!skin){
			skin = 1;
		}
		if(!pieces){
			pieces = 0;
			text3 = this.add.bitmapText(230, 30, 'myfont', '0', 30);
		}
		else{
			text3 = this.add.bitmapText(230, 30, 'myfont', localStorage.pieces, 30);
		}
		text = this.add.bitmapText(5, 5, 'myfont', '0', 60);
		text2 = this.add.bitmapText(230, 1, 'myfont', highscore, 32);
		best = this.add.text(10, 60, ' ');
		best.scale.setTo(0.5);
		text3.tint = 0xaf9e00;
		coin2 = this.add.sprite(183, 30, 'coin');
		coin2.scale.setTo(1.5);;
		coin2.animations.add('turn2', [0,1,2,3,4,5], 9, true);
		coin2.play('turn2');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.time.desiredFps = 70;
		this.physics.arcade.gravity.y = 700;
		
		coin = this.add.sprite(168+this.getRandomInt(168), 70+this.getRandomInt(200), 'coin');
		this.physics.arcade.enable(coin);
		coin.body.allowGravity = false;
		coin.inputEnabled = true;
		coin.events.onInputDown.add(this.onCollision, this);
		coin.animations.add('turn', [0,1,2,3,4,5], 9, true);
		coin.play('turn');
		
		player = this.add.sprite(10, 0, 'player');
		mult = (skin-1)*12;
		right = player.animations.add('right', [0+mult,1+mult,2+mult,3+mult,4+mult,5+mult], 13, true);
		left = player.animations.add('left', [6+mult,7+mult,8+mult,9+mult,10+mult,11+mult], 13, true);
		jumpright = player.animations.add('jumpright', [1+mult], 13, true);
		jumpleft = player.animations.add('jumpleft', [7+mult], 13, true);
		player.smoothed = false;
		player.scale.set(1.5);
		fire = 1;
		
		this.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		player.body.collideWorldBounds = true;
		
		cursors = this.input.keyboard.createCursorKeys();
		player.body.velocity.x = -300;
		
		platforms = this.add.group();
		ledge = platforms.create(0, 52, 'platform');
		this.physics.arcade.enable(ledge);
		ledge.body.allowGravity = false;
		ledge.body.immovable = true;
		ledge.body.velocity.y = 75;
		this.attenteCreatePlat(1500);
		rec1.inputEnabled = true;
		rec1.events.onInputDown.add(this.listener1, this);
		rec2.inputEnabled = true;
		rec2.events.onInputDown.add(this.listener2, this);
		
		emitter = this.game.add.emitter(0, 0, 100);
		emitter.makeParticles('particle');
		emitter.gravity = 200;
		emitter2 = this.game.add.emitter(0, 0, 100);
		emitter2.makeParticles('particle2');
		emitter2.gravity = 200;

	},
	listener1: function() {
		if(player.body.touching.down && player.x >168){
			player.body.velocity.y = -327 ;
			lock = 0;
			if(vel == -250){
				player.play('jumpleft');
			}
		}
	},
	listener2: function() {
		if(player.body.touching.down && player.x <=168){
			player.body.velocity.y = -327 ;
			lock = 0;
			if(vel == 250){
				player.play('jumpright');
			}
		}
	},
	createPlat: function() {
		if(dir == true){
			ledge = platforms.create(200+this.getRandomInt(50), 52, 'platform');
			dir = false;
		}
		else if(dir == false){
			ledge = platforms.create(-(200+this.getRandomInt(50)), 52, 'platform');
			dir = true;
		}
		this.physics.arcade.enable(ledge);
		ledge.body.allowGravity = false;
		ledge.body.immovable = true;
		ledge.body.velocity.y = 75;
        this.attenteCreatePlat(1500);
	},
	attenteCreatePlat: function(time) {
		this.game.time.events.add(time, this.createPlat,this);
	},
	onCollision: function(piece) {
		if(coin.alpha == 1){
			pieces += 1;
			text3.setText(pieces);
			piece.alpha = 0;
			emitter2.x = piece.x;
			emitter2.y = piece.y+30;
			emitter2.start(true, 2000, null, 10);
			if(player.x >168){
				this.listener1();
				coin1x = 10+this.getRandomInt(148);
				coin1y = 70+this.getRandomInt(200);
			}
			else{
				this.listener2();
				coin2x = 158+this.getRandomInt(148);
				coin2y = 70+this.getRandomInt(200);
			}
		}
	},
	checkOverlap: function(spriteA,spriteB) {
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);
	},
	getRandomInt: function(max) {
		return Math.floor(Math.random() * Math.floor(max));
	},
	onCollisionLedge: function(plr,platform) {
		if(platform.tint==16777215&& player.body.touching.down){
			platform.tint = 0x1FBDFF;
			emitter.x = player.x;
			emitter.y = player.y+30;
			emitter.start(true, 2000, null, 10);
			score++;
			text.setText(score);
		}
	},
	update: function() {
		background.tilePosition.y += 0.5;
		this.physics.arcade.collide(platforms, player,this.onCollisionLedge);
		if(lock == 0 && player.body.touching.down){
			emitter.x = player.x;
			emitter.y = player.y+30;
			emitter.start(true, 2000, null, 10);
			if (vel == -250){
				player.play('left');
				lock = 1;
			}
			if (vel == 250){
				player.play('right');
				lock = 1;
			}
		}
		if (player.body.touching.right === true || player.body.blocked.right === true)
		{
			vel = -250;
			player.body.velocity.x = vel;
			if(lock == 1){
				player.play('left');
			}
			else{
				player.play('jumpleft');
			}
		}
		else if (player.body.touching.left === true ||player.body.blocked.left === true)
		{
			vel = 250;
			player.body.velocity.x = vel;
			if(lock == 1){
				player.play('right');
			}
			else{
				player.play('jumpright');
			}
		}
		if(player.body.blocked.down){
			if(score>highscore){
				localStorage.highscore = score;
			}
			localStorage.pieces = pieces;
			this.state.start('MainMenu');
		}
		if(score>highscore && fire == 1){
			text.tint=0x00bfff;
			best.setText("NEW HIGHSCORE !!");
			fire = 0;
		}
		if(platforms.children.length>=6){
			platforms.remove(platforms.getFirstExists());
		}
		if(player.x >168){
			if(lock22==1){
				rec1.alpha = 0.1;
				rec2.alpha = 0;
				coin.alpha = 1;
				coin.x = coin1x;
				coin.y = coin1y;
				lock22 = 0;
			}
			lock21 = 1;

		}
		if(player.x <=168){
			if(lock21==1){
				rec1.alpha = 0;
				rec2.alpha = 0.1;
				coin.alpha = 1;
				coin.x = coin2x;
				coin.y = coin2y;
				lock21 = 0;
			}
			lock22 = 1;
		}
	},
	render: function() {
		//this.game.debug.text('FPS:' + this.game.time.fps, 260, 10, "#00ff00");
	}
};

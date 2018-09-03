Ball.Game = function(game) {};
Ball.Game.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		pan = this.add.sprite(0, 0, 'panel');
		this.physics.arcade.enable(pan);
		pan.body.allowGravity = false;
		pan.body.immovable = true;
		this.game.time.advancedTiming = true;
		vel=250;
		dir = true;
		score = 0;
		lock = 1;
		rec1 = this.game.add.graphics(0,0);
		rec1.beginFill(0xffffff);
		rec1.drawRect(0, 0, 160, 534);
		rec1.alpha = 0.2;
		rec2 = this.game.add.graphics(0,0);
		rec2.beginFill(0xFF0000);
		rec2.drawRect(160, 0, 160, 534);
		rec2.alpha = 0;
		//localStorage.clear();
		highscore = localStorage.highscore;
		if(!highscore){
			highscore = "0";
		}
		text = this.add.bitmapText(15, 10, 'myfont', '0', 60);
		text2 = this.add.bitmapText(228, 5, 'myfont', highscore, 40); 
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.time.desiredFps = 70;
		this.physics.arcade.gravity.y = 700;
		
		coin = this.add.sprite(10+this.getRandomInt(300), 70+this.getRandomInt(200), 'coin');
		this.physics.arcade.enable(coin);
		coin.body.allowGravity = false;
		
		player = this.add.sprite(10, 0, 'player');
		right = player.animations.add('right', [0,1,2,3,4,5], 13, true);
		left = player.animations.add('left', [6,7,8,9,10,11], 13, true);
		jumpright = player.animations.add('jumpright', [1], 13, true);
		jumpleft = player.animations.add('jumpleft', [7], 13, true);
		player.smoothed = false;
		player.scale.set(1.5);
		
		
		this.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		//player.body.friction = 0.5;
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
	},
	listener1: function() {
		if(player.body.touching.down && player.x >168){
			console.log("ok");
			player.body.velocity.y = -329;
			lock = 0;
			if(vel == -250){
				player.play('jumpleft');
			}
		}
	},
	listener2: function() {
		if(player.body.touching.down && player.x <168){
			player.body.velocity.y = -329;
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
			if (!coin.alive){
				coin = this.add.sprite(10+this.getRandomInt(300), 70+this.getRandomInt(200), 'coin');
			}
			dir = true;
		}
		this.physics.arcade.enable(ledge);
		ledge.body.allowGravity = false;
		ledge.body.immovable = true;
		ledge.body.velocity.y = 75;
		timeFps = 25 * this.game.time.fps;
        this.attenteCreatePlat(timeFps);
	},
	attenteCreatePlat: function(time) {
		this.game.time.events.add(time, this.createPlat,this);
	},
	onCollision: function(piece) {
		score+=3;
		text.setText(score);
		piece.kill();

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
			platform.tint = 0x46a8ea;// bfbfbf
			score++;
			text.setText(score);
		}
	},
	update: function() {
		this.physics.arcade.collide(platforms, player,this.onCollisionLedge);
		if(lock == 0 && player.body.touching.down){
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
		// if (this.input.activePointer.isDown && player.body.touching.down)
		// {
			// player.body.velocity.y = -329;
			// lock = 0;
			// if(vel == -250){
				// player.play('jumpleft');
			// }
			// else if(vel == 250){
				// player.play('jumpright');
			// }
		// }
		if(player.body.blocked.down){
			if(score>highscore){
				localStorage.highscore = score;
			}
			this.state.start('MainMenu');
		}
		if(platforms.children.length>=6){
			platforms.remove(platforms.getFirstExists());
		}
		if (this.checkOverlap(player, coin)&& coin.alive){
			this.onCollision(coin);
		}
	},
	render: function() {
		//this.game.debug.body(player);
		//this.game.debug.text(player.frame, 32, 32);
		this.game.debug.text('FPS:' + this.game.time.fps, 260, 10, "#00ff00");
	}
};

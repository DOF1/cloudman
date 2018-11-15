Ball.Game = function(game) {};
Ball.Game.prototype = {
	create: function() {
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
		ammo = 10;
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
			text3 = this.add.text(225, 25, '0', { font: '27px Arial Black', fill: '#FBDE12', strokeThickness :'4',fontWeight:'bold',boundsAlignH: 'right',boundsAlignV: 'top'});
		}
		else{
			text3 = this.add.text(225, 25, localStorage.pieces, { font: '27px Arial Black', fill: '#FBDE12', strokeThickness :'4',fontWeight:'bold',boundsAlignH: 'right',boundsAlignV: 'top'});
		}
		text3.setTextBounds(0,0,0,0);
		text = this.add.text(5, -10, '0', { font: '60px Arial', fill: '#fff', strokeThickness :'6',fontWeight:'bold'  });
		text2 = this.add.text(230, -3, highscore, { font: '27px Arial Black', fill: '#06b6ff', strokeThickness :'4',fontWeight:'bold'  });
		best = this.add.text(10, 60, ' ');
		best.scale.setTo(0.5);
		coin2 = this.add.sprite(230, 38, 'coin');
		coin2.animations.add('turn2', [0,1,2,3,4,5], 9, true);
		coin2.play('turn2');
		coin2.smoothed = false;
		text4 = this.add.text(20, 75, ammo, { font: '22px Arial', fill: '#000',boundsAlignH: 'right',boundsAlignV: 'top'});
		text4.setTextBounds(0,0,0,0);
		ammoAff = this.add.sprite(3,85,'particle');
		ammoAff.scale.setTo(1.3);
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.time.desiredFps = 60;
		this.physics.arcade.gravity.y = 700;
		
		coin = this.add.sprite(400, 70+this.getRandomInt(403), 'coin');
		this.physics.arcade.enable(coin);
		coin.body.allowGravity = false;
		coin.animations.add('turn', [0,1,2,3,4,5], 9, true);
		coin.play('turn');
		this.game.time.events.add(5000+Math.floor(Math.random() * Math.floor(5000)), function() {coin.x = 16+Math.floor(Math.random() * Math.floor(304));},coin)
		
		am = this.add.sprite(400, 70+this.getRandomInt(403), 'particle');
		this.physics.arcade.enable(am);
		am.body.allowGravity = false;
		am.scale.setTo(1.5);
		this.game.time.events.add(5000+Math.floor(Math.random() * Math.floor(5000)), function() {am.x=16+Math.floor(Math.random() * Math.floor(304))},am)
		
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
		
		enemy = this.add.sprite(500, 0, 'player');
		rightEnemy = enemy.animations.add('rightEnemy', [0], 0, true);
		leftEnemy = enemy.animations.add('leftEnemy', [6], 0, true);
		enemy.smoothed = true;
		enemy.tint = 0xFF5555 ;
		enemy.scale.set(1.5);
		this.physics.arcade.enable(enemy);
		enemy.checkWorldBounds = true;
		enemy.events.onOutOfBounds.add(function() {this.game.time.events.add(5000+Math.floor(Math.random() * Math.floor(5000)), this.spawnEnemy,enemy)}, this);

		
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
		
		//weapon
		weapon = this.add.weapon(30, 'particle');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		weapon.bulletSpeed = 600;
		weapon.fireRate = 100;
		weapon.trackSprite(player, 15, 15, false);
		weapon.bulletGravity.y = -500;
	},
	listener1: function() {
		if(player.body.touching.down && player.x >168){
			player.body.velocity.y = -327 ;
			lock = 0;
			if(vel == -250){
				player.play('jumpleft');
			}
		}
		else{
			if(ammo>0){
				weapon.fire();
				ammo--;
				text4.setText(ammo);
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
		else{
			if(ammo>0){
				weapon.fire();
				ammo--;
				text4.setText(ammo);
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
		pieces += 1;
		text3.setText(pieces);
		emitter2.x = piece.x;
		emitter2.y = piece.y;
		emitter2.start(true, 2000, null, 10);
		piece.x=400;
		this.game.time.events.add(5000+Math.floor(Math.random() * Math.floor(5000)),function(){
					piece.x = 16+Math.floor(Math.random() * Math.floor(304));
					piece.y = 70+Math.floor(Math.random() * Math.floor(403));
			},am);
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
			score++;
			text.setText(score);
		}
	},
	spawnEnemy: function() {
		enemy.body.allowGravity = false;
		enemy.alpha = 0;
		this.game.add.tween(enemy).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
		enemy.body.enable = false;
		this.game.time.events.add(3000, function() {enemy.body.allowGravity = true;enemy.alpha = 1;enemy.body.enable = false;},enemy)
		enemy.body.velocity.x = 0;
		enemy.body.velocity.y = 0;
		enemy.x = 15 + Math.floor(Math.random() * Math.floor(300));
		enemy.y = 55;
		if(enemy.x<=160){
			enemy.play('rightEnemy');
		}
		else{
			enemy.play('leftEnemy');
		}
	},
	update: function() {
		background.tilePosition.y += 0.5;
		this.physics.arcade.collide(platforms, player,this.onCollisionLedge);
		this.physics.arcade.collide(platforms, enemy);
		this.physics.arcade.collide(weapon.bullets, enemy);
		ammoAff.x = player.x + 20;
		ammoAff.y = player.y - 15;
		text4.x = player.x+15;
		text4.y = player.y-25;
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
			weapon.fireAngle = Phaser.ANGLE_LEFT;
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
			weapon.fireAngle = Phaser.ANGLE_RIGHT;
			player.body.velocity.x = vel;
			if(lock == 1){
				player.play('right');
			}
			else{
				player.play('jumpright');
			}
		}
		if(player.body.blocked.down ||( this.checkOverlap(player, enemy) && enemy.alive)){
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
				lock22 = 0;
			}
			lock21 = 1;

		}
		if(player.x <=168){
			if(lock21==1){
				rec1.alpha = 0;
				rec2.alpha = 0.1;
				lock21 = 0;
			}
			lock22 = 1;
		}
		if (this.checkOverlap(player, coin)&& coin.alive){
			this.onCollision(coin);
		}
		if (this.checkOverlap(player, am)&& am.alive){
			ammo += 5;
			text4.setText(ammo);
			emitter.x = am.x;
			emitter.y = am.y;
			emitter.start(true, 2000, null, 10);
			am.x = 400;
			this.game.time.events.add(5000+Math.floor(Math.random() * Math.floor(5000)),function(){
					am.x = 16+Math.floor(Math.random() * Math.floor(304));
					am.y = 70+Math.floor(Math.random() * Math.floor(403));
			},am);
			
		}
	},
	render: function() {
		//this.game.debug.text('FPS:' + this.game.time.fps, 260, 10, "#00ff00");
	}
};

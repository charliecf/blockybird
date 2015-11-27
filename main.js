// Initialize Phase, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create the main stte which will contain the game
var mainState = {

	// sets up the assets of the game
	preload: function() {

		game.stage.backgroundColor = '#71c5cf';
		game.load.image('bird', 'assets/bird.png');
		game.load.image('bird-dead', 'assets/bird-dead.png');
		game.load.image('pipe', 'assets/pipe.png');
		game.load.audio('jump', 'assets/jump.wav');
		game.load.audio('game-over', 'assets/gg.wav');

	},

	// sets up the game after preload
	create: function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// init the bird
		this.bird = this.game.add.sprite(100, 245, 'bird');
		this.bird.anchor.setTo(-0.2, 0.5);

		// physics of the bird
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		// spacebar calls jump function()
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		// creating pipes
		this.pipes = game.add.group();
		this.pipes.enableBody = true;
		this.pipes.createMultiple(20, 'pipe');

		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

		// scoring
		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

	},

	// updates game 60 times per sec to make it work
	update: function() {

		if(this.bird.inWorld === false) {
			this.restartGame();
			// this.bird = this.game.add.sprite(100, 245, 'bird-dead');
			// // makes a gg sound
			// this.gameOverSound = game.add.audio('game-over');
			// this.gameOverSound.play();
		}

		// if collision
		game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

		// bird animation
		if (this.bird.angle < 20) {
			this.bird.angle += 1;
		}

	},

	jump: function() {
		if(this.bird.alive === false) {
			return;
		}
		this.bird.body.velocity.y = -350;

		var animation = game.add.tween(this.bird);
		animation.to({angle: -20}, 100);
		animation.start();

		// makes a jumping sound
		this.jumpSound = game.add.audio('jump');
		this.jumpSound.play();
	},

	hitPipe: function() {
		if(this.bird.alive === false) {
			return;
		}
		this.bird.alive = false;

		game.time.events.remove(this.timer);
		this.pipes.forEachAlive(function(p) {
			p.body.velocity.x = 0;
		}, this);

	},

	restartGame: function() {
		game.state.start('main');
	},

	addOnePipe: function(x, y) {
		var pipe = this.pipes.getFirstDead();

		pipe.reset(x, y);

		pipe.body.velocity.x = -200;

		// remove pipe once it's out
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	},

	addRowOfPipes: function() {
		var hole = Math.floor(Math.random()*5) + 1;

		for(var i = 0; i < 8; i++) {
			if (i != hole && i !=hole + 1) {
				this.addOnePipe(400, i * 60 + 10);
			}
		}

		// add score when new pipe is created
		this.score += 1;
		this.labelScore.text = this.score;
	}

};

game.state.add('main', mainState);
game.state.start('main');
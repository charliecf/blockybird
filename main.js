// Initialize Phase, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create the main stte which will contain the game
var mainState = {

	// sets up the assets of the game
	preload: function() {

		game.stage.backgroundColor = '#71c5cf';
		game.load.image('bird', 'assets/bird.png');

	},

	// sets up the game after preload
	create: function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.bird = this.game.add.sprite(100, 245, 'bird');

		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

	},

	// updates game 60 times per sec to make it work
	update: function() {

		if(this.bird.inWorld === false)
			this.restartGame();

	},

	jump: function() {
		this.bird.body.velocity.y = -350;
	},

	restartGame: function() {
		game.state.start('main');
	}

};

game.state.add('main', mainState);
game.state.start('main');
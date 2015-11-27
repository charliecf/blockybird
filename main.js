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

	},

	// updates game 60 times per sec to make it work
	update: function() {

	}

};

game.state.add('main', mainState);
game.state.start('main');
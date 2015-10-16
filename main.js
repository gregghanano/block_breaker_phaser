var main = { 
  preload: function () {
    // This function will be executed at the beginning     
        // That's where we load the game's assets
      'use strict'
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('brick', 'assets/brick.png');
      game.load.image('ball', 'assets/ball.png');
  },

  create: function() {
    // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cursor = game.input.keyboard.createCursorKeys();
        this.paddle = game.add.sprite(200, 400, 'paddle');
        game.physics.arcade.enable(this.paddle);
        this.paddle.body.immovable = true;
      
        this.bricks = game.add.group();
        this.bricks.enableBody = true;
      
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                game.add.sprite(55+i*60, 55+j*35, 'brick', 0, this.bricks);
            }
        }
      this.bricks.setAll('body.immovable', true);
      
      this.ball = game.add.sprite(200, 300, 'ball');
      game.physics.arcade.enable(this.ball);
      
      this.ball.body.velocity.x = 200;
      this.ball.body.velocity.y = 200;
      
      this.ball.body.collideWorldBounds = true;
      this.ball.body.bounce.x = 1;
      this.ball.body.bounce.y = 1;
  },

  update: function() {
    // This function is called 60 times per second    
        // It contains the game's logic
    if(this.cursor.right.isDown){
      this.paddle.body.velocity.x = 350;
    } else if (this.cursor.left.isDown){
      this.paddle.body.velocity.x = -350;
    } else {
      this.paddle.body.velocity.x = 0;
    };
      game.physics.arcade.collide(this.paddle, this.ball);
      
      game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
  },
    hit: function(ball, brick){
        brick.kill();
    }
};

// Initialize Phaser, and start our 'main' state 
var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');  
game.state.add('main', main);  
game.state.start('main');
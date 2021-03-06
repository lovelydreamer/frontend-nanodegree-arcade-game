//Make random number
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// pos 00, speed 100
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    console.log(speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game 
    // runs at the same speed for all computers.
    this.x += (Math.random() * 60 * dt);
    this.reset();
    this.checkCollisions();
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy location at endpoint
Enemy.prototype.reset = function() {
    if (this.x >= 500) {
        this.x = -101;
        this.speed = randomInt(250, 450);
    }
};

// check if enemy collided with player
Enemy.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x + 30 &&
            (allEnemies[i].x + 30) >= (player.x) &&
            (allEnemies[i].y) <= player.y + 30 &&
            (allEnemies[i].y + 30) >= (player.y)) {

          // reset player to start position if collide with enemy   
            player.reset();
            alert('YOU LOSE');
        }
    }
};

// Now write your own player class
// requires an update(), render() and a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function(dt) {

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'up') {
        this.y = this.y - 80;
    } else if (direction == 'down') {
        this.y = this.y + 80;
    } else if (direction == 'left') {
        this.x = this.x - 101;
    } else if (direction == 'right') {
        this.x = this.x + 101;
    }
    // keep player on canvas 
    // x is left/right coordinate
    if (this.x < 0) {
        this.x = 0;

    } else if (this.x > 400) {
        this.x = 400;

    }
    // y is up/down coordinate
    if (this.y < 0) {
   
        //reset the player at the water
        this.reset();


    } else if (this.y > 400) {
        this.y = 400;
        this.reset();

    }

};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 390;
};


// Now instantiate your objects.
var enemy1 = new Enemy(-101, 55, randomInt(150, 450), 'images/mutant-enemy-bug.png');
var enemy2 = new Enemy(-101, 140, randomInt(50, 450), 'images/enemy-bug.png');
var enemy3 = new Enemy(-101, 225, randomInt(75, 450), 'images/mutant-enemy-bug.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
var player = new Player(202, 390);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

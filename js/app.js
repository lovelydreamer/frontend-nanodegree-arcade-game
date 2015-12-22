var Enemy = function(x,y) {
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game 
    // runs at the same speed for all computers.
    this.x += (Math.random()*60*dt);
    this.reset();
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
// Now write your own player class
// requires an update(), render() and a handleInput() method.

var Player = function(){
 this.x = 200;
 this.y = 300;
 this.sprite = '../images/char-boy.png'; 
 //this.update = function(){};
 //this.render = function(){};
// this.handleInput = function(dt){};
};

Player.prototype.update = function(dt) {
    this.y += this.speed * dt;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.handleInput = function(direction){

  if(direction === 'left'){
 this.x -= 100;
 }
 if(direction === 'up'){
 this.y -= 82.5;
 }
 if(direction === 'right'){
 this.x += 100;
 }
 if(direction === 'down'){
 this.y += 82.5;
 }
 };

Player.prototype.reset = function () {
    this.x = 202;
    this.y = 390;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-101, 55, randomInt(250, 450),'images/mutant-enemy-bug.png');
var enemy2 = new Enemy(-101, 140, randomInt(250, 450), 'images/enemy-bug.png');
var enemy3 = new Enemy(-101, 225, randomInt(250, 450), 'images/mutant-enemy-bug.png');

// Place all enemy objects in an array called allEnemies
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
var player = new Player(202, 390);
var allPlayers = [];
allPlayers.push(player);

//Make random number
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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

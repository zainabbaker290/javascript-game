let canvas;
let context;

let request_id;
let fpsInterval = 1000 / 30; // The denominator is frames per second.
let now;
let then = Date.now();

let backgroundImage = new Image();

let tilesPerRow = 8;  //how many things in row
let tileSize = 16;    // how many pixels

let background = [
    [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,14,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,14,14,14,14,14,14,14,14,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,22],
    [22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
]

let score = 0;
let lives = 3;
let xhttp;
let main_element;
let resetButton;

let player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0
};

let bullet = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0
};

let key = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0
};

let coins = [];
let enemies = [];

let bigEnemy = {
    x: 0,
    y: 0,
    width: 40,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
    collided: false
};

let differenceX = 0;
let differenceY = 0;


let potion = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
    found: false
};

let powerup = false;

let playerImage = new Image();
let bigEnemyImage = new Image();
let enemyImage = new Image();
let bulletImage = new Image();
let coinImage = new Image();
let potionImage = new Image();
let keyImage = new Image();

let floor;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let spaceBar = false;

document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    load_images(["basictiles.png", "girl.png", "ghost.png", "Pearl.png", "Coin.png", "Blue_Potion.png", "Key.png", "bigEnemy.png"]);

    backgroundImage.src = "../static/basictiles.png";
    playerImage.src = "../static/girl.png";
    bigEnemyImage.src = "../static/bigEnemy.png";
    enemyImage.src = "../static/ghost.png";
    bulletImage.src = "../static/Pearl.png";
    coinImage.src = "../static/Coin.png";
    potionImage.src = "../static/Blue_Potion.png";
    keyImage.src = "../static/Key.png";

    //initialising objects
    floor = canvas.height - 27;
    player.x = canvas.width / 2;
    player.y = player.height;
    bigEnemy.x = 750
    bigEnemy.y = bigEnemy.height;
    potion.x = 60;
    potion.y = 160;
    key.x = 950;
    key.y = 510;

    //coin co-ordinates
    let coinxy= [
        {x:900, y:300},
        {x:900, y:200},
        {x:900, y:100},
        {x:100, y:350},
        {x:300, y:350},
        {x:700, y:350},
        {x:100, y:550},
        {x:300, y:550},
        {x:700, y:550}
    ]

    for (let i=0; i < coinxy.length; i ++) {
        let coin = {
          x: coinxy[i].x,
          y:  coinxy[i].y,
          width: 32,
          height: 48,
          frameX: 0,
          frameY: 0,
          xChange: 0,
          yChange: 0,
          points: 10,
          found: false
        };
        coins.push(coin);
    }

    // enemy co-ordinates and movements
    let enemyxy = [
        {x:200, y:0, xChange: 0, yChange: 2},
        {x:900, y:200, xChange: 3, yChange: 0},
        {x:900, y:300, xChange: 3, yChange: 0},
        {x:900, y:500, xChange: 3, yChange: 0}
    ]

    for (let i=0; i < enemyxy.length; i ++) {
        let enemy = {
            x: enemyxy[i].x,
            y: enemyxy[i].y,
            width: 32,
            height: 48,
            frameX: 0,
            frameY: 0,
            xChange: enemyxy[i].xChange,
            yChange: enemyxy[i].yChange,
            isDead: false
        };
        enemies.push(enemy);
    }

    //reset button call    
    resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", reset, false);

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    //for leaderboard call
    main_element = document.querySelector("main")
    let button_elements = document.querySelectorAll("div button");
    for (let b of button_elements) {
        b.addEventListener("click", fetch_content, false);
    }
    fetch_content(event);

    draw();

}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Draw background on canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#87cefa"; // Light sky blue.
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 40; r += 1) {
        for (let c = 0; c < 64; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    //tile collison to stop player from colliding with tiles
    let playerTileCoordinateX =  Math.round(player.x / tileSize) ; //give 64 //either way it should be divided by 16
    let playerTileCoordinateY =  (Math.round(player.y / tileSize) +3); // give 40
    if ((background[playerTileCoordinateY + 1][playerTileCoordinateX + 1] === 0) || (background[playerTileCoordinateY + 1][playerTileCoordinateX + 1] === 22)){
        player.yChange = 0;
        moveDown= false;
    }
    if ((background[playerTileCoordinateY-1][playerTileCoordinateX-1] === 0) || (background[playerTileCoordinateY-1][playerTileCoordinateX-1] === 22)){
        player.xChange = 0;
        moveLeft = false;
    }
    if ((background[playerTileCoordinateY- 1][playerTileCoordinateX+1] === 0) || (background[playerTileCoordinateY- 1][playerTileCoordinateX+1] === 22)){
        player.xChange = 0;
        moveRight = false;
    }
    if ((background[playerTileCoordinateY - 1][playerTileCoordinateX + 1 ] === 0) || (background[playerTileCoordinateY - 1][playerTileCoordinateX + 1 ] === 22)){
        player.yChange = 0;
        moveUp = false;
    }

    // Draw player.
    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height);
    
    if ((moveLeft || moveRight) && !(moveLeft && moveRight)) {
        player.frameX = (player.frameX + 1) % 4;
    }
    if ((moveUp || moveDown) && !(moveUp && moveDown)) {
        player.frameX = (player.frameX + 1) % 4;
    }

    // Handle key presses and frame direction
    if (moveLeft) {
        player.xChange = player.xChange - 0.5;
        player.frameY = 1;
    }
    if (moveRight) {
        player.xChange = player.xChange + 0.5;
        player.frameY = 2;
    }
    if ((moveUp) && !(moveUp && moveRight) && !(moveUp && moveLeft)) {
        player.yChange = player.yChange - 0.5;
        player.frameY = 3;
    }
    if ((moveDown) && !(moveDown && moveRight) && !(moveDown && moveLeft)) {
        player.yChange = player.yChange + 0.5;
        player.frameY = 0;
    }

    //for bullet and bullet direction
    if (spaceBar) {
        if (!bulletOnScreen(bullet)) {
            bullet.y = player.y;
            bullet.x = player.x;

            if (player.frameY === 0) {
                bullet.yChange = 8;
                bullet.xChange = 0
            }
            if (player.frameY === 1) {
                bullet.xChange = -8;
                bullet.yChange = 0
            }
            if (player.frameY === 2) {
                bullet.xChange = 8;
                bullet.yChange = 0
            }
            if (player.frameY === 3) {
                bullet.yChange = -8;
                bullet.xChange = 0
            }
        }
    }

    // Update the player.
    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange;

    // Physics.
    player.xChange = player.xChange * 0.9; // Friction!
    player.yChange = player.yChange * 0.9; // Friction!

    // Going off left or right.
    if (player.x + player.width < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = -player.width;
    }

    // Going off up or down.
    if (player.y + player.height < 0) {
        player.y = canvas.height;
    } else if (player.y > canvas.height) {
        player.y = -player.height;
    }

    // draw bullet if on screen
    if (bulletOnScreen(bullet)) {
        context.drawImage(bulletImage,
            bullet.width * bullet.frameX, bullet.height * bullet.frameY, bullet.width, bullet.height,
            bullet.x, bullet.y, bullet.width, bullet.height);
    }

    //Update bullet 
    bullet.x = bullet.x + bullet.xChange;
    bullet.y = bullet.y + bullet.yChange;

    //big enemy 
    context.drawImage(bigEnemyImage,
       bigEnemy.width * bigEnemy.frameX, bigEnemy.height * bigEnemy.frameY, bigEnemy.width, bigEnemy.height,
        bigEnemy.x, bigEnemy.y, bigEnemy.width, bigEnemy.height);

    //Update big Enemy 
    bigEnemy.x = bigEnemy.x + bigEnemy.xChange;
    bigEnemy.y = bigEnemy.y + bigEnemy.yChange;

    //distance between player and the big enemy
    differenceX = player.x - bigEnemy.x
    differenceY = player.y - bigEnemy.y

    //big enemy and player collides, player dies
    if(playerCollidesBigEnemy(player, bigEnemy)){
        playerDies(player)
    }

    //making the big enemy follow the player
    if(differenceX > 0) {
        bigEnemy.xChange = 1
    }
    if(differenceX < 0) {
        bigEnemy.xChange = -1
    }
    if(differenceY > 0) {
        bigEnemy.yChange = 1
    }
    if(differenceY < 0) {
        bigEnemy.yChange = -1
    }

    // drawing enemies
    for (let i=0; i < enemies.length; i ++) {

        //seeing if enemies have collided with bullet
        enemyCollidesBullet(bullet,enemies)

        //drawing enemy only if its not dead
        if (!enemies[i].isDead){
          context.drawImage(enemyImage,
            enemies[i].width * enemies[i].frameX, enemies[i].height * enemies[i].frameY, enemies[i].width, enemies[i].height,
            enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        }

    }

    //Update enemy 
    for (let i=0; i < enemies.length; i ++) {
        enemies[i].x = enemies[i].x + enemies[i].xChange;
        enemies[i].y = enemies[i].y + enemies[i].yChange;
    }

    //enemy frames
    for (let i=0; i < enemies.length; i ++) {
        if (enemies[i]) {
            if (enemies[i].x + enemies[i].xChange > canvas.width) {
                enemies[i].xChange = -enemies[i].xChange;
                enemies[i].frameY = 2;
            }
            if (enemies[i].x + enemies[i].xChange < 0) {
                enemies[i].xChange = -enemies[i].xChange;
                enemies[i].frameY = 1;
            }

            if (enemies[i].y + enemies[i].yChange < 0) {
                enemies[i].yChange = -enemies[i].yChange;
                enemies.frameY = 0;
            } else if (enemies[i].y + enemies[i].yChange > canvas.height) {
                enemies[i].yChange = -enemies[i].yChange;
                enemies.frameY = 3;
            }
        }   
    }

    //if player collides with enemy
    for (let i=0; i < enemies.length; i ++) {
        if (playerCollidesEnemy(player,enemies[i])) {
            playerDies(player)
        }
  
    } 

    //drawing coins in certain postions 
    for (let i=0; i < coins.length; i ++) {
        // if player collides with coin in coins
        if (coinCollidesPlayer(coins[i])) {
            coins[i].found = true;
            score += coins[i].points;
        }
        //if coins are not found draw
        if (!coins[i].found){
            context.drawImage(coinImage,
            coins[i].width * coins[i].frameX, coins[i].height * coins[i].frameY, coins[i].width, coins[i].height,
            coins[i].x, coins[i].y, coins[i].width, coins[i].height);
        }
        //if they are found, their points have been taken so now they have no points left
        if (coins[i].found) {
            coins[i].points = 0;
        }     
    }
    
    //if the power up is activated
    if (powerup){
        if (moveLeft) {
            player.xChange = player.xChange - 3;
            player.frameY = 1;
        }
        if (moveRight) {
            player.xChange = player.xChange + 3;
            player.frameY = 2;
        }
        if ((moveUp) && !(moveUp && moveRight) && !(moveUp && moveLeft)) {
            player.yChange = player.yChange - 3;
            player.frameY = 3;
        }
        if ((moveDown) && !(moveDown && moveRight) && !(moveDown && moveLeft)) {
            player.yChange = player.yChange + 3;
            player.frameY = 0;
        }
    }
        
    // if player collides with potion call powerup for 5 seconds
    if (potionCollidesPlayer(potion)) {
        potion.found = true;
        powerup = true;
        setTimeout(function () {
            powerup = false;
        }, 5000)
        
    }

    // if potion is not found
    if (!potion.found) {
        context.drawImage(potionImage,
            potion.width * potion.frameX, potion.height * potion.frameY, potion.width, potion.height,
            potion.x, potion.y, potion.width, potion.height);  
    }
    
    // if you have lost all lives, stop game, you have lost
    if (lives === 0){
        stop("You lose! Final score:", score);
        return;   
    }

    // drawing key
    context.drawImage(keyImage,
        key.width * key.frameX, key.height * key.frameY, key.width, key.height,
        key.x, key.y, key.width, key.height);

    // if you have found the key you have won
    if (keyCollidesPlayer(key)) {
        key.found = true;
        stop("YOU WIN! Final score:",score)
    }   
}

function activate(event) {
    event.preventDefault();
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === " ") {
        spaceBar = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    } else if (key === " ") {
        spaceBar = false;
    }
}

//player and big enemy collide 
function playerCollidesBigEnemy(player, enemy) {
    let enemyStartX = enemy.x;
    let enemyEndX = enemy.x + enemy.width;
    let playerStartX = player.x;
    let playerEndX = player.x + player.width;
    let enemyStartY = enemy.y;
    let enemyEndY = enemy.y + enemy.height;
    let playerStartY = player.y;
    let playerEndY = player.y + player.height;
    let playerCollidesX = (((enemyStartX >= playerStartX) || (enemyEndX >= playerStartX)) && ((enemyEndX <= playerEndX) || (enemyStartX <= playerEndX)));
    let playerCollidesY = (((enemyStartY >= playerStartY) || (enemyEndY >= playerStartY)) && ((enemyEndY <= playerEndY) || (enemyStartY <= playerEndY)));

    return playerCollidesX && playerCollidesY;

}

// if bullet is on the screen
function bulletOnScreen(bullet) {
    return ((bullet.x > 0 && bullet.x < canvas.width) && (bullet.y > 0 && bullet.y < canvas.height))

}

// enemy colliding with bullet
function enemyCollidesBullet(bullet, enemies) {
    for (let i=0; i < enemies.length; i ++) {
        let bulletStartX = bullet.x;
        let bulletEndX = bullet.x + bullet.width;
        let enemyStartX = enemies[i].x;
        let enemyEndX = enemies[i].x + enemies[i].width; 
        let bulletStartY = bullet.y;
        let bulletEndY = bullet.y + bullet.height;
        let enemyStartY = enemies[i].y;
        let enemyEndY = enemies[i].y + enemies[i].height; 

        if ((((bulletStartX >= enemyStartX) || (bulletEndX >= enemyStartX)) && ((bulletEndX <= enemyEndX) || (bulletStartX <= enemyEndX))) &&
        (((bulletStartY >= enemyStartY) || (bulletEndY >= enemyStartY)) && ((bulletEndY <= enemyEndY) || (bulletStartY <= enemyEndY)) )) {
            enemies[i].isDead = true;
        } 

    } return;
}

// enemy and the player collide
function playerCollidesEnemy(player, enemy) {
    if (!enemy.isDead) {
      let enemyStartX = enemy.x;
      let enemyEndX = enemy.x + enemy.width;
      let playerStartX = player.x;
      let playerEndX = player.x + player.width;
      let enemyStartY = enemy.y;
      let enemyEndY = enemy.y + enemy.height;
      let playerStartY = player.y;
      let playerEndY = player.y + player.height;
      let playerCollidesX = (((enemyStartX >= playerStartX) || (enemyEndX >= playerStartX)) && ((enemyEndX <= playerEndX) || (enemyStartX <= playerEndX)));
      let playerCollidesY = (((enemyStartY >= playerStartY) || (enemyEndY >= playerStartY)) && ((enemyEndY <= playerEndY) || (enemyStartY <= playerEndY)));

      if (playerCollidesX && playerCollidesY) {
        return true;
    }

  } return false;
}

//when the player dies, it loses a life and returns back to its orginal positon
function playerDies(player) {
    lives = lives - 1;
    player.x = canvas.width / 2;
    player.y = player.height;
}

// key and the player collide
function keyCollidesPlayer(key) {
    let keyStartX = key.x;
    let keyEndX = key.x + key.width;
    let playerStartX = player.x;
    let playerEndX = player.x + player.width; 
    let keyStartY = key.y;
    let keyEndY = key.y + key.height;
    let playerStartY = player.y;
    let playerEndY = player.y + player.height; 

    return (((keyStartX >= playerStartX) || (keyEndX >= playerStartX)) && ((keyEndX <= playerEndX) || (keyStartX <= playerEndX))) &&
    (((keyStartY >= playerStartY) || (keyEndY >= playerStartY)) && ((keyEndY <= playerEndY) || (keyStartY <= playerEndY)) )

}

// player collides with coin
function coinCollidesPlayer(coin) {
    let coinStartX = coin.x;
    let coinEndX = coin.x + coin.width;
    let playerStartX = player.x;
    let playerEndX = player.x + player.width; 
    let coinStartY = coin.y;
    let coinEndY = coin.y + coin.height;
    let playerStartY = player.y;
    let playerEndY = player.y + player.height; 

    return (((coinStartX >= playerStartX) || (coinEndX >= playerStartX)) && ((coinEndX <= playerEndX) || (coinStartX <= playerEndX))) &&
    (((coinStartY >= playerStartY) || (coinEndY >= playerStartY)) && ((coinEndY <= playerEndY) || (coinStartY <= playerEndY)) )

}

// player collides with potion
function potionCollidesPlayer(potion) {
    let potionStartX = potion.x;
    let potionEndX = potion.x + potion.width;
    let playerStartX = player.x;
    let playerEndX = player.x + player.width; 
    let potionStartY = potion.y;
    let potionEndY = potion.y + potion.height;
    let playerStartY = player.y;
    let playerEndY = player.y + player.height; 

    return (((potionStartX >= playerStartX) || (potionEndX >= playerStartX)) && ((potionEndX <= playerEndX) || (potionStartX <= playerEndX))) &&
    (((potionStartY >= playerStartY) || (potionEndY >= playerStartY)) && ((potionEndY <= playerEndY) || (potionStartY <= playerEndY)) )

}

// stop the game 
function stop(outcome, score) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", activate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome;

    let data = new FormData();
    data.append("score", score);

    // for storing score 
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "https://cs1.ucc.ie/~znb2/cgi-bin/ca2/run.py/store_score", true);
    xhttp.send(data);

    let score_element = document.querySelector("#score");
    score_element.innerHTML = score;
}

//resetting game
function reset(){
    location.reload()
}

// for score 
function handle_response(){
    // Check that the response has fully arrived 
    if (xhttp.readyState === 4) {
        //Check the request was successful
        if (xhttp.status === 200) {
            if (xhttp.responseText === "success") {
                // score was successfully stored in database
            } else {
                // score was not successfully stored in database
            }
        }
    }
}

//for leaderboard ajax call
function fetch_content(event){
    let button_id;
    if (event) {
        button_id = event.target.id;
    }
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response2, false);
    xhttp.open("GET", "https://cs1.ucc.ie/~znb2/cgi-bin/ca2/run.py/" + button_id, true);
    xhttp.send(event);
}

function handle_response2() {
    // Check if the response has fully arrived 
    if( xhttp.readyState === 4 ){
        // Check if the request was successful
        if (xhttp.status === 200) {
            main_element.innerHTML = xhttp.responseText;
        }
    }
}

//this is to function given to allow the images to run
async function load_images(urls) {

    let promises = [];

    for (let url of urls) {

        promises.push(new Promise(resolve => {

            let img = new Image();

            img.onload = resolve;

            img.src = url;

        }));

    }

    await Promise.all(promises); 

}





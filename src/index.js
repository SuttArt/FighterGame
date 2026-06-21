import {Fighter, Sprite} from './classes.js';
import * as utils from './utils.js'

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// just calculated it. I know, that my background has size of 320x180
// My canvas is 1024x576, what make 1024/320 = 3.2 and 576/180 = 3.2
const backgroundScale = 3.2

// define background sprites to draw
const background = [
    new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/background_layer_1.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/background_layer_2.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/background_layer_3.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
]

// define shop sprite
const shop = new Sprite({
    position: {
        x: 600,
        y: 130,
    },
    canvRef: {canvas, ctx},
    imageSrc: '../assets/shop_anim.png',
    scale: 2.75,
    framesMax: 6
})


// define first player
const player_1 = new Fighter(
    {
        position: {x: 0, y: 0},
        canvRef: {canvas, ctx},
        velocity: {x: 0, y: 10},
        offset: {x: 0, y: 0},
    }
);

// define second player
const player_2 = new Fighter(
    {
        position: {x: 400, y: 0},
        canvRef: {canvas, ctx},
        velocity: {x: 0, y: 10},
        color: 'blue',
        offset: {x: -50, y: 0},
    });

// Object for tracking the keys to be pressed
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

// How fast we can move left and right
let velocityX = 5;
// How fast we can jump
let velocityY = 15;

utils.decreaseTimer(player_1, player_2);

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // animate sprites
    background.forEach(detail => detail.updateSprite())
    shop.updateSprite()
    player_1.updateSprite()
    player_2.updateSprite()

    // reset velocity
    player_1.velocity.x = 0;
    player_2.velocity.x = 0;

    // player 1 movement
    if (keys.d.pressed && player_1.lastKey === 'd') {
        player_1.velocity.x = velocityX
    } else if (keys.a.pressed && player_1.lastKey === 'a') {
        player_1.velocity.x = -velocityX
    }

    // player 2 movement
    if (keys.ArrowRight.pressed && player_2.lastKey === 'ArrowRight') {
        player_2.velocity.x = velocityX
    } else if (keys.ArrowLeft.pressed && player_2.lastKey === 'ArrowLeft') {
        player_2.velocity.x = -velocityX
    }

    // detect for collision
    if (
        utils.rectangularCollision({
            rectangle1: player_1,
            rectangle2: player_2
        }) &&
        player_1.isAttacking
    ) {
        player_1.isAttacking = false;
        player_2.health -= 10
        document.getElementById('enemyHealthBar').style.width = player_2.health + "%"
    }

    if (
        utils.rectangularCollision({
            rectangle1: player_2,
            rectangle2: player_1
        }) &&
        player_2.isAttacking
    ) {
        player_2.isAttacking = false;
        player_1.health -= 10
        document.getElementById('playerHealthBar').style.width = player_1.health + "%"
    }

    // end game based on health
    if ((player_2.health < 0 || player_1.health <= 0) && !utils.timeout) {
        utils.determineWinner({player1: player_1, player2: player_2})
    }
}

animate();


window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player_1.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            player_1.lastKey = 'a'
            break;
        case 'w':
            player_1.velocity.y = -velocityY
            break;
        case ' ':
            player_1.attack()
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player_2.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            player_2.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            player_2.velocity.y = -velocityY
            break;
        case 'ArrowDown':
            player_2.attack();
            break;

    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
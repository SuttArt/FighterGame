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
        attackBox: {
            offset: {
                x: 100,
                y: 50,
            },
            width: 160,
            height: 50,
        },
        imageSrc: '../assets/player_1/idle.png',
        framesMax: 8,
        scale: 2.5,
        offset: {x: 215, y: 157},
        sprites: {
            idle: {
                imageSrc: '../assets/player_1/idle.png',
                framesMax: 8,
            },
            run: {
                imageSrc: '../assets/player_1/Run.png',
                framesMax: 8,
            },
            jump: {
                imageSrc: '../assets/player_1/Jump.png',
                framesMax: 2,
            },
            fall: {
                imageSrc: '../assets/player_1/Fall.png',
                framesMax: 2,
            },
            attack1: {
                imageSrc: '../assets/player_1/Attack1.png',
                framesMax: 6,
            },
            takeHit: {
                imageSrc: '../assets/player_1/Take Hit - white silhouette.png',
                framesMax: 4,
            },
            death: {
                imageSrc: '../assets/player_1/Death.png',
                framesMax: 6,
            }
        }
    }
);

// define second player
const player_2 = new Fighter(
    {
        position: {x: 400, y: 0},
        canvRef: {canvas, ctx},
        velocity: {x: 0, y: 10},
        color: 'blue',
        attackBox: {
            offset: {
                x: -175,
                y: 50,
            },
            width: 175,
            height: 50,
        },
        imageSrc: '../assets/player_2/idle.png',
        framesMax: 4,
        scale: 2.5,
        offset: {x: 215, y: 157},
        sprites: {
            idle: {
                imageSrc: '../assets/player_2/idle.png',
                framesMax: 4,
            },
            run: {
                imageSrc: '../assets/player_2/Run.png',
                framesMax: 8,
            },
            jump: {
                imageSrc: '../assets/player_2/Jump.png',
                framesMax: 2,
            },
            fall: {
                imageSrc: '../assets/player_2/Fall.png',
                framesMax: 2,
            },
            attack1: {
                imageSrc: '../assets/player_2/Attack1.png',
                framesMax: 4,
            },
            takeHit: {
                imageSrc: '../assets/player_2/Take hit.png',
                framesMax: 3,
            },
            death: {
                imageSrc: '../assets/player_2/Death.png',
                framesMax: 7,
            }
        }
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

    // Add for contrast
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player_1.updateSprite()
    player_2.updateSprite()

    // reset velocity
    player_1.velocity.x = 0;
    player_2.velocity.x = 0;

    // player 1 movement
    if (keys.d.pressed && player_1.lastKey === 'd') {
        player_1.velocity.x = velocityX
        player_1.switchSprite('run')
    } else if (keys.a.pressed && player_1.lastKey === 'a') {
        player_1.velocity.x = -velocityX
        player_1.switchSprite('run')
    } else {
        player_1.switchSprite('idle')
    }

    if (player_1.velocity.y < 0) {
        player_1.switchSprite('jump')
    } else if (player_1.velocity.y > 0) {
        player_1.switchSprite('fall')
    }

    // player 2 movement
    if (keys.ArrowRight.pressed && player_2.lastKey === 'ArrowRight') {
        player_2.velocity.x = velocityX
        player_2.switchSprite('run')
    } else if (keys.ArrowLeft.pressed && player_2.lastKey === 'ArrowLeft') {
        player_2.velocity.x = -velocityX
        player_2.switchSprite('run')
    } else {
        player_2.switchSprite('idle')
    }

    if (player_2.velocity.y < 0) {
        player_2.switchSprite('jump')
    } else if (player_2.velocity.y > 0) {
        player_2.switchSprite('fall')
    }

    // detect for collision
    if (
        utils.rectangularCollision({
            rectangle1: player_1,
            rectangle2: player_2
        }) &&
        player_1.isAttacking && player_1.framesCurrent === 4
    ) {
        player_2.takeHit(20);
        player_1.isAttacking = false;

        // global variable from index.html
        gsap.to('#enemyHealthBar',{
            width: player_2.health + '%',
        })
    }

    // if player_1 misses
    if (player_1.isAttacking && player_1.framesCurrent === 4) {
        player_1.isAttacking = false;
    }

    // detect for collision
    if (
        utils.rectangularCollision({
            rectangle1: player_2,
            rectangle2: player_1
        }) &&
        player_2.isAttacking && player_2.framesCurrent === 2
    ) {
        player_1.takeHit(10);
        player_2.isAttacking = false;

        // global variable from index.html
        gsap.to('#playerHealthBar',{
            width: player_1.health + '%',
        })
    }

    // if player_2 misses
    if (player_2.isAttacking && player_2.framesCurrent === 2) {
        player_2.isAttacking = false;
    }

    // end game based on health
    if ((player_2.health < 0 || player_1.health <= 0) && !utils.timeout) {
        utils.determineWinner({player1: player_1, player2: player_2})
    }
}

animate();


window.addEventListener("keydown", (event) => {
    if (!player_1.dead) {
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
        }
    }

    if (!player_2.dead) {
        switch (event.key) {
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
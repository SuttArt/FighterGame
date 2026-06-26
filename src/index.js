import {Fighter, Sprite} from './classes.js';
import * as utils from './utils.js'

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const TILE_CROPS = {
    // large frames
    stoneSquareFrame: {
        x: 0,
        y: 0,
        width: 96,
        height: 96
    },

    brownSquareFrame: {
        x: 336,
        y: 0,
        width: 96,
        height: 96
    },

    // top platforms
    earthPlatformLong: {
        x: 120,
        y: 0,
        width: 96,
        height: 24
    },

    earthPlatform: {
        x: 120,
        y: 216,
        width: 72,
        height: 24
    },

    brickPlatform: {
        x: 120,
        y: 168,
        width: 72,
        height: 24
    },

    darkStonePlatform: {
        x: 120,
        y: 264,
        width: 72,
        height: 24
    },

    earthPlatformShort: {
        x: 288,
        y: 145,
        width: 48,
        height: 24
    },

    earthPlatformShortLower: {
        x: 288,
        y: 192,
        width: 48,
        height: 24
    },

    stonePlatformShort: {
        x: 288,
        y: 240,
        width: 48,
        height: 24
    },

    brownPlatformShort: {
        x: 360,
        y: 192,
        width: 48,
        height: 24
    },

    brownPlatformSmall: {
        x: 384,
        y: 312,
        width: 48,
        height: 24
    },

    // long bottom platform
    stoneGroundLong: {
        x: 120,
        y: 312,
        width: 240,
        height: 48
    },

    // small single blocks
    earthBlockSmallTop: {
        x: 240,
        y: 0,
        width: 24,
        height: 24
    },

    stoneBlockSmallTop: {
        x: 288,
        y: 0,
        width: 24,
        height: 24
    },

    earthBlockSmallUpper: {
        x: 144,
        y: 48,
        width: 24,
        height: 24
    },

    stoneBlockSmallUpper: {
        x: 240,
        y: 48,
        width: 24,
        height: 24
    },

    earthBlockSmallLeft: {
        x: 120,
        y: 72,
        width: 24,
        height: 24
    },

    earthBlockSmallRight: {
        x: 168,
        y: 72,
        width: 24,
        height: 24
    },

    stoneBlockSmallLeft: {
        x: 216,
        y: 72,
        width: 24,
        height: 24
    },

    stoneBlockSmallRight: {
        x: 264,
        y: 72,
        width: 24,
        height: 24
    },

    stoneBlockSmallMiddle: {
        x: 240,
        y: 96,
        width: 24,
        height: 24
    },

    // vertical pieces
    earthVerticalSmall: {
        x: 144,
        y: 96,
        width: 24,
        height: 48
    },

    stoneVerticalTall: {
        x: 216,
        y: 144,
        width: 48,
        height: 120
    },

    brownVerticalSmall: {
        x: 360,
        y: 120,
        width: 24,
        height: 48
    },

    brownVerticalRounded: {
        x: 360,
        y: 240,
        width: 24,
        height: 48
    },

    brownWallTopRight: {
        x: 456,
        y: 0,
        width: 48,
        height: 72
    },

    brownWallLargeRight: {
        x: 384,
        y: 120,
        width: 120,
        height: 240
    },

    // roofs / slopes
    grayRoof: {
        x: 0,
        y: 120,
        width: 96,
        height: 48
    },

    orangeRoof: {
        x: 0,
        y: 168,
        width: 96,
        height: 48
    },

    // big wall block
    stoneWallLargeBottomLeft: {
        x: 0,
        y: 240,
        width: 96,
        height: 120
    }
};

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
    new Sprite({
        position: {
            x: 0,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.earthPlatform
    }),
    new Sprite({
        position: {
            x: 120,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.earthPlatform
    }),
    new Sprite({
        position: {
            x: 348,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.earthPlatformShort
    }),
    new Sprite({
        position: {
            x: 499,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.brickPlatform
    }),
    new Sprite({
        position: {
            x: 727,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.brickPlatform
    }),
    new Sprite({
        position: {
            x: 955,
            y: 515,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/oak_woods_tileset.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
        crop: TILE_CROPS.stonePlatformShort
    }),
    new Sprite({
        position: {
            x: 0,
            y: 454,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/fence_1.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 220,
            y: 499,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/grass_2.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 250,
            y: 454,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/fence_2.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 470,
            y: 457,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/rock_3.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 470,
            y: 457,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/rock_3.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
    new Sprite({
        position: {
            x: 460,
            y: 371,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/lamp.png',
        width: canvas.width,
        height: canvas.height,
        scale: 2.5,
    }),
    new Sprite({
        position: {
            x: 930,
            y: 415,
        },
        canvRef: {canvas, ctx},
        imageSrc: '../assets/background/sign.png',
        width: canvas.width,
        height: canvas.height,
        scale: backgroundScale,
    }),
]

// define shop sprite
const shop = new Sprite({
    position: {
        x: 600,
        y: 163,
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
        position: {x: 950, y: 0},
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
        flip: true,
        imageSrc: '../assets/player_2/idle.png',
        framesMax: 4,
        scale: 2.5,
        offset: {x: 215, y: 170},
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
import {Sprite} from './classes.js';

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;


ctx.fillRect(0, 0, canvas.width, canvas.height);

const player_1 = new Sprite(
    {
        position: {x: 0, y: 0},
        canvRef: {canvas: canvas, ctx: ctx},
        velocity: {x: 0, y: 10},
        offset: {x: 0, y: 0},
    }
);


const player_2 = new Sprite(
    {
        position: {x: 400, y: 0},
        canvRef: {canvas: canvas, ctx: ctx},
        velocity: {x: 0, y: 10},
        color: 'blue',
        offset: {x: -50, y: 0},
    });

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

let velocityX = 5;
let velocityY = 15;

function rectangularCollision({rectangle1, rectangle2,}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player1, player2, timerId}) {
    const displayText = document.getElementById("displayText")
    displayText.style.display = 'flex';

    if (player1.health === player2.health) {
        displayText.innerText = 'Tie';
    } else if (player1.health > player2.health) {
        displayText.innerText = 'Player 1 Wins';
    } else if (player1.health < player2.health) {
        displayText.innerText = 'Player 2 Wins';
    }

    clearTimeout(timerId);
    timeout = true
}

let timer = 5
let timerId
let timeout = false
function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000);
    if (timer > 0) {
        timer--
        document.getElementById("timer").innerText = timer.toString()
    }

    if (timer === 0) {
        determineWinner({player1: player_1, player2: player_2, timerId})
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // animate sprites
    player_1.updateSpite()
    player_2.updateSpite()

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
        rectangularCollision({
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
        rectangularCollision({
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
    if ((player_2.health < 0 || player_1.health <= 0) && !timeout) {
        determineWinner({player1: player_1, player2: player_2, timerId})
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
let timer = 60
let timerId

export let timeout = false

export function rectangularCollision({rectangle1, rectangle2,}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

export function determineWinner({player1, player2}) {
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

export function decreaseTimer(player_1, player_2) {
    timerId = setTimeout(decreaseTimer, 1000, player_1, player_2);
    if (timer > 0) {
        timer--
        document.getElementById("timer").innerText = timer.toString()
    }

    if (timer === 0) {
        determineWinner({player1: player_1, player2: player_2, timerId})
    }
}
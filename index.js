const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const displayTxt = document.getElementById('displayText');
const timerP = document.querySelector('#timerP');
const enemyHealth = document.querySelector('#enemyHealth');
const playerHealth = document.querySelector('#playerHealth');

canvas.width = 1024;
canvas.height = 768;

ctx.fillRect(0, 0, canvas.width, canvas.height);

let gameover = '<h1>Game Over</h1><br>' + '<button onclick="location.reload()">Restart</button>';

let timer = 100;
timerP.innerHTML = timer;

function decreaseTimer() {
    if (timer >= 0) {
        timer--;
        setTimeout(decreaseTimer, 1000);
        timerP.innerHTML = timer;

        if (timer == -1) {
            determineWinner();
            timerP.innerHTML = 'TIME OUT!';
            document.getElementById('displayText').style.display = 'block';
            document.getElementById('displayText').innerHTML = gameover;
        }
    }
}

decreaseTimer();

const gravity = 0.7;

const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'lightblue',
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Fighter({
    position: {
        x: 500,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'violet',
    offset: {
        x: -50,
        y: 0
    }
})

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    }
}

let lastKey;

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    // player
    player.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x -= 5;
    }

    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x += 5;
    }

    if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y -= 1.5;
    }


    // enemy
    enemy.velocity.x = 0;

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x -= 5;
    }

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x += 5;
    }

    if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y -= 1.5;
    }


    // Attack collission detection
    function rectangularCollision({ rect1, rect2 }) {
        return (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
            rect1.attackBox.position.x <= rect2.position.x + rect2.attackBox.width &&
            rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
            rect1.attackBox.position.y <= rect2.position.y + rect2.attackBox.height && rect1.isAttacking)
    }

    function determineWinner({ player, enemy }) {
        // End of game conditions
        if (player.health <= 0 || enemy.health <= 0 || timer <= 0) {
            displayTxt.innerhtml = gameover;
            if (player.health === enemy.health) {
                displayTxt.innerHTML = "Tie";
                displayTxt.style.display = 'flex';
            }
        } else if (player.health >= enemy.health || enemy.health === 0) {
            displayTxt.innerHTML = "Player 1 Wins";
            displayTxt.style.display = 'flex';
        } else if (player.health <= enemy.health || player.health === 0) {
            displayTxt.innerHTML = "Player 2 Wins";
            displayTxt.style.display = 'flex';
        }
    }

    if (rectangularCollision({ rect1: player, rect2: enemy }) && player.isAttacking) {
        player.isAttacking = true;
        enemy.health -= 10;
        enemyHealth.style.width = enemy.health + '%';
        console.log('Player hit enemy' + enemy.health);
    }

    if (rectangularCollision({ rect1: enemy, rect2: player }) && enemy.isAttacking) {
        enemy.isAttacking = true;
        player.health -= 10;
        playerHealth.style.width = player.health + '%';
        console.log('Enemy hit player: ' + player.health);
    }

    if(player.health <= 0 || enemy.health <= 0 || timer <= 0) {
        displayTxt.style.display = 'flex';
        determineWinner({ player, enemy });
    }



}


animate();

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {

        /* Player movement */
        case 'w':
            keys.w.pressed = true;
            player.lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case ' ':
            player.attack()
            break;

        /* Enemy movement*/
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            break;
        case 'ArrowDown':
            enemy.isAttacking = true;
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        /* Player movement */
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            player.isAttacking = false;
            break;

        /* Enemy movement */
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            enemy.isAttacking = false;
            break;
    }
})

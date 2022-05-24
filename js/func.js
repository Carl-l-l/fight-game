function decreaseTimer() {
    if (timer > 0) {
        if(player.health <= 0 || enemy.health <= 0) {
              console.log('dead')
        } else {
            timer--;
            setTimeout(decreaseTimer, 1000);
            timerP.innerHTML = timer;
        }
    } else {
        player.isDead = true;
        enemy.isDead = true;
        timerP.innerHTML = 'TIME OUT!';
        timerP.style.padding = '15px';
        document.getElementById('displayText').style.display = 'flex';
        document.getElementById('displayText').innerHTML = gameover;
    }
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
    displayTxt.style.display = 'flex';    
    if (player.health >= enemy.health || enemy.health === 0) {
        enemy.death();
        displayTxt.innerHTML += "<p>Player 1 Wins</p>";
        addPoints('player1');
        
    } else if (player.health <= enemy.health || player.health === 0) {
        player.death();
        displayTxt.innerHTML += "<p>Player 2 Wins</p>";
        addPoints('player2');
    }

    points = getPoints()
    pointCounter.innerHTML = points.player1 + ' : ' + points.player2;

}

function animate() {
    animation = window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();

    player.update();
    enemy.update();

    // player
    player.velocity.x = 0;
    player.switchSprites('idle');

    if (keys.a.pressed && player.lastKey === 'a') {
        player.switchSprites('run');
        player.velocity.x -= 5;
    }
    if (keys.d.pressed && player.lastKey === 'd') {
        player.switchSprites('run');
        player.velocity.x += 5;
    }
    if (player.velocity.y < 0) {
        player.switchSprites('jump');
    } else if(player.velocity.y > 0) {
        player.switchSprites('fall');
    }


    // enemy
    enemy.velocity.x = 0;
    enemy.switchSprites('idle');

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.switchSprites('run');
        enemy.velocity.x -= 5;
    }
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprites('run');
        enemy.velocity.x += 5;
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprites('jump');
    } else if(enemy.velocity.y > 0) {
        enemy.switchSprites('fall');
    }



    if (rectangularCollision({ rect1: player, rect2: enemy }) && player.isAttacking) {
        // player.isAttacking = true;
        enemy.health -= 10;
        enemyHealth.style.width = enemy.health + '%';
        console.log('Player hit enemy' + enemy.health);
        if(enemy.isDead === false){
            enemy.takeHit();
        }
    }

    if (rectangularCollision({ rect1: enemy, rect2: player }) && enemy.isAttacking) {
        // enemy.isAttacking = true;
        player.health -= 10;
        playerHealth.style.width = player.health + '%';
        console.log('Enemy hit player: ' + player.health);
        if(player.isDead === false){
            player.takeHit();
        }
    }

    if (player.health <= 0 || enemy.health <= 0) {
        if(player.isDead === false && enemy.isDead === false) {
            displayTxt.style.display = 'flex';
            displayTxt.innerHTML = gameover;
            determineWinner({ player, enemy });
        }
    }
}

function getPoints() {
    let points;
    localStorage.getItem('points') ? points = JSON.parse(localStorage.getItem('points')) : points = {'player1': 0, 'player2': 0};
    return points;
}

function addPoints(winner) {
    if (winner === 'player1') {
        points.player1 += 1;
    }
    if (winner === 'player2') {
        points.player2 += 1;
    }
    localStorage.setItem('points', JSON.stringify(points));

}
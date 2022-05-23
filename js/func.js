function decreaseTimer() {
    if (timer >= 0) {
        if (timer == 0 || player.health <= 0 || enemy.health <= 0) {
            determineWinner({ player, enemy });
            timerP.innerHTML = 'TIME OUT!';
            document.getElementById('displayText').style.display = 'flex';
            document.getElementById('displayText').innerHTML = gameover;
        } else {
            timer--;
            setTimeout(decreaseTimer, 1000);
            timerP.innerHTML = timer;
        }

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
    if (player.health <= 0 || enemy.health <= 0 || timer <= 0) {
        // displayTxt.innerHTML = gameover;
        if (player.health === enemy.health) {
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


function animate() {
    window.requestAnimationFrame(animate);
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
    // if (keys.w.pressed && player.lastKey === 'w') {
    //     player.switchSprites('jump')
    //     player.velocity.y -= 1.5;
    // }
    if (player.velocity.y < 0) {
        player.switchSprites('jump');
    } else if(player.velocity.y > 0) {
        player.switchSprites('fall');
    }


    // enemy
    enemy.velocity.x = 0;
    enemy.switchSprites('idle');

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x -= 5;
    }
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x += 5;
    }
    if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y -= 1.5;
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

    if (player.health <= 0 || enemy.health <= 0 || timer <= 0) {
        displayTxt.style.display = 'flex';
        determineWinner({ player, enemy });
    }
}
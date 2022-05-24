const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const displayTxt = document.getElementById('displayText');
const timerP = document.querySelector('#timerP');
const enemyHealth = document.querySelector('#enemyHealth');
const playerHealth = document.querySelector('#playerHealth');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

let gameover = '<h1>Game Over</h1><br>' + '<button onclick="location.reload()">Restart</button>';

let timer = 100;
timerP.innerHTML = timer;

let points = getPoints();


const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./assets/background/background.png",
})

const shop = new Sprite({
    position: {
        x: 650,
        y: 175
    },
    imageSrc: "./assets/decorations/shop_anim.png",
    scale: 2.4,
    framesMax: 6,
})

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
    },
    scale: 2,
    sprites: {
        // idle: {
        //     imageSrc: "./assets/character/char_blue_idle.png",
        //     framesMax: 6,
        // },
        // run: {
        //     imageSrc: "./assets/character/char_blue_running.png",
        //     framesMax: 8,
        // },
        // jump: {
        //     imageSrc: "./assets/character/char_blue_jumping.png",
        //     framesMax: 4,
        // },
        // fall: {
        //     imageSrc: "./assets/character/char_blue_falling.png",
        //     framesMax: 4,
        // },
        // attack: {
        //     imageSrc: "./assets/character/char_blue_atk.png",
        //     framesMax: 6,
        // }
        idle: {
            imageSrc: "./assets/character/Mac/Idle.png",
            framesMax: 8,
        },
        run: {
            imageSrc: "./assets/character/Mac/Run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./assets/character/Mac/Jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./assets/character/Mac/Fall.png",
            framesMax: 2,
        },
        attack: {
            imageSrc: "./assets/character/Mac/Attack1.png",
            framesMax: 6,
        },
        dead: {
            imageSrc: "./assets/character/Mac/Death.png",
            framesMax: 6,
        }
    },
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
    },
    scale: 2,
    sprites: {
        idle: {
            imageSrc: "./assets/character/kenji/Idle.png",
            framesMax: 4,
        },
        run: {
            imageSrc: "./assets/character/kenji/Run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./assets/character/kenji/jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./assets/character/kenji/fall.png",
            framesMax: 2,
        },
        attack: {
            imageSrc: "./assets/character/kenji/Attack1.png",
            framesMax: 4,
        },
        dead: {
            imageSrc: "./assets/character/kenji/Death.png",
            framesMax: 7,
        }
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


decreaseTimer();
var animation;
animate();


window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {

        /* Player movement */
        case 'w':
            player.velocity.y = -20;
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
            if (player.isAttacking === false) {
                player.attack()
            }
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
            enemy.velocity.y = -20;
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            break;
        case 'ArrowDown':
            if (enemy.isAttacking === false) {
                enemy.attack()
            }
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

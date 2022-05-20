const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 768;

ctx.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;

class Sprite {
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 100;
        this.color = color;
        this.lastKey;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height;
        } else if(this.position.y <= 0) {
            this.velocity.y = 0;
            this.position.y = 1;
        }
        else {
            this.velocity.y += gravity;
        }

        if (this.position.x + this.width >= canvas.width) {
            this.velocity.x = 0;
            this.position.x = canvas.width - this.width;
        } else if(this.position.x <= 0) {
            this.velocity.x = 0;
            this.position.x = 0;
        }
    }
}



const player = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'lightblue'
})

const enemy = new Sprite({
    position: {
        x: 500,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'violet'
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
    
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x -= 5;
    }

    if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x += 5;
    }

    if(keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y -= 1.5;
    }


    // enemy
    enemy.velocity.x = 0;

    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x -= 5;
    }

    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x += 5;
    }

    if(keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y -= 1.5;
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

    }
})

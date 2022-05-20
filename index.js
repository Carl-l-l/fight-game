const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 768;

ctx.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 100;
    }

    draw() {
        ctx.fillStyle = 'red';
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
    }
})

const enemy = new Sprite({
    position: {
        x: 500,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}


animate();

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
            player.velocity.y = -10;
            break;
        case 'ArrowDown':
            player.velocity.y = 10;
            break;
        case 'ArrowLeft':
            player.velocity.x = -10;
            break;
        case 'ArrowRight':
            player.velocity.x = 10;
            break;
        case 'w':
            player.velocity.y = -10;
            break;
        case 's':
            player.velocity.y = 10;
            break;
        case 'a':
            player.velocity.x = -10;
            break;
        case 'd':
            player.velocity.x = 10;
            break;

    }
})

console.log(player);
class Sprite {
    constructor({ position }) {
        this.position = position;
        this.height = 150;
        this.width = 100;
    }

    draw() {}

    update() {
        this.draw();
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 500);
    }
}

class Fighter {
    constructor({ position, velocity, color, offset }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 100;
        this.color = color;
        this.lastKey;
        this.health = 100;
        this.isAttacking;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: this.width + 80,
            height: this.height - 100,
        };
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Attackbox
        if(this.isAttacking) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        this.draw();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

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

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 500);
    }
}
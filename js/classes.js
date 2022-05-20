class Sprite {
    constructor({ position, imageSrc, width, height, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.height = width;
        this.width = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 8;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    update() {
        this.draw();
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
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
        if (this.isAttacking) {
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
        } else if (this.position.y <= 0) {
            this.velocity.y = 0;
            this.position.y = 1;
        }
        else {
            this.velocity.y += gravity;
        }

        if (this.position.x + this.width >= canvas.width) {
            this.velocity.x = 0;
            this.position.x = canvas.width - this.width;
        } else if (this.position.x <= 0) {
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
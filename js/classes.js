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

class Fighter extends Sprite {
    constructor({ position, velocity, color, offset, imageSrc, scale = 1, framesMax = 1, sprites }) {
        super({ position, imageSrc, scale, framesMax });
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.color = color;
        this.lastKey;
        this.health = 100;
        this.isAttacking;
        this.isDead = false;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: this.width + 100,
            height: this.height - 100,
        };
        this.framesElapsed = 0;
        this.framesCurrent = 0;
        this.framesHold = 8;
        this.framesMax = 6;
        this.sprites = sprites;


        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }

        console.log(this.sprites)
    }

    update() {
        this.draw();

        this.image.height = 200;

        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                if (this.isDead === false) {
                    this.framesCurrent = 0;
                }
            }
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height >= canvas.height - this.image.height) {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.image.height - this.height;
        } else if (this.position.y <= 0) {
            this.velocity.y = 0;
            this.position.y = 1;
        } else {
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
        this.framesHold = 5;
        this.switchSprites('attack');
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
            this.framesHold = 10;
        }, 5000);

    }

    takeHit() {
        this.framesHold = 50;
        this.switchSprites('takeHit');
        setTimeout(() => {
            this.framesHold = 10;
        }, 5000)
    }

    death() {
        this.framesHold = 20;
        if (this.isDead === false) {
            this.isDead = true;
            this.switchSprites('dead');
        } else {
            return;
        }
    }

    switchSprites(sprite) {
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) {
            return;
        }
        if (this.image === this.sprites.dead.image) {
            if (this.framesCurrent === this.sprites.dead.framesMax - 1) {
                this.isDead = true;
                // window.cancelAnimationFrame(animation);

            }

            return;
        }


        switch (sprite) {
            case 'idle':
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
                break;
            case 'run':
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                break;
            case 'jump':
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesCurrent = 0;
                break;
            case 'fall':
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                break;
            case 'attack':
                this.image = this.sprites.attack.image;
                this.framesMax = this.sprites.attack.framesMax;
                this.framesCurrent = 0;
                break;
            case 'dead':
                this.image = this.sprites.dead.image;
                this.framesMax = this.sprites.dead.framesMax;
                this.framesCurrent = 0;
                break;
            case 'takeHit':
                this.image = this.sprites.takeHit.image;
                this.framesMax = this.sprites.takeHit.framesMax;
                // this.framesCurrent = 0;
                break;
            default:
                break;
        }

    }
}
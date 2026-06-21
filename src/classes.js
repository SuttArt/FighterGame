export class Sprite {
    constructor({
                    position,
                    canvRef,
                    imageSrc,
                    scale = 1,
                    framesMax = 1,
                }) {
        this.position = position;
        this.canvRef = canvRef;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 7; // to change speed animation
    }


    draw() {
        this.canvRef.ctx.drawImage(
            this.image,
            // crop position in image itself
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            // crop width and height
            this.image.width / this.framesMax,
            this.image.height,
            // position of the image in canvas
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    updateSprite() {
        this.draw()
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

}

export class Fighter {
    gravity = 0.4
    lastKey


    constructor({position, canvRef, velocity, color = 'red', offset}) {
        this.position = position;
        this.canvRef = canvRef;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.color = color;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 100,
            height: 50,
            offset,
        }
        this.isAttacking;
        this.health = 100;
    }


    draw() {
        this.canvRef.ctx.fillStyle = this.color
        this.canvRef.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


        // attack box
        if (this.isAttacking) {
            this.canvRef.ctx.fillStyle = "green"
            this.canvRef.ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height);
        }
    }

    updateSprite() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= this.canvRef.ctx.canvas.height - 60) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += this.gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}

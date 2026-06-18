export class Sprite {
    height = 150;
    gravity = 0.4
    lastKey


    constructor({position, canvRef, velocity, color = 'red', offset}) {
        this.position = position;
        this.canvRef = canvRef;
        this.velocity = velocity;
        this.width = 50;
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

    updateSpite() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= this.canvRef.ctx.canvas.height) {
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

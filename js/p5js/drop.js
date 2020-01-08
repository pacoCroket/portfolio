
class Drop {
    constructor(){
        this.pos = createVector(random(width), 0);
        this.vel = createVector(0, random(2,6));
        // this.speed = random(2,4);
        this.color = color(0, random(255));
        this.weight = random(2, 8);
        this.radioactive = false;
        this.radioactiveColor = random([primaryColor, primaryColor2]);
        this.lerpAmt = 0;
    }

    defeflect(toVector){
        var relVector = p5.Vector.sub(this.vel, toVector);
        relVector.setMag(100/relVector.mag());
        this.vel.add(relVector);
    }

    isOut() {
        return this.pos.y + this.vel.y*this.vel.y > windowHeight || this.pos.x + this.vel.x*this.vel.x > windowWidth;
    }

    move() {
        this.pos.add(p5.Vector.mult(this.vel, this.radioactive?0.6:1));
    }

    show() {
        stroke(this.getStateColor());
        strokeWeight(this.weight);
        line(this.pos.x, this.pos.y, this.pos.x-this.vel.x*this.vel.x, this.pos.y-this.vel.y*this.vel.y);
    }

    getStateColor() {
        if (!this.radioactive) {           
            this.lerpAmt -= lerpAmtRate;
        } else {
            this.lerpAmt += lerpAmtRate;            
        }
        this.lerpAmt = constrain(this.lerpAmt, 0, 1);
        return lerpColor(this.color, this.radioactiveColor, this.lerpAmt);
    }
}
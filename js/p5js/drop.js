class Drop {
  constructor() {
    this.pos = createVector(random(width), 0);
    this.alpha = random(30, 210);
    this._vel = createVector(0, map(this.alpha, 30, 220, 0.5, 3.5));
    this.vel = this._vel;
    this._color = color(0, this.alpha);
    this.color = this._color;
    this._weight = random(10, 1); //map(this._vel.y, 2, 5, 10, 1);
    this.weight = this._weight;
    this.radioactive = false;
    this.radioactiveColor = random([primaryColor, primaryColor2]);
    this.lerpAmt = 0;
    this.lerpAmtRate = lerpAmtRate * map(this._weight, 10, 1, 1 / 1.5, 1.5);
  }

  defeflect(toVector) {
    var relVector = p5.Vector.sub(this.vel, toVector);
    relVector.setMag(100 / relVector.mag());
    this.vel.add(relVector);
  }

  isOut() {
    return this.pos.y > windowHeight + this.vel.y * this.vel.y + 20;
  }

  move() {
    this.pos.add(this.vel);
  }

  show() {
    stroke(this.color);
    strokeWeight(this.weight);
    push();
    beginShape();
    translate(this.pos.x, this.pos.y);
    vertex(-this.vel.x / 2, -this.vel.y * this.vel.y);
    vertex(this.vel.x / 2, this.vel.y * this.vel.y);
    endShape();
    pop();
    // line(this.pos.x, this.pos.y, this.pos.x+this.vel.x*this.vel.x, this.pos.y+this.vel.y*this.vel.y*2);
  }

  lerp() {
    if (this.radioactive) {
      // this.lerpAmt -= this.lerpAmtRate*map(this.lerpAmt, 0, 1, 2, 0.5);
      this.lerpAmt = lerp(this.lerpAmt, 1, this.lerpAmtRate);
    } else {
      // this.lerpAmt += this.lerpAmtRate*map(this.lerpAmt, 0, 1, 2, 0.5);
      this.lerpAmt = lerp(this.lerpAmt, 0, this.lerpAmtRate * 1.5);
    }
    // this.lerpAmt = constrain(this.lerpAmt, 0, 1);

    this.color = lerpColor(this._color, this.radioactiveColor, this.lerpAmt);
    this.vel = p5.Vector.lerp(this._vel, p5.Vector.mult(this._vel, 0.25), this.lerpAmt);
    this.weight = lerp(this._weight, pow(this._weight, 1.5), this.lerpAmt);
  }

  parallaxShift(shiftVector) {
    shiftVector.mult(map(this.vel.y, 2, 5, 2, 0));
    this.pos.add(shiftVector);
  }
}

class WobblyPointer {
  constructor() {
    this.color = random([primaryColorFaded, primaryColor2Faded]);
    this.nodes = 100;
    this.r = deflectRadius * 1.8;
    this.toff = random(100);
    this.spikiness = random(0.05);
    this.noisyness = random(0, 0.2);
    this.roughness = random(0, 2);
    this.spikes = floor(random(6, 15));
    this.breath = random(0, 0.03);
    this.deltat = random(0.01, 0.05);
    this.sign = random([1, -1]);
  }

  shift() {
    this.toff += this.sign * this.deltat;
  }

  show() {
    noFill();
    stroke(this.color);
    strokeWeight(3);

    push();
    translate(mouseX, mouseY);
    beginShape();
    for (var i = 0; i < this.nodes; i++) {
      var alphaoff = map(i, 0, this.nodes, 0, TWO_PI);
      var x_ = cos(alphaoff);
      var y_ = sin(alphaoff);

      var r1 =
        this.r *
        (1 +
          this.breath * sin(this.toff) +
          this.spikiness * sin(this.spikes * alphaoff + this.toff) +
          this.noisyness * noise(x_ + 0.5, y_ + 0.5, this.toff) -
          0.5);
      // var r1 = this.r;
      vertex(r1 * x_, r1 * y_);
    }

    endShape(CLOSE);
    pop();
  }
}

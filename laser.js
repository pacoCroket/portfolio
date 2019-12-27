function Laser(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(8);
    this.len = 3;
    
    this.update = function() {
      this.pos.add(this.vel);
    }
    this.render = function() {
      push();
      stroke(edgeColor);
      strokeWeight(4); 
      line()
      line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * this.len, this.pos.y + this.vel.y * this.len);
      pop();
    }
    
    this.hits = function(asteroid) {
      var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
      if (d < asteroid.r) {
        return true;
      } else {
        return false;
      }
    }
    
    this.offscreen = function() {
      if (this.pos.x > width || this.pos.x < 0) {
        return true;
      }
      if (this.pos.y > height || this.pos.y < 0) {
        return true;
      }
      return false;
    }
    
    
  }
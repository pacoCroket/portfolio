let pixelSize = 10;
var lasers = [];
var asteroids = [];
var edgeColor;
var ship;
let theta;

function setup() {
    createCanvas(windowWidth, windowHeight);
    theta = PI / 3;
    edgeColor = color(0, 200, 0);
    ship = new Ship();

}

function draw() {
    background(0);

    for (var i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
          lasers[i].update();
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length-1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                if (asteroids[j].r > 10) {
                      var newAsteroids = asteroids[j].breakup();
                    asteroids = asteroids.concat(newAsteroids);
                }
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                break;
                }
            }
        }
      }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
    

}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
  }
  
  function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
      } else if (keyCode == RIGHT_ARROW) {
      ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
      ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
      ship.boosting(true);
    }
  }


var canvas;
var drops = [];
var dropLimit;
var deflectRadius;
var mousePos;
var lerpAmtRate = 0.018;
var wobblyPointers = [];
var pointers = 4;

// colors
var primaryColor;
var primaryColor2;
var primaryColorFaded;
var primaryColor2Faded;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    deflectRadius = windowHeight*0.2;
    dropLimit = width/15;
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.parent("p5js-sketch");
    
    strokeCap(ROUND);
    deflectRadius = windowHeight*0.2;
    dropLimit = width/15;
    
    primaryColor = color(50, 40, 187);
    primaryColor2 = color('#33c0a9');
    primaryColorFaded = color(50, 40, 187, 50);
    primaryColor2Faded = color('#33c0a944');

    for (var i = 0; i < pointers; i++) {
        wobblyPointers.push(new WobblyPointer());
    }
}

function draw() {
    // background(120);
    // transparent background
    clear();
    mousePos = createVector(mouseX, mouseY);
  

    // create new drops
    if (drops.length < dropLimit && frameCount % 2 == 0) {
        drops.push(new Drop());
    }

    // iterate thru drops
    for (var i = drops.length-1; i >= 0; i--) {
        // remove drop object if outside screen
        if (drops[i].isOut()) {drops.splice(i, 1); continue;}

        // if near mouse
        if (p5.Vector.sub(drops[i].pos, mousePos).mag() < deflectRadius) {
            // deflect
            // drops[i].defeflect(mousePos);
            // change class
            drops[i].radioactive = true;
        } else {
            drops[i].radioactive = false;
        }

        // update lerp state
        drops[i].lerp();
        // move the drop
        drops[i].move();
        // show the drop
        drops[i].show();
    }

    // show pointer
    for (var i = 0; i < wobblyPointers.length; i++) {
        wobblyPointers[i].show();
        wobblyPointers[i].shift();
    }

}

var canvas;
var drops = [];
var dropLimit;
var deflectRadius;
var mousePos;
var lerpAmtRate = 0.04;
var wobblyPointers = [];
var pointers = 4;
var toggleBtn;
var animationOn = true;

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
    canvas.parent("#rain-sketch");
    // select('body').mouseWheel(parallaxDrops);
    toggleBtn = select('#animationToggle');
    toggleBtn.mousePressed(toggleAnimation);
    
    strokeCap(ROUND);
    deflectRadius = windowHeight*0.2;
    dropLimit = width/15;
    
    primaryColor = color('#3D17A5');
    primaryColor2 = color('#0CCE80');
    primaryColorFaded = color('#3D17A544');
    primaryColor2Faded = color('#0CCE8044');

    for (var i = 0; i < pointers; i++) {
        wobblyPointers.push(new WobblyPointer());
    }
}

function draw() {
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
        if (animationOn && p5.Vector.sub(drops[i].pos, mousePos).mag() < deflectRadius) {
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

function toggleAnimation() {
    animationOn = !animationOn;

    if (!animationOn) {
        dropLimit = 0;
        wobblyPointers = [];
    } else {
        resetElements();
    }
}

function resetElements() {    
    dropLimit = width/15;

    for (var i = 0; i < pointers; i++) {
        wobblyPointers.push(new WobblyPointer());
    }
}

function parallaxDrops(event) {
    var scrollShift = createVector(event.deltaX, event.deltaY).mult(0.005);
    // iterate thru drops
    for (var i = drops.length-1; i >= 0; i--) {
        drops[i].parallaxShift(scrollShift);
    }

}
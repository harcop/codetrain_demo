let qtree;

function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200,200,200,200);
    qtree = new QuadTree(boundary, 4)
    
    // for (let i = 0; i < 500; i++) {
    //     let p = new Point(random(width), random(height));
    //     qtree.insert(p)
    // }
}

function draw() {

    if (mouseIsPressed) {
        for (let i = 0; i < 5; i++) {
            let m = new Point(mouseX+random(-5, 5), mouseY + random(-5, 5));
            qtree.insert(m);
        }
    }

    background(0);
    qtree.show();

    
    stroke(35, 65, 23);
    noFill();
    strokeWeight(2);
    mouseMoved(qtree);
}

function mouseMoved() {
    let rec = new Rectangle(mouseX, mouseY, 60, 60);
    rectMode(CENTER);
    rect(mouseX, mouseY, 100, 100);
    qtree.extract(rec)
}
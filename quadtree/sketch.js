let qtree;

function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200,200,200,200);
    qtree = new QuadTree(boundary, 4)
    
    for (let i = 0; i < 500; i++) {
        let p = new Point(random(width), random(height));
        qtree.insert(p)
    }
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


    stroke(0, 255, 0);
    rectMode(CENTER);
    let range = new Rectangle(mouseX, mouseY, 107, 75);
    rect(range.x, range.y, range.w*2, range.h*2);
    let points = [];
    qtree.query(range, points);
    for(const p of points) {
        strokeWeight(4);
        point(p.x, p.y);
    }
}

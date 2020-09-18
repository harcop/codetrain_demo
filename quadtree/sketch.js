function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200,200,200,200);
    let qtree = new QuadTree(boundary, 4)
    
    for (let i = 0; i < 500; i++) {
        let p = new Point(random(width), random(height));
        qtree.insert(p)
    }

    console.log(qtree);
    background(0);
    qtree.show();
}
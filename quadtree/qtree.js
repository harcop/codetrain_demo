class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains (point) {
        return (point.x > this.x - this.w && 
            point.x < this.x + this.w &&
            point.y > this.y - this.h && 
            point.y < this.y + this.h
            );
    }
}

class QuadTree {
    constructor (boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity || 4;
        this.points = [];
        this.divided = false;
    }

    subdivide () {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let nw = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity);
        let sw = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southeast = new QuadTree(se, this.capacity);
        this.divided = true;
    }
    
    insert(point) {

        if (!this.boundary.contains(point)) {
            return;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);
        }
    }

    show () {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
        for(let p of this.points) {
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}
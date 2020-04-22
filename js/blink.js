function Blink(x, y, s, a){
    this.body = Bodies.polygon(x, y, 3, s, {
        friction: 0.8,
        frictionAir: 0.8,
        isStatic: true,
        inertia: Infinity, //disable rotation
        angle: a,
        // chamfer: {
        //     radius: 10 //rounded corner
        // }
    });

    // Blink.prototype.show = function() {
    //     fill(250, 240);
    //     stroke(130);
    //     var pos = this.body.positiion;
    //     push();
    //     translate(pos.x, pos.y);
    //     pop();
    // }
    
    rectMode(CORNER);
    World.addBody(world, this.body);
    return this.body;
    // console.log(this.body.vertices);
}

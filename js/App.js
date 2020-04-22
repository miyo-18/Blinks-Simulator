var BLOCK_RADIUS = 24;

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;

var engine;
var world;
var mouseConstraints;
var curr_dragging;
var target_shadow;
var blocks = [];

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    background(100);

    // setup matter
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0;
    world.gravity.scale = 0;
    Engine.run(engine);

    // add hexgons
    // blocks.push(generateBlock(width/2, height/2, BLOCK_RADIUS * 2));
    // blocks.push(generateBlock(width/2, height/2, BLOCK_RADIUS * 2));
    // // console.log(blocks[0]);

    one = generateBlock(400, 300, 50, PI/2);
    two = generateBlock(400, 300, 50, -PI/2);
    blocks.push(one);
    blocks.push(two);


    // add triangle
    // var one = new Blink(width / 2, height/2, BLOCK_RADIUS * 2, PI/2);
    // var two = new Blink(width/2, height/2, BLOCK_RADIUS * 2, -PI/2);
    // var three = new Blink(width / 2 - BLOCK_RADIUS * 2, height/2, BLOCK_RADIUS * 2, PI/2);
    // var four = new Blink(width/2 - BLOCK_RADIUS * 2, height/2, BLOCK_RADIUS * 2, -PI/2);
    // var five = new Blink(width/2, height/2 + BLOCK_RADIUS * 2, BLOCK_RADIUS * 2, PI/2);
    // var six = new Blink(width / 2 + BLOCK_RADIUS * 2, height/2 + BLOCK_RADIUS * 2, BLOCK_RADIUS * 2, -PI/2);

    // var two = new Blink(width/2, height/2, BLOCK_RADIUS * 2, PI/3);
    // blocks.push(one);
    // blocks.push(two);
    // blocks.push(three);
    // blocks.push(four);
    // blocks.push(five);
    // blocks.push(six);

    // var blinkA = Body.create({
    //   parts: [one, two, three, four, five, six]
    // })
    //
    // World.add(world, blinkA);

    // add walls
    World.add(world, [
        Bodies.rectangle(windowWidth/2, -20, windowWidth, 40, { isStatic: true }), //top
        Bodies.rectangle(windowWidth/2, windowHeight + 20, windowWidth, 40, { isStatic: true }), //bottom
        Bodies.rectangle(windowWidth + 20, windowHeight/2, 40, windowHeight, { isStatic: true }), //right
        Bodies.rectangle(-20, windowHeight/2, 40, windowHeight, { isStatic: true }) //left
    ]);

    // add mouse interaction
    var mouse = Mouse.create(canvas.elt);
    mouseConstraints =  MouseConstraint.create(engine, {
        mouse: mouse
    });
    mouse.pixelRatio = pixelDensity();
    World.add(
        world,
        mouseConstraints
    );

    Events.on(mouseConstraints, 'startdrag', function(){
        curr_dragging = mouseConstraints.body;
        startDrag();
    });
    Events.on(mouseConstraints, 'mousemove', function(){
        if(curr_dragging){
            duringDrag();
        }
    });
    Events.on(mouseConstraints, 'enddrag', function(){
        endDrag();
        curr_dragging = null;
    });
}

function draw() {
    background(200);
    //drawTargetShadow();
    drawBlocks();
}

function generateBlock(x, y, s, a){
    var block = Matter.Bodies.polygon(x, y, 3, s, {
        friction: 0.8,
        frictionAir: 0.8,
        inertia: Infinity, //disable rotation
        angle: a,
        chamfer: {
            radius: 3 //rounded corner
        }
    });
    Matter.World.addBody(engine.world, block);
    return block;
}

function drawBlocks(){
    for(var i=0; i<blocks.length; i++){
        var one = blocks[i];
        // console.log(one.vertices);
        // one.vertices[0].x = 400;
        // one.vertices[0].y = 300;
        // draw stroke
        noStroke();
        fill(250, 240);
        beginShape();
        for(var j=0; j<one.vertices.length; j++ ){
            var ver = one.vertices[j];
            vertex(ver.x, ver.y);
        }
        endShape(CLOSE);

        // draw angle indicator
        // stroke(255, 0, 0);
        // line(one.position.x,
        //     one.position.y,
        //     one.vertices[0].x/2 + one.vertices[one.vertices.length-1].x/2,
        //     one.vertices[0].y/2 + one.vertices[one.vertices.length-1].y/2);
    }
}

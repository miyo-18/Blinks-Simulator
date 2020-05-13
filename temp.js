var engine;
var render;
var world;

const { Render, Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;

// engine
engine = Engine.create();
engine.world.gravity.y = 0;
engine.world.gravity.scale = 0;
world = engine.world;

// render
render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: 'gray',
    delta: 1000/60,
    isFixed: false,
    enabled: true
    // showAngleIndicator: true
  }
});

// add walls
World.add(world, [
  Bodies.rectangle(width/2, -50, width, 102, { isStatic: true }), // top
  Bodies.rectangle(width/2, height + 50, width, 102, { isStatic: true }), // bottom
  Bodies.rectangle(width + 50, height/2, 102, height, { isStatic: true }), // right
  Bodies.rectangle(-50, height/2, 102, height, { isStatic: true }) // left
]);

// add blinks
blink1 = makeBlink(200, 300);
blink2 = makeBlink(300, 325);
blink3 = makeBlink(400, 300);
blink4 = makeBlink(500, 325);
blink5 = makeBlink(600, 300);

// mouse controls
var mouse = Mouse.create(render.canvas);
var mConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.1,
    render: {
      visible: false
    }
  }
});
World.add(world, mConstraint);
render.mouse = mouse;

// run engine and render
Engine.run(engine);
Render.run(render);

// spiral through colors
// var s = setInterval(spiral(blink1), 300);
var s1 = setInterval(function() { spiral(blink1) }, 1200);
var s2 = setInterval(function() { spiral(blink2) }, 1200);
var s3 = setInterval(function() { spiral(blink3) }, 1200);
var s4 = setInterval(function() { spiral(blink4) }, 1200);
var s5 = setInterval(function() { spiral(blink5) }, 1200);

Engine.update(engine, 1000/30);

// resize area when screen size changes automatically
window.onresize = function(event){
  document.location.reload(true);
}

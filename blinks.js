var engine;
var render;
var world;

Matter.use('matter-attractors');
const { Render, Engine, World, Body, Bodies, Mouse, MouseConstraint, Constraint, Events } = Matter;

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

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
    background: 'black',
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

Engine.update(engine, 1000/30);

// resize area when screen size changes automatically
window.onresize = function(event){
  document.location.reload(true);
}

// add blinks
// blink1 = makeBlink(100, 300);
// blink2 = makeBlink(200, 325);
// blink3 = makeBlink(300, 300);
// blink4 = makeBlink(400, 325);
// blink5 = makeBlink(500, 300);
// blink6 = makeBlink(700, 325);

var blinks = [];

var addBlink = function() {
  if (blinks.length == 6){
    // alert("You can only have up to 6 blinks at one time.");
    // document.getElementById("error-message").style.visibility = "visible";
    // setTimeout(function(){
    //   document.getElementById("error-message").style.visibility = "hidden";
    // }, 3000);
  } else {
    blinks.push(makeBlink(Math.random()*(width-200) + 100, Math.random()*(height-200) + 100));
  }
}

// spiral through colors
// var s = setInterval(spiral(blink1), 300);
// var s1 = setInterval(function() { spiral(blink1) }, 1200);
// var s2 = setInterval(function() { spiral(blink2) }, 1200);
// var s3 = setInterval(function() { spiral(blink3) }, 1200);
// var s4 = setInterval(function() { spiral(blink4) }, 1200);
// var s5 = setInterval(function() { spiral(blink5) }, 1200);

$(document).ready(function(){
  $('#add-blink').click(function() {
    addBlink();
  });
  $(function(){
    setInterval(function(){
      for (i = 0; i < blinks.length; i++){
        spiral(blinks[i])
      }
    }, 1200);
  });
});

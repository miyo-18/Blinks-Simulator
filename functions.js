var pi = Math.PI;
// green, purple, blue, yellow, red, pink
var colors = ['#06D6A0', '#8338EC', '#00DAF0', '#FBFF12', '#F94144', '#FA07CD']

// make a triangle
function makeTriangle(x, y, a, c, id) {
  return Bodies.polygon(x, y, 3, 29, { angle: a, id: id, label: c, chamfer: { radius: 2 }, render: {fillStyle: 'black', strokeStyle: 'black', lineWidth: 2}});
}

// make a hexagon
function makeHex(x, y) {
  return Bodies.polygon(x, y, 6, 50, { id: 'hex', chamfer: { radius: 2 }, render: {fillStyle: 'black'}});
}

// shuffle array of colors
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

// make a compound body consisting of a hexagon and six triangles
function makeBlink(x, y) {
  // shuffle(colors);
  console.log(colors);
  var hex = makeHex(x, y);
  var tri1 = makeTriangle(x - 15, y - 25, 0, colors[0], 'tri1');
  var tri2 = makeTriangle(x - 29, y, 2*-pi/6, colors[1], 'tri2');
  var tri3 = makeTriangle(x - 15, y + 25, 2*pi/3, colors[2], 'tri3');
  var tri4 = makeTriangle(x + 15, y + 25, -pi, colors[3], 'tri4');
  var tri5 = makeTriangle(x + 29, y, pi + 2*pi/6, colors[4], 'tri5');
  var tri6 = makeTriangle(x + 15, y - 25, -pi/3, colors[5], 'tri6');
  var blink = Body.create({
    parts: [hex, tri1, tri2, tri3, tri4, tri5, tri6],
    inertia: Infinity,
    friction: 0.2,
    frictionAir: 0.3
  })
  World.add(world, blink);
  return blink;
}

// has the blink object passed through go through it's colors in a spiral
function change(blink, i) {
  blink.parts[i].render.fillStyle = blink.parts[i].label;
  setTimeout(function() {
    blink.parts[i].render.fillStyle = 'black';
    if (i < 7) {
      i++;
      change(blink, i);
    }
  }, 200);
}

function spiral(blink) {
  var num = 2;
  change(blink, num);
}

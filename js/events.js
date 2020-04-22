// Events
function startDrag(){
    // console.log('start drag', curr_dragging);
}

function duringDrag(){
    // console.log('during drag', curr_dragging);
    checkLocations();
}

function endDrag(){
    // console.log('end drag', curr_dragging);
    if(target_shadow){
        Body.setPosition(curr_dragging, {
            x: target_shadow.body.position.x + target_shadow.offset.x,
            y: target_shadow.body.position.y + target_shadow.offset.y
        })
        clearTargetShadow();
    }
}

function checkLocations(){
    for(var i=0; i<blocks.length; i++){
        var one = blocks[i];
        if(one.id !== curr_dragging.id){
            var d = dist(curr_dragging.position.x, curr_dragging.position.y, one.position.x, one.position.y);
            if(d < BLOCK_RADIUS * 5) {
                // draw target location
                var angleDeg = degrees(atan2(curr_dragging.position.y - one.position.y, curr_dragging.position.x - one.position.x));
                var targetDeg = int(((angleDeg + 360 + 30) % 360) / 60);
                updateTargetShadow(one, targetDeg);
            }
            else {
                clearTargetShadow();
            }
        }
    }
}

function clearTargetShadow() {
    target_shadow = null;
}

function updateTargetShadow(body, deg){
    var offsetX = cos(radians(deg * 60)) * BLOCK_RADIUS * 3.3334;
    var offsetY = sin(radians(deg * 60)) * BLOCK_RADIUS * 3.3334;
    // console.log('draw target location', body, deg, offsetX, offsetY);
    target_shadow = {
        body: body,
        offset: {
            x: offsetX,
            y: offsetY
        },
        vertices: []
    }
    for(var i=0; i<body.vertices.length; i++ ){
        var ver = body.vertices[i];
        target_shadow.vertices.push({
            x: ver.x + offsetX,
            y: ver.y + offsetY
        })
    }
}

function drawTargetShadow(){
    if(!target_shadow) return;
    noStroke();
    fill(60);
    beginShape();
    for(var i=0; i<target_shadow.vertices.length; i++ ){
        var ver = target_shadow.vertices[i];
        vertex(ver.x, ver.y);
    }
    endShape(CLOSE);
}

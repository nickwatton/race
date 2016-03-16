(function(){
    'use strict';

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    var width=650, height=400,
    PI = Math.PI,
    twoPI = PI*2,
    PIforRadToDeg = 180 / PI,
    PIforDegToRad = PI / 180,
    running=true,
    radians,

    path, pathString='', pathLength, pathPt={x:0,y:0},
    percent=0, pt, pt2, pcStep=.0015, keyStep=.01,

    wrapper = get("wrapper"),
    currentDeg = get("currentDeg"),
    pathLengthDOM = get("pathLength"),
    pathDataDOM = get("pathData"),
    arrowDOM = get("arrow"), arrowDOMShowing=true,
    canvas, ctx, showTrail=true, drawDotSprite=true, drawLineSprite=false,
    isInteractive = true,
    inMemoryCanvas, inMemoryCxt, showPath=false,
    canvasOffset = {x:0, y:0};

    function setupCanvas(){
        canvas = createCanvas('canvas', width, height);
        ctx = canvas.getContext('2d');
        wrapper.appendChild(canvas);

        var rect = canvas.getBoundingClientRect();
        canvasOffset.x = rect.left - 10;
        canvasOffset.y = rect.top - 10;

        inMemoryCanvas = createCanvas('inMemoryCanvas', width, height);
        inMemoryCxt = inMemoryCanvas.getContext('2d');
        inMemoryCxt.strokeStyle = "#ddd";
        inMemoryCxt.beginPath();

    }

    function buildPath(){
        path = document.createElementNS('http://www.w3.org/2000/svg','path');

        /* Silverstone */
        moveTo(231.25,162.65, false);
        quadraticCurveTo(254.6,195.2,220.85,214, false);
        lineTo(125.85,285.4, false);
        quadraticCurveTo(112.75,296.35,138.85,303.4, false);
        lineTo(448.85,346.8, false);
        quadraticCurveTo(454.5,347.4,458.85,347.6, false);
        quadraticCurveTo(462.25,347.7,464.85,347.6, false);
        quadraticCurveTo(473,347.15,471.3,342.9, false);
        quadraticCurveTo(469.9,339.55,462.55,333.9, false);
        quadraticCurveTo(461.75,333.3,439.7,311.45, false);
        quadraticCurveTo(435.9,307.65,433,303.9, false);
        quadraticCurveTo(423.35,291.35,423.65,278.9, false);
        quadraticCurveTo(423.65,277.4,423.85,275.9, false);
        quadraticCurveTo(423.95,274.9,424.15,273.9, false);
        quadraticCurveTo(424.7,270.9,423.85,259.9, false);
        lineTo(248.85,245.9, false);
        quadraticCurveTo(225.4,241.25,248.85,224.9, false);
        lineTo(312.85,181.95, false);
        quadraticCurveTo(347.6,153.5,316.85,135.95, false);
        lineTo(239.85,98.95, false);
        quadraticCurveTo(217.85,118.4,188.85,99.95, false);
        quadraticCurveTo(156.4,77.4,157.85,69.95, false);
        quadraticCurveTo(160.9,42.65,133.85,37.95, false);
        quadraticCurveTo(79.25,45.75,100.85,77.95, false);
        lineTo(151.85,106.95, false);
        quadraticCurveTo(175.85,119.45,177.9,140.7, false);
        lineTo(208.85,160.95, false);
        quadraticCurveTo(218.1,165.3,231.25,162.65, false);
        /* Silverstone END */

        path.setAttribute('d', pathString);
        pathLength = path.getTotalLength();

        inMemoryCxt.stroke();

        // Some reporting to the page
        pathLengthDOM.innerHTML = pathLength >> 0;
        pathDataDOM.innerHTML = pathString;
    }

    function draw(){
        // fade the content
        ctx.fillStyle = "rgba(255,255,255,"+ (showTrail?".25":"1") +")";
        ctx.fillRect(0,0,width,height);

        // get desired animation point
        pt = path.getPointAtLength(pathLength * (isInteractive ? percent : (percent+=pcStep)));

        // look ahead, for rotation
        pt2 = path.getPointAtLength(pathLength * (percent + pcStep*5));

        if(showPath)
            ctx.drawImage(inMemoryCanvas,0,0);

        // draw sprite(s) at animation point
        if(drawDotSprite)
            drawCircle(pt.x,pt.y,5, '#E85676');
        if(drawLineSprite)
            drawLine(pt.x,pt.y, pt2.x,pt2.y, '#E85676');

        // report degree of rotation, with fast bitwise flooring
        radians = rotateTowards(pt.x,pt.y, pt2.x,pt2.y);
        currentDeg.innerHTML = radToDeg(radians) >> 0;

        arrowDOM.style.left = (canvasOffset.x + pt.x) + "px";
        arrowDOM.style.top = (canvasOffset.y + pt.y) + "px";
        arrowDOM.style.WebkitTransform = "rotate("+(radToDeg(radians)*-1)+"deg)"

        // animation increment
        if(percent >= 1)
            percent=0;
    }

    function animate(){
        draw();
        if(running)
            requestAnimFrame(animate);
    }

    window.onload = function() {
        setupCanvas();
        buildPath();
        setUpEvents();
        animate();
    };

    function setUpEvents(){
        var option1 = get("showPath").addEventListener("click", function(){showPath = !showPath;}, false),
        option2 = get("showDot").addEventListener("click", function(){drawDotSprite = !drawDotSprite;}, false),
        option3 = get("showLine").addEventListener("click", function(){drawLineSprite = !drawLineSprite;}, false),
        option4 = get("showTrails").addEventListener("click", function(){showTrail = !showTrail;}, false),
        option5 = get("interact").addEventListener("click", function(){isInteractive = !isInteractive;}, false),
        option6 = get("showArrow").addEventListener("click", function(){ arrowDOMShowing=!arrowDOMShowing; arrowDOM.style.display = arrowDOMShowing ? "block" : "none" }, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        // canvas.addEventListener('mousemove', function(evt) {
        //     var mousePos = getMousePos(canvas, evt);
        //     if(isInteractive) percent = mousePos.x / width;
        // }, false);


        document.addEventListener('keydown', function(evt) {
            // console.log(evt)
            switch(evt.keyCode){
                case 32:
                    percent+=keyStep;
                    console.log(percent)
                break;
            }
        }, false);

        document.addEventListener('keyup', function(evt) {
            // console.log("kkjl")
            switch(evt.keyCode){
                case 32:
                    percent-=keyStep;
                break;
            }
        }, false);
    }

    /* MATH METHODS */
    function rotateTowards(x1, y1, x2, y2){
        var dx = x2-x1,
            dy = y2-y1;
        return Math.atan2(dx,dy);
    }

    function radToDeg(rad){
        return rad * PIforRadToDeg;
    }
    function degToRad(deg){
        return rad * PIforDegToRad;
    }

    /* DRAWING METHODS */
    /* target:pt, relative=true */
    function moveTo(dx, dy, relative){
        if(relative == undefined) relative = true;
        pathString += (relative ? "m" : "M") + dx +" "+ dy;

        relative ?  inMemoryCxt.moveTo(pathPt.x+dx, pathPt.y+dy) :
                    inMemoryCxt.moveTo(dx, dy);

        updatePathPoint(dx, dy, relative);
    }

    /* target:pt, relative=true */
    function lineTo(dx, dy, relative){
        if(relative == undefined) relative = true;
        pathString += (relative ? "l" : "L") + dx +" "+ dy;

        relative ?  inMemoryCxt.lineTo(pathPt.x+dx, pathPt.y+dy) :
                    inMemoryCxt.lineTo(dx, dy);

        updatePathPoint(dx, dy, relative);
    }

    /* control point:pt, target:pt, relative=true */
    function quadraticCurveTo(cx, cy, dx, dy, relative){
        if(relative == undefined) relative = true;
        pathString += (relative ? "q" : "Q") + cx +" "+ cy +" "+ dx +" "+ dy;

        relative ?  inMemoryCxt.quadraticCurveTo(pathPt.x+cx, pathPt.y+cy, pathPt.x+dx, pathPt.y+dy) :
                    inMemoryCxt.quadraticCurveTo(cx, cy, dx, dy);

        updatePathPoint(dx, dy, relative);
    }

    /* two control points:pt, target:pt, relative=true */
    function bezierCurveTo(cx1, cy1, cx2, cy2, dx, dy, relative){
        if(relative == undefined) relative = true;
        pathString += (relative ? "c" : "C") + cx1 +" "+ cy1 +" "+ cx2 +" "+ cy2 +" "+ dx +" "+ dy;

        relative ?  inMemoryCxt.bezierCurveTo(pathPt.x+cx1, pathPt.y+cy1, pathPt.x+cx2, pathPt.y+cy2, pathPt.x+dx, pathPt.y+dy) :
                    inMemoryCxt.bezierCurveTo(cx1, cy1, cx2, cy2, dx, dy);

        updatePathPoint(dx, dy, relative);
    }

    /* keeps absolute reference to current end point during build
    *  target:pt, relative:boolean */
    function updatePathPoint(dx, dy, relative){
        if(relative){
            pathPt.x += dx;
            pathPt.y += dy;
        }
        else{
            pathPt.x = dx;
            pathPt.y = dy;
        }
    }

    /* DRAWING METHODS */
    /* Draws a circle
    *  target:pt, radius, colour */
    function drawCircle(x, y, radius, colour) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.arc(x, y, radius, 0, twoPI);
        ctx.fill();
    }

    /* Draws a rectangle
    *  target:pt, width, height, colour */
    function drawRect(x, y, w, h, colour) {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, w, h);
        ctx.fill();
    }

    /* Draws a rectangle
    *  target:pt, width, height, colour */
    function drawLine(x, y, dx, dy, colour) {
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(dx,dy);
        ctx.stroke();
    }

    /* GENERAL HELPERS */
    /* Creates a canvas
    *  canvas ID, width, height */
    function createCanvas(id, w, h){
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.id = id;
        return canvas;
    }

    /* Utility shortcut to getElementById()
    *  Element's DOM id */
    function get(id){
        return document.getElementById(id);
    }

}());
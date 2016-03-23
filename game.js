
var width=1750, height=1000,
    PI = Math.PI,
    twoPI = PI*2,
    PIforRadToDeg = 180 / PI,
    PIforDegToRad = PI / 180,
    running=true,
    radians,
    path,
    pathString='M355.3,68.4c-14.8-11-67.8-50.3-82.8-61.3c-6.1-4.5-12.9-7.3-20.9-6.4c-27.6,3.1-50.3,15.9-69.8,35.1c-3.9,3.9-6.9,8.8-9.9,13.5c-3.2,4.9-3.6,10.6-0.1,15.3c4.3,5.7,9.2,11.1,14.4,16c7.4,7.1,7.7,9.8,0.4,16.5c-21.9,20-43.9,40-65.7,60.1c-17.4,16.1-35.6,31.2-56.6,42.5c-13,6.9-26.3,13.4-38.6,21.4c-28.7,18.5-33.7,56.4-11,82c5.9,6.6,13,12.2,20.1,17.5c12.2,8.9,120.3,71.2,139.4,81.2c67.1,35.1,134.2,70.1,201.3,105.2c10.8,5.7,22.2,10.7,32.2,17.6c13.2,9.2,20.7,23.5,29.2,36.7c5.5,8.5,11,17.2,17.6,24.8c10.5,11.8,23.9,16.5,39.9,13.7c14.4-2.5,24.8-11.9,35.8-20.3c16.4-12.4,34.5-14.2,53.7-7.9c14.4,4.8,28.6,10,43,14.7c11.3,3.7,22.4,3.5,32.9-3.1c7-4.4,14.2-8.7,21.7-12.1c8-3.7,16.4-7.8,25-8.9c19.1-2.5,38.4-3.3,57.6-4.6c25-1.6,50.2-2.2,75.1-4.6c43.9-4.2,85.5-18,126.5-33.7c24-9.2,35.2-28.1,34.8-53.6c-0.3-13-1.4-26.1-2.6-39.1c-2.7-30.3-5.5-60.7-8.5-91c-1.4-13.8-3.3-27.6-5-41.3c-3.6-28.3-5.8-57-11.3-84.9c-5.4-27.4-24.7-46.7-46.6-62.4c-28.3-20.3-60.8-33.3-92.1-47.9c-18.1-8.5-43.7-0.6-47.6,26.4c-3.2,22.6,9.2,39.2,31.6,41c11.6,0.9,23.1,1.7,34.7,2.7c10.7,0.9,18.1,7.1,19.8,16.7c3,17-1.3,32.2-12.6,45.1c-46.7,53.2-93.6,106.1-140.4,159.2c-30.2,34.2-60.7,68.2-90.4,102.8c-9.1,10.6-19.3,13.6-32.4,12.7c-23.7-1.7-45.9-8.8-67.9-17c-5.2-1.9-10.5-4-10.7-10.6c-0.2-7,5.5-9.1,10.8-11.3c1-0.4,2-0.6,3-0.9c12.7-3.9,25.4-7.7,38.1-11.7s20.3-14.1,18-25.4c-1-5.1-3.6-10.3-6.8-14.4c-20.5-25.3-41.6-50.1-61.9-75.6c-5.7-7.1-10.4-15.6-13.2-24.3c-6.1-18.5-3.7-37.6-1-56.6c2.6-17.8,6.7-35.5,4.5-53.8c-1.8-15.4-6.7-29.1-21-37.6c-5.7-3.4-11-7.4-16.4-11.3c-28.9-21.3-57.8-42.7-86.7-64C375.7,83.5,365.4,75.9,355.3,68.4',
    pathString2='M359.3,67.4c-14.8-11-67.8-50.3-82.8-61.3c-6.1-4.5-12.9-7.3-20.9-6.4c-27.6,3.1-50.3,15.9-69.8,35.1c-3.9,3.9-6.9,8.8-9.9,13.5c-3.2,4.9-3.6,10.6-0.1,15.3c4.3,5.7,9.2,11.1,14.4,16c7.4,7.1,7.7,9.8,0.4,16.5c-21.9,20,59.4,107.9-65.7,60.1c-17.4,16.1-35.6,31.2-56.6,42.5c-13,6.9-26.3,13.4-38.6,21.4c-28.7,18.5-33.7,56.4-11,82c5.9,6.6,13,12.2,20.1,17.5C51,328.5,208.9,274,228,284c67.1,35.1,84.4,186.9,151.5,222c10.8,5.7,22.2,10.7,32.2,17.6c13.2,9.2,20.7,23.5,29.2,36.7c5.5,8.5,11,17.2,17.6,24.8c10.5,11.8,23.9,16.5,39.9,13.7c14.4-2.5,24.8-11.9,35.8-20.3c16.4-12.4,34.5-14.2,53.7-7.9c14.4,4.8,28.6,10,43,14.7c11.3,3.7,22.4,3.5,32.9-3.1c7-4.4,14.2-8.7,21.7-12.1c8-3.7,16.4-7.8,25-8.9c19.1-2.5,38.4-3.3,57.6-4.6c25-1.6,50.2-2.2,75.1-4.6c43.9-4.2,85.5-18,126.5-33.7c24-9.2,35.2-28.1,34.8-53.6c-0.3-13-1.4-26.1-2.6-39.1c-2.7-30.3-5.5-60.7-8.5-91c-1.4-13.8-3.3-27.6-5-41.3c-3.6-28.3-5.8-57-11.3-84.9c-5.4-27.4-24.7-46.7-46.6-62.4c-28.3-20.3-60.8-33.3-92.1-47.9c-18.1-8.5-43.7-0.6-47.6,26.4c-3.2,22.6,9.2,39.2,31.6,41c11.6,0.9,23.1,1.7,34.7,2.7c10.7,0.9,18.1,7.1,19.8,16.7c3,17-1.3,32.2-12.6,45.1c-46.7,53.2-93.6,106.1-140.4,159.2c-30.2,34.2-60.7,68.2-90.4,102.8c-9.1,10.6-19.3,13.6-32.4,12.7c-23.7-1.7-45.9-8.8-67.9-17c-5.2-1.9-10.5-4-10.7-10.6c-0.2-7,5.5-9.1,10.8-11.3c1-0.4,2-0.6,3-0.9c12.7-3.9,25.4-7.7,38.1-11.7s20.3-14.1,18-25.4c-1-5.1-3.6-10.3-6.8-14.4c-20.5-25.3-41.6-50.1-61.9-75.6c-5.7-7.1-10.4-15.6-13.2-24.3c-6.1-18.5-3.7-37.6-1-56.6c2.6-17.8,6.7-35.5,4.5-53.8c-1.8-15.4-6.7-29.1-21-37.6c-5.7-3.4-11-7.4-16.4-11.3c-28.9-21.3-57.8-42.7-86.7-64C379.7,82.5,369.4,74.9,359.3,67.4',
    pathLength,
    pathLength2,
    pathPt={x:0,y:0},
    percent=0,
    percentB=0.5,
    pt, ptB,
    pt2, pt2B,
    pcStep=0,
    pcStepB=0,
    keyStep=.0035,

    wrapper = get("wrapper"),
    currentDeg = get("currentDeg"),
    pathLengthDOM = get("pathLength"),
    pathDataDOM = get("pathData"),
    arrowDOM = get("arrow"), arrowDOMShowing=true,
    canvas, ctx, showTrail=true, drawDotSprite=true, drawLineSprite=false,
    isInteractive = true,
    inMemoryCanvas, inMemoryCxt, inMemoryCxt2, showPath=true,
    canvasOffset = {x:0, y:0},
    keyPress = false;


;(function() {

	// main game object
	var Game = function() {

		// get the cavas element from the DOM
	    var canvas = document.getElementById("canvas");

	    ctx = canvas.getContext('2d');

	    var rect = canvas.getBoundingClientRect();
	    canvasOffset.x = rect.left - 10;
	    canvasOffset.y = rect.top - 10;

	    inMemoryCanvas = createCanvas('inMemoryCanvas', width, height);
	    inMemoryCxt = inMemoryCanvas.getContext('2d');
	    inMemoryCxt.strokeStyle = "#dd5f13";
	    inMemoryCxt.beginPath();

	    inMemoryCanvas2 = createCanvas('inMemoryCanvas2', width, height);
	    inMemoryCxt2 = inMemoryCanvas2.getContext('2d');
	    inMemoryCxt2.strokeStyle = "#dd5f13";
	    inMemoryCxt2.beginPath();

	    buildPath();


	    // Get the drawing context.  This contains functions that let you draw to the canvas.
    	var screen = canvas.getContext('2d');

    	// Note down the dimensions of the canvas.  These are used to
	    // place game bodies.
	    var gameSize = { x: canvas.width, y: canvas.height };

	    // Create the player array to hold the player
    	this.player = [];
    	this.player2 = [];

    	// Add the player to the players array.
    	this.player = this.player.concat(new Player(this, gameSize));

    	this.player2 = this.player2.concat(new Player2(this, gameSize));

    	var self = this;

	    // Main game tick function.  Loops forever, running 60ish times a second.
	    var tick = function() {
	    	// Update game state.
	      self.update(screen, gameSize);

	      // Draw game bodies.
	      self.draw(screen, gameSize);

	      // Queue up the next call to tick with the browser.
	      requestAnimationFrame(tick);
	    };

	    // Run the first game tick.  All future calls will be scheduled by
	    // the tick() function itself.
	    tick();
	}

	Game.prototype = {
		// **update()** runs the main game logic.
		update: function(screen, gameSize) {
			var self = this;

			// Call update on player.
	     	for (var i = 0; i < this.player.length; i++) {
		        this.player[i].update();

		    }

		    for (var i = 0; i < this.player2.length; i++) {
		        this.player2[i].update();
		    }

		    console.log(hitBox(this.player[0],this.player2[0]));


		},

		// **draw()** draws the game.
	    draw: function(screen, gameSize) {
	    	// Clear away the drawing from the previous tick.
	      	screen.clearRect(0, 0, gameSize.x, gameSize.y);

	      	ctx.drawImage(inMemoryCanvas,0,0);


	      	// Draw each body as a rectangle.
		    for (var i = 0; i < this.player.length; i++) {
		        //drawPlayer(screen, this.player[i]);
		        drawBody(screen, this.player[i], 'red');
		        drawBody(screen, this.player2[i], 'blue');
		    }
	    }
	}


	// Player
	// ------
	// **new Player()** creates a player.
	var Player = function(game, gameSize) {
		this.game = game;
		this.size = { x: 15, y: 15 };
	    this.center = { x: 7.5, y: 7.5};

	    this.keyboarder = new Keyboarder();
	}

	Player.prototype = {
		// **update()** updates the state of the player for a single tick.
	    update: function() {
	    	if (percent >= 1) {
	    		percent = 0;
	    	}
	    	// get desired animation point
	        pt = path.getPointAtLength(pathLength * ((percent+=pcStep)));

	        // look ahead, for rotation
	        pt2 = path.getPointAtLength(pathLength * (percent + pcStep*5));

	        this.center.x = pt.x;
	        this.center.y = pt.y;

	        // report degree of rotation, with fast bitwise flooring
	        radians = rotateTowards(pt.x,pt.y, pt2.x,pt2.y);
	        currentDeg = radToDeg(radians) >> 0;


	        if (this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
	        	if (pcStep < 0.0075) {
	        		pcStep = pcStep + 0.0001;
	        	}
	        } else {
	        	if (pcStep > 0) {
	        		pcStep = pcStep - 0.00015;
	        	}
	        }

	        if (pcStep < 0) {
	        	pcStep = 0;
	        }
	    }
	}


	// Player2
	// ------
	// **new Player()** creates a player.
	var Player2 = function(game, gameSize) {
		this.game = game;
		this.size = { x: 15, y: 15 };
	    this.center = { x: 7.5, y: 7.5};

	    this.keyboarder = new Keyboarder();
	}

	Player2.prototype = {
	    update: function() {
	    	if (percentB >= 1) {
	    		percentB = 0;
	    	}
	    	//**update()** updates the state of the player for a single tick.

			// get desired animation point
	        ptB = path2.getPointAtLength(pathLength2 * ((percentB+=pcStepB)));

	        // look ahead, for rotation
	        pt2B = path2.getPointAtLength(pathLength2 * (percentB + pcStepB*5));


	        this.center.x = ptB.x;
	        this.center.y = ptB.y;



	    	 if (this.keyboarder.isDown(this.keyboarder.KEYS.L)) {
	        	if (pcStepB < 0.0075) {
	        	 	pcStepB = pcStepB + 0.0001;
	        	}
	        } else {
	        	if (pcStepB > 0) {
	        		pcStepB = pcStepB - 0.00015;
	        	}
	        }

	        if (pcStepB < 0) {
	        	pcStepB = 0;
	        }
	    }
	}


	// Keyboard input tracking
	// -----------------------

	// **new Keyboarder()** creates a new keyboard input tracking object.
	var Keyboarder = function() {
		// Records up/down state of each key that has ever been pressed.
	    var keyState = {};

	    // When key goes down, record that it is down.
	    window.addEventListener('keydown', function(e) {
	      keyState[e.keyCode] = true;
	    });

	    // When key goes up, record that it is up.
	    window.addEventListener('keyup', function(e) {
	      keyState[e.keyCode] = false;
	    });

	    // Returns true if passed key is currently down.  `keyCode` is a
	    // unique number that represents a particular key on the keyboard.
	    this.isDown = function(keyCode) {
	      return keyState[keyCode] === true;
	    };

	    // Handy constants that give keyCodes human-readable names.
	    this.KEYS = { LEFT: 37, RIGHT: 39, S: 83, L: 76 };
	}


	// Other functions
    // ---------------

    // **drawRect()** draws passed body as a rectangle to `screen`, the drawing context.
	var drawBody = function(screen, body, color) {
		screen.fillStyle=color;
	    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
	    				body.size.x, body.size.y);
	};


	function hitBox( b1, b2 ) {
		/* Source and target objects contain x, y and width, height */
		return !(
	      	b1 === b2 ||
	        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
	        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
	        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
	        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
	    );
	};


    // When the DOM is ready, create (and start) the game.
	window.addEventListener('load', function() {
		new Game();
	});

})();


function buildPath(){
    path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', pathString);
    pathLength = path.getTotalLength();
    inMemoryCxt.stroke();

    path2 = document.createElementNS('http://www.w3.org/2000/svg','path');
    path2.setAttribute('d', pathString2);
    pathLength2 = path2.getTotalLength();
    inMemoryCxt2.stroke();

    // Some reporting to the page
    //pathLengthDOM.innerHTML = pathLength >> 0;
    //pathDataDOM.innerHTML = pathString;
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
        // cx1 = cx1 * 2;
        // cy1 = cy1 * 2;
        // cx2 = cx2 * 2;
        // cy2 = cy2 * 2;
        // dx = dx * 2;
        // dy = dy * 2;
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
// WEBGL experiments
// source: // https://github.com/CodingTrain/website/tree/main/Tutorials/P5JS/18_p5.js_webgl
// 01/2022


var timerValue = 0;

let angle = 0;

let angleX = 0;
let angleY = 0;
let angleZ = 0;

let vangleX = 0;
let vangleY = 0;
let vangleZ = 0;


let friction = 0.97;

var select_example = 0;


let myFont;

let usecam = false;
let useobj = false;

let img;
let cam;

let kitten;
let graphics;
let love;


function preload() {
	img = loadImage('pics/s1.jpg');
	myFont = loadFont('assets/Pokemon Solid.ttf');

	if (useobj) {
		// train = loadModel('obj/dice.obj');
		train = loadModel('obj/16023_Naval_Ship_Cruiser_Britian_new.obj');
		// source: https://free3d.com/3d-model/naval-ship-cruiser-britian-v1--786522.html
	}


}


function setup() {
	// cnv = createCanvas(windowWidth, windowHeight, WEBGL);

	createCanvas(windowWidth, windowHeight, WEBGL);

	// style('z-index', '-1'); // https://www.youtube.com/watch?v=OIfEHD3KqCg


	if (usecam) {
		cam = createCapture(VIDEO);
		cam.size(320, 240);
		cam.hide();
	}
	// textFont('Avenir');
	textFont(myFont);

	textSize(60);
	// cnv = createCanvas(windowHeight - 20, windowHeight - 20);
	// centerCanvas();
	// colorMode(HSB, 360, 100, 100);
	// rectMode(CENTER);

	love = createGraphics(300, 300);
	//love.background(255, 100);
	love.fill(255);
	love.textAlign(CENTER);
	love.textSize(64);
	love.text('love', 150, 150);

	setInterval(timeIt, 100); // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG

	// mic = new p5.AudioIn();
	// mic.start();
	// imageMode(CENTER);
	// noStroke();

	nollaus();

	angleMode(DEGREES);


	// print(train);

}




function nollaus() {




}






// auto indect in vscode: shift-alt-f

function draw() {

	background(25);

	angleX = angleX + vangleX;
	vangleX = vangleX * friction;

	angleY = angleY + vangleY;
	vangleY = vangleY * friction;

	angleZ = angleZ + vangleZ;
	vangleZ = vangleZ * friction;


	// camera(angleX, angleY, angleZ, 0, 0, 0, 0, 1, 0);

	if (select_example == 2) {
		background(175);

		rectMode(CENTER);
		noStroke();
		fill(0, 0, 255);
		//translate(0, 0, mouseX);
		rotateX(angle);
		rotateY(angle * 0.3);
		rotateZ(angle * 1.2);
		//rect(0, 0, 150, 150);
		torus(50, 10);

		angle += 0.07;
	} else if (select_example == 3) {
		let dx = mouseX - width / 2;
		let dy = mouseY - height / 2;
		let v = createVector(dx, dy, 0);
		v.div(100);

		ambientLight(0, 0, 255);
		directionalLight(255, 0, 0, v);
		//pointLight(255, 0, 0, 200, 0, 0);

		background(175);

		rotateX(angle);
		rotateY(angle * 0.3);
		rotateZ(angle * 1.2);

		noStroke();
		ambientMaterial(255);
		//fill(0, 0, 255);
		torus(100, 25);

		angle += 0.03;

	} else if (select_example == 6) {

		let dx = mouseX - width / 2;
		let dy = mouseY - height / 2;
		let v = createVector(dx, dy, 0);
		v.div(100);

		// ambientLight(255);
		directionalLight(255, 255, 255, v);
		background(175);

		push();
		rotateX(angle);
		rotateY(angle * 0.3);
		rotateZ(angle * 1.2);

		noStroke();
		//ambientMaterial(0, 0, 255);
		texture(img);
		//torus(100, 25);
		box(100);
		pop();

		translate(0, 100);
		rotateX(HALF_PI);
		ambientMaterial(255);

		// flat plane - detect coordinate system
		//plane(500, 500);

		angle += 0.03;


	} else if (select_example == 0) {

		// oma
		let dx = mouseX - width / 2;
		let dy = mouseY - height / 2;
		let v = createVector(dx, dy, 0);
		v.div(100);

		// ambientLight(0, 0, 255);
		ambientLight(100); // white light
		directionalLight(122, 122, 122, v);


		push();
		rotateX(angleX);
		rotateY(angleY);
		rotateZ(angleZ);

		translate(100, 0, 0);

		noStroke();
		//ambientMaterial(0, 0, 255);
		texture(img);
		//torus(100, 25);
		box(100);
		pop();



		if (useobj) {
			push();

			//translate(-50, -50, -400);

			rotateX(angleX);
			rotateY(angleY);
			rotateZ(angleZ);
			texture(img);

			ambientLight(100); // white light
			directionalLight(122, 122, 122, v);

			model(train);
			pop();
		}

	}


	if (touches.length >= 1) {
		checkTouches();
		print("kosketus");
	}


}

// TOUCH MOVED ------------------------------------------------------
function touchMoved() {

	print("moving");

}




function checkTouches() {


	// push();



	stroke(0, 0, 255);
	strokeWeight(3);

	fill(255, 0, 0);

	if (touches.length >= 2) {

		push();

		// translate(touches[i].x, touches[i].y, 0);
		// SHIFT ALT F indent lines

		line(touches[0].x, touches[0].y, 0, touches[1].x, touches[1].y, 0);
		pop();
	}

	for (var i = 0; i < touches.length; i++) {
		push();
		fill(255, 255, 0);
		textSize(30);

		push();
		translate(touches[i].x, touches[i].y, 0);

		text(i + 1, 0, 0);

		pop();
	}


	noStroke();


	let sormia = touches.length;

	if (sormia == 1) {
		vangleX = vangleX + 1;
	}
	if (sormia == 2) {
		vangleY = vangleY + 1;
	}
	if (sormia == 3) {
		vangleZ = vangleZ + 1;
	}


}

// this function fires with any double click anywhere
//function doubleClicked() {
//	doublec = doublec + 1;
//}



// ....................................................................
// Errors messages (CTRL SHIFT i) Chrome Developer Tools:
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
// DevTools failed to load SourceMap: Could not load content for https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted() {
	let fs = fullscreen();
	if (!fs) {
		fullscreen(true);
	}


	print("kosketus");
	// if (getAudioContext().state !== 'running') {
	// 	getAudioContext().resume();
	// 	mic = new p5.AudioIn();
	// 	mic.start();
	// 	soundrestarted = soundrestarted + 1;
	// }
}



function centerCanvas() {
	// var x = (windowWidth - width) / 2;
	// var y = (windowHeight - height) / 2;
	resizeCanvas(windowWidth, windowHeight);
	// cnv.position(x, y);
	// cnv.position(0, 0);
	// cnv.style('z-index', '-1'); // https://www.youtube.com/watch?v=OIfEHD3KqCg
}

/* full screening will change the size of the canvas */
function windowResized() {
	// resizeCanvas(windowWidth, windowHeight);
	// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
	centerCanvas();
}


function keyPressed() {
	//	text("here", random(width), random(height));
	// https://stackoverflow.com/questions/39730950/javascript-disable-space-scrolling


	if (key == 1) {
		vangleX = vangleX + 1;
	}
	if (key == 2) {
		vangleY = vangleY + 1;
	}
	if (key == 3) {
		vangleZ = vangleZ + 1;
	}

	return false;
}



function timeIt() {

	timerValue++;

}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function (event) {
	event.preventDefault();
};
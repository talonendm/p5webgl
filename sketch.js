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

let start_z = 700;
let end_z = 40;



let z_gravity = 3;

let stop_vz = 10;

let dice_size = 70;
let distance_dice = 100;

var noppia = 3;
let max_noppia = 9;

let plane_y_size = 300;
var firstgame = true;


let distance_dice_number_text = plane_y_size / (max_noppia + 1);

var all_on_table = false

let friction = 0.9999;
let friction_table = 0.74;
let kimpoaminen = 0.666;
let throw_dices_distance = 5;

let random_speed = 10;

var select_example = 0;
var all_rounded = false;

let myFont;

let usecam = false;
let useobj = false;

let img;
let imgs = [];
let cam;

let kitten;
let graphics;
let dicesumtext;


var nopat = [];

function preload() {
	imgs[0] = loadImage('pics/j1.jpg');
	imgs[1] = loadImage('pics/j2.jpg');
	imgs[2] = loadImage('pics/j3.jpg');
	imgs[3] = loadImage('pics/j4.jpg');
	imgs[4] = loadImage('pics/j5.jpg');
	imgs[5] = loadImage('pics/j6.jpg');
	myFont = loadFont('assets/Pokemon Solid.ttf');

	if (useobj) {
		// train = loadModel('obj/dice.obj');
		train = loadModel('obj/16023_Naval_Ship_Cruiser_Britian_new.obj');
		// source: https://free3d.com/3d-model/naval-ship-cruiser-britian-v1--786522.html
	}


}


function deviceShaken() {
	// https://p5js.org/reference/#/p5/setShakeThreshold



	for (var i = 0; i < nopat.length; i++) {
		nopat[i].start();
		nopat[i].shake();
		firstgame = false;
		all_on_table = false;
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

	dicesumtext = createGraphics(plane_y_size, plane_y_size);
	dicesumtext.background(0, 0, 0);
	//dicesumtext.fill(255);
	dicesumtext.textAlign(CENTER);
	//dicesumtext.textSize(48);


	setInterval(timeIt, 100); // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG

	// mic = new p5.AudioIn();
	// mic.start();
	// imageMode(CENTER);
	// noStroke();

	nollaus();

	angleMode(DEGREES);


	// print(train);

	let threshold_shake = 10; // 30 default
	setShakeThreshold(threshold_shake);


	for (i = 0; i < noppia; i++) {
		nopat[i] = new Noppa(i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		nopat[i].start();

	}


	// https://stackoverflow.com/questions/68242398/how-to-return-the-camera-position-in-p5js
	camera = createCamera();
	// optionally, call camera() on the instance with the same arguments as the global function
	// camera.camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ])



	camera.lookAt(100, 10, -40);
	camera.setPosition(sin(0 / 600) * 200 + 400, 200, 800);

	print(camera.X);
	print(camera.Y);
	print(camera.z);

	print(camera.centerX);
	print(camera.centerY);
	print(camera.centerZ);

	print(camera.eyeZ);

}







function nollaus() {




}






// auto indect in vscode: shift-alt-f

function draw() {
	orbitControl();
	background(25);

	dicesumtext.background(0);


	if (firstgame) {


		dicesumtext.fill(200);
		dicesumtext.strokeWeight(2);
		dicesumtext.stroke(0, 200, 0);

		dicesumtext.textSize(48);
		dicesumtext.text("(S)hake\ndevice", 150, 40);



		noStroke();
		// ambientMaterial(255);
		texture(dicesumtext);
		// plane((nopat.length + 2) * distance_dice * 2, plane_y_size);
		plane(plane_y_size, plane_y_size);
	} else {


		dicesumtext.textAlign(CENTER, CENTER);
		dicesumtext.textSize(28);

		var totalscore = 0;
		dicesumtext.fill(70);
		print(nopat.length);
		for (var i = 0; i < nopat.length; i++) {
			totalscore = totalscore + nopat[i].value;
			if (nopat.length > 1) {
				// if only one dice no separate values
				// dicesumtext.text(nopat[i].value, distance_dice / 2 + i * distance_dice / (nopat.length * 0.7), 50); // note different coordination system
				dicesumtext.text(nopat[i].value, distance_dice_number_text / 2 + i * distance_dice_number_text, 50);

			}
		}


		dicesumtext.textSize(72);
		dicesumtext.fill(30, 30, 120);

		dicesumtext.strokeWeight(2);
		dicesumtext.stroke(0, 200, 0);

		dicesumtext.text(totalscore, 150, 150);


		noStroke();
		// ambientMaterial(255);
		texture(dicesumtext);
		// plane((nopat.length + 2) * distance_dice * 2, plane_y_size);
		plane(plane_y_size, plane_y_size);
	}

	// push();
	// translate(0, 0, 0);
	// text(random(0,25));
	// pop();

	// angleX = angleX + vangleX;
	// vangleX = vangleX * friction;

	// angleY = angleY + vangleY;
	// vangleY = vangleY * friction;

	// angleZ = angleZ + vangleZ;
	// vangleZ = vangleZ * friction;


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
		texture(imgs[0]);
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
		ambientLight(200); // white light
		directionalLight(122, 122, 122, v);






		if (useobj) {
			push();

			//translate(-50, -50, -400);

			rotateX(angleX);
			rotateY(angleY);
			rotateZ(angleZ);
			texture(imgs[0]);

			ambientLight(100); // white light
			directionalLight(122, 122, 122, v);

			model(train);
			pop();
		}







	}


	for (var i = 0; i < nopat.length; i++) {

		var fric = 1;
		if (nopat[i].z == end_z) {
			fric = friction_table;
		} else {
			fric = friction;
		}

		nopat[i].ax = nopat[i].ax + nopat[i].vax;
		nopat[i].vax = nopat[i].vax * fric;

		nopat[i].ay = nopat[i].ay + nopat[i].vay;
		nopat[i].vay = nopat[i].vay * fric;

		nopat[i].az = nopat[i].az + nopat[i].vaz;
		nopat[i].vaz = nopat[i].vaz * fric;



		nopat[i].x = nopat[i].x + nopat[i].vx;
		nopat[i].vx = nopat[i].vx * fric;

		nopat[i].y = nopat[i].y + nopat[i].vy;
		nopat[i].vy = nopat[i].vy * fric;

		nopat[i].z = nopat[i].z + nopat[i].vz;
		nopat[i].vz = nopat[i].vz * fric;


	}



	for (var i = 1; i < nopat.length; i++) {
		for (var j = 0; j < i; j++) {
			nopat[j].overlap = nopat[j].isOver(nopat[i].x, nopat[i].y, nopat[i].z, nopat[i].size);
			if (nopat[j].overlap) {
				print("overlap i:" + i + "j:" + j);

				if (nopat[i].overlap_prev) {
					nopat[i].vx = nopat[i].vx * (-1.01);
					nopat[i].vy = nopat[i].vy * (-1.01);
				} else {

					nopat[i].x = nopat[i].x + nopat[i].x * nopat[i].id/10 * (random(0.1, 1.2));
					nopat[i].y = nopat[i].y + nopat[i].y * nopat[i].id/10 * (random(0.1, 1.2));

					nopat[i].vx = nopat[i].vx + nopat[i].vx * (random(-1, 1.2));
					nopat[i].vy = nopat[i].vy + nopat[i].vy * (random(-1, 1.2));
				}

				nopat[i].overlap_prev = true;
				if (nopat[i].vz < 10) nopat[i].vz = nopat[i].vz + 4;
				nopat[i].ontable = false;
			} else {
				nopat[i].overlap_prev = false;
			}

		}
	}


	for (var i = 0; i < nopat.length; i++) {
		nopat[i].show();


	}

	let dices_on_table = 0;
	for (var i = 0; i < nopat.length; i++) {
		if (nopat[i].ontable) dices_on_table = dices_on_table + 1;
	}

	print("dices on table" + dices_on_table);
	if (dices_on_table >= nopat.length) all_on_table = true;

	if (all_on_table & !all_rounded) {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].round(true);



		}
	}




	if (touches.length >= 1) {
		checkTouches();
		print("kosketus");

		// r and n:


		if (mouseY > height - 70) {
			noppia = map(mouseX, 100, width, 1, max_noppia);
			if (noppia < 1) noppia = 1;


			firstgame = true;

			NewDices();


			for (var i = 0; i < nopat.length; i++) {
				nopat[i].round(false);
			}

			for (var i = 0; i < nopat.length; i++) {
				nopat[i].start();
			}

		}



	}


}

// TOUCH MOVED ------------------------------------------------------
function touchMoved() {

	print("moving");


	// TODO: move to checkTouches and test it:
	if (touches.length == 5) {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].start();
			nopat[i].shake();
			firstgame = false;
			all_on_table = false;
		}
	} else if (touches.length == 3) {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].moveontable();
		}
	}

	

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


function NewDices() {



	for (var i = nopat.length - 1; i >= 0; i--) {
		nopat.pop();
	}

	for (i = 0; i < noppia; i++) {
		nopat[i] = new Noppa(i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		nopat[i].start();

	}
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

	if (key == 'd') {
		noppia = noppia % max_noppia + 1;
		NewDices();

	}


	if (key == 'm') {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].moveontable();
		}

	}

	if (key == 's') {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].start();
			nopat[i].shake();
			firstgame = false;
			all_on_table = false;
		}
	}

	if (key == 'r') {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].round(false);
		}
	}


	if (key == 'n') {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].start();
		}
	}


	if (key == 't') {
		for (var i = 0; i < nopat.length; i++) {
			nopat[i].totable();
		}
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




class Tilasto {
	constructor(id_, sum_) {
		this.id = id_;
		this.summa = sum_;

	}

}


class Nappi {
	constructor(id_, name_, key_, x_, y_, size_) {
		this.id = this.id_;
		this.name = this.name_;
		this.x = x_;
		this.y = y_;
		this.size = this.size_;
	}

	show() {

	}


}

class Noppa {
	constructor(id_, x_, y_, z_, vx_, vy_, vz_, ax_, ay_, az_, vax_, vay_, vaz_) {
		this.id = id_;
		this.x = x_;
		this.y = y_;
		this.z = z_;
		this.x0 = x_;
		this.y0 = y_;
		this.z0 = z_;
		this.vx = vx_;
		this.vy = vy_;
		this.vz = vz_;
		this.ax = ax_;
		this.ay = ay_;
		this.az = az_;
		this.vax = vax_;
		this.vay = vay_;
		this.vaz = vaz_;
		this.value = 1;
		this.image_id = 1;
		this.size = dice_size;
		this.ontable = false;
		this.shape = 0;  // 1
		this.overlap = false;
		this.overlap_prev = false;
		this.valuefinal = false;
	}


	isOver = function (x, y, z, size) {
		var dist2number = dist(x, y, z, this.x, this.y, this.z);

		if (this.shape == 0) {
			// print(dist2number)
			if (dist2number < this.size / 2 * 1.41 + size / 2 * 1.41) {
				return (true);
			} else {
				return (false);
			}
		}

		if (this.shape == 1) {
			if (dist2number < this.size / 2 + size / 2) {
				return (true);
			} else {
				return (false);
			}
		}


	}

	show() {

		push();

		translate(this.x, this.y, this.z);

		rotateX(this.ax);
		rotateY(this.ay);
		rotateZ(this.az);

		noStroke();
		//ambientMaterial(0, 0, 255);

		if (this.ax < 0) this.ax = this.ax + 360 * 10;

		if (!this.valuefinal) {
			this.value = floor((this.ax % 60) / 10) + 1;
			if (this.value < 1) this.value = 1;
		}




		// for some reason angle negative time to time: this.image_id = floor((this.ax % 90) / 45) + 1;

		//if (this.image_id == 1) {

		// print(round(this.value - 1));
		texture(imgs[round(this.value - 1)]);  // imgs[this.value-1]
		//} else {
		//	texture(img2);
		//}
		//texture(img1);
		//torus(100, 25);

		if (this.shape == 0) {
			box(this.size);
		} else {
			sphere(this.size);
		}
		//

		pop();


		//if (this.isOver()) {
		//	this.vx = random(-throw_dices_distance, throw_dices_distance);
		//	this.vy = random(-throw_dices_distance, throw_dices_distance);
		//	this.vz = this.vy + 10; 
		//}


		if (this.z < end_z) {
			this.vz = -this.vz * kimpoaminen;
			if (abs(this.vz) < stop_vz) {
				this.z = end_z;
				this.ontable = true;
				this.valuefinal = true;
				this.vz = 0;
				this.totable();
				this.round(true);
				print("poy")
			} else {
				// more angle speed: when hit the table:
				this.vax = this.vax * 2 + random(-random_speed, random_speed);
				this.vay = this.vay * 2 + random(-random_speed, random_speed);
				this.vaz = this.vaz * 2 + random(-random_speed, random_speed);

				this.vx = random(-throw_dices_distance, throw_dices_distance);
				this.vy = random(-throw_dices_distance, throw_dices_distance);

			}
		} else if (!this.ontable) {
			this.vz = this.vz - z_gravity;
		}

	}

	shake() {
		all_rounded = false;
		this.vax = random(-random_speed, random_speed) + random(10, 20);
		this.vay = random(-random_speed, random_speed);
		this.vaz = random(-random_speed, random_speed);

		this.vx = random(-throw_dices_distance, throw_dices_distance);
		this.vy = random(-throw_dices_distance, throw_dices_distance);
		this.vz = random(-throw_dices_distance / 2, 0);
		all_on_table = false;

	}



	moveontable() {

		let ve0 = createVector(this.x, this.y, 0);
		let ve2 = createVector(this.x0 - this.x, this.y0 - this.y, 0);


		//let angleBetween = ve1.angleBetween(v2);
		// https://www.youtube.com/watch?v=oXwCVDXS2Lg
		this.angle = ve2.heading();


		this.vx = 5 * cos(this.angle);
		this.vy = 5 * sin(this.angle);



	}

	round(setvalue) {

		// angle round:
		this.ax = round(this.ax / 90) * 90;
		this.ay = round(this.ay / 90) * 90;
		this.az = round(this.az / 90) * 90;

		// this.ax = round(this.ax/1)*1;
		this.az = round(this.az / 1) * 1;

		this.ax = this.ax % 360;
		this.ay = this.ay % 360;
		this.az = this.az % 360;

		print(this.id + ": " + this.ax + "," + this.ay + "," + this.az);

		this.valuefinal = setvalue;

	}

	start() {
		this.x = (this.id - (nopat.length / 2 - 0.5)) * distance_dice;
		this.y = 0;
		this.z = start_z;
		this.ontable = false;

		this.value = 1;
		this.image_id = 1;
		this.valuefinal = false;
	}

	totable() {
		this.round(false);
		this.z = end_z;
	}


}
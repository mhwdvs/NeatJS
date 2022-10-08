import p5 from 'p5';
import { Population } from './population';

var population;
var cycles;
var points: Point[];
var myFunction = function(x) { 
	return p5.height- x+ 150;
};

class Point{
	x: number;
	y: number;
	type: number;
}

function setup() {
	let canvas = p5.createCanvas(400, 400);
	canvas.parent('canvascontainer');
	p5.background(61);

	//Initialize the population
	population = new Population(50, 2, 1);
	
	//Generate and Draw points
	for(let i = 0; i < 200; i++) {
		let y = Math.random(), x = Math.random();
		let type = y * p5.height > myFunction(x * p5.width) ? 1 : 0;
		points.push({x: x, y: y, type: type});

		p5.fill(255);
		p5.ellipse(points[i].x * p5.width, points[i].y * p5.height, 10)
	}

	//Draw separation line
	for(let i = 0; i < p5.width; i += 10) {
		p5.fill(50);
		p5.ellipse(i, myFunction(i), 10)
	}
}

function draw() {
	cycles = p5.select('#speedSlider').value();
	p5.select('#speed').html(cycles);

	for(let i = 0; i < cycles; i++)
		if(!population.done())
			population.updateAlive();
		else
			population.naturalSelection();
}
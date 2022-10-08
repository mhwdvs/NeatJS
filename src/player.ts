import p5 from 'p5';

import { Genome } from './genome';

//The Player Class
//The interface between our 
//NeuralNetwork and the game 
export class Player{
	inputCount: number;
	outputCount: number;
	outputs: number[];
	inputs: number[];

	brain: Genome;
	fitness: number;
	score: number; // warn: likely redundant
	lifespan: number;
	dead: boolean;

	constructor(inputs: number, outputs: number, id: string){
		this.inputCount = inputs;
		this.outputCount = outputs;
		this.outputs = [];
		this.inputs = [];
		
		this.brain = new Genome(inputs, outputs, id);
		this.fitness;

		this.score = 1;
		this.lifespan = 0;
		this.dead = false;
	}

	clone() { //Returns a copy of this player
		let clone = new Player(this.brain.inputs, this.brain.outputs, this.brain.id);
		clone.brain = this.brain.clone();
		return clone;
	}

	crossover(parent){ //Produce a child
		let child = new Player(this.brain.inputs, this.brain.outputs, this.brain.id);
		if(parent.fitness < this.fitness)
			child.brain = this.brain.crossover(parent.brain);
		else
			child.brain = parent.brain.crossover(this.brain);

		child.brain.mutate()
		return child;
	}


	/**
	 * Takes inputs from the current environment state
	 */
	look(inputs: number[]){
		this.inputs = inputs;

		//this.inputs = [points[this.lifespan].x, points[this.lifespan].y];
		this.correctVal = points[this.lifespan].type;
	}

	public think(){
		this.outputs = this.brain.feedForward(this.inputs);
	}

	move(){
		let maxIndex = 0;
		for(let i = 0; i < this.outputs.length; i++)
			if(this.outputs[i] > this.outputs[maxIndex])
				maxIndex = i;

		this.val = this.outputs[maxIndex] >= 0 ? 1 : 0;
	}

	update(){
		if(this.correctVal == this.val) {
			this.score++;
		}

		this.lifespan++;
		if(this.lifespan >= points.length)
			this.dead = true;
	}

	show(){
		p5.push();

		if(this.correctVal == this.val) {
			if(this.correctVal == 1)
				p5.fill(0, 255, 0);
			
			if(this.correctVal == 0)
				p5.fill(0, 0, 255);

			p5.ellipse(points[this.lifespan - 1].x * width, points[this.lifespan - 1].y * height, 6)
		} else {
			p5.fill(255, 0, 0);
			p5.ellipse(points[this.lifespan - 1].x * width, points[this.lifespan - 1].y * height, 6)
		}
		
		p5.pop();
	}

	calculateFitness(){ //Fitness function : adapt it to the needs of the
		this.fitness = this.score;
		this.fitness /= this.brain.calculateWeight();
	}
}
import { genomeInputsN, genomeOutputN, showBest } from './populationConsts';
import { Genome } from './genome'

export class Player{
	brain: Genome;
	fitness: number;
	score: number;
	lifespan: number;
	dead: boolean;
	decisions: number[];
	vision: number[];

	constructor(id){
		this.brain = new Genome(genomeInputsN, genomeOutputN, id);
		this.fitness;

		this.score = 1;
		this.lifespan = 0;
		this.dead = false;
		this.decisions = []; //Current Output values
		this.vision = []; //Current input values
	}

	clone() { //Returns a copy of this player
		let clone = new Player(this.brain.id);
		clone.brain = this.brain.clone();
		return clone;
	}

	crossover(parent){ //Produce a child
		let child = new Player(this.brain.id);
		if(parent.fitness < this.fitness)
			child.brain = this.brain.crossover(parent.brain);
		else
			child.brain = parent.brain.crossover(this.brain);

		child.brain.mutate()
		return child;
	}

	think(){
		this.decisions = this.brain.feedForward(this.vision);
	}

	calculateFitness(){ //Fitness function : adapt it to the needs of the
		this.fitness = this.score;
	}
}
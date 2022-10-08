import p5 from 'p5';

import { Node } from './node';

//The Connection Class
//Is where all the weights are stored
//Mostly used for a cleaner and more readable code.
export class Connection {
	fromNode: Node;
	toNode: Node;
	weight: number;
	enabled: boolean;

	constructor(from: Node, to: Node, weight: number){
		this.fromNode = from;
		this.toNode = to;
		this.weight = weight;
		this.enabled = true;
	}

	mutateWeight(){ //Randomly mutate the weight of this connection
		let rand = Math.random();
		if (rand < 0.05) //5% chance of being assigned a new random value
			this.weight = Math.random() * 2 - 1;
		else //95% chance of being uniformly perturbed
			this.weight += p5.randomGaussian() / 50;
	}

	clone(){ //Returns a copy of this connection
		let clone = new Connection(this.fromNode, this.toNode, this.weight);
		clone.enabled = this.enabled;
		return clone;
	}

	getInnovationNumber(){ //Using https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
		return (1/2)*(this.fromNode.number + this.toNode.number)*(this.fromNode.number + this.toNode.number + 1) + this.toNode.number;
	}
}
export class Point {
	x : number;
	y : number;
	r : number;
	entry : number;
	constructor(x : number, y : number, r : number, entry : number = 0){
		this.x = x;
		this.y = y;
		this.r = r;
		this.entry = entry;
	}
}
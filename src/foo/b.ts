export interface B {
	getNum(): number;
}

export function GetBFor(num: number): B {
	return BImpl.getInstance(num);
}

class BImpl implements B {
	static getInstance(num: number): B {
		return new BImpl(num);
	}

	constructor(private _b: number) {}

	getNum(): number {
		return this._b;
	}
}
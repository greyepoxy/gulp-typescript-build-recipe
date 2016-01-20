import {GetBFor} from './b';

export interface A {
	do(): void;
}

export function GetA(): A {
	return new AImpl();
}

class AImpl implements A {
	do(): void {
		let b = GetBFor(5);
		if (b.getNum() == 10) {
			throw new Error('This is a bad thing!');
		}
	}
}
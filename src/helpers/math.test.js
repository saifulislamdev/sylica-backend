import { abs, sum } from './math';

describe('math', () => {
	describe('abs', () => {
		it('should return 5 when -5 is input', () => {
			expect(abs(-5)).toBe(5);
		});

		it('should return 5 when 5 is input', () => {
			expect(abs(5)).toBe(5);
		});
	});

	describe('sum', () => {
		it('should return 5 when 2, 3 is input', () => {
			expect(sum(2, 3)).toBe(5);
		});
	});
});

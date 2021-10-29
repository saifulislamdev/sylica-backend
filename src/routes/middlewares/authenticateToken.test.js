import jwt from 'jsonwebtoken';
import authenticateToken from './authenticateToken';

describe('authenticateToken', () => {
	afterEach(() => jest.clearAllMocks());
	it('should throw "No token" error if no token is passed', () => {
		const req = {
			header: (token) => undefined,
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const next = jest.fn();

		try {
			authenticateToken(req, res, next);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({
				msg: 'No token, authorization denied',
			});
		}
	});

	it('should throw "Invalid token" error', () => {
		const req = {
			header: (token) => 'some token',
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const next = jest.fn();
		jwt.verify = jest.fn().mockImplementation(() => {
			throw new Error('Invalid token');
		});

		try {
			authenticateToken(req, res, next);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({
				msg: 'Invalid token, authorization denied',
			});
		}
	});

	it('should validate if proper jwt sent', () => {
		const req = {
			header: (token) => 'some token',
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const next = jest.fn();
		jwt.verify = jest.fn().mockReturnValueOnce({ user: { _id: '1234' } });

		authenticateToken(req, res, next);
		expect(next).toHaveBeenCalled();
	});
});

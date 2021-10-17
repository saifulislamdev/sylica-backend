import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../../../models/user';
import signInUser from './signInUser';

describe('signInUser', () => {
	afterEach(() => jest.clearAllMocks());

	it('should throw an "Invalid credentials" err if email not found', async () => {
		const req = {
			body: {
				email: 'luke@jedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		UserModel.findOne = jest.fn().mockResolvedValueOnce(undefined);

		try {
			await signInUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
		}
	});

	it('should throw an "Invalid credentials" err if email not found', async () => {
		const req = {
			body: {
				email: 'luke@jedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		UserModel.findOne = jest
			.fn()
			.mockResolvedValueOnce({ password: 'incorrect password' });
		bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

		try {
			await signInUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
		}
	});

	it('should throw an "Internal server error" if something goes wrong', async () => {
		const req = {
			body: {
				email: 'luke@jedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		UserModel.findOne = jest.fn().mockImplementationOnce(() => {
			throw 'Something went wrong';
		});
		bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

		try {
			await signInUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
		}
	});

	it('should create a token and return user object if valid credentials', async () => {
		const req = {
			body: {
				email: 'luke@jedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		UserModel.findOne = jest.fn().mockResolvedValueOnce({
			email: 'luke@jedi.org',
			password: 'lukesadkjfsagh;s',
		});
		bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
		const mockJwt = jest
			.spyOn(jwt, 'sign')
			.mockImplementationOnce((payload, secret, options, callback) =>
				callback()
			);

		try {
			await signInUser(req, res);
		} catch (error) {
			expect(jwt.sign).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalled();
		}
	});
});

import jwt from 'jsonwebtoken';
import validateData from '../../../helpers/validateData';
import UserModel from '../../../models/user';
import signUpUser from './signUpUser';

describe('signUpUser', () => {
	afterEach(() => jest.clearAllMocks());

	it('should throw an "Account already taken" error', async () => {
		// define a dummy req object with req.body
		const req = {
			body: {
				firstName: 'Luke',
				lastName: 'Skywalker',
				email: 'luke@newjedi.org',
				password: 'luke_skywalker',
			},
		};

		// define a dummy res object.
		// .status() and .json() methods are mocks that just return the res object so they can be chained
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		// mock mongo call so that it returns a dummy user object. This way we know that email has already been taken
		UserModel.findOne = jest
			.fn()
			.mockResolvedValueOnce({ email: 'luke@newjedi.org' });

		try {
			// call the function
			await signUpUser(req, res);
		} catch (error) {
			// since we know that email has already been taken we expect this two values
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Account already taken' });
		}
	});

	// tests a generic case where something fails and we should get an internal server error message
	it('should throw an "Internal server error"', async () => {
		const req = {
			body: {
				firstName: 'Luke',
				lastName: 'Skywalker',
				email: 'luke@newjedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		// mock findOne function so that it errors out, hence going to catch block
		UserModel.findOne = jest.fn().mockImplementationOnce(() => {
			throw new Error();
		});

		try {
			await validateData(req, res);
		} catch (error) {
			// since we know findOne function failed, we know that error should be Interval server error
			expect(res.status).toBe(500);
			expect(res.json).toBe({ msg: 'Internal server error' });
		}
	});

	// test successful case
	it('should save user to db and create a jwt', async () => {
		const req = {
			body: {
				firstName: 'Luke',
				lastName: 'Skywalker',
				email: 'luke@newjedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		// mock findOne to return undefined, hence noting that email doesn't exist in db
		UserModel.findOne = jest.fn().mockResolvedValueOnce(undefined);

		// spy on a method of an object so we can check if it has been called or not.
		const mockSave = jest
			.spyOn(UserModel.prototype, 'save')
			.mockImplementationOnce(() => Promise.resolve('Success'));

		// spy on so we can check if it has been called or not.
		// mockImplemention of .sign() so that we can check if token was successfully created or not
		const mockJwt = jest
			.spyOn(jwt, 'sign')
			.mockImplementationOnce((payload, secret, options, callback) =>
				callback()
			);

		await signUpUser(req, res);

		expect(mockSave).toHaveBeenCalled(); // if mockSave gets called then we know user will be created
		expect(jwt.sign).toHaveBeenCalled(); // if jwt.sign gets called then we know a token will be created
		expect(res.status).toHaveBeenCalledWith(200); // if res.status gets called with 200 then we know token was successfully created
		expect(res.json).toHaveBeenCalled();
	});
});

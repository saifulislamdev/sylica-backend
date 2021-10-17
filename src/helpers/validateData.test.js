import Joi from '@hapi/joi';
import validateData from './validateData';

describe('validateData', () => {
	// define a dummy validationSchema object
	const validationSchema = Joi.object({
		email: Joi.string().required(),
		password: Joi.string().min(8).required(),
	});

	// test a case where we know req.body has a missing field
	it('should throw "email" is required error', async () => {
		const req = {
			body: {
				password: 'luke_skywalker',
			},
		};
		const res = {
			json: jest.fn().mockImplementation(() => res),
			status: jest.fn().mockImplementation(() => res),
		};

		try {
			await validateData(req, res, validationSchema);
		} catch (error) {
			expect(error.message).toBe('""email" is required');
		}
	});

	// test a case where we know a condition of validation isn't met
	it('should throw "password" must be of length 8 characters error', async () => {
		const req = {
			body: {
				email: 'luke@newjedi.com',
				password: 'luke',
			},
		};
		const res = {
			json: jest.fn().mockImplementation(() => res),
			status: jest.fn().mockImplementation(() => res),
		};

		try {
			await validateData(req, res, validationSchema);
		} catch (error) {
			expect(error.message).toBe(
				'"password" length must be at least 8 characters long'
			);
		}
	});

	// test a successful case
	it('should successfully validate request body', async () => {
		const req = {
			body: {
				email: 'luke@newjedi.org',
				password: 'luke_skywalker',
			},
		};
		const res = {};

		const { email, password } = await validateData(req, res, validationSchema);

		expect(email).toBe('luke@newjedi.org');
		expect(password).toBe('luke_skywalker');
	});
});

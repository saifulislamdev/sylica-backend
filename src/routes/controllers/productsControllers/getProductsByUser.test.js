import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../../../utils/connectDB';
import getProductsByUser from './getProductsByUser';
import ProductModel from '../../../models/product';

dotenv.config();

describe('getProductsByUser', () => {
	beforeAll(async () => {
		await connectDB(global.__MONGO_URI__);
	});

	afterAll(async () => {
		await ProductModel.collection.drop();
		await mongoose.connection.close();
	});

	afterEach(async () => {
		await ProductModel.deleteMany();
		jest.clearAllMocks();
	});

	it('should return products by user', async () => {
		const req = {
			params: { userId: '1'.repeat(24) },
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockDate = new Date('2021-11-21');
		const mockProducts = [
			{
				_id: mongoose.Types.ObjectId('3'.repeat(24)), // ObjectId needs to be of length 24
				title: 'iPhone 12 Pro',
				user: mongoose.Types.ObjectId('1'.repeat(24)),
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('4'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				user: mongoose.Types.ObjectId('2'.repeat(24)),
				created_at: mockDate,
				updated_at: mockDate,
			},
		];

		const prods = await ProductModel.insertMany(mockProducts);
		await getProductsByUser(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should throw no products for user found error', async () => {
		const req = {
			params: { userId: '5'.repeat(24) }, // get listings by '555...'
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockDate = new Date('2021-11-21');
		const mockProducts = [
			{
				_id: mongoose.Types.ObjectId('3'.repeat(24)), // ObjectId needs to be of length 24
				title: 'iPhone 12 Pro',
				user: mongoose.Types.ObjectId('1'.repeat(24)), // product listing by '111...'
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('4'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				user: mongoose.Types.ObjectId('2'.repeat(24)), // product listing by '222...'
				created_at: mockDate,
				updated_at: mockDate,
			},
		];

		const prods = await ProductModel.insertMany(mockProducts);

		try {
			await getProductsByUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({
				msg: 'No listings found for this user',
			});
		}
	});

	it('should throw enter userId error', async () => {
		const req = {
			params: {},
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		try {
			await getProductsByUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Please enter a user id' });
		}
	});

	it('should throw internal server error', async () => {
		const req = {
			params: { userId: mongoose.Types.ObjectId('1'.repeat(24)) },
		};

		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		ProductModel.find = jest.fn().mockImplementationOnce(() => {
			throw 'Something went wrong';
		});

		try {
			await getProductsByUser(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
		}
	});
});

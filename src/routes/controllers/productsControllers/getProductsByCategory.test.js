import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../../../utils/connectDB';
import ProductModel from '../../../models/product';
import getProductsByCategory from './getProductsByCategory';

dotenv.config();

describe('getProductsByCategory', () => {
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

	it('should get products by categories', async () => {
		const req = {
			query: {
				categories: JSON.stringify(['cell-phones']),
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockDate = new Date('2021-11-21');
		const mockProducts = [
			{
				_id: mongoose.Types.ObjectId('1'.repeat(24)), // ObjectId needs to be of length 24
				title: 'iPhone 12 Pro',
				categories: ['cell-phones'],
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('2'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				categories: ['computers', 'laptop'],
				subCategories: ['macbook'],
				created_at: mockDate,
				updated_at: mockDate,
			},
		];

		const prods = await ProductModel.insertMany(mockProducts);

		try {
			await getProductsByCategory(req, res);
		} catch (error) {
			console.log(error);
		}

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should return all products', async () => {
		const req = { query: {} };
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockDate = new Date('2021-11-21');
		const mockProducts = [
			{
				_id: mongoose.Types.ObjectId('3'.repeat(24)), // ObjectId needs to be of length 24
				title: 'iPhone 12 Pro',
				categories: ['cell-phones'],
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('4'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				categories: ['computers', 'laptop'],
				subCategories: ['macbook'],
				created_at: mockDate,
				updated_at: mockDate,
			},
		];

		const prods = await ProductModel.insertMany(mockProducts);
		await getProductsByCategory(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should throw no products found error', async () => {
		const req = {
			query: {
				categories: JSON.stringify(['fghfsdgds']),
				subCategories: JSON.stringify(['dfasdfasfs']),
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockDate = new Date('2021-11-21');
		const mockProducts = [
			{
				_id: mongoose.Types.ObjectId('4'.repeat(24)), // ObjectId needs to be of length 24
				title: 'iPhone 12 Pro',
				categories: ['cell-phones'],
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('5'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				categories: ['computers', 'laptop'],
				subCategories: ['macbook'],
				created_at: mockDate,
				updated_at: mockDate,
			},
			{
				_id: mongoose.Types.ObjectId('3'.repeat(24)), // ObjectId needs to be of length 24
				title: 'Macbook Pro 2021',
				categories: ['computers', 'laptop'],
				subCategories: ['macbook'],
				created_at: mockDate,
				updated_at: mockDate,
			},
		];

		await ProductModel.insertMany(mockProducts);

		try {
			await getProductsByCategory(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Products not found' });
		}
	});

	it('should throw internal server error', async () => {
		const req = { query: {} };
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		ProductModel.find = jest.fn().mockImplementationOnce(() => {
			throw 'Something went wrong';
		});

		try {
			await getProductsByCategory(req, res);
		} catch (error) {
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
		}
	});
});

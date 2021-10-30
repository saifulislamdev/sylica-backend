import ProductModel from '../../../models/product';
import createProduct from './createProduct';

describe('createProduct', () => {
	afterEach(() => jest.clearAllMocks());

	it('should throw "Internal server error"', async () => {
		const req = {
			body: {
				title: 'Apple MacBook Pro 2021',
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockSave = jest
			.spyOn(ProductModel.prototype, 'save')
			.mockImplementationOnce(() => Promise.reject('Failure'));

		try {
			await createProduct(req, res);
		} catch (error) {
			expect(res.status).toBe(500);
			expect(res.json).toBe({ msg: 'Internal server error' });
		}
	});

	it('should correctly create a product document', async () => {
		const req = {
			body: {
				title: 'Apple MacBook Pro 2021',
				vendor: 'Apple',
				description:
					'The all new MacBook Pro with M1 Max - 16 Core CPU, 32 Core GPU',
				images: [
					{
						name: 'image1.jpg',
						src: 'http://localhost:5000/api/products/image1.jpg',
					},
					{
						name: 'image2.jpg',
						src: 'http://localhost:5000/api/products/image2.jpg',
					},
				],
				quantity: 5,
				isInStock: true,
				categories: ['laptop'],
				subCategories: ['macbook'],
				specifications: [
					{
						heading: 'General',
						rows: [
							['CPU', 'M1 Max 16 Cores'],
							['GPU', 'M1 Max 32 Cores'],
						],
					},
				],
			},
		};
		const res = {
			status: jest.fn().mockImplementation(() => res),
			json: jest.fn().mockImplementation(() => res),
		};

		const mockSave = jest
			.spyOn(ProductModel.prototype, 'save')
			.mockImplementationOnce(() => Promise.resolve('Success'));

		await createProduct(req, res);

		expect(mockSave).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalled();
	});
});

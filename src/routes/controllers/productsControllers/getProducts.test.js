import ProductModel from '../../../models/product';
import getProducts from './getProducts';

describe('getProducts', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw "Internal server error"', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };
    ProductModel.find = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    try {
      await getProducts(req, res);
    } catch (error) {
      expect(res.status).toBe(500);
      expect(res.json).toBe({ msg: 'Internal server error' });
    }
  });

  it('should return the list of products', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    await getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

import OrderModel from '../../../models/order';
import getRecentOrder from './recentOrder';

describe('getRecentOrder', () => {
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
      await getRecentOrder(req, res);
    } catch (error) {
      expect(res.status).toBe(500);
      expect(res.json).toBe({ msg: 'Internal server error' });
    }
  });

  it('should return the list of orders', async () => {
    const req = {
      body: {
        user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODQ2ODZlOTZiOWQzNzZiZjk5ODVmIn0sImlhdCI6MTYzNzAzMDQ3NywiZXhwIjoxNjM3MDM0MDc3fQ.J6tVlnnlpERC_NLDGK5rjuAHD9k07307TWQNzfWKjG',
      },
    };
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };
    OrderModel.find = jest.fn().mockResolvedValueOnce({
      user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODQ2ODZlOTZiOWQzNzZiZjk5ODVmIn0sImlhdCI6MTYzNzAzMDQ3NywiZXhwIjoxNjM3MDM0MDc3fQ.J6tVlnnlpERC_NLDGK5rjuAHD9k07307TWQNzfWKjG',
    });

    await getRecentOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

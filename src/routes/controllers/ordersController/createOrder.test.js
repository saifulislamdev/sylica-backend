import OrderModel from '../../../models/order';
import createOrder from './createOrder';

describe('createOrder', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw "Internal server error"', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    const mockSave = jest
      .spyOn(OrderModel.prototype, 'save')
      .mockImplementationOnce(() => Promise.reject('Failure'));

    try {
      await createOrder(req, res);
    } catch (error) {
      expect(res.status).toBe(500);
      expect(res.json).toBe({ msg: 'Internal server error' });
    }
  });

  it('should correctly create a order', async () => {
    const req = {
      body: {
        shippingAddress: {
          address1: '205 Bronx',
          address2: '5B',
          city: 'New York',
          state: 'NY',
          zip: '10467',
        },
        billingAddress: {
          address1: '205 Bronx',
          address2: '5B',
          city: 'New York',
          state: 'NY',
          zip: '10467',
        },
        totalAmount: 2065,
        productsPurchased: {
          productId: '618deee508394c18e4c5f91b',
          quantity: 34,
        },
      },
    };
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    const mockSave = jest
      .spyOn(OrderModel.prototype, 'save')
      .mockImplementationOnce(() => Promise.resolve('Success'));

    await createOrder(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

import order from '../../../models/order';
import OrderModel from '../../../models/order';
import Joi from '@hapi/joi';
import validateData from '../../../helpers/validateData';

const AddressValidation = Joi.object({
  address1: Joi.string(),
  address2: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip: Joi.string(),
});

const productsPurchasedValidation = Joi.object({
  productId: Joi.string(),
  quantity: Joi.number(),
});
//user: Joi.string(),
const ValidationSchema = Joi.object({

  shippingAdress: AddressValidation,
  billingAdress: AddressValidation,
  totalAmount: Joi.number(),
  productsPurchased: Joi.array().items(productsPurchasedValidation),
});

const createOrder = async (req, res) => {
  try {
    const user = req.user.id;

    const { shippingAddress, billingAddress, totalAmount, productsPurchased } =
      //await validateData(req.body, ValidationSchema);
      await validateData(req, res, ValidationSchema);

    //add data to mongodb order collection
    let order = new OrderModel({
      user,
      shippingAddress,
      billingAddress,
      totalAmount,
      productsPurchased,
    });

    await order.save();
    //send response
    res.status(200).json({ msg: 'order created successfully' });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export default createOrder;

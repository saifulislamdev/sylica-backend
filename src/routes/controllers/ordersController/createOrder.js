import order from '../../../models/order';
import OrderModel from '../../../models/order';

const createOrder = async (req, res) => {
  try {
    const user = req.user._id;

    const { shippingAddress, billingAddress, totalAmount, productsPurchased } =
      req.body;

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

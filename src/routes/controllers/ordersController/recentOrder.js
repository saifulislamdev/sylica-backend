import OrderModel from '../../../models/order';

const recentOrder = async (req, res) => {
  try {
    //getting user id from request body
    const user = req.user.id;
    //get orders from database for the user id
    const orders = await OrderModel.find({ user });
    //send response
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export default recentOrder;

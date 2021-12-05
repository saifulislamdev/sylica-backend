import ProductModel from '../../../models/product';

const deleteProductByID = async (req, res) => {
  try {
    const productID = await ProductModel.findById(req.params.productID);

    if (!productID) return res.status(404).json({ msg: 'Product not found' });

    const userId = req.params.userId;

    if (!userId) return res.status(400).json({ msg: 'Please enter a user id' });

    if (productID.user.toString() !== userId)
      return res.status(401).json({ msg: 'Not authorized' });


    await ProductModel.findByIdAndDelete(productID);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
};

export default deleteProductByID;

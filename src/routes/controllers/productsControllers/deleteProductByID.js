import ProductModel from '../../../models/product';

const deleteProductByID = async (req, res) => {
  try {
    const productID = await ProductModel.findById(req.params.productID);

    if (!productID) return res.status(404).json({ msg: 'Product not found' });

    const userId = req.user.id;

    if (productID.user.toString() !== userId)
      return res.status(401).json({ msg: 'Not authorized' });

    const product = await ProductModel.findByIdAndDelete(productID);
    return res.status(200).json({ msg: 'Product deleted succesfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
};

export default deleteProductByID;

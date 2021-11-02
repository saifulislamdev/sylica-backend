import ProductModel from '../../../models/product';

const getProductByID = async (req, res) => {
  try {
    const productID = req.params.productID;
    const product = await ProductModel.findById(productID);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(401).json({ msg: 'Product not exist' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
};

export default getProductByID;

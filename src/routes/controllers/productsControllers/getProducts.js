import ProductModel from '../../../models/product';

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (products.length === 0) {
      res.status(404).json({ msg: 'No products found' });
    } else res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error.' });
  }
};

export default getProducts;

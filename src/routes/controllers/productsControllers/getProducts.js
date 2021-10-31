import ProductModel from '../../../models/product';

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error.' });
  }
};

export default getProducts;

import ProductModel from '../../../models/product';

const patchUpdateQuantity = async (req, res) => {
  try {
    const productID = req.params.productID;
    const filter = { _id: productID };
    const oldProduct = await ProductModel.findOne(filter);

    if (!oldProduct) return res.status(400).json({ msg: 'Product not found' });

    const newQuantity = oldProduct.quantity - req.body.quantity;
    const update = { quantity: newQuantity };

    let product = await ProductModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(401).json({ msg: 'Product not exist' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
};

export default patchUpdateQuantity;

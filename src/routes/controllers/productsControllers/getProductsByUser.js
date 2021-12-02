import ProductModel from '../../../models/product';

const getProductsByUser = async (req, res) => {
	try {
		const userId = req.params.userId;

		if (!userId) return res.status(400).json({ msg: 'Please enter a user id' });

		const products = await ProductModel.find({ user: userId });

		if (products.length === 0)
			return res.status(404).json({ msg: 'No listings found for this user' });

		return res.status(200).json({ products });
	} catch (error) {
		return res.status(500).json({ msg: 'Internal server error' });
	}
};

export default getProductsByUser;

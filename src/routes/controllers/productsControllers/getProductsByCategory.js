import Joi from '@hapi/joi';
import ProductModel from '../../../models/product';

const validationSchema = Joi.object({
	categories: Joi.array().items(Joi.string()),
	subCategories: Joi.array().items(Joi.string()),
});

const validateQuery = async (req, res) => {
	try {
		const queries = {
			categories: req.query.categories
				? JSON.parse(req.query.categories)
				: undefined,
			subCategories: req.query.subCategories
				? JSON.parse(req.query.subCategories)
				: undefined,
		};
		const values = await validationSchema.validateAsync(queries);

		return values;
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
};

const getProductsByCategory = async (req, res) => {
	try {
		const { categories, subCategories } = await validateQuery(req, res);

		const query = {};

		if (categories) {
			query['categories'] = { $in: categories };
			query['$expr'] = [
				{ $size: { $setIntersection: ['$categories', categories] } },
				2,
			];
		}

		if (subCategories) {
			query['subCategories'] = { $in: subCategories };
			query['$expr'] = [
				{ $size: { $setIntersection: ['$subCategories', subCategories] } },
				2,
			];
		}

		const products = await ProductModel.find(query);

		if (products.length === 0)
			return res.status(404).json({ msg: 'Products not found' });

		return res.status(200).json({ products });
	} catch (error) {
		return res.status(500).json({ msg: 'Internal server error' });
	}
};

export default getProductsByCategory;

import Joi from '@hapi/joi';
import validateData from '../../../helpers/validateData';
import ProductModel from '../../../models/product';

const imageValidation = Joi.object({
	altName: Joi.string(),
	name: Joi.string(),
	src: Joi.string(),
});

const specsTableValidation = Joi.object({
	heading: Joi.string(),
	rows: Joi.array().items(Joi.array().items(Joi.string())),
});

const validationSchema = Joi.object({
	title: Joi.string().required(),
	vendor: Joi.string(),
	description: Joi.string(),
	images: Joi.array().items(imageValidation),
	quantity: Joi.number(),
	isInStock: Joi.boolean(),
	categories: Joi.array().items(Joi.string()),
	subCategories: Joi.array().items(Joi.string()),
	price: Joi.number(),
	sale: Joi.number(),
	specifications: Joi.array().items(specsTableValidation),
});

const createProduct = async (req, res) => {
	try {
		// have to parse these three objects because multipart/form-data only accepts strings. So they are first stringified on frontend
		req.body.categories = JSON.parse(req.body.categories);
		req.body.subCategories = JSON.parse(req.body.subCategories);
		req.body.specifications = JSON.parse(req.body.specifications);

		const {
			title,
			vendor,
			description,
			images,
			quantity,
			isInStock,
			categories,
			subCategories,
			price,
			sale,
			specifications,
		} = await validateData(req, res, validationSchema);

		const product = new ProductModel({
			title,
			vendor,
			description,
			images,
			quantity,
			isInStock,
			categories,
			subCategories,
			price,
			sale,
			specifications,
		});

		await product.save();

		return res.status(200).json({ product });
	} catch (error) {
		return res.status(500).json({ msg: 'Internal server error' });
	}
};

export default createProduct;

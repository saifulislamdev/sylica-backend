import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'Please provide a title',
	},
	vendor: {
		type: String,
	},
	description: {
		type: String,
	},
	images: {
		type: [
			{
				altName: String,
				name: String,
				src: String,
			},
		],
	},
	quantity: {
		type: Number,
	},
	isInStock: {
		type: Boolean,
	},
	categories: {
		type: [String],
	},
	subCategories: {
		type: [String],
	},
	price: {
		type: Number,
	},
	sale: {
		type: Number,
	},
	specifications: {
		type: [
			{
				heading: String,
				rows: [[String]],
			},
		],
	},
	user: {
		type: mongoose.Types.ObjectId,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('products', productSchema);

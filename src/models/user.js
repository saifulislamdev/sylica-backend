import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: 'Please enter your first name',
	},
	lastName: {
		type: String,
		required: 'Please enter your last name',
	},
	email: {
		type: String,
		unique: true,
		required: 'Please enter your email',
	},
	password: {
		type: String,
		required: 'Please enter your password',
	},
	pastOrders: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
	},
	listings: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
	},
	activeListings: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
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

export default mongoose.model('Users', userSchema);

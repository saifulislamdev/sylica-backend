import mongoose from 'mongoose';

const connectDB = async (dbURI) => {
	try {
		if (!dbURI) {
			throw Error('dbURI not found');
		}

		await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connected');
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

export default connectDB;

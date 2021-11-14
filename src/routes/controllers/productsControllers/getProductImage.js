import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import Grid from 'gridfs-stream';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = mongoose.createConnection(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
	// init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('product_images');
});

const getProductImage = (req, res) => {
	try {
		gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
			if (!file) return res.status(404).json({ msg: 'No file found' });

			console.log(file);

			// check if image
			if (
				file.contentType === 'image/jpeg' ||
				file.contentType === 'image/png' ||
				file.contentype === 'img/png'
			) {
				// Read output to browser
				const readStream = gfs.createReadStream({ filename: file.filename });
				readStream.pipe(res);
			} else {
				return res.status(404).json({ msg: 'Not an image' });
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal server error' });
	}
};

export default getProductImage;

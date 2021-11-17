import crypto from 'crypto';
import * as dotenv from 'dotenv';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';

dotenv.config();

const conn = mongoose.createConnection(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once('open', () => {
	// Init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('product_images'); //collection name
});

// Create storage engine
const storage = new GridFsStorage({
	url: process.env.DB_URI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			try {
				crypto.randomBytes(16, (err, buf) => {
					if (err) {
						return reject(err);
					}
					const filename =
						buf.toString('hex') + path.extname(file.originalname);
					const fileInfo = {
						filename: filename,
						bucketName: 'product_images', //collection name
					};

					req.body.images = !req.body.images ? [] : req.body.images;
					req.body.images.push({
						altName: file.originalname,
						name: filename,
						src: `/products/images/${filename}`,
					});

					resolve(fileInfo);
				});
			} catch (error) {}
		});
	},
});

const uploadProductImages = multer({ storage });

export default uploadProductImages;

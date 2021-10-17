import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../../../models/user';
import validateData from '../../../helpers/validateData';

const validationSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const signUpUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = await validateData(
			req,
			res,
			validationSchema
		);

		let user = await UserModel.findOne({ email });

		if (user) return res.status(400).json({ msg: 'Account already taken' });

		user = new UserModel({ firstName, lastName, email, password });

		// encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		// create user document in database
		await user.save();

		// create and return a json web token as response
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.status(200).json({ token });
			}
		);
	} catch (error) {
		return res.status(500).json({ msg: 'Internal server error' });
	}
};

export default signUpUser;

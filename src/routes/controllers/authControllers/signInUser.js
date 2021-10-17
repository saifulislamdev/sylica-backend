import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../../../models/user';
import validateData from '../../../helpers/validateData';

const validationSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const signInUser = async (req, res) => {
	try {
		const { email, password } = await validateData(req, res, validationSchema);

		const user = await UserModel.findOne({ email });

		if (!user) res.status(401).json({ msg: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) res.status(401).json({ msg: 'Invalid credentials' });

		user.password = undefined;

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
				res.status(200).json({ token, user });
			}
		);
	} catch (error) {
		res.status(500).json({ msg: 'Internal server error' });
	}
};

export default signInUser;

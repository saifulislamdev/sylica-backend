import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (error) {
		return res.status(401).json({ msg: 'Invalid token, authorization denied' });
	}
};

export default authenticateToken;

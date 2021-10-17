// This function validates that passed in request body matches validation schema. validationSchema is of type Joi.object.
const validateData = async (req, res, validationSchema) => {
	try {
		const values = await validationSchema.validateAsync(req.body);

		return values;
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
};

export default validateData;

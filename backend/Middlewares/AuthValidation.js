const Joi = require('joi');

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    
    next();
}



// Middleware function for login validation
const loginValidation = (req, res, next) => {
    // Define the validation schema
    const schema = Joi.object({
        email: Joi.string().email().required(), // Email must be a valid email and is required
        password: Joi.string().min(4).max(100).required() // Password must be between 4 and 100 characters and is required
    });

    // Validate the data against the schema
    const { error } = schema.validate(req.body);

    // If there is an error, send a response with status 400 and the error details
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
};

module.exports = {
    signupValidation,
    loginValidation
}


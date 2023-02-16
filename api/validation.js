const Joi = require('@hapi/joi');

// register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const orderValidation = data => {
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        user_id: Joi.string().min(0).required(),
        subtotal: Joi.number().required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.orderValidation = orderValidation;
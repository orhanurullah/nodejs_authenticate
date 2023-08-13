const Joi = require('joi');

const createValidation = (body) => {
    const schema = Joi.object({
        firstName:Joi.string().required().min(3).max(100).label('firstName'),
        lastName:Joi.string().required().min(2).max(100).label('lastName'),
        email:Joi.string().email().required().min(5).max(255).label('email'),
        password:Joi.string().required().min(5).max(25).label('password')
    });
    return schema.validate(body);
}

const loginValidation = (body) => {
    const schema = Joi.object({
        email:Joi.string().email().required().min(5).max(255).label('email'),
        password:Joi.string().required().min(5).max(25).label('password')
    });
    return schema.validate(body);
}

const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label('Refresh Token')
    });
    return schema.validate(body);
}

module.exports = {
    createValidation,
    loginValidation,
    refreshTokenBodyValidation
}
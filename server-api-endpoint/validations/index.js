const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const registerValidationSchema = Joi.object({
    "name": Joi.string().min(4).required(),
    "email": Joi.string().min(6).required().email(),
    "password": Joi.string().min(6).required(),
    "role": Joi.string()
  });
  return registerValidationSchema.validate(data);
}

const loginValidation = (data) => {
  const loginValidationSchema = Joi.object({
    "email": Joi.string().min(6).required().email(),
    "password": Joi.string().min(6).required()
  });
  return loginValidationSchema.validate(data);
}

const forgetPasswordValidation = (data) => {
  const forgetPasswordSchema = Joi.object({
    "email": Joi.string().min(6).required().email(),
  });
  return forgetPasswordSchema.validate(data);
}

const changePasswordValidation = (data) => {
  const changePasswordSchema = Joi.object({
    "email": Joi.string().min(6).required().email(),
    "currentPassword": Joi.string().min(6).required(),
    "newPassword": Joi.string().min(6).required(),
    "newPasswordValidation": Joi.string().min(6).required(),
  });
  return changePasswordSchema.validate(data);
}


module.exports = {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  changePasswordValidation
}
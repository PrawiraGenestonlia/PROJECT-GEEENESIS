const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const registerValidationSchema = Joi.object({
    "name": Joi.string().min(4).required(),
    "email": Joi.string().min(6).required().email(),
    "password": Joi.string().min(6).required(),
    "role": Joi.string(),
    "matric": Joi.string(),
  });
  return registerValidationSchema.validate(data);
}

const registerValidationNoPassword = (data) => {
  const registerValidationSchema = Joi.object({
    "name": Joi.string().min(4).required(),
    "email": Joi.string().min(6).required().email(),
    "matric": Joi.string(),
    // "password": Joi.string().min(6).required(),
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

const clubInformationValidation = (data) => {
  const clubInformationSchema = Joi.object({
    "title": Joi.string().min(2).required(),
    "bannerImgLink": Joi.string().min(2).required(),
    "server_unique_name": Joi.string().min(2).required(),
    "summary": Joi.string().allow(''),
    "contactLink": Joi.string().allow(''),
    "rawEditor": Joi.string().allow(''),
  });
  return clubInformationSchema.validate(data);
}

const mentorPairValidation = (data) => {
  const mentorPairSchema = Joi.object({
    "student": Joi.string().min(2).required(),
    "mentor": Joi.string().min(2).required(),
  });
  return mentorPairSchema.validate(data);
}

const seniorBuddyValidation = (data) => {
  const seniorBuddySchema = Joi.object({
    "student": Joi.string().min(2).required(),
    "senior buddy": Joi.string().min(2).required(),
  });
  return seniorBuddySchema.validate(data);
}


module.exports = {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  changePasswordValidation,
  registerValidationNoPassword,
  clubInformationValidation,
  mentorPairValidation,
  seniorBuddyValidation
}
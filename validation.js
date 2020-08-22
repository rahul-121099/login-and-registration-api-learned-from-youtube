//joi validation
const Joi = require("@hapi/joi");

//validation for registration
const validationForRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

//validation for login
const validationForLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.validationForRegistration = validationForRegistration;
module.exports.validationForLogin = validationForLogin;
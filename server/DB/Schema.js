const Joi = require("joi");

const AuthSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().trim().min(5).max(150).required(),
});

module.exports = AuthSchema;

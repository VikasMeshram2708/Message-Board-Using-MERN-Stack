const Joi = require("joi");

const MsgSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  message: Joi.string().trim().min(5).max(200).required(),
});

module.exports = MsgSchema;

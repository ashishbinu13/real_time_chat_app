const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required().min(4),
  email: Joi.string()
    .email()
    .pattern(
      new RegExp(
        "^([a-z0-9.-]{1,64})@([a-z0-9-]{2,200}).([a-z]{2,20})(.[a-z]{2,10})?$"
      )
    )
    .messages({ "string.pattern.base": "invalid email id" })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"))
    .required()
    .messages({
      "string.pattern.base":
        "password must have at least one capital letter, small letter and number with minimum 8 characters",
    }),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { signupSchema, loginSchema };

const Joi = require('joi');
const { handleError } = require('../utils/responseHandler');

const borrowSchema = Joi.object({
  userId: Joi.number().required(),
  itemType: Joi.string().valid('book', 'magazine').required(),
  title: Joi.string().required()
});

const returnSchema = Joi.object({
  userId: Joi.number().required(),
  items: Joi.array().items(Joi.string()).min(1).required()
});

const validateBorrow = (req, res, next) => {
  const { error } = borrowSchema.validate(req.body);
  if (error) {
    return handleError(res, error, 400);
  }
  next();
};

const validateReturn = (req, res, next) => {
  const { error } = returnSchema.validate(req.body);
  if (error) {
    return handleError(res, error, 400);
  }
  next();
};

module.exports = {
  validateBorrow,
  validateReturn
};
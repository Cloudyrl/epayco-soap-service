import Joi from "@hapi/joi";

export const transactionStatus = {
  confirmed : 'confirmed',
  unconfirmed : 'unconfirmed'
}

export const createUserSchema = Joi.object().keys({
  document: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const createTransactionSchema = Joi.object().keys({
  document: Joi.string().required(),
  phone: Joi.string().required(),
  value: Joi.number().min(1).required()
});


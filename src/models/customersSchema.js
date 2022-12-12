import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().min(2).required(),
  phone: joi.string().min(10).max(11).trim().pattern(/^[0-9]+$/, 'numbers').required(),
  cpf: joi.string().length(11).trim().pattern(/^[0-9]+$/, 'numbers').required(),
  birthday: joi.date().less("now").required(),
});

export default customersSchema;

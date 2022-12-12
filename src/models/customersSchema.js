import joi, { string } from "joi";

const customersSchema = joi.object({
  name: joi.string().min(),
  phone: joi.string().min(10).max(11).alphanum(0-9).required(),
  cpf: joi.string().min(11).required(),
  birthday: joi.date().less("now").required(),
});

export default customersSchema;

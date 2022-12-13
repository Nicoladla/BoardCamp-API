import joi from "joi";

const rentalsSchema = joi.object({
  customerId: joi.number().min(1).required(),
  gameId: joi.number().min(1).required(),
  daysRented: joi.number().min(1).required(),
  rentDate: joi.date().iso().required(),
  returnDate: joi.required(),
  delayFee: joi.required(),
  originalPrice: joi.number().min(1).required(),
});

export default rentalsSchema;

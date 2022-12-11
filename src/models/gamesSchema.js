import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().min(3).required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().min(0).required(),
  categoryId: joi.number().min(0).required(),
  pricePerDay: joi.number().min(1).required(),
});

export default gamesSchema;

import joi from "joi";

const categoriesSchema = joi.object({
  name: joi.string().min(3).required,
});

export default categoriesSchema;

import customersSchema from "../models/customersSchema.js";

export default async function customerValidation(req, res, next) {
  const customer = req.body;

  try {
    const { error } = customersSchema.validate(customer, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

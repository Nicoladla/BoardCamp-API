import connection from "../database/db.js";
import customersSchema from "../models/customersSchema.js";

export async function getCustomers(req, res) {}

export async function postCustomers(req, res) {
  const customer = req.body;

  try {
    const { error } = customersSchema.validate(customer, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function putCustomers(req, res) {}

import connection from "../database/db.js";
import customersSchema from "../models/customersSchema.js";

export default async function customerValidation(req, res, next) {
  const customer = req.body;

  try {
    const { error } = customersSchema.validate(customer, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    const customerCpfExist = await connection.query(
      `SELECT cpf FROM customers WHERE cpf=$1;`,
      [customer.cpf]
    );
    if (customerCpfExist.rows[0]?.cpf) {
      return res.status(409).send("CPF já cadastrado");
    }

    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
